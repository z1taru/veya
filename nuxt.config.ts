export default defineNuxtConfig({
  compatibilityDate: '2026-04-29',

  modules: [
    '@pinia/nuxt'
  ],

  css: [
    '~/assets/css/main.css'
  ],

  app: {
    head: {
      title: 'Veya — Family Life OS',
      meta: [
        {
          name: 'description',
          content: 'Veya — семейная AI-сеть для задач, напоминаний, покупок и заботы о близких.'
        }
      ]
    }
  },

  devtools: {
    enabled: true
  }
})