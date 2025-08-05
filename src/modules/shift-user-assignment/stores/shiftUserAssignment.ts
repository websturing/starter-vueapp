import api from '@/lib/api'
import { handleApiError } from '@/types/errorTypes'
import { shiftUserAssignmentListSchema, shiftUserAssignmentSummarySchema, type ShiftUserAssignment, type ShiftUserAssignmentSummary } from "@module/shift-user-assignment/schemas/shiftUserAssignmentSchema"
import { defineStore } from 'pinia'

export const useShiftUserAssignmentStore = defineStore('shiftUserAssignment', {
    state: () => ({
        data: [] as ShiftUserAssignment[],
        dataSummary: {} as ShiftUserAssignmentSummary,
        loading: false,
        error: null as string | null,
    }),

    actions: {
        async fetchShiftUserAssignment() {
            this.loading = true
            this.error = null
            try {
                const res = await api.get('/api/assignment')

                const result = shiftUserAssignmentListSchema.safeParse(res.data.data)
                if (!result.success) {
                    throw new Error('❌ Invalid shift assignment data from API')
                }

                this.data = result.data
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
        async deleteShiftUserAssignment(id: number) {
            this.loading = true
            this.error = null
            try {
                const res = await api.delete(`/api/assignment/${id}`)
                this.data = this.data.filter((shift: ShiftUserAssignment) => shift.id !== id)
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