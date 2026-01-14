# Bygg og test serveren

La oss kompilere TypeScript-koden og teste serveren.

## Bygg serveren

Kompiler TypeScript-koden:

```bash
npm run build
```

Dette vil:

1. Kompilere TypeScript til JavaScript i `build/`-mappen
2. Gjøre `build/index.js` kjørbar (`chmod 755`-delen)

::: tip Bygg før testing
Du må kjøre `npm run build` hver gang du gjør endringer i TypeScript-kildefilene.
:::

## Alternativ 1: MCP Inspector (anbefalt for utvikling)

MCP Inspector er et nettbasert verktøy for testing av MCP-servere:

```bash
npm run inspect
```

Dette vil åpne et webgrensesnitt hvor du kan:

- Se alle registrerte verktøy
- Teste verktøykall med forskjellige inputverdier
- Se forespørsler/responser (payloads)
- Debugge feil

## Alternativ 2: Claude for Desktop

::: warning Linux-brukere
Claude for Desktop er ikke tilgjengelig på Linux ennå. Linux-brukere bør bruke MCP Inspector eller bygge en tilpasset klient.
:::

### Installer Claude for Desktop

Last ned og installer [Claude for Desktop](https://claude.ai/download). Sørg for at du har den nyeste versjonen.

### Konfigurer Claude for Desktop

Åpne konfigurasjonsfilen for Claude for Desktop i en teksteditor:

**macOS:**

```bash
code ~/Library/Application\ Support/Claude/claude_desktop_config.json
```

**Windows:**

```bash
code %APPDATA%\Claude\claude_desktop_config.json
```

Legg til værserveren din i `mcpServers`-seksjonen:

**macOS/Linux:**

```json
{
  "mcpServers": {
    "weather": {
      "command": "node",
      "args": ["/absolute/path/to/weather-mcp-server/build/index.js"]
    }
  }
}
```

**Windows:**

```json
{
  "mcpServers": {
    "weather": {
      "command": "node",
      "args": ["C:\\absolute\\path\\to\\weather-mcp-server\\build\\index.js"]
    }
  }
}
```

::: danger Bruk absolutte stier
Du **må** bruke absolutte stier i konfigurasjonen. Relative stier og `~` vil ikke fungere. Finn din absolutte sti:

**macOS/Linux:** Kjør `pwd` i prosjektmappen din.

**Windows:** Kjør `cd` i prosjektmappen din.
:::

### Start Claude for Desktop på nytt

Etter å ha lagret konfigurasjonen, avslutt og start Claude for Desktop på nytt helt.

### Verifiser servertilkobling

Se etter **kontaktikonet** (plugg-ikon) i Claude for Desktop. Klikk på det og du skal se "weather"-serveren din listet opp med de to verktøyene:

- `get_forecast`
- `get_forecast_by_location`

Hvis serveren din ikke vises, sjekk at du har brukt riktig absolutt sti og at du har kjørt `npm run build`.

## Test med kommandoer

Prøv disse eksempelspørsmålene i Claude for Desktop:

```
Hva er været i Oslo?
```

```
Gi meg værvarselet for Tokyo, Japan
```

```
Hva er været på koordinatene 40.7128, -74.0060?
```

```
Sammenlign været i London og Sydney
```

## Prosjektstruktur

Det ferdige prosjektet ditt skal se slik ut:

```
weather-mcp-server/
├── src/
│   ├── index.ts
│   └── weather.ts
├── build/
│   ├── index.js
│   └── weather.js
├── node_modules/
├── package.json
├── tsconfig.json
└── README.md
```

- `src/` inneholder kildekoden (TypeScript)
- `build/` inneholder kompilert JavaScript (auto-generert)
- `node_modules/` inneholder avhengigheter (auto-generert)

Gratulerer! Du har nå en fungerende MCP-server som kan brukes med Claude for Desktop.
