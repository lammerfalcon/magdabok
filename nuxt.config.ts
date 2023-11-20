import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  modules: [
    '@nuxthq/ui',
    '@nuxtjs/supabase',
    '@nuxt/image',
    '@nuxtjs/google-fonts',

  ],
  // image: {
  //   domains: ['https://acchwamgjumnepffinxd.supabase.co'],
  // },
  colorMode: {
    preference: 'light'
  },
  googleFonts: {
    families: {
      Inter: [400],
      Everett: [600],
    },
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
      cssnano:
          process.env.NODE_ENV === 'production'
              ? { preset: ['default', { discardComments: { removeAll: true } }] }
              : false, // disable cssnano when not in production
    },
  },
  vite: {
    vue: {
      script: {
        defineModel: true,
        propsDestructure: true,
      },
    },
  },
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
    },
  },
})
