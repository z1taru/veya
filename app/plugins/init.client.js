// plugins/init.client.js
export default defineNuxtPlugin(() => {
  const auth = useAuthStore()
  const family = useFamilyStore()
  const tasks = useTasksStore()
  const shopping = useShoppingStore()
  const waitlist = useWaitlistStore()

  auth.init()
  family.init()
  tasks.init()
  shopping.init()
  waitlist.init()
})