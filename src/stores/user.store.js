import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

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

    const userData = ref({
        id: 1,
        name: 'Антон',
        birth: '03.06.1991',
        tariff: 'adept' // Текущий тариф пользователя
    })

    const currentTariff = computed(() => tariffs[userData.value.tariff])

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

    return { 
        userData, 
        tariffs, 
        currentTariff, 
        canAccessSpread,
        getRequiredTariffForSpread
    }
})
