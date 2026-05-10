// stores/auth.js
import { defineStore } from 'pinia'
import { DEMO_USER } from '~/data/mockData'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    isAuthenticated: false
  }),

  actions: {
    init() {
      if (!process.client) return
      const saved = localStorage.getItem('veya_user')
      if (saved) {
        this.user = JSON.parse(saved)
        this.isAuthenticated = true
      }
    },

    async login(email, password) {
      await delay(600)
      // accept demo creds OR any email+password combo for easy testing
      if (
        (email === DEMO_USER.email && password === DEMO_USER.password) ||
        (email && password && password.length >= 4)
      ) {
        const u = email === DEMO_USER.email ? DEMO_USER : {
          id: 'u_' + Date.now(),
          name: email.split('@')[0],
          email,
          role: 'owner',
          avatar: null
        }
        this.user = u
        this.isAuthenticated = true
        localStorage.setItem('veya_user', JSON.stringify(u))
        return { ok: true }
      }
      return { ok: false, error: 'Неверный email или пароль' }
    },

    async register(name, email, password) {
      await delay(700)
      if (!name || !email || !password) return { ok: false, error: 'Заполните все поля' }
      const u = { id: 'u_' + Date.now(), name, email, role: 'owner', avatar: null }
      this.user = u
      this.isAuthenticated = true
      localStorage.setItem('veya_user', JSON.stringify(u))
      return { ok: true }
    },

    logout() {
      this.user = null
      this.isAuthenticated = false
      localStorage.removeItem('veya_user')
    }
  }
})

function delay(ms) { return new Promise(r => setTimeout(r, ms)) }