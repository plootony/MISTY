<script setup>
import { ref } from 'vue';

const name = ref('');
const birthDate = ref('');
const photoPreview = ref(null);
const agreedToTerms = ref(false);

const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            photoPreview.value = e.target.result;
        };
        reader.readAsDataURL(file);
    }
};

const removePhoto = () => {
    photoPreview.value = null;
};
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
                <div class="profile-setup__photo-section">
                    <div class="profile-setup__photo-wrapper">
                        <div v-if="photoPreview" class="profile-setup__photo-preview">
                            <img :src="photoPreview" alt="Фото профиля" class="profile-setup__photo-image">
                            <button 
                                type="button" 
                                class="profile-setup__photo-remove"
                                @click="removePhoto"
                            >
                                ✕
                            </button>
                        </div>
                        <div v-else class="profile-setup__photo-placeholder">
                            <span class="profile-setup__photo-icon">📷</span>
                        </div>
                    </div>
                    
                    <label class="profile-setup__photo-label">
                        <input 
                            type="file" 
                            accept="image/*"
                            class="profile-setup__photo-input"
                            @change="handleFileUpload"
                        >
                        <span class="profile-setup__photo-button">
                            {{ photoPreview ? 'Изменить фото' : 'Загрузить фото' }}
                        </span>
                    </label>
                </div>

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
    }

    &__photo-section {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: $spacing-middle;
        padding: $spacing-middle 0;
    }

    &__photo-wrapper {
        position: relative;
    }

    &__photo-preview {
        position: relative;
        width: 150px;
        height: 150px;
        border-radius: 50%;
        overflow: hidden;
        border: 3px solid $color-pastel-orange;
    }

    &__photo-image {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    &__photo-remove {
        position: absolute;
        top: 5px;
        right: 5px;
        width: 30px;
        height: 30px;
        border-radius: 50%;
        background-color: $color-orange;
        color: $color-white;
        border: none;
        font-size: 18px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: opacity 0.3s;

        &:hover {
            opacity: 0.8;
        }
    }

    &__photo-placeholder {
        width: 150px;
        height: 150px;
        border-radius: 50%;
        background-color: $color-bg-dark;
        border: 2px dashed $color-grey;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    &__photo-icon {
        font-size: 48px;
        opacity: 0.5;
    }

    &__photo-input {
        display: none;
    }

    &__photo-label {
        cursor: pointer;
    }

    &__photo-button {
        display: inline-block;
        padding: $spacing-small $spacing-middle;
        background-color: $color-bg-dark;
        color: $color-pastel-orange;
        font-family: "Inter", Sans-serif;
        font-size: 14px;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        transition: background-color 0.3s;

        &:hover {
            background-color: rgba($color-bg-dark, 0.7);
        }
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

