import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { getProfile, upsertProfile, signOut as supabaseSignOut } from '@/services/supabase.service'

export const useUserStore = defineStore('userStore', () => {
    // Определение тарифов
    const tariffs = {
        'neophyte': {
            id: 'neophyte',
            name: 'Неофит',
            level: 1,
            allowedSpreads: ['one-card']
        },
        'initiated': {
            id: 'initiated',
            name: 'Посвящённый',
            level: 2,
            allowedSpreads: ['one-card', 'three-cards']
        },
        'adept': {
            id: 'adept',
            name: 'Адепт',
            level: 3,
            allowedSpreads: ['one-card', 'three-cards', 'horseshoe']
        },
        'oracle': {
            id: 'oracle',
            name: 'Оракул',
            level: 4,
            allowedSpreads: ['one-card', 'three-cards', 'horseshoe', 'celtic-cross']
        },
        'supreme-arcana': {
            id: 'supreme-arcana',
            name: 'Верховный Аркан',
            level: 5,
            allowedSpreads: ['one-card', 'three-cards', 'horseshoe', 'celtic-cross', 'year-circle']
        }
    }

    const userData = ref(null)
    const isAuthenticated = computed(() => userData.value !== null && userData.value.id !== null)

    const currentTariff = computed(() => {
        if (!userData.value || !userData.value.tariff) {
            return tariffs['neophyte'] // Дефолтный тариф
        }
        return tariffs[userData.value.tariff]
    })

    const canAccessSpread = (spreadId) => {
        return currentTariff.value.allowedSpreads.includes(spreadId)
    }

    const getRequiredTariffForSpread = (spreadId) => {
        for (const tariff of Object.values(tariffs)) {
            if (tariff.allowedSpreads.includes(spreadId)) {
                return tariff
            }
        }
        return null
    }

    /**
     * Загрузка данных пользователя из Supabase после авторизации
     */
    const loadUserFromSupabase = async (supabaseUser) => {
        try {
            // Получаем профиль из БД
            let profile = await getProfile(supabaseUser.id)

            // Если профиля нет, создаем его
            if (!profile) {
                const name = supabaseUser.user_metadata?.full_name || 
                            supabaseUser.user_metadata?.name || 
                            supabaseUser.email?.split('@')[0] || 
                            'Пользователь'

                profile = await upsertProfile(supabaseUser.id, {
                    name: name,
                    email: supabaseUser.email,
                    tariff: 'neophyte',
                    birth: null
                })
            }

            // Устанавливаем данные пользователя
            userData.value = {
                id: supabaseUser.id,
                name: profile.name,
                email: profile.email || supabaseUser.email,
                birth: profile.birth,
                tariff: profile.tariff || 'neophyte'
            }

            return userData.value
        } catch (error) {
            console.error('Ошибка загрузки пользователя:', error)
            throw error
        }
    }

    /**
     * Обновление профиля пользователя
     */
    const updateProfile = async (profileData) => {
        if (!userData.value || !userData.value.id) {
            throw new Error('Пользователь не авторизован')
        }

        try {
            const updatedProfile = await upsertProfile(userData.value.id, profileData)
            
            // Обновляем локальные данные
            userData.value = {
                ...userData.value,
                ...profileData
            }

            return updatedProfile
        } catch (error) {
            console.error('Ошибка обновления профиля:', error)
            throw error
        }
    }

    /**
     * Выход из системы
     */
    const signOut = async () => {
        try {
            await supabaseSignOut()
            userData.value = null
        } catch (error) {
            console.error('Ошибка выхода:', error)
            throw error
        }
    }

    return { 
        userData,
        isAuthenticated,
        tariffs, 
        currentTariff, 
        canAccessSpread,
        getRequiredTariffForSpread,
        loadUserFromSupabase,
        updateProfile,
        signOut
    }
})
