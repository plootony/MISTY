import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useModalStore = defineStore('modalStore', () => {
    const isCardResultModalOpen = ref(false)
    const isAnswerModalOpen = ref(false)
    const selectedCards = ref([])
    const selectedSpread = ref(null)
    const userQuestion = ref('')

    const openCardResultModal = () => {
        isCardResultModalOpen.value = true
    }

    const closeCardResultModal = () => {
        isCardResultModalOpen.value = false
    }

    const openAnswerModal = () => {
        isAnswerModalOpen.value = true
    }

    const closeAnswerModal = () => {
        isAnswerModalOpen.value = false
    }

    const addSelectedCard = (card) => {
        if (selectedCards.value.length < (selectedSpread.value?.cardsCount || 3)) {
            selectedCards.value.push(card)
        }
    }

    const resetSelection = () => {
        selectedCards.value = []
        selectedSpread.value = null
        userQuestion.value = ''
        isCardResultModalOpen.value = false
        isAnswerModalOpen.value = false
    }

    return {
        isCardResultModalOpen,
        isAnswerModalOpen,
        selectedCards,
        selectedSpread,
        userQuestion,
        openCardResultModal,
        closeCardResultModal,
        openAnswerModal,
        closeAnswerModal,
        addSelectedCard,
        resetSelection
    }
})

