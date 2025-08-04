import api from '@/lib/api'
import { handleApiError } from '@/types/errorTypes'
import { shiftUserAssignmentSummarySchema, type ShiftUserAssignmentSummary } from "@module/shift-user-assignment/schemas/shiftUserAssignmentSchema"
import { defineStore } from 'pinia'

export const useShiftUserAssignmentStore = defineStore('shiftUserAssignment', {
    state: () => ({
        data: [] as [],
        dataSummary: {} as ShiftUserAssignmentSummary,
        loading: false,
        error: null as string | null,
    }),

    actions: {

        async fetchShiftUserAssignmentSummary() {
            this.loading = true
            this.error = null
            try {
                const res = await api.get('/api/assignment/summary')

                const result = shiftUserAssignmentSummarySchema.safeParse(res.data.data)
                if (!result.success) {
                    throw new Error('❌ Invalid shift assignment data from API')
                }

                this.dataSummary = result.data
                this.error = null
            } catch (error) {
                this.data = []
                this.error = handleApiError(
                    (error as any)?.response?.data?.message || error
                )
                throw error
            } finally {
                this.loading = false
            }
        },
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