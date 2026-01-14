# Sett opp miljøet

La oss sette opp prosjektstrukturen og installere nødvendige avhengigheter.

## Opprett prosjektet

La oss opprette en ny prosjektmappe og initialisere den:

```bash
mkdir prompts-mcp-server
cd prompts-mcp-server
npm init -y
```

## Installer avhengigheter

Installer de nødvendige pakkene:

Kjerneavhengigheter:

```bash
npm install @modelcontextprotocol/sdk zod
```

Utviklingsavhengigheter:

```bash
npm install -D @types/node typescript
```

Hva gjør avhengighetene?

- **@modelcontextprotocol/sdk** - Den offisielle MCP SDK for TypeScript. Inneholder alt man trenger for å utvikle etter MCP-standarden.
- **zod** - Skjemavalideringsbibliotek for å definere prompt-argumenter
- **@types/node** - TypeScript-typedefinisjoner for Node.js
- **typescript** - TypeScript-kompilator

## Konfigurer package.json

Oppdater `package.json` for å inkludere nødvendig konfigurasjon:

```json
{
  "name": "prompts-mcp-server",
  "version": "1.0.0",
  "description": "A Model Context Protocol server for developer prompts",
  "type": "module",
  "bin": {
    "prompts-mcp-server": "build/index.js"
  },
  "scripts": {
    "build": "tsc && chmod 755 build/index.js",
    "inspect": "npx @modelcontextprotocol/inspector node build/index.js"
  },
  "files": ["build"],
  "dependencies": {
    "@modelcontextprotocol/sdk": "^1.25.2",
    "zod": "^3.25.76"
  },
  "devDependencies": {
    "@types/node": "^25.0.3",
    "typescript": "^5.9.3"
  },
  "engines": {
    "node": ">=18.0.0"
  }
}
```

Hva skjer her?:

- **`"type": "module"`** - Aktiverer ES-moduler
- **`bin`** - Gjør serveren din kjørbar
- **`build`-skript** - Kompilerer TypeScript og gjør output kjørbar

## Konfigurer TypeScript

Opprett `tsconfig.json`:

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "Node16",
    "moduleResolution": "Node16",
    "outDir": "./build",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules"]
}
```

## Lag mappe for kildekode med følgende filer

```bash
mkdir src
touch src/index.ts
touch src/prompts.ts
```

## Prosjektstruktur

Prosjektet ditt skal nå se slik ut:

```
prompts-mcp-server/
├── src/
│   ├── index.ts
│   └── prompts.ts
├── node_modules/
├── package.json
├── package-lock.json
└── tsconfig.json
```

`index.ts` og `prompts.ts` er tomme foreløpig. `node_modules/` og `package-lock.json` genereres automatisk.

## Neste steg

Nå som miljøet er satt opp, la oss [bygge Prompts-modulen](/tutorials/prompts-mcp-server/prompts).
