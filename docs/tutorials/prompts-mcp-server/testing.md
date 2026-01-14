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

- Se alle registrerte prompts
- Teste prompts med forskjellige argumenter
- Se de genererte meldingene
- Debugge feil

### Teste prompts i Inspector

1. Klikk på "Prompts"-fanen
2. Velg en prompt (f.eks. "code-review")
3. Fyll ut argumentene (f.eks. `code` og evt. `language`)
4. Klikk "Get Prompt"
5. Se den genererte prompt-meldingen

## Alternativ 2: Claude for Desktop

::: warning Linux-brukere
Claude for Desktop er ikke tilgjengelig på Linux ennå. Linux-brukere bør bruke MCP Inspector.
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

Legg til prompts-serveren din i `mcpServers`-seksjonen:

**macOS/Linux:**

```json
{
  "mcpServers": {
    "developer-prompts": {
      "command": "node",
      "args": ["/absolute/path/to/prompts-mcp-server/build/index.js"]
    }
  }
}
```

**Windows:**

```json
{
  "mcpServers": {
    "developer-prompts": {
      "command": "node",
      "args": ["C:\\absolute\\path\\to\\prompts-mcp-server\\build\\index.js"]
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

Se etter **kontaktikonet** (plugg-ikon) i Claude for Desktop. Klikk på det og du skal se "developer-prompts"-serveren din listet opp.

## Hvordan bruke prompts i Claude for Desktop

### Tilgang til prompts

Det er to måter å bruke prompts i Claude for Desktop:

1. **Prompt-velgeren** - Klikk på "prompt"-ikonet (⚡) i input-feltet
2. **Skriv direkte** - Skriv prompt-navnet i chatten

### Eksempel: Code Review

1. Klikk på prompt-ikonet (⚡)
2. Velg "code-review"
3. Fyll ut argumentene:
   - `code`: Lim inn koden du vil review
   - `language` (valgfritt): "typescript", "python", etc.
4. Klikk "Submit"

Claude vil nå bruke prompt-malen til å utføre en grundig kodegjennomgang!

### Eksempel: Bug Analysis

1. Klikk på prompt-ikonet (⚡)
2. Velg "bug-analysis"
3. Fyll ut argumentene:
   - `description`: "Application crashes when user logs out"
   - `error` (valgfritt): Lim inn feilmelding eller stack trace
   - `code` (valgfritt): Lim inn relevant kode
4. Klikk "Submit"

Claude vil nå hjelpe deg med å analysere og løse buggen systematisk!

## Eksempler på bruk

### Code Review

```
Prompt: code-review
Arguments:
- code: "function calc(a, b) { return a + b }"
- language: "javascript"
```

Claude vil gi detaljert feedback på kodekvalitet, mulige bugs, og forbedringer.

### Documentation Writer

```
Prompt: documentation-writer
Arguments:
- code: [Din funksjon/klasse]
- style: "jsdoc"
```

Claude vil generere omfattende dokumentasjon i ønsket format.

### Refactoring Guide

```
Prompt: refactoring-guide
Arguments:
- code: [Kode som trenger refaktorering]
- goal: "improve readability"
```

Claude vil foreslå refaktoreringer med kodeeksempler.

## Prosjektstruktur

Det ferdige prosjektet ditt skal se slik ut:

```
prompts-mcp-server/
├── src/
│   ├── index.ts
│   └── prompts.ts
├── build/
│   ├── index.js
│   └── prompts.js
├── node_modules/
├── package.json
├── tsconfig.json
└── README.md
```

- `src/` inneholder kildekoden (TypeScript)
- `build/` inneholder kompilert JavaScript (auto-generert)
- `node_modules/` inneholder avhengigheter (auto-generert)

## Utvid med egne prompts

Du kan enkelt legge til flere prompts ved å utvide `prompts`-arrayet i `src/prompts.ts`:

```typescript
{
  name: "min-custom-prompt",
  description: "Beskrivelse av hva prompten gjør",
  arguments: [
    {
      name: "mitt-argument",
      description: "Beskrivelse av argumentet",
      required: true,
    },
  ],
  generateMessages: (args) => {
    return [
      {
        role: "user",
        content: {
          type: "text",
          text: `Min custom prompt med ${args["mitt-argument"]}`,
        },
      },
    ];
  },
}
```

Husk å kjøre `npm run build` etter endringer!

## Neste steg

Gratulerer! Du har nå en fungerende MCP-server som serverer prompts til Claude for Desktop.

Du kan:

1. Legge til flere custom prompts for dine egne arbeidsflyter
2. Dele serveren med teamet ditt
3. Publisere til npm for enkel installasjon
4. Kombinere prompts med tools og resources for mer avansert funksjonalitet
