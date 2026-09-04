export default defineNuxtConfig({
  compatibilityDate: '2026-04-29',

  modules: ['@pinia/nuxt'],

  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || 'http://localhost:8080'
    }
  },

  css: ['~/assets/css/main.css'],

  app: {
    head: {
      title: 'Veya — Family Life OS',
      link: [
        {
          rel: 'preconnect',
          href: 'https://fonts.googleapis.com'
        },
        {
          rel: 'preconnect',
          href: 'https://fonts.gstatic.com',
          crossorigin: ''
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@700;800&family=Inter:ital,wght@0,300;0,400;0,500;0,600;1,300&display=swap'
        }
      ],
      meta: [
        {
          name: 'description',
          content: 'Veya — семейная AI-сеть для задач, напоминаний, покупок и заботы о близких.'
        }
      ]
    }
  },

  devtools: { enabled: true }
})
