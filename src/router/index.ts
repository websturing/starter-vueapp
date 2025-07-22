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
    meta: { permission: 'view.dashboard' },
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
        meta: { permission: 'dashboard.read' },
      },
      {
        path: 'users',
        name: 'users',
        component: () => import('@module/user/views/UserView.vue'),
        meta: { permission: 'dashboard.read' },
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

  // Route yang boleh diakses tanpa auth
  const publicRoutes = ['/login'];
  if (publicRoutes.includes(to.path)) return true;

  try {
    const token = getCookie('XSRF-TOKEN');

    // Jika tidak ada token, arahkan ke login
    if (!token) {
      if (to.path !== '/login') {
        return '/login';
      }
      return true;
    }

    // Jika ada token tapi user belum loaded
    if (!auth.user) {
      await auth.fetchUser();

      // Jika fetch user gagal (misal token expired)
      if (!auth.user) {
        document.cookie = 'XSRF-TOKEN=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        return '/login';
      }
    }

    // Cek permission
    if (to.meta.permission && !auth.hasPermission(to.meta.permission)) {
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