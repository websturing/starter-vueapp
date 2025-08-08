import api from '@/lib/api'
import { handleApiError } from '@/types/errorTypes'
import { type AttendanceRecord, type AttendanceSummary, type ShiftStatistics, AttendanceReportSchema } from '@module/attendance/schemas/attendanceSchema'
import { defineStore } from 'pinia'

export const useAttendanceStore = defineStore('attendance', {
    state: () => ({
        data: [] as AttendanceRecord[],
        summary: {} as AttendanceSummary,
        checkInAverage: '',
        checkInPercentage: {},
        shiftStatistics: {} as Record<string, ShiftStatistics>,
        loading: false,
        error: null as string | null,
    }),

    actions: {
        async fetchAttendanceToday() {
            this.loading = true
            this.error = null
            try {
                const res = await api.get('/api/attendance/today')

                const result = AttendanceReportSchema.safeParse(res.data.data)
                if (!result.success) {
                    throw new Error('❌ Invalid Attendance Today data from API')
                }
                this.data = result.data.records
                this.summary = result.data.summary
                this.checkInAverage = result.data.checkInAverage
                this.checkInPercentage = result.data.checkInAnalytics
                this.shiftStatistics = result.data.shiftStatistics
                this.error = null
            } catch (error) {
                this.data = []
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
                // await this.fetchShift()
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
                // this.data = this.data.filter((shift: Shift) => shift.id !== id)
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
