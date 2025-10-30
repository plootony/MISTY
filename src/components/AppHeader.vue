<script setup>
import { useUserStore } from '@/stores/user.store';

const userStore = useUserStore();
</script>

<template>
    <header class="header">
        <div class="header__container">
            <RouterLink to="/" class="header__logo">
                <img src="@/assets/images/stars-icon.png" alt="Misty" class="header__logo-icon">
                <span class="header__logo-text">Misty</span>
            </RouterLink>

            <nav class="header__nav">
                <RouterLink to="/" class="header__link">Главная</RouterLink>
                <RouterLink to="/profile" class="header__link header__link--profile">
                    <span class="header__user-name">{{ userStore.userData.name }}</span>
                    <span class="header__profile-icon">👤</span>
                </RouterLink>
            </nav>
        </div>
    </header>
</template>

<style scoped lang="scss">
@use "../assets/scss/vars.scss" as *;

.header {
    background-color: $color-bg-light;
    box-shadow: 0px 4px 12px 0px rgba(10, 10, 12, 0.3);
    position: sticky;
    top: 0;
    z-index: 100;

    &__container {
        max-width: 1440px;
        margin: 0 auto;
        padding: $spacing-middle $spacing-large;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    &__logo {
        display: flex;
        align-items: center;
        gap: $spacing-small;
        text-decoration: none;
        transition: opacity 0.3s;

        &:hover {
            opacity: 0.8;
        }
    }

    &__logo-icon {
        width: 32px;
        height: auto;
    }

    &__logo-text {
        font-family: "Playfair Display", Sans-serif;
        font-size: 24px;
        font-weight: 600;
        color: $color-white;
    }

    &__nav {
        display: flex;
        align-items: center;
        gap: $spacing-large;
    }

    &__link {
        font-family: "Inter", Sans-serif;
        font-size: 15px;
        font-weight: 500;
        color: $color-grey;
        text-decoration: none;
        transition: color 0.3s;

        &:hover {
            color: $color-white;
        }

        &.router-link-active {
            color: $color-pastel-orange;
        }

        &--profile {
            display: flex;
            align-items: center;
            gap: $spacing-x-smal;
            padding: $spacing-x-smal $spacing-middle;
            background-color: $color-bg-dark;
            border: 2px solid transparent;
            transition: border-color 0.3s;

            &:hover {
                border-color: $color-pastel-orange;
            }

            &.router-link-active {
                border-color: $color-orange;
            }
        }
    }

    &__user-name {
        color: $color-white;
    }

    &__profile-icon {
        font-size: 18px;
    }
}
</style>

