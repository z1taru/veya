import { useAuthStore } from '~/stores/auth'

function joinUrl(base, path) {
  const cleanBase = String(base || '').replace(/\/$/, '')
  const cleanPath = String(path || '').startsWith('/') ? path : `/${path}`
  return `${cleanBase}${cleanPath}`
}

function getStoredAccessToken() {
  if (!process.client) return null
  return localStorage.getItem('veya_access_token')
}

function getStoredRefreshToken() {
  if (!process.client) return null
  return localStorage.getItem('veya_refresh_token')
}

function getErrorStatus(error) {
  return error?.response?.status || error?.statusCode || error?.status
}

export function useApi() {
  const config = useRuntimeConfig()
  const apiBase = config.public.apiBase
  const auth = useAuthStore()

  async function refreshAccessToken() {
    const refreshToken = auth.refreshToken || getStoredRefreshToken()
    if (!refreshToken) throw new Error('No refresh token')

    const response = await $fetch(joinUrl(apiBase, '/api/auth/refresh'), {
      method: 'POST',
      body: { refreshToken }
    })

    auth.setSession(response)
    return auth.accessToken
  }

  async function request(path, options = {}, retry = true) {
    const token = auth.accessToken || getStoredAccessToken()
    const headers = {
      ...(options.headers || {})
    }

    if (token) {
      headers.Authorization = `Bearer ${token}`
    }

    try {
      return await $fetch(joinUrl(apiBase, path), {
        ...options,
        headers
      })
    } catch (error) {
      if (getErrorStatus(error) === 401 && retry) {
        try {
          await refreshAccessToken()
          return await request(path, options, false)
        } catch (refreshError) {
          auth.logout()
          if (process.client) {
            await navigateTo('/login')
          }
          throw refreshError
        }
      }
      throw error
    }
  }

  return {
    apiGet: (path, options = {}) => request(path, { ...options, method: 'GET' }),
    apiPost: (path, body, options = {}) => request(path, { ...options, method: 'POST', body }),
    apiPatch: (path, body, options = {}) => request(path, { ...options, method: 'PATCH', body }),
    apiDelete: (path, options = {}) => request(path, { ...options, method: 'DELETE' })
  }
}
