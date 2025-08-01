import api from '@/lib/api'
import { handleApiError } from '@/types/errorTypes'
import { defineStore } from 'pinia'

export const useShiftUserAssignmentStore = defineStore('shiftUserAssignment', {
    state: () => ({
        data: [] as [],
        loading: false,
        error: null as string | null,
    }),

    actions: {


        async createUShiftUserAssignment(moduleData: any) {
            this.loading = true
            this.error = null
            try {
                const res = await api.post('/api/assignment', moduleData)
                // await this.fetchShift()
                this.error = null
                return res.data
            } catch (error) {
                console.log(error)
                this.error = handleApiError(
                    (error as any)?.response?.data?.message || error
                )
                throw error
            } finally {
                this.loading = false
            }
        },

        // async updateShift(id: number, moduleData: any) {
        //     this.loading = true
        //     this.error = null
        //     try {
        //         const res = await api.post(`/api/shift/${id}`, moduleData)
        //         await this.fetchShift()
        //         this.error = null
        //         return res.data
        //     } catch (error) {
        //         this.error = handleApiError(error)
        //         throw error
        //     } finally {
        //         this.loading = false
        //     }
        // },

        // async deleteShift(id: number) {
        //     this.loading = true
        //     this.error = null
        //     try {
        //         const res = await api.delete(`/api/shift/${id}`)
        //         this.data = this.data.filter((shift: Shift) => shift.id !== id)
        //         this.error = null
        //         return res.data
        //     } catch (error) {
        //         this.error = handleApiError(error)
        //         throw error
        //     } finally {
        //         this.loading = false
        //     }
        // },
    },
})