import { defineStore } from 'pinia'

function errorMessage(error, fallback) {
  return error?.data?.message || error?.data?.error || error?.message || fallback
}

function normalizeList(response) {
  if (Array.isArray(response)) return response
  return response?.items || response?.content || response?.data || []
}

export const useNotificationsStore = defineStore('notifications', {
  state: () => ({
    notifications: [],
    loading: false,
    error: ''
  }),

  getters: {
    unreadCount: (state) => state.notifications.filter((item) => !item.read).length
  },

  actions: {
    async fetchNotifications() {
      const { apiGet } = useApi()
      this.loading = true
      this.error = ''
      try {
        const response = await apiGet('/api/notifications')
        this.notifications = normalizeList(response)
        return this.notifications
      } catch (error) {
        this.error = errorMessage(error, 'Не удалось загрузить уведомления')
        throw error
      } finally {
        this.loading = false
      }
    },

    async markRead(id) {
      const { apiPatch } = useApi()
      this.error = ''
      try {
        const notification = await apiPatch(`/api/notifications/${id}/read`, {})
        const index = this.notifications.findIndex((item) => item.id === id)
        if (index !== -1) this.notifications[index] = notification
        return notification
      } catch (error) {
        this.error = errorMessage(error, 'Не удалось отметить уведомление')
        throw error
      }
    },

    async markAllRead() {
      const { apiPatch } = useApi()
      this.error = ''
      try {
        await apiPatch('/api/notifications/read-all', {})
        this.notifications = this.notifications.map((item) => ({ ...item, read: true }))
      } catch (error) {
        this.error = errorMessage(error, 'Не удалось отметить уведомления')
        throw error
      }
    }
  }
})
