import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue')

    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/Profile/Login.vue')
    },
    {
      path: '/forgetten-password',
      name: 'forgetten-password',
      component: () => import('../views/Profile/ForgettenPassword/index.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/Profile/Register/index.vue')
    },
  ]
})

export default router
