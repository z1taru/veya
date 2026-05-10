// stores/waitlist.js
import { defineStore } from 'pinia'

export const useWaitlistStore = defineStore('waitlist', {
  state: () => ({
    submissions: [],
    submitted: false
  }),

  actions: {
    init() {
      if (!process.client) return
      const saved = localStorage.getItem('veya_waitlist')
      if (saved) {
        const data = JSON.parse(saved)
        this.submissions = data.submissions || []
        this.submitted   = data.submitted   || false
      }
    },

    async submitWaitlist(form) {
      await delay(800)
      const entry = { ...form, id: 'w_' + Date.now(), submittedAt: new Date().toISOString() }
      this.submissions.push(entry)
      this.submitted = true
      localStorage.setItem('veya_waitlist', JSON.stringify({ submissions: this.submissions, submitted: true }))
      return { ok: true }
    }
  }
})

function delay(ms) { return new Promise(r => setTimeout(r, ms)) }