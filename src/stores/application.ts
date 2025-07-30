import api from '@/lib/api'
import { defineStore } from 'pinia'

export const useApplicationStore = defineStore('application', {
  state: () => ({
    meta: {} as Record<string, string>,
  }),

  actions: {
    async fetchAppMeta() {
      try {
        const response = await api.get('/api/application/meta')
        this.meta = response.data
      } catch (error) {
        console.error('Failed to fetch app meta:', error)
      }
    },
  },
})
