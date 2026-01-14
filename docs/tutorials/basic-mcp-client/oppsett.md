# Sett opp miljøet

La oss sette opp prosjektstrukturen og installere nødvendige avhengigheter.

## Opprett prosjektet

La oss opprette en ny prosjektmappe og initialisere den:

```bash
mkdir mcp-client
cd mcp-client
npm init -y
```

## Installer avhengigheter

Installer de nødvendige pakkene:

Kjerneavhengigheter:

```bash
npm install @modelcontextprotocol/sdk
```

Utviklingsavhengigheter:

```bash
npm install -D @types/node typescript
```

Hva gjør avhengighetene?

- **@modelcontextprotocol/sdk** - Den offisielle MCP SDK for TypeScript. Inneholder både klient- og serverklasser.
- **@types/node** - TypeScript-typedefinisjoner for Node.js
- **typescript** - TypeScript-kompilator

## Konfigurer package.json

Oppdater `package.json` for å inkludere nødvendig konfigurasjon:

```json
{
  "name": "mcp-client",
  "version": "1.0.0",
  "description": "En enkel MCP-klient i TypeScript",
  "type": "module",
  "scripts": {
    "build": "tsc",
    "start": "node build/index.js"
  },
  "dependencies": {
    "@modelcontextprotocol/sdk": "^1.25.2"
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
- **`build`-skript** - Kompilerer TypeScript til JavaScript
- **`start`-skript** - Kjører den kompilerte klienten

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

## Lag mappe for kildekode

```bash
mkdir src
touch src/index.ts
touch src/client.ts
```

## Prosjektstruktur

Prosjektet ditt skal nå se slik ut:

```
mcp-client/
├── src/
│   ├── index.ts
│   └── client.ts
├── node_modules/
├── package.json
├── package-lock.json
└── tsconfig.json
```

`index.ts` og `client.ts` er tomme foreløpig. `node_modules/` og `package-lock.json` genereres automatisk.

## Neste steg

Nå som miljøet er satt opp, la oss [bygge klientmodulen](/tutorials/basic-mcp-client/client).
