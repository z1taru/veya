import { defineStore } from 'pinia'

const STATUS_LABELS = {
  pending: 'Ожидает',
  accepted: 'Принята',
  done: 'Выполнена',
  declined: 'Отклонена',
  later: 'Позже'
}

function errorMessage(error, fallback) {
  return error?.data?.message || error?.data?.error || error?.message || fallback
}

function toQuery(filters = {}) {
  const params = new URLSearchParams()
  Object.entries(filters || {}).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') params.set(key, value)
  })
  const query = params.toString()
  return query ? `?${query}` : ''
}

function normalizeList(response) {
  if (Array.isArray(response)) return response
  return response?.items || response?.content || response?.data || []
}

export const useTasksStore = defineStore('tasks', {
  state: () => ({
    tasks: [],
    selectedTask: null,
    history: [],
    loading: false,
    error: ''
  }),

  getters: {
    all: (state) => state.tasks,
    pending: (state) => state.tasks.filter((task) => task.status === 'pending'),
    today: (state) => {
      const today = new Date().toISOString().split('T')[0]
      return state.tasks.filter((task) => task.dueDate === today)
    },
    statusLabel: () => (status) => STATUS_LABELS[status] || status
  },

  actions: {
    async init() {
      if (useAuthStore().isAuthenticated) {
        await this.fetchTasks()
      }
    },

    async fetchTasks(filters = {}) {
      const { apiGet } = useApi()
      this.loading = true
      this.error = ''
      try {
        const response = await apiGet(`/api/tasks${toQuery(filters)}`)
        this.tasks = normalizeList(response)
        return this.tasks
      } catch (error) {
        this.error = errorMessage(error, 'Не удалось загрузить задачи')
        throw error
      } finally {
        this.loading = false
      }
    },

    async fetchTask(id) {
      const { apiGet } = useApi()
      this.loading = true
      this.error = ''
      try {
        this.selectedTask = await apiGet(`/api/tasks/${id}`)
        return this.selectedTask
      } catch (error) {
        this.error = errorMessage(error, 'Не удалось загрузить задачу')
        throw error
      } finally {
        this.loading = false
      }
    },

    async createTask(payload) {
      const { apiPost } = useApi()
      this.loading = true
      this.error = ''
      try {
        const task = await apiPost('/api/tasks', payload)
        this.tasks.unshift(task)
        return task
      } catch (error) {
        this.error = errorMessage(error, 'Не удалось создать задачу')
        throw error
      } finally {
        this.loading = false
      }
    },

    async updateTask(id, payload) {
      const { apiPatch } = useApi()
      this.loading = true
      this.error = ''
      try {
        const task = await apiPatch(`/api/tasks/${id}`, payload)
        this.upsertTask(task)
        if (this.selectedTask?.id === id) this.selectedTask = task
        return task
      } catch (error) {
        this.error = errorMessage(error, 'Не удалось обновить задачу')
        throw error
      } finally {
        this.loading = false
      }
    },

    async updateTaskStatus(id, status, comment = '') {
      const { apiPatch } = useApi()
      this.loading = true
      this.error = ''
      try {
        const task = await apiPatch(`/api/tasks/${id}/status`, { status, comment })
        this.upsertTask(task)
        if (this.selectedTask?.id === id) this.selectedTask = task
        return task
      } catch (error) {
        this.error = errorMessage(error, 'Не удалось обновить статус')
        throw error
      } finally {
        this.loading = false
      }
    },

    async deleteTask(id) {
      const { apiDelete } = useApi()
      this.loading = true
      this.error = ''
      try {
        await apiDelete(`/api/tasks/${id}`)
        this.tasks = this.tasks.filter((task) => task.id !== id)
        if (this.selectedTask?.id === id) this.selectedTask = null
      } catch (error) {
        this.error = errorMessage(error, 'Не удалось удалить задачу')
        throw error
      } finally {
        this.loading = false
      }
    },

    async fetchTaskHistory(id) {
      const { apiGet } = useApi()
      this.error = ''
      try {
        const response = await apiGet(`/api/tasks/${id}/history`)
        this.history = normalizeList(response)
        return this.history
      } catch (error) {
        this.error = errorMessage(error, 'Не удалось загрузить историю')
        throw error
      }
    },

    upsertTask(task) {
      const index = this.tasks.findIndex((item) => item.id === task.id)
      if (index === -1) this.tasks.unshift(task)
      else this.tasks[index] = task
    },

    getTaskById(id) {
      return this.selectedTask?.id === id
        ? this.selectedTask
        : this.tasks.find((task) => String(task.id) === String(id)) || null
    },

    filteredTasks(filter, userId) {
      switch (filter) {
        case 'mine':
          return this.tasks.filter((task) => task.assigneeId === userId)
        case 'created':
          return this.tasks.filter((task) => task.creatorId === userId)
        case 'done':
          return this.tasks.filter((task) => task.status === 'done')
        case 'today':
          return this.today
        default:
          return this.tasks
      }
    }
  }
})
