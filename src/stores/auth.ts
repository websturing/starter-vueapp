import api from '@/lib/api'
import type { User } from '@/types/models/user'
import { defineStore } from 'pinia'

function getCookie(name: string): string | null {
  const value = `; ${document.cookie}`
  const parts = value.split(`; ${name}=`)
  if (parts.length === 2) return parts.pop()?.split(';').shift() ?? null
  return null
}

const token = getCookie('XSRF-TOKEN')

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as User | null,
    role: [] as string[],
    permissions: [] as string[],
    email: null as string | null,
    password: null as string | null,
  }),

  actions: {
    async getCsrfToken() {
      await api.get('/sanctum/csrf-cookie')
    },

    async login() {
     return this.getCsrfToken()
    .then(() => new Promise((r) => setTimeout(r, 100)))
    .then(() =>
      api.post('/api/auth/login', {
        email: this.email,
        password: this.password
      }, {
        headers: {
          'X-XSRF-TOKEN': decodeURIComponent(token || ''),
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
    hasPermission(perm: string | string[]): boolean {
      if (Array.isArray(perm)) return perm.every(p => this.permissions.includes(p))
      return this.permissions.includes(perm)
    },
  },
})
