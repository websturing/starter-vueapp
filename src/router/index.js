import AdminLayout from '@/layouts/AdminLayout.vue'
import AuthLayout from '@/layouts/AuthLayout.vue'
import { createRouter, createWebHistory } from 'vue-router'

import DashboardView from '@/views/admin/DashboardView.vue'
import LoginView from '@/views/auth/LoginView.vue'

const routes = [
  {
    path: '/login',
    component: AuthLayout,
    children: [
      { path: '', name: 'Login', component: LoginView }
    ]
  },
  {
    path: '/',
    component: AdminLayout,
    children: [
      { path: 'dashboard', name: 'Dashboard', component: DashboardView }
      // add more admin pages here
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
