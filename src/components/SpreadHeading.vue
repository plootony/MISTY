<template>
    <div class="heading">
        <img src="@/assets/images/stars-icon.png" alt="star icon" class="heading__image">
        <h2 class="heading__subtitle">Tarot is a power </h2>
        <h1 class="heading__title">Lorem ipsum dolor sit amet, consectetur</h1>
    </div>
</template>


<style scoped lang="scss">
@use "../assets/scss/vars.scss" as *;

.heading {
    max-width: 560px;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: $spacing-small;

    &__image {
        width: 42px;
        height: auto
    }

    &__title {
        font-family: "Playfair Display", Sans-serif;
        font-size: 46px;
        font-weight: 600;
        line-height: 1.3em;
        letter-spacing: 0px;
    }

    &__subtitle {
        font-family: "Inter", Sans-serif;
        color: $color-pastel-orange;
        font-size: 17px;
        font-weight: 800;
        text-transform: uppercase;
        line-height: 1.4em;
        letter-spacing: 1px;
    }
}
</style>