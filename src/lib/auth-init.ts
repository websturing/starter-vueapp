import { useAuthStore } from '@/stores/auth';
import { getCookie } from '@/lib/cookies'; // Pastikan Anda punya utility getCookie

export async function initializeAuth() {
    const auth = useAuthStore();
    const token = getCookie('XSRF-TOKEN');

    if (token) {
        try {
            const lastFetch = parseInt(localStorage.getItem('lastUserFetch') || '0');
            // Refresh data jika lebih dari 5 menit atau user belum terload
            if (Date.now() - lastFetch > 300000 || !auth.user) {
                await auth.fetchUser();
            }
        } catch (error) {
            console.error('Failed to initialize auth:', error);
            auth.clearAuth();
        }
    }
}