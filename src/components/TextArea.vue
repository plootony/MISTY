<template>
    <textarea class="text-area" name="spreadText" placeholder="Напишите ваш вопрос здесь..."></textarea>
</template>

<style scoped lang="scss">
@use "../assets/scss/vars.scss" as *;

.text-area {
    font-family: "Playfair Display", Sans-serif;
    font-size: 18px;
    padding: $spacing-middle;
    max-width: 920px;
    width: 100%;
    min-height: 290px;
    background-color: $color-bg-dark;
    color: $color-white;

    &::placeholder {
        color: $color-grey;
    }

    &:active {
        outline: 1px solid $color-pastel-orange;
    }
}
</style>