# Bygg en norsk MCP-server for værvarsler

## Hva vi skal bygge

Vi skal bygge en MCP-server som gir deg værvarsler gjennom to funksjoner:

- **`get_forecast`** - Hent værvarsel ved hjelp av eksakte koordinater (breddegrad/lengdegrad)
- **`get_forecast_by_location`** - Hent værvarsel ved hjelp av stedsnavn (f.eks. "Oslo", "Paris, France")

## MCP-konsepter som demonstreres i denne tutorialen

MCP-servere kan tilby tre hovedtyper av funksjonalitet:

- **Resources**: Fil-lignende data som kan leses av klienter (som API-responser eller filinnhold)
- **Tools**: Funksjoner som kan kalles av LLM-en
- **Prompts**: Ferdigskrevne maler som hjelper brukere med å utføre spesifikke oppgaver

Denne tutorialen fokuserer på **tools** - den vanligste og kraftigste funksjonaliteten.

## Systemkrav

Du trenger:

- **Node.js 18 eller høyere** - [Last ned fra nodejs.org](https://nodejs.org/)
- **Claude for Desktop** - [Last ned her](https://claude.ai/download) (for testing)

Verifiser Node.js-installasjonen din:

```bash
node --version
npm --version
```

`node --version` bør vise 18.0.0 eller høyere.

## Neste steg

Nå som du forstår det grunnleggende, la oss [sette opp miljøet](/tutorials/basic-mcp-server/oppsett).
