import api from '@/lib/api';
import { handleApiError } from '@/types/errorTypes';
import { defineStore } from 'pinia';

export const useUserStore = defineStore('users', {
    state: () => ({
        data: [] as any[],
        loading: false,
        error: null as string | null,
    }),
    actions: {
        async fetchUserWithRoles() {
            this.loading = true;
            this.error = null;
            try {
                const res = await api.get('/api/users/role')
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
        async createUser(moduleData: any) {
            this.loading = true;
            this.error = null;
            try {
                const res = await api.post('/api/users', moduleData)
                this.fetchUserWithRoles()
                this.data = this.data.sort((a, b) => a.name.localeCompare(b.name))
                this.error = null
                return res.data
            } catch (error) {
                this.error = handleApiError(error)
                throw error
            } finally {
                this.loading = false
            }
        },
        async updateUser(id: number, moduleData: any) {
            this.loading = true;
            this.error = null;
            try {
                const res = await api.post(`/api/users/${id}`, moduleData)
                this.fetchUserWithRoles()
                this.error = null
                return res.data
            } catch (error) {
                this.error = handleApiError(error)
                throw error
            } finally {
                this.loading = false
            }
        },
        async deleteUser(id: number) {
            this.loading = true;
            this.error = null;
            try {
                const res = await api.delete(`/api/users/${id}`)
                this.data = this.data.filter(module => module.id !== id)
                this.error = null
                return res.data
            } catch (error) {
                this.error = handleApiError(error)
                throw error
            } finally {
                this.loading = false
            }
        },
    }

});