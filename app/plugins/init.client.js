// plugins/init.client.js
export default defineNuxtPlugin(() => {
  const auth = useAuthStore()
  const waitlist = useWaitlistStore()

  auth.initAuth()
  waitlist.init()
})
