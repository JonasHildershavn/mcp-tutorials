# Bygg en MCP-server som serverer prompts

## Hva vi skal bygge

Vi skal bygge en MCP-server som tilbyr ferdigskrevne prompt-maler for vanlige utviklingsoppgaver. Serveren vil inkludere prompts for:

- **Code Review** - Mal for grundig kodegjennomgang
- **Documentation Writer** - Mal for å skrive dokumentasjon
- **Bug Analysis** - Mal for systematisk feilanalyse
- **Refactoring Guide** - Mal for refaktorering av kode

## Hva er prompts i MCP?

Prompts er en av tre hovedfunksjonaliteter i MCP-servere:

- **Resources**: Fil-lignende data som kan leses av klienter
- **Tools**: Funksjoner som kan kalles av LLM-en
- **Prompts**: Ferdigskrevne maler som hjelper brukere med å utføre spesifikke oppgaver

Prompts er nyttige når du har standardiserte arbeidsflyter eller oppgaver som ofte gjentas. I stedet for å skrive den samme detaljerte instruksjonen hver gang, kan du tilby en prompt som automatisk setter opp konteksten og instruksjonene.

## Hvorfor bruke prompts?

Prompts gir flere fordeler:

1. **Konsistens** - Sikrer at samme type oppgave utføres på samme måte hver gang
2. **Effektivitet** - Sparer tid ved å gjenbruke velformulerte instruksjoner
3. **Beste praksis** - Kan inneholde domene-spesifikk kunnskap og retningslinjer
4. **Kontekst** - Kan inkludere relevante ressurser eller data dynamisk

## MCP-konsepter som demonstreres i denne tutorialen

Denne tutorialen fokuserer på **prompts** og viser:

- Hvordan definere prompt-maler med argumenter
- Hvordan inkludere dynamisk innhold i prompts
- Hvordan strukturere prompts for ulike use cases
- Hvordan teste prompts med Claude for Desktop

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

Nå som du forstår det grunnleggende om prompts, la oss [sette opp miljøet](/tutorials/prompts-mcp-server/oppsett).
