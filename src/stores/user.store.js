import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('userStore', () => {
    const userData = ref({
        id: 1,
        name: 'Антон',
        birth: '03.06.1991'
    })

    return { userData }
})
