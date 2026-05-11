import { defineStore } from 'pinia'

function errorMessage(error, fallback) {
  return error?.data?.message || error?.data?.error || error?.message || fallback
}

export const useFamilyStore = defineStore('family', {
  state: () => ({
    currentFamily: null,
    members: [],
    invites: [],
    loading: false,
    error: ''
  }),

  actions: {
    async init() {
      if (useAuthStore().isAuthenticated) {
        await this.fetchCurrentFamily()
      }
    },

    async fetchCurrentFamily() {
      const { apiGet } = useApi()
      this.loading = true
      this.error = ''
      try {
        this.currentFamily = await apiGet('/api/families/current')
        await this.fetchMembers()
        return this.currentFamily
      } catch (error) {
        this.error = errorMessage(error, 'Не удалось загрузить семью')
        throw error
      } finally {
        this.loading = false
      }
    },

    async setFamily(name) {
      if (!this.currentFamily?.id) {
        this.currentFamily = { name }
        return this.currentFamily
      }
      const { apiPatch } = useApi()
      this.loading = true
      this.error = ''
      try {
        this.currentFamily = await apiPatch(`/api/families/${this.currentFamily.id}`, { name })
        return this.currentFamily
      } catch (error) {
        this.error = errorMessage(error, 'Не удалось сохранить семью')
        throw error
      } finally {
        this.loading = false
      }
    },

    async fetchMembers() {
      if (!this.currentFamily?.id) return []
      const { apiGet } = useApi()
      this.loading = true
      this.error = ''
      try {
        this.members = await apiGet(`/api/families/${this.currentFamily.id}/members`)
        return this.members
      } catch (error) {
        this.error = errorMessage(error, 'Не удалось загрузить участников')
        throw error
      } finally {
        this.loading = false
      }
    },

    async inviteMember(payload, name) {
      if (!this.currentFamily?.id) throw new Error('Family is not loaded')
      const body = typeof payload === 'object'
        ? payload
        : { email: payload, name }
      const { apiPost } = useApi()
      this.loading = true
      this.error = ''
      try {
        const invite = await apiPost(`/api/families/${this.currentFamily.id}/members/invite`, body)
        this.invites.push(invite)
        return invite
      } catch (error) {
        this.error = errorMessage(error, 'Не удалось отправить приглашение')
        throw error
      } finally {
        this.loading = false
      }
    },

    async addMember(member) {
      return this.inviteMember(member)
    },

    async updateMemberRole(memberId, role) {
      if (!this.currentFamily?.id) return null
      const { apiPatch } = useApi()
      this.error = ''
      try {
        const updated = await apiPatch(`/api/families/${this.currentFamily.id}/members/${memberId}/role`, { role })
        const index = this.members.findIndex((member) => member.id === memberId)
        if (index !== -1) this.members[index] = updated
        return updated
      } catch (error) {
        this.error = errorMessage(error, 'Не удалось обновить роль')
        throw error
      }
    },

    async removeMember(memberId) {
      if (!this.currentFamily?.id) return
      const { apiDelete } = useApi()
      this.error = ''
      try {
        await apiDelete(`/api/families/${this.currentFamily.id}/members/${memberId}`)
        this.members = this.members.filter((member) => member.id !== memberId)
      } catch (error) {
        this.error = errorMessage(error, 'Не удалось удалить участника')
        throw error
      }
    },

    getMemberById(id) {
      return this.members.find((member) => (
        String(member.id) === String(id) ||
        String(member.user?.id) === String(id) ||
        String(member.userId) === String(id)
      )) || null
    }
  }
})
