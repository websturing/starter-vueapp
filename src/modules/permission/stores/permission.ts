import api from '@/lib/api';
import { handleApiError } from '@/types/errorTypes';
import { defineStore } from 'pinia';

export const usePermissionStore = defineStore('permission', {
    state: () => ({
        data: [] as any[],
        loading: false,
        error: null as string | null,
    }),
    actions: {
        async fetchPermissions() {
            try {
                const res = await api.get('/api/permissions')
                this.data = res.data.data
                this.error = null
            } catch (error) {
                this.data = []
                this.error = handleApiError(error)
                throw error
            }
        },

    }

});