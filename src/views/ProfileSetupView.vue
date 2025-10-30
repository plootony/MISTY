<script setup>
import { ref } from 'vue';
import PhotoUpload from '@/components/PhotoUpload.vue';

const name = ref('');
const birthDate = ref('');
const agreedToTerms = ref(false);
</script>

<template>
    <div class="profile-setup">
        <div class="profile-setup__container">
            <div class="profile-setup__header">
                <img src="@/assets/images/stars-icon.png" alt="star icon" class="profile-setup__icon">
                <h1 class="profile-setup__title">Расскажите о себе</h1>
                <p class="profile-setup__subtitle">
                    Эти данные помогут персонализировать ваши гадания
                </p>
            </div>

            <form class="profile-setup__form">
                <PhotoUpload />

                <div class="profile-setup__field">
                    <label class="profile-setup__label" for="name">Имя</label>
                    <input 
                        v-model="name"
                        type="text" 
                        id="name"
                        class="profile-setup__input" 
                        placeholder="Как к вам обращаться?"
                    >
                </div>

                <div class="profile-setup__field">
                    <label class="profile-setup__label" for="birth-date">Дата рождения</label>
                    <input 
                        v-model="birthDate"
                        type="date" 
                        id="birth-date"
                        class="profile-setup__input"
                    >
                    <p class="profile-setup__hint">
                        Дата рождения поможет делать более точные предсказания
                    </p>
                </div>

                <div class="profile-setup__terms">
                    <label class="profile-setup__checkbox-label">
                        <input 
                            v-model="agreedToTerms"
                            type="checkbox" 
                            class="profile-setup__checkbox"
                        >
                        <span class="profile-setup__checkbox-text">
                            Я согласен с правилами сервиса
                        </span>
                    </label>
                </div>

                <button type="submit" class="btn btn--primary profile-setup__submit">
                    Продолжить
                </button>
            </form>
        </div>
    </div>
</template>

<style scoped lang="scss">
@use "../assets/scss/vars.scss" as *;

.profile-setup {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: $spacing-large $spacing-middle;

    &__container {
        max-width: 540px;
        width: 100%;
        background-color: $color-bg-light;
        padding: $spacing-large;
        box-shadow: 0px 15px 35px 0px rgba(10, 10, 12, 0.3215686274509804);
    }

    &__header {
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        gap: $spacing-small;
        margin-bottom: $spacing-large;
    }

    &__icon {
        width: 42px;
        height: auto;
    }

    &__title {
        font-family: "Playfair Display", Sans-serif;
        font-size: 42px;
        font-weight: 600;
        color: $color-white;
    }

    &__subtitle {
        font-family: "Inter", Sans-serif;
        font-size: 15px;
        color: $color-grey;
        line-height: 1.5;
    }

    &__form {
        display: flex;
        flex-direction: column;
        gap: $spacing-middle;
        padding: $spacing-middle 0;
    }

    &__field {
        display: flex;
        flex-direction: column;
        gap: $spacing-x-smal;
    }

    &__label {
        font-family: "Inter", Sans-serif;
        font-size: 14px;
        font-weight: 600;
        color: $color-white;
        text-transform: uppercase;
        letter-spacing: 0.5px;
    }

    &__input {
        font-family: "Playfair Display", Sans-serif;
        font-size: 16px;
        padding: $spacing-middle;
        background-color: $color-bg-dark;
        color: $color-white;
        border: 2px solid transparent;
        outline: none;
        transition: border-color 0.3s;

        &::placeholder {
            color: $color-grey;
        }

        &:focus {
            border-color: $color-pastel-orange;
        }

        &[type="date"] {
            color-scheme: dark;
        }
    }

    &__hint {
        font-family: "Inter", Sans-serif;
        font-size: 13px;
        color: $color-grey;
        font-style: italic;
    }

    &__terms {
        display: flex;
        align-items: center;
        padding: $spacing-small 0;
    }

    &__checkbox-label {
        display: flex;
        align-items: center;
        gap: $spacing-small;
        cursor: pointer;
        user-select: none;
    }

    &__checkbox {
        width: 20px;
        height: 20px;
        cursor: pointer;
        accent-color: $color-pastel-orange;
    }

    &__checkbox-text {
        font-family: "Inter", Sans-serif;
        font-size: 14px;
        color: $color-white;
    }

    &__submit {
        margin-top: $spacing-small;
        width: 100%;
    }
}
</style>

