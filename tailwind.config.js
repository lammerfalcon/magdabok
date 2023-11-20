/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './components/**/*.{js,vue,ts}',
    './constants/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
    './app.vue',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        everett: ['Everett', 'sans-serif'],
      },
      colors: {
        asparagus: {
          50: '#f5f6ef',
          100: '#e7ebdc',
          200: '#d2d9bd',
          300: '#b5c195',
          400: '#99a972',
          500: '#8c9f5f',
          600: '#616f41',
          700: '#4b5734',
          800: '#3f472d',
          900: '#363d2a',
          950: '#1b2013',
        },

      },
    },
  },
  plugins: [],
}
