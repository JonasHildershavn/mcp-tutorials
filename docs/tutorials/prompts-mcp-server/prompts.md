# Bygg Prompts-modulen

Vi separerer ansvarsområder ved å legge prompt-definisjonene i en egen fil.

Copy paste følgende innhold inn i `src/prompts.ts`:

```typescript
export interface PromptDefinition {
  name: string;
  description: string;
  arguments?: Array<{
    name: string;
    description: string;
    required: boolean;
  }>;
  generateMessages: (args: Record<string, string>) => Array<{
    role: "user" | "assistant";
    content: { type: "text"; text: string };
  }>;
}

export const prompts: PromptDefinition[] = [
  {
    name: "code-review",
    description: "Generate a comprehensive code review for a file or code snippet",
    arguments: [
      {
        name: "code",
        description: "The code to review",
        required: true,
      },
      {
        name: "language",
        description: "Programming language (e.g., typescript, python, java)",
        required: false,
      },
    ],
    generateMessages: (args) => {
      const language = args.language || "the code";
      return [
        {
          role: "user",
          content: {
            type: "text",
            text: `Please perform a thorough code review of the following ${language} code:

\`\`\`${args.language || ""}
${args.code}
\`\`\`

Focus on:
1. Code quality and readability
2. Potential bugs or edge cases
3. Performance considerations
4. Security vulnerabilities
5. Best practices and design patterns
6. Suggestions for improvement

Provide specific, actionable feedback.`,
          },
        },
      ];
    },
  },
  {
    name: "documentation-writer",
    description: "Generate documentation for code",
    arguments: [
      {
        name: "code",
        description: "The code to document",
        required: true,
      },
      {
        name: "style",
        description: "Documentation style (jsdoc, markdown, restructuredtext)",
        required: false,
      },
    ],
    generateMessages: (args) => {
      const style = args.style || "appropriate format";
      return [
        {
          role: "user",
          content: {
            type: "text",
            text: `Please write comprehensive documentation for the following code in ${style}:

\`\`\`
${args.code}
\`\`\`

Include:
1. Overview/summary of what the code does
2. Parameter descriptions with types
3. Return value description
4. Usage examples
5. Any important notes or caveats
6. Related functions or dependencies if applicable`,
          },
        },
      ];
    },
  },
  {
    name: "bug-analysis",
    description: "Analyze a bug report and suggest solutions",
    arguments: [
      {
        name: "description",
        description: "Description of the bug",
        required: true,
      },
      {
        name: "code",
        description: "Relevant code snippet (optional)",
        required: false,
      },
      {
        name: "error",
        description: "Error message or stack trace (optional)",
        required: false,
      },
    ],
    generateMessages: (args) => {
      let prompt = `I need help analyzing and fixing a bug:\n\n**Bug Description:**\n${args.description}`;

      if (args.error) {
        prompt += `\n\n**Error Message:**\n\`\`\`\n${args.error}\n\`\`\``;
      }

      if (args.code) {
        prompt += `\n\n**Relevant Code:**\n\`\`\`\n${args.code}\n\`\`\``;
      }

      prompt += `\n\nPlease provide:
1. Root cause analysis
2. Step-by-step debugging approach
3. Potential fixes with code examples
4. Prevention strategies to avoid similar bugs
5. Testing recommendations`;

      return [
        {
          role: "user",
          content: { type: "text", text: prompt },
        },
      ];
    },
  },
  {
    name: "refactoring-guide",
    description: "Get suggestions for refactoring code",
    arguments: [
      {
        name: "code",
        description: "The code to refactor",
        required: true,
      },
      {
        name: "goal",
        description: "Refactoring goal (e.g., improve readability, reduce complexity, enhance performance)",
        required: false,
      },
    ],
    generateMessages: (args) => {
      const goal = args.goal || "improve code quality";
      return [
        {
          role: "user",
          content: {
            type: "text",
            text: `I want to refactor the following code to ${goal}:

\`\`\`
${args.code}
\`\`\`

Please provide:
1. Analysis of current code structure and issues
2. Specific refactoring recommendations
3. Refactored code examples
4. Explanation of improvements
5. Trade-offs or considerations
6. Testing strategy for the refactored code`,
          },
        },
      ];
    },
  },
];
```

## Hvordan Prompts-modulen fungerer

### Prompt-struktur

Hver prompt har:

1. **`name`** - Unik identifikator for prompten
2. **`description`** - Forklaring av hva prompten gjør
3. **`arguments`** - Liste over argumenter prompten kan motta (valgfritt)
4. **`generateMessages`** - Funksjon som genererer meldingene basert på argumenter

### Argumenter

Argumenter lar brukere tilpasse prompts:

- **`name`** - Argumentets navn
- **`description`** - Hjelper brukere forstå hva argumentet er for
- **`required`** - Om argumentet må oppgis

### Meldingsgenerering

`generateMessages`-funksjonen bygger opp prompt-teksten dynamisk basert på argumentene brukeren oppgir. Dette gir fleksibilitet og gjenbrukbarhet.

## De fire promptene

1. **Code Review** - Systematisk kodegjennomgang med fokus på kvalitet, sikkerhet og beste praksis
2. **Documentation Writer** - Genererer omfattende dokumentasjon i ønsket format
3. **Bug Analysis** - Hjelper med å analysere og løse bugs metodisk
4. **Refactoring Guide** - Gir veiledning for forbedring av eksisterende kode

## Neste steg

Nå som vi har prompt-definisjonene klare, la oss [bygge MCP-serveren](/tutorials/prompts-mcp-server/mcp-server).
