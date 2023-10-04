import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  modules: [
    '@nuxtjs/google-fonts',
    '@nuxthq/ui',
    '@nuxtjs/supabase',
  ],
  googleFonts: {
    families: {
      'Roboto': true,
      'Nunito': [500],
      'Raleway': [400, 500, 600, 700],
      'Montserrat': [400, 500, 600, 700],
      'Open Sans': [400, 500, 600, 700],
    },
  },
  // pwa: {
  //   registerType: "autoUpdate",
  //   manifest: {
  //     name: "Nuxt Vite PWA",
  //     short_name: "NuxtVitePWA",
  //     theme_color: "#ffffff",
  //     icons: [
  //       {
  //         src: "pwa-192x192.png",
  //         sizes: "192x192",
  //         type: "image/png",
  //       },
  //       {
  //         src: "pwa-512x512.png",
  //         sizes: "512x512",
  //         type: "image/png",
  //       },
  //       {
  //         src: "pwa-512x512.png",
  //         sizes: "512x512",
  //         type: "image/png",
  //         purpose: "any maskable",
  //       },
  //     ],
  //   },
  //   workbox: {
  //     navigateFallback: "/",
  //     globPatterns: ["**/*.{js,css,html,png,svg,ico}"],
  //   },
  //   client: {
  //     installPrompt: true,
  //     // you don't need to include this: only for testing purposes
  //     // if enabling periodic sync for update use 1 hour or so (periodicSyncForUpdates: 3600)
  //     periodicSyncForUpdates: 20,
  //   },
  //   devOptions: {
  //     enabled: true,
  //     type: "module",
  //   },
  // },
})
