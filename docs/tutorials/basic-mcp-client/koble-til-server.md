# Koble til en MCP-server

Nå skal vi bygge en interaktiv klient som lar deg koble til MCP-servere og teste verktøyene deres.

## Lag konfigurasjonsfil

Først lager vi en konfigurasjonsfil for å definere hvilke servere vi kan koble til.

Opprett `mcp-settings.json` i roten av prosjektet:

```json
{
  "mcpServers": {
    "weather": {
      "type": "stdio",
      "command": "node",
      "args": [
        "/sti/til/din/weather-mcp-server/build/index.js"
      ]
    }
  }
}
```

**Viktig**: Endre stien til å peke til din egen MCP-server!

Du kan legge til flere servere ved å legge til flere objekter under `mcpServers`:

```json
{
  "mcpServers": {
    "weather": {
      "type": "stdio",
      "command": "node",
      "args": ["/sti/til/weather-mcp-server/build/index.js"]
    },
    "prompts": {
      "type": "stdio",
      "command": "node",
      "args": ["/sti/til/prompts-mcp-server/build/index.js"]
    }
  }
}
```

## Bygg hovedprogrammet

Åpne `src/index.ts` og lim inn følgende:

```typescript
import { MCPClient } from "./client.js";
import * as readline from "readline";
import * as fs from "fs";
import * as path from "path";

interface MCPServerConfig {
  type: string;
  command: string;
  args: string[];
}

interface MCPSettings {
  mcpServers: Record<string, MCPServerConfig>;
}

async function loadMCPSettings(): Promise<MCPSettings> {
  const settingsPath = path.join(process.cwd(), "mcp-settings.json");
  const data = await fs.promises.readFile(settingsPath, "utf-8");
  return JSON.parse(data);
}

async function main() {
  const client = new MCPClient();

  try {
    // Last MCP-innstillinger
    const settings = await loadMCPSettings();
    const serverNames = Object.keys(settings.mcpServers);

    if (serverNames.length === 0) {
      console.error("Ingen MCP-servere funnet i mcp-settings.json");
      return;
    }

    // Velg server (bruk første hvis det bare er én)
    let selectedServer = serverNames[0];
    if (serverNames.length > 1) {
      console.log("Tilgjengelige servere:");
      serverNames.forEach((name, i) => console.log(`  ${i + 1}. ${name}`));
      // For enkelhetens skyld, bruker vi første server
      console.log(`\nBruker server: ${selectedServer}`);
    }

    const serverConfig = settings.mcpServers[selectedServer];

    // Koble til MCP-server
    console.log(`Kobler til ${selectedServer}...`);
    await client.connect(serverConfig.command, serverConfig.args);

    // Hent tilgjengelige verktøy
    const tools = await client.getTools();
    console.log(`\nFant ${tools.length} verktøy`);

    // Opprett readline interface
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    console.log("\n" + "=".repeat(60));
    console.log("MCP Interaktiv Klient");
    console.log("=".repeat(60));
    console.log("\nKommandoer:");
    console.log("  /tools    - Vis alle tilgjengelige verktøy");
    console.log("  /call     - Kall et verktøy");
    console.log("  /quit     - Avslutt");
    console.log("=".repeat(60) + "\n");

    const askQuestion = (question: string): Promise<string> => {
      return new Promise((resolve) => {
        rl.question(question, (answer) => {
          resolve(answer);
        });
      });
    };

    let running = true;
    while (running) {
      const command = await askQuestion("\n> ");

      if (command.trim() === "/quit") {
        running = false;
        console.log("Avslutter...");
        break;
      }

      if (command.trim() === "/tools") {
        console.log("\nTilgjengelige verktøy:");
        console.log("-".repeat(60));
        for (const tool of tools) {
          console.log(`\n📦 ${tool.name}`);
          if (tool.description) {
            console.log(`   ${tool.description}`);
          }
          if (tool.inputSchema && "properties" in tool.inputSchema) {
            const props = tool.inputSchema.properties as Record<
              string,
              unknown
            >;
            const paramNames = Object.keys(props);
            if (paramNames.length > 0) {
              console.log(`   Parametere: ${paramNames.join(", ")}`);
            }
          }
        }
        console.log("-".repeat(60));
        continue;
      }

      if (command.trim() === "/call") {
        const toolName = await askQuestion("Verktøynavn: ");

        if (!tools.find((t) => t.name === toolName)) {
          console.log(`❌ Verktøy '${toolName}' finnes ikke`);
          continue;
        }

        const argsInput = await askQuestion(
          "Argumenter (JSON format, eller tom for {}): "
        );

        let args: Record<string, unknown> = {};
        if (argsInput.trim()) {
          try {
            args = JSON.parse(argsInput);
          } catch (e) {
            console.log("❌ Ugyldig JSON format");
            continue;
          }
        }

        try {
          console.log("\n⏳ Kaller verktøy...");
          const result = await client.callTool(toolName, args);
          console.log("\n✅ Resultat:");
          console.log(JSON.stringify(result, null, 2));
        } catch (error) {
          console.log("❌ Feil ved kall av verktøy:", error);
        }
        continue;
      }

      if (command.trim()) {
        console.log(
          "❓ Ukjent kommando. Bruk /tools, /call eller /quit"
        );
      }
    }

    rl.close();
  } catch (error) {
    console.error("Feil:", error);
  } finally {
    await client.disconnect();
  }
}

main();
```

## Hvordan det fungerer

### Konfigurasjonshåndtering

```typescript
async function loadMCPSettings(): Promise<MCPSettings> {
  const settingsPath = path.join(process.cwd(), "mcp-settings.json");
  const data = await fs.promises.readFile(settingsPath, "utf-8");
  return JSON.parse(data);
}
```

- Leser `mcp-settings.json` fra prosjektets rotmappe
- Parser JSON og returnerer konfigurasjonen

### Servervalg

```typescript
const settings = await loadMCPSettings();
const serverNames = Object.keys(settings.mcpServers);
let selectedServer = serverNames[0];
```

- Henter alle servere fra konfigurasjonen
- Velger første server (kan utvides til å la bruker velge)

### Interaktiv REPL

```typescript
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const askQuestion = (question: string): Promise<string> => {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer);
    });
  });
};
```

- Bruker Node.js' readline for å lese input fra brukeren
- `askQuestion` wrapper readline i en Promise for enklere bruk med async/await

### Kommandoer

Klienten støtter tre kommandoer:

1. **`/tools`** - Lister alle tilgjengelige verktøy med beskrivelser og parametere
2. **`/call`** - Lar deg kalle et verktøy ved å oppgi navn og argumenter (JSON-format)
3. **`/quit`** - Avslutter programmet

### Feilhåndtering

```typescript
try {
  args = JSON.parse(argsInput);
} catch (e) {
  console.log("❌ Ugyldig JSON format");
  continue;
}
```

- Validerer JSON-input før verktøykall
- Gir klare feilmeldinger til brukeren

## Kjør klienten

Bygg prosjektet:

```bash
npm run build
```

Start klienten:

```bash
npm start
```

Du vil se noe slikt:

```
Kobler til weather...
Koblet til MCP-server!

Fant 2 verktøy

============================================================
MCP Interaktiv Klient
============================================================

Kommandoer:
  /tools    - Vis alle tilgjengelige verktøy
  /call     - Kall et verktøy
  /quit     - Avslutt
============================================================

>
```

## Eksempel på bruk

### Liste verktøy

```
> /tools

Tilgjengelige verktøy:
------------------------------------------------------------

📦 get_forecast
   Get weather forecast for a location
   Parametere: latitude, longitude

📦 get_forecast_by_location
   Get weather forecast by location name
   Parametere: location
------------------------------------------------------------
```

### Kall et verktøy

```
> /call
Verktøynavn: get_forecast_by_location
Argumenter (JSON format, eller tom for {}): {"location": "Oslo"}

⏳ Kaller verktøy...

✅ Resultat:
{
  "content": [
    {
      "type": "text",
      "text": "Værvarsel for Oslo:\n\nTemperatur: 5°C\nVind: 3.2 m/s\n..."
    }
  ]
}
```

## Neste steg

Nå som klienten fungerer, la oss se på [testing og feilsøking](/tutorials/basic-mcp-client/testing).
