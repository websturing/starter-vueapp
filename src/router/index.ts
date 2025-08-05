import api from '@/lib/api'
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
    redirect: {
      name: 'dashboard'
    },
    children: [
      {
        path: 'dashboard',
        name: 'dashboard',
        component: () => import('@/views/admin/DashboardView.vue'),
        meta: { permission: 'dashboard.read' },
      },
      {
        path: 'permissions',
        name: 'permissions',
        component: () => import('@/views/admin/PermissionsView.vue'),
        meta: { permission: 'permissions.read' },
      },
      {
        path: 'users',
        name: 'users',
        component: () => import('@module/user/views/UserView.vue'),
        meta: { permission: 'users.read' },
      },
      {
        path: 'shift',
        name: 'shift',
        component: () => import('@module/shift/views/ShiftView.vue'),
        meta: { permission: 'shift.read' },
      },
      {
        path: 'employee',
        name: 'employee',
        component: () => import('@module/employee/views/EmployeeView.vue'),
        meta: { permission: 'employee.read' },
      },
      {
        path: 'assignments',
        name: 'assignments',
        component: () => import('@module/shift-user-assignment/views/ShiftUserAssignmentView.vue'),
        meta: { permission: 'employee.read' },
      },
      {
        path: 'assignments/create',
        name: 'assignments-create',
        component: () => import('@module/shift-user-assignment/components/ShiftUserAssignmentForm.vue'),
        meta: {
          requiresAuth: false,
        },
      }

    ]
  },
  {
    path: '/unauthorized',
    name: 'unauthorized',
    component: () => import('@/views/UnauthorizedView.vue'),
    meta: {
      requiresAuth: false,
    }
  },
  {
    path: '/404',
    name: 'not-found',
    component: () => import('@/views/404.vue'),
    meta: {
      requiresAuth: false,
    }
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/404', // atau ke halaman 404
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

function getCookie(name: string): string | null {
  const value = `; ${document.cookie}`
  const parts = value.split(`; ${name}=`)
  if (parts.length === 2) return parts.pop()?.split(';').shift() ?? null
  return null
}

router.beforeEach(async (to) => {
  const auth = useAuthStore()

  const publicRoutes = ['/login']
  if (publicRoutes.includes(to.path)) return true

  const token = localStorage.getItem('access_token')
  if (!token) {
    console.warn('🔒 Token not found, redirecting to login')
    return '/login'
  }

  // Inject token ke axios kalau belum ada
  if (!api.defaults.headers.common['Authorization']) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`
  }

  // Jika belum ada user di store, fetch user
  if (!auth.user) {
    try {
      console.log('🔄 Fetching user...')
      await auth.fetchUser()
    } catch (error) {
      console.error('❌ Failed to fetch user:', error)
      localStorage.removeItem('access_token')
      return '/login'
    }
  }

  // Cek permission jika route butuh
  const requiredPermission = to.meta.permission
  if (requiredPermission && !auth.hasPermission(requiredPermission)) {
    console.warn('🚫 No permission:', requiredPermission)
    return '/unauthorized'
  }

  return true
})



export default router