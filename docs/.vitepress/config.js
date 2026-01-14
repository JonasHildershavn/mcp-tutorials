import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'MCP Tutorials',
  description: 'Lær å bygge MCP-servere med steg-for-steg tutorials',
  lang: 'nb-NO',

  themeConfig: {
    nav: [
      { text: 'Hjem', link: '/' },
      { text: 'Tutorials', link: '/tutorials/basic-mcp-server/introduksjon' }
    ],

    sidebar: {
      '/tutorials/basic-mcp-server/': [
        {
          text: 'En basic MCP-server',
          items: [
            { text: 'Introduksjon', link: '/tutorials/basic-mcp-server/introduksjon' },
            { text: 'Oppsett', link: '/tutorials/basic-mcp-server/oppsett' },
            { text: 'Weather API-modul', link: '/tutorials/basic-mcp-server/weather-api' },
            { text: 'MCP-server', link: '/tutorials/basic-mcp-server/mcp-server' },
            { text: 'Testing', link: '/tutorials/basic-mcp-server/testing' }
          ]
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com' }
    ],

    // Norske labels
    outline: {
      label: 'På denne siden'
    },

    docFooter: {
      prev: 'Forrige',
      next: 'Neste'
    },

    darkModeSwitchLabel: 'Utseende',
    sidebarMenuLabel: 'Meny',
    returnToTopLabel: 'Tilbake til toppen',

    // Enable code copy button and line numbers
    markdown: {
      lineNumbers: true
    }
  }
})
