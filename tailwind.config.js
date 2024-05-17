/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './components/**/*.{vue,js}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
    './content/**/*.md'
  ],
  theme: {
    extend: {
      fontFamily: {
        'serif':'Lora',
        'mal':'Noto Serif Malayalam'
      },
    },
  },
  plugins: [],
}

