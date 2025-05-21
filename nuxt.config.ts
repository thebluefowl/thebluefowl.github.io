// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ["~/assets/css/tailwind.css"],
  modules: [
    "@nuxt/content",
    "@nuxtjs/tailwindcss",
    "@nuxt/fonts",
    "@nuxt/image",
    "@nuxt/icon",
  ],

  routeRules: {
    "/": { prerender: true },
  },

  content: {
    documentDriven: true,
  },
  nitro: {
    prerender: {
      crawlLinks: true,
    },
    preset: "github",
  },

  fonts: {
    google: {
      families: {
        "Source Sans 4": [300, 400, 700],
        "EB Garamond": [300, 400, 700],
        Arima: [300, 400, 700],
        "Noto Serif Malayalam": [300, 400, 700],
      },
    },
  },

  compatibilityDate: "2024-09-05",
});
