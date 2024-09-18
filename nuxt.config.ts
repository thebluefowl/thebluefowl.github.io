// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: [
    '@nuxt/content',
    '@nuxtjs/tailwindcss',
    '@nuxt/fonts',
    '@nuxt/image',
    '@nuxt/icon'
  ],

  routeRules: {
    '/': { prerender: true }
  },

  content: {
    documentDriven: true
  },

  fonts: {
    google: {
      families: {
        'Source Sans 4': [300, 400, 700],
        'EB Garamond': [300, 400, 700]
      }
    }
  },

  compatibilityDate: '2024-09-05'
})