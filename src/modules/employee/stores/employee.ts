import api from '@/lib/api'
import { employeeLastCodeSchema, employeeListSchema, type Employee, type EmployeeLastCode } from '@/modules/employee/schemas/employeeSchema'
import { handleApiError } from '@/types/errorTypes'
import { defineStore } from 'pinia'

export const useEmployeeStore = defineStore('employee', {
    state: () => ({
        data: [] as Employee[],
        lastCode: '' as unknown as EmployeeLastCode,
        loading: false,
        error: null as string | null,
    }),
    getters: {
        // Getter untuk generate next code (+1)
        nextEmployeeCode: (state) => {
            try {
                const validated = employeeLastCodeSchema.parse(state.lastCode);
                const prefix = validated.slice(0, 3); // "EMP"
                const numStr = validated.slice(3);    // "0010"
                const num = parseInt(numStr) + 1;     // 10 + 1 = 11
                const nextNumStr = num.toString().padStart(4, '0'); // "0011"
                return `${prefix}${nextNumStr}` as EmployeeLastCode;
            } catch (error) {
                console.error("Invalid lastCode format", error);
                return 'EMP0000' as EmployeeLastCode; // Fallback value
            }
        }
    },
    actions: {
        async fetchEmployee() {
            this.loading = true
            this.error = null
            try {
                const res = await api.get('/api/employee')

                const result = employeeListSchema.safeParse(res.data.data)
                if (!result.success) {
                    throw new Error('❌ Invalid Employee data from API')
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

        async fetchEmployeeLastCode() {
            this.loading = true
            this.error = null
            try {
                const res = await api.get('/api/employee/code')

                const result = employeeLastCodeSchema.safeParse(res.data.data)
                if (!result.success) {
                    throw new Error('❌ Invalid Employee Code data from API')
                }

                this.lastCode = result.data
                this.error = null
            } catch (error) {
                this.data = []
                this.error = handleApiError(error)
                throw error
            } finally {
                this.loading = false
            }
        },

        async createEmployee(moduleData: any) {
            this.loading = true
            this.error = null
            try {
                const res = await api.post('/api/employee', moduleData)
                await this.fetchEmployee()
                this.error = null
                return res.data
            } catch (error) {
                this.error = handleApiError(error)
                throw error
            } finally {
                this.loading = false
            }
        },

        async updateEmployee(id: number, moduleData: any) {
            this.loading = true
            this.error = null
            try {
                const res = await api.post(`/api/employee/${id}`, moduleData)
                await this.fetchEmployee()
                this.error = null
                return res.data
            } catch (error) {
                this.error = handleApiError(error)
                throw error
            } finally {
                this.loading = false
            }
        },

        async deleteEmployee(id: number) {
            this.loading = true
            this.error = null
            try {
                const res = await api.delete(`/api/employee/${id}`)
                this.data = this.data.filter((employee: Employee) => employee.id !== id)
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
