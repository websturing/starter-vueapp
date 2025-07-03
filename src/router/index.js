import AdminLayout from '@/layouts/AdminLayout.vue'
import AuthLayout from '@/layouts/AuthLayout.vue'
import { useAuthStore } from '@/stores/auth'
import { createRouter, createWebHistory } from 'vue-router'

import DashboardView from '@/views/admin/DashboardView.vue'
import LoginView from '@/views/auth/LoginView.vue'

const routes = [
  {
    path: '/login',
    component: AuthLayout,
    children: [
      { 
        path: '', 
        name: 'Login', 
        component: LoginView,
      }
    ]
  },
  {
    path: '/',
    component: AdminLayout,
    meta: { permission: 'view.dashboard' }, 
    children: [
      { 
        path: 'dashboard', 
        name: 'Dashboard', 
        component: DashboardView,
        meta: { permission: 'view.dashboard' }, 
      }
      // add more admin pages here
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach(async (to, from, next) => {
  const auth = useAuthStore()
  // Jangan cek auth kalau route gak perlu permission
  const needsPermission = !!to.meta.permission

  if (!auth.user && needsPermission) {
    try {
      await auth.fetchUser()
    } catch (err) {
      console.warn('Unauthorized:', err?.response?.status)
      return next('/login')
    }
  }

  if (needsPermission && !auth.hasPermission(to.meta.permission)) {
    return next('/login') // Bisa arahkan ke /403 jika mau
  }

  return next()
})

export default router