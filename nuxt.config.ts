// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@nuxt/content',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/google-fonts',
    '@nuxt/image',
  ],
  css: [
    '~/assets/css/tailwind.css'
  ],
  components: {
    dirs: [
      '~/components/content',
      '~/components'
    ],
  },
  googleFonts: {
    families: {
      'Lora':true,
      'Noto Serif Malayalam':true,
    },
  },
  content:{
    highlight: {
      theme: 'github-light'
    },
  }
})