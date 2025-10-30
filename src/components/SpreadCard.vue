<template>
    <div class="spread-card">
        <img src="@/assets/images/card-5.png" alt="spread image" class="spread-card__image">
        <div class="spread-card__body">
            <strong class="spread-card__title">Одна карта</strong>
            <p class="spread-card__subtitle">Secure payment methods</p>
            <span class="spread-card__link">Learn more </span>
        </div>
    </div>
</template>


<style scoped lang="scss">
@use "../assets/scss/vars.scss" as *;

.spread-card {
    width: 25%;
    height: 170px;
    padding: $spacing-large $spacing-middle;
    display: flex;
    align-items: center;
    gap: $spacing-small;
    font-family: "Playfair Display", Sans-serif;
    background-color: $color-bg-light;
    box-shadow: 0px 15px 35px 0px rgba(10, 10, 12, 0.3215686274509804);

    &:hover,
    &.is-active {
        cursor: pointer;
        outline: 1px solid $color-orange;
    }

    &__image {
        width: 112px;
        height: auto;
        border-radius: 2px;
    }

    &__body {
        display: flex;
        flex-direction: column;
        gap: $spacing-small;
    }

    &__title {
        font-size: 22px;
        color: $color-white;
    }

    &__subtitle {
        font-size: 15px;
        color: $color-grey;
    }

    &__link {
        font-weight: bold;
        font-size: 16px;
        text-transform: uppercase;
        color: $color-pastel-orange;
    }
}
</style>