import { createRouter, createWebHistory } from 'vue-router'
import { useModalStore } from '@/stores/modal.store'
import { useUserStore } from '@/stores/user.store'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'spread-selector',
      component: () => import('../views/SpreadSelectorView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/question',
      name: 'question',
      component: () => import('../views/QuestionView.vue'),
      meta: { requiresAuth: true, requiresSpread: true }
    },
    {
      path: '/card-selection',
      name: 'card-selection',
      component: () => import('../views/HomeView.vue'),
      meta: { requiresAuth: true, requiresQuestion: true }
    },
    {
      path: '/auth',
      name: 'auth',
      component: () => import('../views/AuthView.vue'),
    },
    {
      path: '/auth/callback',
      name: 'auth-callback',
      component: () => import('../views/AuthCallbackView.vue'),
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('../views/ProfileView.vue'),
      meta: { requiresAuth: true }
    },
  ],
})

// Navigation guard для защиты роутов
router.beforeEach(async (to, from, next) => {
  const modalStore = useModalStore()
  const userStore = useUserStore()

  // Ждем завершения проверки авторизации при первой загрузке
  if (userStore.isAuthChecking) {
    await userStore.initAuth()
  }

  // Проверка: требуется аутентификация
  if (to.meta.requiresAuth) {
    // Проверяем через isAuthenticated computed property
    if (!userStore.isAuthenticated) {
      // Пользователь не авторизован - редирект на auth
      next('/auth')
      return
    }
  }

  // Проверка: требуется выбранный расклад
  if (to.meta.requiresSpread) {
    if (!modalStore.selectedSpread) {
      // Нет выбранного расклада - редирект на главную
      next('/')
      return
    }
  }

  // Проверка: требуется вопрос
  if (to.meta.requiresQuestion) {
    if (!modalStore.selectedSpread || !modalStore.userQuestion) {
      // Нет расклада или вопроса - редирект на главную
      next('/')
      return
    }
  }

  next()
})

export default router
