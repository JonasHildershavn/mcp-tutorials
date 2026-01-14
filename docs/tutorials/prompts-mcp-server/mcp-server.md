# Bygg MCP-serveren

Nå skal vi lage hoved-MCP-serveren i `src/index.ts`. Vi bygger den opp steg for steg.

## Steg 1: Sett opp serveren

Først importerer vi det vi trenger og oppretter serverinstansen:

```typescript
#!/usr/bin/env node
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { prompts } from "./prompts.js";

const server = new McpServer({
  name: "developer-prompts",
  version: "1.0.0",
});
```

## Steg 2: Registrer prompts

Nå registrerer vi promptene. SDK-en tilbyr `server.registerPrompt()` som tar tre argumenter:

1. **Prompt name** - Identifikator brukt av klienter
2. **Prompt definition** - Beskrivelse og argumentskjema (med Zod)
3. **Prompt callback** - Async-funksjon som genererer meldingene

```typescript
// Register all prompts from our prompts module
for (const promptDef of prompts) {
  // Build Zod schema for arguments
  const inputSchema: Record<string, z.ZodTypeAny> = {};

  if (promptDef.arguments) {
    for (const arg of promptDef.arguments) {
      if (arg.required) {
        inputSchema[arg.name] = z.string().describe(arg.description);
      } else {
        inputSchema[arg.name] = z.string().optional().describe(arg.description);
      }
    }
  }

  server.registerPrompt(
    promptDef.name,
    {
      description: promptDef.description,
      argsSchema: inputSchema,
    },
    async (args) => {
      const messages = promptDef.generateMessages(args as Record<string, string>);
      return {
        messages,
      };
    }
  );
}
```

## Hvordan prompt-registrering fungerer

1. **Itererer over alle prompts** - Vi går gjennom hver prompt fra `prompts.ts`
2. **Bygger Zod-skjema dynamisk** - Konverterer argument-definisjoner til Zod-validering
3. **Registrerer prompt** - Kobler prompt-navnet til genereringsfunksjonen

## Steg 3: Start serveren

Til slutt kobler vi serveren til STDIO-transporten og starter den:

```typescript
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Developer Prompts MCP Server running on stdio");
}

main().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});
```

Vi bruker `console.error()` for logging fordi `console.log()` ville forstyrret STDIO-kommunikasjonen.

## Fullstendig index.ts

Her er den komplette `src/index.ts`-filen:

```typescript
#!/usr/bin/env node
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { prompts } from "./prompts.js";

const server = new McpServer({
  name: "developer-prompts",
  version: "1.0.0",
});

// Register all prompts
for (const promptDef of prompts) {
  const inputSchema: Record<string, z.ZodTypeAny> = {};

  if (promptDef.arguments) {
    for (const arg of promptDef.arguments) {
      if (arg.required) {
        inputSchema[arg.name] = z.string().describe(arg.description);
      } else {
        inputSchema[arg.name] = z.string().optional().describe(arg.description);
      }
    }
  }

  server.registerPrompt(
    promptDef.name,
    {
      description: promptDef.description,
      argsSchema: inputSchema,
    },
    async (args) => {
      const messages = promptDef.generateMessages(args as Record<string, string>);
      return {
        messages,
      };
    }
  );
}

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Developer Prompts MCP Server running on stdio");
}

main().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});
```

## Neste steg

Nå som serveren er ferdig kodet, la oss [bygge og teste den](/tutorials/prompts-mcp-server/testing).
