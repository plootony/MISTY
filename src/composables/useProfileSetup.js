import { ref, watch } from 'vue'
import { useUserStore } from '@/stores/user.store'

export function useProfileSetup() {
    const userStore = useUserStore()
    const showProfileSetup = ref(false)

    // Проверяем, нужно ли показывать модалку настройки профиля
    const checkProfileSetup = () => {
        showProfileSetup.value = userStore.needsProfileSetup
        return userStore.needsProfileSetup
    }

    // Следим за изменениями авторизации
    watch(() => userStore.isAuthenticated, (isAuth) => {
        if (isAuth) {
            checkProfileSetup()
        }
    }, { immediate: true })

    const handleProfileSetupComplete = () => {
        showProfileSetup.value = false
    }

    return {
        showProfileSetup,
        checkProfileSetup,
        handleProfileSetupComplete
    }
}

