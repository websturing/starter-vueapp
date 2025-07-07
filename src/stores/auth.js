import api from '@/lib/axios'
import { defineStore } from 'pinia'

function getCookie(name) {
  const value = `; ${document.cookie}`
  const parts = value.split(`; ${name}=`)
  if (parts.length === 2) return parts.pop().split(';').shift()
  return null
}
const token = getCookie('XSRF-TOKEN')

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    role: [],
    permissions: [],
    email: null,
    password: null
  }),

  actions: {
    async getCsrfToken() {
      await api.get('/sanctum/csrf-cookie')
    },

    async login(form) {
     return this.getCsrfToken()
    .then(() => new Promise((r) => setTimeout(r, 100)))
    .then(() =>
      api.post('/api/auth/login', {
        email: this.email,
        password: this.password
      }, {
        headers: {
          'X-XSRF-TOKEN': decodeURIComponent(token),
        }
      })
    )
    .then(async (res) => {
      await this.fetchUser()
      return res
    })
    },

    async fetchUser() {
      try {
        const res = await api.get('/api/auth/profile')
        this.user = res.data
        this.role = res.data
        this.permissions = res.data.permissions || []
      } catch (error) {
        console.log('error catch')
        this.user = null
        this.permissions = []
        throw error // ⬅️ penting untuk trigger catch di route guard
      }
    },

    async logout() {
      await api.post('/api/auth/logout')
      // this.user = null
      // this.permissions = []
    },
    hasPermission(permission) {
      return this.permissions.includes(permission)
    },
  },
})
