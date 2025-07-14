import api from '@/lib/api'
import { Menu } from '@/types/models/menu'
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
    permissions: null as Menu[] | null,
    email: null as string | null,
    password: null as string | null,
  }),

  getters: {
    flattenedPermissions: (state) => {
      if (!state.permissions) {
        console.warn('Permissions not loaded');
        return [];
      }

      console.log('Raw permissions:', state.permissions);

      const result = state.permissions.flatMap((menu: Menu) => {
        // Gunakan menu.permissions bukan menu.permission
        return menu.permissions?.map(item => item.permission_name) || [];
      });

      console.log('Flattened result:', result);
      return result;
    }
  },

  actions: {
    async getCsrfToken() {
      await api.get('/sanctum/csrf-cookie')
    },

    async login({ email, password }: { email: string, password: string }) {
      this.email = email
      this.password = password
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
        this.user = res.data.data.user
        this.role = res.data.data.role || []
        this.permissions = res.data.data.permissions || []

        localStorage.setItem('lastUserFetch', Date.now().toString())
      } catch (error) {
        this.clearAuth()
        throw error
      }
    },

    clearAuth() {
      this.user = null
      this.permissions = null
      localStorage.removeItem('lastUserFetch')
    },

    async logout() {
      try {
        await api.post('/api/auth/logout');
      } catch (error) {
        console.error('Logout failed:', error);
      } finally {
        // Bersihkan semua state
        this.user = null;
        this.permissions = null;
        this.role = [];

        // Hapus cookie
        document.cookie = 'XSRF-TOKEN=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        localStorage.removeItem('lastUserFetch');
      }
    },
    // Perbaiki implementasi hasPermission
    hasPermission(perm: string | string[]): boolean {
      try {
        if (!this.flattenedPermissions.length) {
          console.warn('No permissions available')
          return false
        }

        const permsToCheck = Array.isArray(perm) ? perm : [perm]
        const result = permsToCheck.every(p => this.flattenedPermissions.includes(p))

        console.log(`Checking ${permsToCheck.join(', ')}:`, {
          available: this.flattenedPermissions,
          result
        })

        return result
      } catch (error) {
        console.error('Permission check error:', error)
        return false
      }
    }
  },
})
