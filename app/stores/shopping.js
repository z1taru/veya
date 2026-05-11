import { defineStore } from 'pinia'

function errorMessage(error, fallback) {
  return error?.data?.message || error?.data?.error || error?.message || fallback
}

function normalizeList(response) {
  const items = Array.isArray(response)
    ? response
    : response?.items || response?.content || response?.data || []
  return items.map((item) => ({
    ...item,
    done: item.done ?? item.completed ?? false
  }))
}

function toQuery(filter) {
  if (!filter) return ''
  const params = new URLSearchParams()
  if (typeof filter === 'string') params.set('filter', filter)
  else Object.entries(filter).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') params.set(key, value)
  })
  const query = params.toString()
  return query ? `?${query}` : ''
}

export const useShoppingStore = defineStore('shopping', {
  state: () => ({
    items: [],
    loading: false,
    error: ''
  }),

  getters: {
    total: (state) => state.items.length,
    done: (state) => state.items.filter((item) => item.done || item.completed).length,
    remaining: (state) => state.items.filter((item) => !(item.done || item.completed)).length,
    progress: (state) => {
      if (!state.items.length) return 0
      const done = state.items.filter((item) => item.done || item.completed).length
      return Math.round((done / state.items.length) * 100)
    }
  },

  actions: {
    async init() {
      if (useAuthStore().isAuthenticated) {
        await this.fetchItems()
      }
    },

    async fetchItems(filter = null) {
      const { apiGet } = useApi()
      this.loading = true
      this.error = ''
      try {
        const response = await apiGet(`/api/shopping${toQuery(filter)}`)
        this.items = normalizeList(response)
        return this.items
      } catch (error) {
        this.error = errorMessage(error, 'Не удалось загрузить покупки')
        throw error
      } finally {
        this.loading = false
      }
    },

    async addItem(payload) {
      const { apiPost } = useApi()
      this.loading = true
      this.error = ''
      try {
        const item = await apiPost('/api/shopping', payload)
        this.upsertItem(item)
        return item
      } catch (error) {
        this.error = errorMessage(error, 'Не удалось добавить товар')
        throw error
      } finally {
        this.loading = false
      }
    },

    async addItems(names, addedBy = null) {
      const created = []
      for (const name of names) {
        created.push(await this.addItem({ name, addedBy }))
      }
      return created
    },

    async updateItem(id, payload) {
      const { apiPatch } = useApi()
      this.loading = true
      this.error = ''
      try {
        const item = await apiPatch(`/api/shopping/${id}`, payload)
        this.upsertItem(item)
        return item
      } catch (error) {
        this.error = errorMessage(error, 'Не удалось обновить товар')
        throw error
      } finally {
        this.loading = false
      }
    },

    async toggleItem(id) {
      const { apiPatch } = useApi()
      this.error = ''
      try {
        const item = await apiPatch(`/api/shopping/${id}/toggle`, {})
        this.upsertItem(item)
        return item
      } catch (error) {
        this.error = errorMessage(error, 'Не удалось изменить товар')
        throw error
      }
    },

    async deleteItem(id) {
      const { apiDelete } = useApi()
      this.error = ''
      try {
        await apiDelete(`/api/shopping/${id}`)
        this.items = this.items.filter((item) => item.id !== id)
      } catch (error) {
        this.error = errorMessage(error, 'Не удалось удалить товар')
        throw error
      }
    },

    async clearCompleted() {
      const { apiDelete } = useApi()
      this.loading = true
      this.error = ''
      try {
        await apiDelete('/api/shopping/completed')
        this.items = this.items.filter((item) => !(item.done || item.completed))
      } catch (error) {
        this.error = errorMessage(error, 'Не удалось очистить список')
        throw error
      } finally {
        this.loading = false
      }
    },

    upsertItem(item) {
      const normalized = {
        ...item,
        done: item.done ?? item.completed ?? false
      }
      const index = this.items.findIndex((existing) => existing.id === normalized.id)
      if (index === -1) this.items.push(normalized)
      else this.items[index] = normalized
    }
  }
})
