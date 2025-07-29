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
  const auth = useAuthStore();

  const publicRoutes = ['/login'];
  if (publicRoutes.includes(to.path)) return true;

  try {
    const token = getCookie('XSRF-TOKEN');
    if (!token) return '/login';

    // Kalau belum login, fetch user
    if (!auth.user) {
      console.log('🔄 Fetching user...');
      await auth.fetchUser();
    }

    const requiredPermission = to.meta.permission;
    if (requiredPermission && !auth.hasPermission(requiredPermission)) {
      console.warn('🚫 No permission:', requiredPermission);
      return '/unauthorized';
    }

    return true;
  } catch (error) {
    console.error('Auth check error:', error);
    document.cookie = 'XSRF-TOKEN=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    return '/login';
  }
});



export default router