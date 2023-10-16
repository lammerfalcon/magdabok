import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  modules: [
    '@nuxthq/ui',
    '@nuxtjs/supabase',
    '@nuxt/image',
  ],
  image: {
    domains: ['https://acchwamgjumnepffinxd.supabase.co'],
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
      viewport: 'width=device-width, initial-scale=1',
    },
  },
})
