import { defineConfig } from "vitepress";

export default defineConfig({
  title: "MCP Tutorials",
  description: "Lær å bygge MCP-servere med steg-for-steg tutorials",
  lang: "nb-NO",

  themeConfig: {
    nav: [
      { text: "Hjem", link: "/" },
      {
        text: "Tutorials",
        items: [
          {
            text: "MCP Tools Server",
            link: "/tutorials/basic-mcp-server/introduksjon",
          },
          {
            text: "MCP Prompts Server",
            link: "/tutorials/prompts-mcp-server/introduksjon",
          },
          {
            text: "MCP Client",
            link: "/tutorials/basic-mcp-client/introduksjon",
          },
        ],
      },
    ],

    sidebar: {
      "/tutorials/basic-mcp-server/": [
        {
          text: "En basic MCP-server",
          items: [
            {
              text: "Introduksjon",
              link: "/tutorials/basic-mcp-server/introduksjon",
            },
            { text: "Oppsett", link: "/tutorials/basic-mcp-server/oppsett" },
            {
              text: "Weather API-modul",
              link: "/tutorials/basic-mcp-server/weather-api",
            },
            {
              text: "MCP-server",
              link: "/tutorials/basic-mcp-server/mcp-server",
            },
            { text: "Testing", link: "/tutorials/basic-mcp-server/testing" },
          ],
        },
      ],
      "/tutorials/prompts-mcp-server/": [
        {
          text: "MCP-server med Prompts",
          items: [
            {
              text: "Introduksjon",
              link: "/tutorials/prompts-mcp-server/introduksjon",
            },
            { text: "Oppsett", link: "/tutorials/prompts-mcp-server/oppsett" },
            {
              text: "Prompts-modul",
              link: "/tutorials/prompts-mcp-server/prompts",
            },
            {
              text: "MCP-server",
              link: "/tutorials/prompts-mcp-server/mcp-server",
            },
            { text: "Testing", link: "/tutorials/prompts-mcp-server/testing" },
          ],
        },
      ],
      "/tutorials/basic-mcp-client/": [
        {
          text: "Bygg en MCP-klient",
          items: [
            {
              text: "Introduksjon",
              link: "/tutorials/basic-mcp-client/introduksjon",
            },
            {
              text: "Oppsett prosjekt",
              link: "/tutorials/basic-mcp-client/oppsett",
            },
            {
              text: "Lag en klient",
              link: "/tutorials/basic-mcp-client/client",
            },
            {
              text: "Koble til server",
              link: "/tutorials/basic-mcp-client/koble-til-server",
            },
            { text: "Testing", link: "/tutorials/basic-mcp-client/testing" },
          ],
        },
      ],
    },

    socialLinks: [{ icon: "github", link: "https://github.com" }],

    // Norske labels
    outline: {
      label: "På denne siden",
    },

    docFooter: {
      prev: "Forrige",
      next: "Neste",
    },

    darkModeSwitchLabel: "Utseende",
    sidebarMenuLabel: "Meny",
    returnToTopLabel: "Tilbake til toppen",

    // Enable code copy button and line numbers
    markdown: {
      lineNumbers: true,
    },
  },
});
