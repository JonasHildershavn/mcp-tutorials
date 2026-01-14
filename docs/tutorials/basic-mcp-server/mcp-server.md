# Bygg MCP-serveren

Nå skal vi lage hoved-MCP-serveren i `src/index.ts`. Vi bygger den opp steg for steg.

## Steg 1: Sett opp serveren

Først importerer vi det vi trenger og oppretter serverinstansen:

```typescript
#!/usr/bin/env node
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { getForecastByCoordinates, getForecastByLocation } from "./weather.js";

const server = new McpServer({
  name: "weather",
  version: "1.0.0",
});
```

## Steg 2: Registrer tool

Nå registrerer vi tools. SDK-en tilbyr `server.registerTool()` som tar tre argumenter:

1. **Tool name** - Identifikator brukt av klienter
2. **Tool definition** - Beskrivelse og inputskjema (med Zod). Det er denne MCP-klienter bruker til å forstå når de skal kalle på tools serveren tilbyr.
3. **Tool callback** - Async-funksjon som utfører funksjonaliteten

```typescript
server.registerTool(
  "get_forecast",
  {
    description: "Get weather forecast for specific coordinates",
    inputSchema: {
      latitude: z.number().min(-90).max(90).describe("Latitude"),
      longitude: z.number().min(-180).max(180).describe("Longitude"),
    },
  },
  async ({ latitude, longitude }) => {
    const forecast = await getForecastByCoordinates(latitude, longitude);
    return {
      content: [{ type: "text", text: forecast }],
    };
  }
);

server.registerTool(
  "get_forecast_by_location",
  {
    description: "Get weather forecast by location name (city, address, etc)",
    inputSchema: {
      location: z.string().describe("Location name (e.g. 'Oslo', 'Paris')"),
    },
  },
  async ({ location }) => {
    const forecast = await getForecastByLocation(location);
    return {
      content: [{ type: "text", text: forecast }],
    };
  }
);
```

Zod brukes til å definere inputskjemaet. Dette gir typevalidering og beskrivelser som hjelper LLM-en forstå hva parameterne er.

## Steg 3: Start serveren

Til slutt kobler vi serveren til STDIO-transporten og starter den:

```typescript
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Weather MCP Server running on stdio");
}

main().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});
```

Vi bruker `console.error()` for logging fordi `console.log()` ville forstyrret STDIO-kommunikasjonen.

## Neste steg

Nå som serveren er ferdig kodet, la oss [bygge og teste den](/tutorials/basic-mcp-server/testing).
