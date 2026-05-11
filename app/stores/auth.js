import { defineStore } from 'pinia'

function getApiBase() {
  return useRuntimeConfig().public.apiBase
}

function apiUrl(path) {
  return `${String(getApiBase()).replace(/\/$/, '')}${path}`
}

function normalizeAuthResponse(response, fallbackRefreshToken = null) {
  const data = response || {}
  return {
    user: data.user || data.profile || null,
    accessToken: data.accessToken || data.access_token || data.token || null,
    refreshToken: data.refreshToken || data.refresh_token || fallbackRefreshToken || null
  }
}

function errorMessage(error, fallback) {
  const data = error?.data
  if (Array.isArray(data)) {
    return data.map((item) => item.message || item.defaultMessage || String(item)).join('\n')
  }
  if (Array.isArray(data?.errors)) {
    return data.errors
      .map((item) => {
        const field = item.field ? `${item.field}: ` : ''
        return `${field}${item.message || item.defaultMessage || item.error || 'Ошибка валидации'}`
      })
      .join('\n')
  }
  if (data?.field && data?.message) return `${data.field}: ${data.message}`
  return data?.message || data?.error || error?.message || fallback
}

function registerBodyFromPayload(payload, email, password, familyName) {
  const source = typeof payload === 'object'
    ? payload
    : { fullName: payload, email, password, familyName }

  return {
    fullName: source.fullName || source.name || '',
    email: source.email || '',
    password: source.password || '',
    familyName: source.familyName || ''
  }
}

function loginBodyFromPayload(payload, password) {
  const source = typeof payload === 'object'
    ? payload
    : { email: payload, password }

  return {
    email: source.email || '',
    password: source.password || ''
  }
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    accessToken: null,
    refreshToken: null,
    isAuthenticated: false,
    loading: false,
    error: ''
  }),

  actions: {
    init() {
      return this.initAuth()
    },

    initAuth() {
      if (!process.client) return

      this.accessToken = localStorage.getItem('veya_access_token')
      this.refreshToken = localStorage.getItem('veya_refresh_token')

      const savedUser = localStorage.getItem('veya_user')
      this.user = savedUser ? JSON.parse(savedUser) : null
      this.isAuthenticated = Boolean(this.accessToken)
    },

    setSession(response) {
      const session = normalizeAuthResponse(response, this.refreshToken)
      this.accessToken = session.accessToken
      this.refreshToken = session.refreshToken
      if (session.user) this.user = session.user
      this.isAuthenticated = Boolean(this.accessToken)
      this.error = ''

      if (process.client) {
        if (this.accessToken) localStorage.setItem('veya_access_token', this.accessToken)
        if (this.refreshToken) localStorage.setItem('veya_refresh_token', this.refreshToken)
        if (this.user) localStorage.setItem('veya_user', JSON.stringify(this.user))
      }
    },

    async register(payload, email, password, familyName) {
      const body = registerBodyFromPayload(payload, email, password, familyName)

      this.loading = true
      this.error = ''
      try {
        const response = await $fetch(apiUrl('/api/auth/register'), {
          method: 'POST',
          body
        })
        this.setSession(response)
        return { ok: true, data: response }
      } catch (error) {
        this.error = errorMessage(error, 'Не удалось зарегистрироваться')
        return { ok: false, error: this.error }
      } finally {
        this.loading = false
      }
    },

    async login(payload, password) {
      const body = loginBodyFromPayload(payload, password)

      this.loading = true
      this.error = ''
      try {
        const response = await $fetch(apiUrl('/api/auth/login'), {
          method: 'POST',
          body
        })
        this.setSession(response)
        return { ok: true, data: response }
      } catch (error) {
        this.error = errorMessage(error, 'Неверный email или пароль')
        return { ok: false, error: this.error }
      } finally {
        this.loading = false
      }
    },

    async refresh() {
      const token = this.refreshToken || (process.client ? localStorage.getItem('veya_refresh_token') : null)
      if (!token) throw new Error('No refresh token')

      const response = await $fetch(apiUrl('/api/auth/refresh'), {
        method: 'POST',
        body: { refreshToken: token }
      })
      this.setSession(response)
      return this.accessToken
    },

    async fetchMe() {
      const { apiGet } = useApi()
      this.loading = true
      this.error = ''
      try {
        const user = await apiGet('/api/auth/me')
        this.user = user
        this.isAuthenticated = Boolean(this.accessToken)
        if (process.client) localStorage.setItem('veya_user', JSON.stringify(user))
        return user
      } catch (error) {
        this.error = errorMessage(error, 'Не удалось загрузить профиль')
        throw error
      } finally {
        this.loading = false
      }
    },

    async logout() {
      const token = this.refreshToken
      try {
        if (token) {
          await $fetch(apiUrl('/api/auth/logout'), {
            method: 'POST',
            body: { refreshToken: token },
            headers: this.accessToken ? { Authorization: `Bearer ${this.accessToken}` } : {}
          })
        }
      } catch (_) {
        // Local logout must still complete when backend logout is unavailable.
      }

      this.user = null
      this.accessToken = null
      this.refreshToken = null
      this.isAuthenticated = false
      this.error = ''

      if (process.client) {
        localStorage.removeItem('veya_access_token')
        localStorage.removeItem('veya_refresh_token')
        localStorage.removeItem('veya_user')
      }
    }
  }
})
