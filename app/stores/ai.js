import { defineStore } from 'pinia'

function errorMessage(error, fallback) {
  return error?.data?.message || error?.data?.error || error?.message || fallback
}

export const useAiStore = defineStore('ai', {
  state: () => ({
    command: null,
    created: null,
    loading: false,
    error: ''
  }),

  actions: {
    async parseCommand(rawText) {
      const { apiPost } = useApi()
      this.loading = true
      this.error = ''
      try {
        this.command = await apiPost('/api/ai/parse', { rawText })
        return this.command
      } catch (error) {
        this.error = errorMessage(error, 'Не удалось разобрать команду')
        throw error
      } finally {
        this.loading = false
      }
    },

    async createFromCommand(commandId) {
      const { apiPost } = useApi()
      this.loading = true
      this.error = ''
      try {
        this.created = await apiPost(`/api/ai/commands/${commandId}/create`, {})
        return this.created
      } catch (error) {
        this.error = errorMessage(error, 'Не удалось создать из команды')
        throw error
      } finally {
        this.loading = false
      }
    }
  }
})
