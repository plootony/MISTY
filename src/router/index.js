import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'spread-selector',
      component: () => import('../views/SpreadSelectorView.vue'),
    },
    {
      path: '/question',
      name: 'question',
      component: () => import('../views/QuestionView.vue'),
    },
    {
      path: '/card-selection',
      name: 'card-selection',
      component: () => import('../views/HomeView.vue'),
    },
    {
      path: '/auth',
      name: 'auth',
      component: () => import('../views/AuthView.vue'),
    },
    {
      path: '/profile-setup',
      name: 'profile-setup',
      component: () => import('../views/ProfileSetupView.vue'),
    },
  ],
})

export default router
