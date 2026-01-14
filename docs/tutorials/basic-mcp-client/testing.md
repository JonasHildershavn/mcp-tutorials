# Testing og feilsøking

La oss se på hvordan du kan teste klienten din og løse vanlige problemer.

## Bygg og kjør klienten

Først, bygg prosjektet:

```bash
npm run build
```

Kjør klienten med en server:

```bash
npm start -- /sti/til/mcp-server/build/index.js
```

## Forventet output

Når klienten kobler til en server, skal du se noe slikt:

```
Koblet til MCP-server!

Tilgjengelige verktøy:
==================================================

- get_forecast
  Beskrivelse: Get weather forecast for a location
  Input-skjema: {
    "type": "object",
    "properties": {
      "latitude": { "type": "number" },
      "longitude": { "type": "number" }
    }
  }
```

## Lag en enkel testserver

For å teste klienten uten en ekstern server, kan du lage en minimal testserver.

Opprett en ny mappe og fil `test-server/index.ts`:

```typescript
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

const server = new McpServer({
  name: "test-server",
  version: "1.0.0",
});

// Registrer et enkelt testverktøy
server.tool(
  "echo",
  "Returnerer meldingen du sender inn",
  {
    message: z.string().describe("Meldingen som skal returneres"),
  },
  async ({ message }) => {
    return {
      content: [
        {
          type: "text",
          text: `Du sa: ${message}`,
        },
      ],
    };
  }
);

// Registrer et verktøy som legger sammen tall
server.tool(
  "add",
  "Legger sammen to tall",
  {
    a: z.number().describe("Første tall"),
    b: z.number().describe("Andre tall"),
  },
  async ({ a, b }) => {
    return {
      content: [
        {
          type: "text",
          text: `${a} + ${b} = ${a + b}`,
        },
      ],
    };
  }
);

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main();
```

## Vanlige feil og løsninger

### "Cannot find module"

**Problem**: Klienten finner ikke servermodulen.

**Løsning**: Sjekk at stien til serveren er korrekt og at serveren er bygget:

```bash
# Bygg serveren først
cd /sti/til/server
npm run build

# Sjekk at build-mappen eksisterer
ls build/
```

### "Connection refused"

**Problem**: Klienten klarer ikke å koble til serveren.

**Løsning**:
- Sjekk at serverkommandoen er riktig
- Verifiser at Node.js kan kjøre serveren direkte

```bash
# Test serveren manuelt
node /sti/til/server/build/index.js
```

### "Tool not found"

**Problem**: Verktøynavnet finnes ikke på serveren.

**Løsning**: Bruk `listTools()` først for å se tilgjengelige verktøy:

```typescript
await client.listTools();
```

### Timeout-feil

**Problem**: Klienten får timeout ved tilkobling.

**Løsning**: Serveren starter kanskje ikke riktig. Sjekk serverlogger:

```typescript
// Legg til feilhåndtering på transporten
this.transport = new StdioClientTransport({
  command: serverCommand,
  args: args,
  stderr: "pipe", // Fang opp serverfeil
});
```

## Debugging-tips

### Aktiver verbose logging

Du kan legge til mer logging i klienten:

```typescript
async connect(serverCommand: string, args: string[] = []): Promise<void> {
  console.log(`Starter server: ${serverCommand} ${args.join(" ")}`);

  this.transport = new StdioClientTransport({
    command: serverCommand,
    args: args,
  });

  console.log("Transport opprettet, kobler til...");
  await this.client.connect(this.transport);
  console.log("Tilkobling fullfort!");
}
```

### Inspiser serverrespons

Log hele responsen fra verktøykall:

```typescript
async callTool(name: string, args: Record<string, unknown>): Promise<unknown> {
  const response = await this.client.callTool({
    name: name,
    arguments: args,
  });

  console.log("Rå respons:", JSON.stringify(response, null, 2));
  return response;
}
```

## Videre utvikling

Nå som du har en fungerende MCP-klient, kan du utvide den med:

- **Ressurshenting** - Les ressurser fra serveren med `client.listResources()` og `client.readResource()`
- **Prompt-støtte** - Hent prompts med `client.listPrompts()` og `client.getPrompt()`
- **Interaktiv modus** - Bygg en REPL for å teste verktøy interaktivt
- **LLM-integrasjon** - Koble klienten til en LLM for automatisk verktøybruk

## Gratulerer!

Du har nå bygget en fungerende MCP-klient som kan:

- Koble til MCP-servere via stdio
- Liste tilgjengelige verktøy
- Kalle verktøy og behandle svar

Denne klienten kan brukes som grunnlag for å bygge mer avanserte AI-agenter og automatiserte arbeidsflyter.
