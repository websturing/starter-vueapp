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
        meta: { permission: 'view.dashboard' },
      }
    ]
  },
  {
    path: '/',
    component: AdminLayout,
    children: [
      { 
        path: 'dashboard', 
        name: 'Dashboard', 
        component: DashboardView,
        meta: { permission: 'manage.usersss' }, 
      }
      // add more admin pages here
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// Global route guard
router.beforeEach(async (to, from, next) => {
  const auth = useAuthStore()

  if (auth.user === null) {
    try {
      await auth.fetchUser()
    } catch {
      if (to.meta.permission) return next('/login')
    }
  }

  if (to.meta.permission && !auth.hasPermission(to.meta.permission)) {
    return next('/unauthorized') // Or redirect to 403
  }

  next()
})


export default router
