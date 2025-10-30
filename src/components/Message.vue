<template>
    <div class="message">
        <h3 class="message__title">Не шути со вселенной!</h3>
        <p class="message__text">Задавай только правильные вопросы!</p>
    </div>
</template>

<style scoped lang="scss">
@use "../assets/scss/vars.scss" as *;

.message {
    font-family: "Inter", Sans-serif;
    padding: $spacing-middle;
    max-width: 920px;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: $spacing-small;
    background-color: $color-bg-light;
    outline: 1px solid $color-pastel-orange;

    &__title {
        text-transform: uppercase;
        font-weight: bold;
        color: $color-pastel-orange;
    }

    &__text {
        font-size: 15px;
        color: $color-white;
    }
}
</style>