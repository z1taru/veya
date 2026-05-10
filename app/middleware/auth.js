// middleware/auth.js
export default defineNuxtRouteMiddleware((to) => {
  if (!process.client) return
  const user = localStorage.getItem('veya_user')
  if (!user) return navigateTo('/login')
})