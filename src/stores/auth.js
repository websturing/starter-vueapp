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
      await api.post('/login', form)
      await this.fetchUser()
    },

    async fetchUser() {
      const res = await api.get('/user')
      this.user = res.data
      this.permissions = res.data.permissions || [] // assume user.toArray() returns this
    },

    async logout() {
      await api.post('/logout')
      this.user = null
      this.permissions = []
    },

    hasPermission(permission) {
      return this.permissions.includes(permission)
    },
  },
})
