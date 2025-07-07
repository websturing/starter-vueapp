import { defineAsyncComponent } from 'vue'

import AdminLayout from '@/layouts/AdminLayout.vue'
import AuthLayout from '@/layouts/AuthLayout.vue'
import { useAuthStore } from '@/stores/auth'
import { createRouter, createWebHistory } from 'vue-router'

const DashboardView = defineAsyncComponent(() =>
  import('@/views/admin/DashboardView.vue')
)

const LoginView = defineAsyncComponent(() =>
  import('@/views/auth/LoginView.vue')
)

const routes = [
  {
    path: '/login',
    component: AuthLayout,
    children: [
      { 
        path: '', 
        name: 'Login', 
        component: () => import('@/views/auth/LoginView.vue'),
        meta: {
          requiresAuth: false,
        },
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
        component: () =>  import('@/views/admin/DashboardView.vue'),
        meta: { permission: 'view.dashboard' }, 
      }
      // add more admin pages here
    ]
  },
  {
  path: '/:pathMatch(.*)*',
  redirect: '/login', // atau ke halaman 404
}
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach(async (to, _, next) => {
  const auth = useAuthStore()

  const permission = to.meta.permission
  const needsAuth = !!permission || !!to.meta.requiresAuth

  if (!auth.user && needsAuth) {
    try {
      await auth.fetchUser()
    } catch (err) {
      return next('/login')
    }
  }

  if (typeof permission === 'string') {
    if (!auth.hasPermission(permission)) {
      return next('/login')
    }
  }

  if (Array.isArray(permission)) {
    const allowed = permission.every((p) => auth.hasPermission(p))
    if (!allowed) {
      return next('/login')
    }
  }

  return next()
})



export default router