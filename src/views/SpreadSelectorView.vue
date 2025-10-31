<script setup>
import { useRouter } from 'vue-router';
import { useSpreadSelector } from '@/stores/spreadSelector.store';
import { useUserStore } from '@/stores/user.store';
import { useModalStore } from '@/stores/modal.store';
import SpreadPreview from '@/components/SpreadPreview.vue';

const router = useRouter();
const spreadStore = useSpreadSelector();
const userStore = useUserStore();
const modalStore = useModalStore();

const selectSpread = (spread) => {
    modalStore.selectedSpread = spread;
    router.push('/question');
};
</script>

<template>
    <div class="spread-selector">
        <div class="spread-selector__header">
            <img src="@/assets/images/stars-icon.png" alt="star icon" class="spread-selector__icon">
            <p class="spread-selector__greeting">ПРИВЕТСТВУЮ ТЕБЯ, {{ userStore.userData.name.toUpperCase() }}</p>
            <h1 class="spread-selector__title">Сделай свой выбор</h1>
        </div>

        <div class="spread-selector__grid">
            <div 
                v-for="spread in spreadStore.spreads" 
                :key="spread.id" 
                class="spread-selector__card"
                @click="selectSpread(spread)"
            >
                <div class="spread-selector__card-preview">
                    <SpreadPreview 
                        :spread-id="spread.id" 
                        :cards-count="spread.cardsCount"
                    />
                </div>
                <div class="spread-selector__card-body">
                    <strong class="spread-selector__card-title">{{ spread.name }}</strong>
                    <p class="spread-selector__card-subtitle">{{ spread.description }}</p>
                    <span class="spread-selector__card-link">Выбрать →</span>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
@use "../assets/scss/vars.scss" as *;

.spread-selector {
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

    &__grid {
        display: flex;
        flex-wrap: wrap;
        gap: $spacing-middle;
        max-width: 1200px;
        width: 100%;
    }

    &__card {
        padding: $spacing-middle;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: $spacing-middle;
        font-family: "Playfair Display", Sans-serif;
        background-color: $color-bg-light;
        box-shadow: 0px 15px 35px 0px rgba(10, 10, 12, 0.3215686274509804);
        cursor: pointer;
        flex: 1 1 calc(33.333% - $spacing-middle);
        min-width: 320px;

        &:hover {
            outline: 2px solid $color-orange;
        }
    }

    &__card-preview {
        width: 100%;
        min-height: 140px;
        flex-shrink: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: $color-bg-dark;
        border-radius: 4px;
        padding: $spacing-middle;
    }

    &__card-body {
        display: flex;
        flex-direction: column;
        gap: $spacing-x-smal;
        flex: 1;
    }

    &__card-title {
        font-size: 20px;
        color: $color-white;
        font-weight: 600;
    }

    &__card-subtitle {
        font-size: 14px;
        color: $color-grey;
        line-height: 1.4;
    }

    &__card-link {
        font-weight: bold;
        font-size: 14px;
        text-transform: uppercase;
        color: $color-pastel-orange;
    }
}
</style>

