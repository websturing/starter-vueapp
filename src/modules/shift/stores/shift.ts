import api from '@/lib/api'
import { shiftListSchema, type Shift } from '@/modules/shift/schemas/shiftSchema'
import { handleApiError } from '@/types/errorTypes'
import { defineStore } from 'pinia'

export const useShiftStore = defineStore('shift', {
    state: () => ({
        data: [] as Shift[],
        loading: false,
        error: null as string | null,
    }),

    actions: {
        async fetchShift() {
            this.loading = true
            this.error = null
            try {
                const res = await api.get('/api/shift')

                const result = shiftListSchema.safeParse(res.data.data)
                if (!result.success) {
                    throw new Error('❌ Invalid shift data from API')
                }

                this.data = result.data
                this.error = null
            } catch (error) {
                this.data = []
                this.error = handleApiError(error)
                throw error
            } finally {
                this.loading = false
            }
        },

        async createShift(moduleData: any) {
            this.loading = true
            this.error = null
            try {
                const res = await api.post('/api/shift', moduleData)
                await this.fetchShift()
                this.error = null
                return res.data
            } catch (error) {
                this.error = handleApiError(error)
                throw error
            } finally {
                this.loading = false
            }
        },

        async updateShift(id: number, moduleData: any) {
            this.loading = true
            this.error = null
            try {
                const res = await api.post(`/api/shift/${id}`, moduleData)
                await this.fetchShift()
                this.error = null
                return res.data
            } catch (error) {
                this.error = handleApiError(error)
                throw error
            } finally {
                this.loading = false
            }
        },

        async deleteShift(id: number) {
            this.loading = true
            this.error = null
            try {
                const res = await api.delete(`/api/shift/${id}`)
                this.data = this.data.filter((shift: Shift) => shift.id !== id)
                this.error = null
                return res.data
            } catch (error) {
                this.error = handleApiError(error)
                throw error
            } finally {
                this.loading = false
            }
        },
    },
})
