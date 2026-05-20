// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ["~/assets/css/tailwind.css", "katex/dist/katex.min.css"],

  app: {
    head: {
      htmlAttrs: { lang: "en" },
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { name: "author", content: "Vishnu Jayadevan" },
        {
          name: "description",
          content:
            "Vishnu Jayadevan. Software engineer in Bangalore, India. Writing about distributed systems and software architecture, with occasional detours through aquariums and slow trains.",
        },
        { property: "og:site_name", content: "Vishnu Jayadevan" },
        { property: "og:type", content: "website" },
        { property: "og:image", content: "https://vishnujayadevan.com/og.png" },
        { property: "og:image:width", content: "1200" },
        { property: "og:image:height", content: "630" },
        { property: "og:image:alt", content: "Vishnu Jayadevan — vishnujayadevan.com" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:creator", content: "@thebluefowl" },
        { name: "twitter:image", content: "https://vishnujayadevan.com/og.png" },
      ],
      link: [
        { rel: "canonical", href: "https://vishnujayadevan.com" },
        {
          rel: "alternate",
          type: "application/rss+xml",
          title: "Vishnu Jayadevan",
          href: "https://vishnujayadevan.com/rss.xml",
        },
      ],
    },
  },

  modules: [
    "@nuxt/content",
    "@nuxtjs/tailwindcss",
    "@nuxt/fonts",
    "@nuxt/image",
    "@nuxt/icon",
  ],
  icon: {
    clientBundle: {
      scan: true,
    },
  },
  routeRules: {
    "/": { prerender: true },
  },

  content: {
    documentDriven: false,
    markdown: {
      remarkPlugins: ["remark-math"],
      rehypePlugins: ["rehype-katex"],
    },
    highlight: {
      theme: "min-light",
      preload: [
        "go",
        "python",
        "typescript",
        "javascript",
        "bash",
        "shell",
        "json",
        "yaml",
        "rust",
        "sql",
        "html",
        "css",
        "vue",
        "diff",
      ],
    },
  },
  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ["/rss.xml"],
    },
    preset: process.env.NODE_ENV === "production" ? "github" : undefined,
  },

  fonts: {
    families: [
      { name: "EB Garamond", provider: "google", weights: [400, 500, 700], styles: ["normal", "italic"], preload: true },
      { name: "Noto Serif Malayalam", provider: "google", weights: [400, 700], styles: ["normal"], preload: false },
      { name: "IBM Plex Sans", provider: "google", weights: [500], styles: ["normal"], preload: false },
    ],
  },

  compatibilityDate: "2024-09-05",
});
