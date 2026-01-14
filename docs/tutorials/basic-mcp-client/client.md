# Bygg klientmodulen

Nå skal vi bygge selve MCP-klienten som kan koble til en server og bruke dens verktøy.

## Komplett klientfil

Åpne `src/client.ts` og lim inn følgende:

```typescript
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";

export class MCPClient {
  private client: Client;
  private transport: StdioClientTransport | null = null;

  constructor() {
    this.client = new Client(
      {
        name: "mcp-client",
        version: "1.0.0",
      },
      {
        capabilities: {},
      }
    );
  }

  async connect(serverCommand: string, args: string[] = []): Promise<void> {
    this.transport = new StdioClientTransport({
      command: serverCommand,
      args: args,
    });

    await this.client.connect(this.transport);
    console.log("Koblet til MCP-server!");
  }

  async listTools(): Promise<void> {
    const response = await this.client.listTools();

    console.log("\nTilgjengelige verktøy:");
    console.log("=".repeat(50));

    for (const tool of response.tools) {
      console.log(`\n- ${tool.name}`);
      if (tool.description) {
        console.log(`  Beskrivelse: ${tool.description}`);
      }
      if (tool.inputSchema) {
        console.log(
          `  Input-skjema: ${JSON.stringify(tool.inputSchema, null, 2)}`
        );
      }
    }
  }

  async getTools() {
    const response = await this.client.listTools();
    return response.tools;
  }

  async callTool(
    name: string,
    args: Record<string, unknown>
  ): Promise<unknown> {
    console.log(`\nKaller verktøy: ${name}`);
    console.log(`Med argumenter: ${JSON.stringify(args)}`);

    const response = await this.client.callTool({
      name: name,
      arguments: args,
    });

    return response;
  }

  async disconnect(): Promise<void> {
    if (this.transport) {
      await this.transport.close();
      console.log("Koblet fra MCP-server.");
    }
  }
}
```

## Hvordan klienten fungerer

### Import-setninger

```typescript
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
```

- **Client** - Hovedklassen for MCP-klienter
- **StdioClientTransport** - Transport som kommuniserer via stdin/stdout

### Constructor

```typescript
constructor() {
  this.client = new Client(
    {
      name: "mcp-client",
      version: "1.0.0",
    },
    {
      capabilities: {},
    }
  );
}
```

- **name og version** - Identifiserer klienten overfor serveren
- **capabilities** - Definerer hva klienten støtter (kan utvides senere)

### connect()

```typescript
async connect(serverCommand: string, args: string[] = []): Promise<void>
```

- Oppretter en stdio-transport med serverkommandoen
- Starter serverprosessen og etablerer kommunikasjon
- Utfører MCP-handshake automatisk

### listTools()

```typescript
async listTools(): Promise<void>
```

- Henter alle tilgjengelige verktøy fra serveren
- Viser navn, beskrivelse og input-skjema for hvert verktøy

### getTools()

```typescript
async getTools()
```

- Henter verktøyene fra serveren og returnerer dem som en array
- Nyttig når du trenger å behandle verktøyene programmatisk

### callTool()

```typescript
async callTool(name: string, args: Record<string, unknown>): Promise<unknown>
```

- Kaller et spesifikt verktøy med gitte argumenter
- Returnerer serverens respons

### disconnect()

```typescript
async disconnect(): Promise<void>
```

- Lukker transporten og avslutter tilkoblingen

## Neste steg

Nå som vi har klientmodulen, la oss [koble til en server og bruke verktøy](/tutorials/basic-mcp-client/koble-til-server).
