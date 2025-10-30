<script setup>
import { useCardSelector } from '@/stores/cardSelector.store';

const cardStore = useCardSelector();
</script>

<template>
    <div class="modal">
        <div class="modal__overlay"></div>
        <div class="modal__container">
            <div class="modal__content modal__content--card-result">
                <div class="card-result">
                    <div class="card-result__card">
                        <img src="@/assets/images/card.png" alt="Карта Таро" class="card-result__card-image">
                    </div>

                    <div class="card-result__content">
                        <div class="card-result__header">
                            <img src="@/assets/images/stars-icon.png" alt="star icon" class="card-result__icon">
                            <p class="card-result__label">СТАРШИЙ АРКАН</p>
                            <h1 class="card-result__title">КОЛЕСО ФОРТУНЫ</h1>
                            <p class="card-result__position">Прямое положение</p>
                        </div>

                        <div class="card-result__description">
                            <p class="card-result__text">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                                Etiam mi tellus, pulvinar vel tempus eget, finibus vitae ante. 
                                Fusce sit amet velit eleifend, iaculis velit quis, malesuada 
                                lacus. Vestibulum sodales magna a volutpat tempus. Mauris 
                                vestibulum id urna viverra ultrices. Nullam rhoncus elit eget 
                                libero varius dapibus.
                            </p>
                        </div>

                        <button class="btn btn--primary">Далее</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
@use "../assets/scss/vars.scss" as *;

.modal {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1000;
    display: flex;
    align-items: center;
    justify-content: center;

    &__overlay {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, 0.8);
    }

    &__container {
        position: relative;
        z-index: 1001;
        max-width: 90vw;
        max-height: 90vh;
        overflow: auto;
    }

    &__content {
        background-color: $color-bg-light;
        box-shadow: 0px 15px 35px 0px rgba(10, 10, 12, 0.3215686274509804);
    }
}

.card-result {
    display: flex;
    gap: $spacing-large;
    align-items: center;
    padding: $spacing-large;

    &__card {
        flex-shrink: 0;
    }

    &__card-image {
        max-width: 350px;
        width: 100%;
        height: auto;
        border-radius: 12px;
    }

    &__content {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: $spacing-middle;
    }

    &__header {
        display: flex;
        flex-direction: column;
        gap: $spacing-x-smal;
    }

    &__icon {
        width: 42px;
        height: auto;
        margin-bottom: $spacing-x-smal;
    }

    &__label {
        font-family: "Inter", Sans-serif;
        color: $color-pastel-orange;
        font-size: 14px;
        font-weight: 800;
        text-transform: uppercase;
        letter-spacing: 1px;
    }

    &__title {
        font-family: "Playfair Display", Sans-serif;
        font-size: 42px;
        font-weight: 600;
        line-height: 1.3em;
        color: $color-white;
    }

    &__position {
        font-family: "Inter", Sans-serif;
        font-size: 16px;
        color: $color-grey;
    }

    &__description {
        flex: 1;
    }

    &__text {
        font-family: "Inter", Sans-serif;
        font-size: 16px;
        line-height: 1.6;
        color: $color-white;
    }
}
</style>

