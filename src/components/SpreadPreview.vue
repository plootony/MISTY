<script setup>
import { computed } from 'vue';

const props = defineProps({
    spreadId: {
        type: String,
        required: true
    },
    cardsCount: {
        type: Number,
        required: true
    }
});

const spreadClass = computed(() => `spread-preview--${props.spreadId}`);
</script>

<template>
    <div class="spread-preview" :class="spreadClass">
        <div 
            v-for="index in cardsCount" 
            :key="index"
            class="spread-preview__card"
        >
            <img 
                class="spread-preview__card-image" 
                src="@/assets/images/card-back.png" 
                alt="Карта Таро"
            >
        </div>
    </div>
</template>

<style scoped lang="scss">
@use "../assets/scss/vars.scss" as *;

.spread-preview {
    display: flex;
    gap: 6px;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
    position: relative;
    min-height: 120px;

    &__card {
        width: 30px;
        height: 45px;
        background-color: $color-bg-dark;
        border-radius: 3px;
        box-shadow: 0px 2px 8px 0px rgba(10, 10, 12, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
    }

    &__card-image {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    // Одна карта - по центру
    &--one-card {
        min-height: 80px;

        .spread-preview__card {
            position: relative;
        }
    }

    // Три карты - в линию
    &--three-cards {
        min-height: 80px;

        .spread-preview__card {
            position: relative;
        }
    }

    // Кельтский крест - крест + столбец
    &--celtic-cross {
        flex-wrap: wrap;
        justify-content: center;
        min-height: 150px;

        .spread-preview__card {
            position: absolute;
            width: 25px;
            height: 38px;

            // Центральный крест
            &:nth-child(1) { left: 50%; top: 50%; transform: translate(-50%, -50%); }
            &:nth-child(2) { left: 50%; top: 50%; transform: translate(-50%, -50%) rotate(90deg); }
            &:nth-child(3) { left: calc(50% - 48px); top: 50%; transform: translate(-50%, -50%); }
            &:nth-child(4) { left: calc(50% + 48px); top: 50%; transform: translate(-50%, -50%); }
            &:nth-child(5) { left: 50%; top: calc(50% - 36px); transform: translate(-50%, -50%); }
            &:nth-child(6) { left: 50%; top: calc(50% + 36px); transform: translate(-50%, -50%); }

            // Столбец справа
            &:nth-child(7) { left: calc(50% + 96px); top: calc(50% - 54px); transform: translate(-50%, -50%); }
            &:nth-child(8) { left: calc(50% + 96px); top: calc(50% - 18px); transform: translate(-50%, -50%); }
            &:nth-child(9) { left: calc(50% + 96px); top: calc(50% + 18px); transform: translate(-50%, -50%); }
            &:nth-child(10) { left: calc(50% + 96px); top: calc(50% + 54px); transform: translate(-50%, -50%); }
        }
    }

    // Подкова - полукруг
    &--horseshoe {
        min-height: 120px;

        .spread-preview__card {
            position: absolute;
            width: 25px;
            height: 38px;

            &:nth-child(1) { left: calc(50% - 81px); top: 50%; transform: translate(-50%, -50%) rotate(-30deg); }
            &:nth-child(2) { left: calc(50% - 54px); top: calc(50% - 22px); transform: translate(-50%, -50%) rotate(-20deg); }
            &:nth-child(3) { left: calc(50% - 27px); top: calc(50% - 32px); transform: translate(-50%, -50%) rotate(-10deg); }
            &:nth-child(4) { left: 50%; top: calc(50% - 35px); transform: translate(-50%, -50%); }
            &:nth-child(5) { left: calc(50% + 27px); top: calc(50% - 32px); transform: translate(-50%, -50%) rotate(10deg); }
            &:nth-child(6) { left: calc(50% + 54px); top: calc(50% - 22px); transform: translate(-50%, -50%) rotate(20deg); }
            &:nth-child(7) { left: calc(50% + 81px); top: 50%; transform: translate(-50%, -50%) rotate(30deg); }
        }
    }

    // Годовой круг - по кругу (12 карт)
    &--year-circle {
        min-height: 165px;

        .spread-preview__card {
            position: absolute;
            width: 25px;
            height: 38px;

            // 12 позиций по кругу (начиная с 12 часов)
            &:nth-child(1) { left: 50%; top: calc(50% - 63px); transform: translate(-50%, -50%); }
            &:nth-child(2) { left: calc(50% + 32px); top: calc(50% - 55px); transform: translate(-50%, -50%) rotate(30deg); }
            &:nth-child(3) { left: calc(50% + 55px); top: calc(50% - 32px); transform: translate(-50%, -50%) rotate(60deg); }
            &:nth-child(4) { left: calc(50% + 63px); top: 50%; transform: translate(-50%, -50%) rotate(90deg); }
            &:nth-child(5) { left: calc(50% + 55px); top: calc(50% + 32px); transform: translate(-50%, -50%) rotate(120deg); }
            &:nth-child(6) { left: calc(50% + 32px); top: calc(50% + 55px); transform: translate(-50%, -50%) rotate(150deg); }
            &:nth-child(7) { left: 50%; top: calc(50% + 63px); transform: translate(-50%, -50%) rotate(180deg); }
            &:nth-child(8) { left: calc(50% - 32px); top: calc(50% + 55px); transform: translate(-50%, -50%) rotate(210deg); }
            &:nth-child(9) { left: calc(50% - 55px); top: calc(50% + 32px); transform: translate(-50%, -50%) rotate(240deg); }
            &:nth-child(10) { left: calc(50% - 63px); top: 50%; transform: translate(-50%, -50%) rotate(270deg); }
            &:nth-child(11) { left: calc(50% - 55px); top: calc(50% - 32px); transform: translate(-50%, -50%) rotate(300deg); }
            &:nth-child(12) { left: calc(50% - 32px); top: calc(50% - 55px); transform: translate(-50%, -50%) rotate(330deg); }
        }
    }
}
</style>

