// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ["~/assets/css/tailwind.css"],

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
            "Vishnu Jayadevan - Software engineer based in Bangalore, India. Writing about software engineering, distributed systems, and more.",
        },
        { property: "og:site_name", content: "Vishnu Jayadevan" },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary" },
        { name: "twitter:creator", content: "@vishnujayadevan" },
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
    documentDriven: true,
  },
  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ["/rss.xml"],
    },
    preset: process.env.NODE_ENV === "production" ? "github" : undefined,
  },

  fonts: {
    google: {
      families: {
        "EB Garamond": [300, 400, 700],
        "Noto Serif Malayalam": [300, 400, 700],
        "IBM Plex Sans": [300, 400, 500, 600, 700],
      },
    },
  },

  compatibilityDate: "2024-09-05",
});
