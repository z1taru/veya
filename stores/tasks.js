// stores/tasks.js
import { defineStore } from 'pinia'
import { DEMO_TASKS } from '~/data/mockData'

const STATUS_LABELS = {
  pending:  'Ожидает',
  accepted: 'Принята',
  done:     'Выполнена',
  declined: 'Отклонена',
  later:    'Позже'
}

export const useTasksStore = defineStore('tasks', {
  state: () => ({
    tasks: []
  }),

  getters: {
    all: (s) => s.tasks,
    pending: (s) => s.tasks.filter(t => t.status === 'pending'),
    today: (s) => {
      const today = new Date().toISOString().split('T')[0]
      return s.tasks.filter(t => t.dueDate === today)
    },
    statusLabel: () => (status) => STATUS_LABELS[status] || status
  },

  actions: {
    init() {
      if (!process.client) return
      const saved = localStorage.getItem('veya_tasks')
      this.tasks = saved ? JSON.parse(saved) : [...DEMO_TASKS]
      this._persist()
    },

    createTask(data) {
      const task = {
        id: 't_' + Date.now(),
        title:      data.title      || 'Без названия',
        description: data.description || '',
        creatorId:  data.creatorId  || 'u1',
        assigneeId: data.assigneeId || null,
        status:     'pending',
        priority:   data.priority   || 'medium',
        dueDate:    data.dueDate    || null,
        dueTime:    data.dueTime    || null,
        repeat:     data.repeat     || null,
        createdAt:  new Date().toISOString().split('T')[0],
        history: [{ date: new Date().toISOString().split('T')[0], action: 'Задача создана', userId: data.creatorId }]
      }
      this.tasks.unshift(task)
      this._persist()
      return task
    },

    updateTaskStatus(taskId, status) {
      const t = this.tasks.find(t => t.id === taskId)
      if (!t) return
      t.status = status
      t.history.push({ date: new Date().toISOString().split('T')[0], action: STATUS_LABELS[status] || status, userId: 'u1' })
      this._persist()
    },

    updateTask(taskId, data) {
      const idx = this.tasks.findIndex(t => t.id === taskId)
      if (idx === -1) return
      this.tasks[idx] = { ...this.tasks[idx], ...data }
      this._persist()
    },

    deleteTask(taskId) {
      this.tasks = this.tasks.filter(t => t.id !== taskId)
      this._persist()
    },

    getTaskById(id) {
      return this.tasks.find(t => t.id === id) || null
    },

    filteredTasks(filter, userId) {
      switch (filter) {
        case 'mine':      return this.tasks.filter(t => t.assigneeId === userId)
        case 'created':   return this.tasks.filter(t => t.creatorId  === userId)
        case 'done':      return this.tasks.filter(t => t.status === 'done')
        case 'today':     return this.today
        default:          return this.tasks
      }
    },

    _persist() {
      localStorage.setItem('veya_tasks', JSON.stringify(this.tasks))
    }
  }
})