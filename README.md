# Tutorial Site

A VitePress-based tutorial site with copy-paste code snippets.

## Features

- Clean, responsive design
- Built-in code syntax highlighting
- One-click copy buttons on all code blocks
- Search functionality
- Mobile-friendly navigation
- Dark/light mode support

## Getting Started

### Install Dependencies

```bash
npm install
```

### Development Server

Start the development server with hot-reload:

```bash
npm run docs:dev
```

The site will be available at `http://localhost:5173`

### Build for Production

Build the static site:

```bash
npm run docs:build
```

The built files will be in `docs/.vitepress/dist`

### Preview Production Build

Preview the production build locally:

```bash
npm run docs:preview
```

## Project Structure

```
tutorial/
├── docs/
│   ├── .vitepress/
│   │   └── config.js          # VitePress configuration
│   ├── guide/
│   │   ├── getting-started.md # Getting started guide
│   │   ├── installation.md    # Installation instructions
│   │   └── configuration.md   # Configuration guide
│   ├── examples/
│   │   ├── index.md           # Basic examples
│   │   └── advanced.md        # Advanced examples
│   └── index.md               # Homepage
├── package.json
└── README.md
```

## Writing Content

### Adding New Pages

1. Create a new `.md` file in the appropriate directory under `docs/`
2. Add the page to the sidebar configuration in `docs/.vitepress/config.js`

### Code Snippets

VitePress automatically adds copy buttons to code blocks. Just use standard markdown code fences:

\`\`\`javascript
function example() {
  console.log('This code will have a copy button!');
}
\`\`\`

### Supported Features

- Syntax highlighting for many languages
- Line numbers (enabled by default)
- Line highlighting
- Custom containers (tip, warning, danger, info)

Example custom container:

```markdown
::: tip
This is a helpful tip!
:::

::: warning
This is a warning message.
:::
```

## Customization

Edit `docs/.vitepress/config.js` to customize:
- Site title and description
- Navigation menu
- Sidebar structure
- Theme colors
- Social links

## Learn More

- [VitePress Documentation](https://vitepress.dev/)
- [Markdown Extensions](https://vitepress.dev/guide/markdown)
- [Theme Configuration](https://vitepress.dev/reference/default-theme-config)
