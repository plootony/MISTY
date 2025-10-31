<template>
    <div class="spinner">
        <div class="spinner__circle"></div>
    </div>
</template>

<style scoped lang="scss">
@use "../assets/scss/vars.scss" as *;

.spinner {
    display: inline-flex;
    align-items: center;
    justify-content: center;

    &__circle {
        width: 20px;
        height: 20px;
        border: 2px solid rgba($color-white, 0.3);
        border-top-color: $color-white;
        border-radius: 50%;
        animation: spin 0.8s linear infinite;
    }
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}
</style>

