// stores/family.js
import { defineStore } from 'pinia'
import { DEMO_FAMILY, DEMO_MEMBERS } from '~/data/mockData'

export const useFamilyStore = defineStore('family', {
  state: () => ({
    currentFamily: null,
    members: [],
    invites: []
  }),

  actions: {
    init() {
      if (!process.client) return
      const savedFamily  = localStorage.getItem('veya_family')
      const savedMembers = localStorage.getItem('veya_members')
      const savedInvites = localStorage.getItem('veya_invites')
      this.currentFamily = savedFamily  ? JSON.parse(savedFamily)  : DEMO_FAMILY
      this.members       = savedMembers ? JSON.parse(savedMembers) : [...DEMO_MEMBERS]
      this.invites       = savedInvites ? JSON.parse(savedInvites) : []
      this._persist()
    },

    setFamily(name) {
      this.currentFamily = { id: 'f_' + Date.now(), name, createdAt: new Date().toISOString().split('T')[0] }
      this._persist()
    },

    addMember(member) {
      const m = { ...member, id: 'u_' + Date.now(), status: 'active', avatar: null }
      this.members.push(m)
      this._persist()
      return m
    },

    inviteMember(email, name) {
      const inv = { id: 'inv_' + Date.now(), email, name, status: 'pending', sentAt: new Date().toISOString() }
      this.invites.push(inv)
      localStorage.setItem('veya_invites', JSON.stringify(this.invites))
      return inv
    },

    updateMemberRole(memberId, role) {
      const m = this.members.find(m => m.id === memberId)
      if (m) { m.role = role; this._persist() }
    },

    removeMember(memberId) {
      this.members = this.members.filter(m => m.id !== memberId)
      this._persist()
    },

    getMemberById(id) {
      return this.members.find(m => m.id === id) || null
    },

    _persist() {
      localStorage.setItem('veya_family',  JSON.stringify(this.currentFamily))
      localStorage.setItem('veya_members', JSON.stringify(this.members))
    }
  }
})