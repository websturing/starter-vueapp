import api from '@/lib/axios'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    permissions: [],
  }),

  actions: {
    async getCsrfToken() {
      await api.get('/sanctum/csrf-cookie')
    },

    async login(form) {
      await this.getCsrfToken()
      await api.post('/auth/login', form)
      await this.fetchUser()
    },

    async fetchUser() {
      try {
        const res = await api.get('/auth/profile')
        this.user = res.data
        this.permissions = res.data.permissions || []
      } catch (error) {
        console.log('error catch')
        this.user = null
        this.permissions = []
        throw error // ⬅️ penting untuk trigger catch di route guard
      }
    },

    async logout() {
      await api.post('/auth/logout')
      this.user = null
      this.permissions = []
    },

    hasPermission(permission) {
      return this.permissions.includes(permission)
    },
  },
})
