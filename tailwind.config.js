/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue"
  ],
  theme: {
    extend: {
      fontFamily: {
        'garamond' : ['"EB Garamond"', 'serif'],
        'malayalam': ['"Noto Serif Malayalam"', 'sans-serif'],
        'plex': ['"IBM Plex Sans"', 'sans-serif'],
      },
      keyframes: {
        fadeIn: {
          'from': { opacity: '0', transform: 'translateY(10px)' },
          'to': { opacity: '1', transform: 'translateY(0)' }
        }
      },
      animation: {
        'fade-in': 'fadeIn 1s ease-out forwards',
        'fade-in-delayed': 'fadeIn 1s ease-out 0.3s forwards'
      },
      textShadow: {
        'subtle': '1px 1px 0 rgba(0, 0, 0, 0.1)'
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    function({ addUtilities }) {
      const newUtilities = {
        '.text-shadow-subtle': {
          'text-shadow': '1px 1px 0 rgba(0, 0, 0, 0.1)'
        }
      }
      addUtilities(newUtilities)
    }
  ],
}

