<script setup>
import { useUserStore } from '@/stores/user.store';
import { useCardSelector } from '@/stores/cardSelector.store';
import { useModalStore } from '@/stores/modal.store';
import CardResultModal from '@/components/CardResultModal.vue';
import AnswerModal from '@/components/AnswerModal.vue';
import CardLoader from '@/components/CardLoader.vue';

const userStore = useUserStore();
const cardStore = useCardSelector();
const modalStore = useModalStore();

const selectCard = (card) => {
    const maxCards = modalStore.selectedSpread?.cardsCount || 3;
    if (modalStore.selectedCards.length < maxCards && !modalStore.isLoading) {
        modalStore.addSelectedCard(card);
        modalStore.startLoading();

        setTimeout(() => {
            modalStore.stopLoading();
            modalStore.openCardResultModal();
        }, 2000);
    }
};
</script>

<template>
    <div class="card-selector">
        <div class="card-selector__header">
            <img src="@/assets/images/stars-icon.png" alt="star icon" class="card-selector__icon">
            <p class="card-selector__greeting">ПРИВЕТСТВУЮ ТЕБЯ, {{ userStore.userData.name.toUpperCase() }}</p>
            <h1 class="card-selector__title">Сделай свой выбор</h1>
            <p class="card-selector__subtitle">Не думай. Доверься судьбе. Просто выбери карту</p>
        </div>

        <div class="card-selector__selected">
            <div 
                v-for="index in (modalStore.selectedSpread?.cardsCount || 3)" 
                :key="index"
                class="card-selector__selected-card"
                :class="{ 'card-selector__selected-card--filled': modalStore.selectedCards[index - 1] }"
            >
                <img 
                    v-if="modalStore.selectedCards[index - 1]"
                    class="card-selector__selected-card-image" 
                    src="@/assets/images/card-back.png" 
                    alt="Выбранная карта"
                >
            </div>
        </div>

        <div class="card-selector__deck">
            <div 
                v-for="card in cardStore.deck" 
                :key="card.id" 
                class="card-selector__deck-card"
                @click="selectCard(card)"
            >
                <img 
                    class="card-selector__deck-card-image" 
                    src="@/assets/images/card-back.png" 
                    alt="Карта Таро"
                >
            </div>
        </div>

        <div v-if="modalStore.isLoading" class="card-selector__loader">
            <div class="card-selector__loader-overlay"></div>
            <div class="card-selector__loader-content">
                <CardLoader />
            </div>
        </div>

        <CardResultModal v-if="modalStore.isCardResultModalOpen" />
        <AnswerModal v-if="modalStore.isAnswerModalOpen" />
    </div>
</template>

<style scoped lang="scss">
@use "../assets/scss/vars.scss" as *;

.card-selector {
    min-height: 100vh;
    padding: $spacing-large $spacing-middle;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: $spacing-large;

    &__header {
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        gap: $spacing-small;
    }

    &__icon {
        width: 42px;
        height: auto;
    }

    &__greeting {
        font-family: "Inter", Sans-serif;
        color: $color-pastel-orange;
        font-size: 14px;
        font-weight: 800;
        text-transform: uppercase;
        letter-spacing: 1px;
    }

    &__title {
        font-family: "Playfair Display", Sans-serif;
        font-size: 46px;
        font-weight: 600;
        line-height: 1.3em;
        color: $color-white;
    }

    &__subtitle {
        font-family: "Inter", Sans-serif;
        font-size: 16px;
        color: $color-grey;
    }

    &__selected {
        display: flex;
        gap: $spacing-middle;
        max-width: 1200px;
        width: 100%;
        justify-content: center;
    }

    &__selected-card {
        width: 200px;
        height: 300px;
        background-color: $color-bg-light;
        border-radius: 12px;
        box-shadow: 0px 15px 35px 0px rgba(10, 10, 12, 0.3215686274509804);
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
    }

    &__selected-card-image {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    &__deck {
        display: flex;
        gap: 6px;
        max-width: 1200px;
        width: 100%;
        justify-content: center;
        flex-wrap: wrap;
    }

    &__deck-card {
        width: 70px;
        height: 105px;
        cursor: pointer;
        transition: transform 0.3s;

        &:hover {
            transform: translateY(-12px);
        }
    }

    &__deck-card-image {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 6px;
        box-shadow: 0px 5px 15px 0px rgba(10, 10, 12, 0.5);
    }

    &__loader {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 1000;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    &__loader-overlay {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, 0.8);
    }

    &__loader-content {
        position: relative;
        z-index: 1001;
    }
}
</style>