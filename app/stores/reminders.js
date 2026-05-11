import { defineStore } from 'pinia'

function errorMessage(error, fallback) {
  return error?.data?.message || error?.data?.error || error?.message || fallback
}

function normalizeList(response) {
  if (Array.isArray(response)) return response
  return response?.items || response?.content || response?.data || []
}

function toQuery(filters = {}) {
  const params = new URLSearchParams()
  Object.entries(filters || {}).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') params.set(key, value)
  })
  const query = params.toString()
  return query ? `?${query}` : ''
}

export const useRemindersStore = defineStore('reminders', {
  state: () => ({
    reminders: [],
    selectedReminder: null,
    loading: false,
    error: ''
  }),

  actions: {
    async fetchReminders(filters = {}) {
      const { apiGet } = useApi()
      this.loading = true
      this.error = ''
      try {
        const response = await apiGet(`/api/reminders${toQuery(filters)}`)
        this.reminders = normalizeList(response)
        return this.reminders
      } catch (error) {
        this.error = errorMessage(error, 'Не удалось загрузить напоминания')
        throw error
      } finally {
        this.loading = false
      }
    },

    async fetchReminder(id) {
      const { apiGet } = useApi()
      this.loading = true
      this.error = ''
      try {
        this.selectedReminder = await apiGet(`/api/reminders/${id}`)
        return this.selectedReminder
      } catch (error) {
        this.error = errorMessage(error, 'Не удалось загрузить напоминание')
        throw error
      } finally {
        this.loading = false
      }
    },

    async createReminder(payload) {
      const { apiPost } = useApi()
      this.loading = true
      this.error = ''
      try {
        const reminder = await apiPost('/api/reminders', payload)
        this.reminders.unshift(reminder)
        return reminder
      } catch (error) {
        this.error = errorMessage(error, 'Не удалось создать напоминание')
        throw error
      } finally {
        this.loading = false
      }
    },

    async updateReminder(id, payload) {
      const { apiPatch } = useApi()
      this.loading = true
      this.error = ''
      try {
        const reminder = await apiPatch(`/api/reminders/${id}`, payload)
        this.upsertReminder(reminder)
        return reminder
      } catch (error) {
        this.error = errorMessage(error, 'Не удалось обновить напоминание')
        throw error
      } finally {
        this.loading = false
      }
    },

    async deleteReminder(id) {
      const { apiDelete } = useApi()
      this.loading = true
      this.error = ''
      try {
        await apiDelete(`/api/reminders/${id}`)
        this.reminders = this.reminders.filter((reminder) => reminder.id !== id)
      } catch (error) {
        this.error = errorMessage(error, 'Не удалось удалить напоминание')
        throw error
      } finally {
        this.loading = false
      }
    },

    upsertReminder(reminder) {
      const index = this.reminders.findIndex((item) => item.id === reminder.id)
      if (index === -1) this.reminders.unshift(reminder)
      else this.reminders[index] = reminder
    }
  }
})
