import api from '@/lib/api';
import { handleApiError } from '@/types/errorTypes';
import { defineStore } from 'pinia';

export const useRoleStore = defineStore('role', {
    state: () => ({
        data: [] as any[],
        loading: false,
        error: null as string | null,
    }),
    actions: {
        async fetchRole() {
            this.loading = true;
            this.error = null;
            try {
                const res = await api.get('/api/roles')
                this.data = res.data.data
                this.error = null
            } catch (error) {
                this.data = []
                this.error = handleApiError(error)
                throw error
            } finally {
                this.loading = false
            }
        },
        async createRole(moduleData: any) {
            this.loading = true;
            this.error = null;
            try {
                const res = await api.post('/api/roles', moduleData)
                this.data.push(res.data.data)
                this.data = this.data.sort((a, b) => a.name.localeCompare(b.name))
                this.error = null
            } catch (error) {
                this.error = handleApiError(error)
                throw error
            } finally {
                this.loading = false
            }
        },
        async updateRole(id: number, moduleData: any) {
            this.loading = true;
            this.error = null;
            try {
                const res = await api.post(`/api/module/${id}`, moduleData)
                this.fetchRole()
                this.error = null
            } catch (error) {
                this.error = handleApiError(error)
                throw error
            } finally {
                this.loading = false
            }
        },
        async deleteRole(id: number) {
            this.loading = true;
            this.error = null;
            try {
                const res = await api.delete(`/api/roles/${id}`)
                this.data = this.data.filter(module => module.id !== id)
                this.error = null
            } catch (error) {
                this.error = handleApiError(error)
                throw error
            } finally {
                this.loading = false
            }
        },
    }

});