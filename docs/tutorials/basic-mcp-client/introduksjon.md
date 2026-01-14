# Bygg en MCP-klient i TypeScript

## Hva vi skal bygge

Vi skal bygge en MCP-klient som kan koble seg til MCP-servere. Klienten vil:

- **Koble til en MCP-server** - Etablere forbindelse via stdio-transport
- **Liste tilgjengelige verktøy** - Hente og vise alle verktøy serveren tilbyr
- **Kalle verktøy** - Sende forespørsler til serveren og behandle svar

## Hva er en MCP-klient?

I MCP-arkitekturen har vi to hovedkomponenter:

- **MCP-server**: Tilbyr verktøy, ressurser og prompts
- **MCP-klient**: Kobler til servere og bruker deres funksjonalitet

Klienter er typisk integrert i LLM-applikasjoner som Claude for Desktop, men du kan også bygge egne klienter for:

- Automatiserte arbeidsflyter
- Testing av MCP-servere
- Egendefinerte KI-agenter
- Integrasjon med eksisterende systemer

## MCP-konsepter som demonstreres

Denne tutorialen fokuserer på klientsiden av MCP:

- **Transport**: Hvordan klient og server kommuniserer (stdio, SSE, etc.)
- **Tilkobling**: Initialisering og handshake med serveren
- **Verktøyoppdagelse**: Hente liste over tilgjengelige verktøy
- **Verktøykall**: Sende forespørsler og motta svar

## Systemkrav

Du trenger:

- **Node.js 18 eller høyere** - [Last ned fra nodejs.org](https://nodejs.org/)
- **En MCP-server å teste mot** - Vi bruker en enkel eksempelserver

Verifiser Node.js-installasjonen din:

```bash
node --version
npm --version
```

`node --version` bør vise 18.0.0 eller høyere.

## Neste steg

Nå som du forstår det grunnleggende, la oss [sette opp miljøet](/tutorials/basic-mcp-client/oppsett).
