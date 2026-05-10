// stores/shopping.js
import { defineStore } from 'pinia'
import { DEMO_SHOPPING } from '~/data/mockData'

export const useShoppingStore = defineStore('shopping', {
  state: () => ({
    items: []
  }),

  getters: {
    total:     (s) => s.items.length,
    done:      (s) => s.items.filter(i => i.done).length,
    remaining: (s) => s.items.filter(i => !i.done).length,
    progress:  (s) => s.items.length ? Math.round((s.items.filter(i => i.done).length / s.items.length) * 100) : 0
  },

  actions: {
    init() {
      if (!process.client) return
      const saved = localStorage.getItem('veya_shopping')
      this.items = saved ? JSON.parse(saved) : [...DEMO_SHOPPING]
      this._persist()
    },

    addItem(data) {
      const item = {
        id:       's_' + Date.now(),
        name:     data.name     || 'Товар',
        qty:      data.qty      || null,
        category: data.category || 'Другое',
        addedBy:  data.addedBy  || 'u1',
        done:     false
      }
      this.items.push(item)
      this._persist()
      return item
    },

    addItems(names, addedBy = 'u1') {
      names.forEach(name => {
        this.items.push({ id: 's_' + Date.now() + Math.random(), name, qty: null, category: 'Другое', addedBy, done: false })
      })
      this._persist()
    },

    toggleItem(id) {
      const item = this.items.find(i => i.id === id)
      if (item) { item.done = !item.done; this._persist() }
    },

    deleteItem(id) {
      this.items = this.items.filter(i => i.id !== id)
      this._persist()
    },

    clearCompleted() {
      this.items = this.items.filter(i => !i.done)
      this._persist()
    },

    _persist() {
      localStorage.setItem('veya_shopping', JSON.stringify(this.items))
    }
  }
})