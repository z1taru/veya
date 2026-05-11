// middleware/auth.js
export default defineNuxtRouteMiddleware((to) => {
  if (!process.client) return
  const auth = useAuthStore()
  if (!auth.accessToken) auth.initAuth()
  const token = auth.accessToken || localStorage.getItem('veya_access_token')
  if (!token) return navigateTo('/login')
})
