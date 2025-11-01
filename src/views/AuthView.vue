<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { signInWithGoogle } from '@/services/supabase.service';
import ButtonSpinner from '@/components/ButtonSpinner.vue';

const router = useRouter();

const isLoading = ref(false);
const error = ref('');

const handleGoogleLogin = async () => {
    try {
        isLoading.value = true;
        error.value = '';
        await signInWithGoogle();
        // Редирект произойдет автоматически через OAuth
    } catch (err) {
        console.error('Ошибка входа через Google:', err);
        error.value = 'Не удалось войти через Google. Попробуйте еще раз.';
        isLoading.value = false;
    }
};
</script>

<template>
    <div class="auth">
        <div class="auth__container">
            <div class="auth__header">
                <img src="@/assets/images/stars-icon.png" alt="star icon" class="auth__icon">
                <h1 class="auth__title">Добро пожаловать</h1>
                <p class="auth__subtitle">
                    Войдите через Google, чтобы начать гадание
                </p>
            </div>

            <div v-if="error" class="auth__error">
                {{ error }}
            </div>

            <button 
                @click="handleGoogleLogin" 
                class="btn btn--google auth__google-btn"
                :disabled="isLoading"
            >
                <ButtonSpinner v-if="isLoading" />
                <svg v-else class="auth__google-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                <span>{{ isLoading ? 'Вход...' : 'Войти через Google' }}</span>
            </button>
        </div>
    </div>
</template>

<style scoped lang="scss">
@use "../assets/scss/vars.scss" as *;

.auth {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: $spacing-large $spacing-middle;

    &__container {
        max-width: 480px;
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

    &__error {
        padding: $spacing-middle;
        background-color: rgba(255, 84, 84, 0.1);
        border-left: 3px solid $color-orange;
        color: $color-orange;
        font-family: "Inter", Sans-serif;
        font-size: 14px;
        margin-bottom: $spacing-middle;
    }

    &__google-btn {
        width: 100%;
        background-color: $color-white;
        color: #1f1f1f;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: $spacing-small;
        padding: $spacing-middle $spacing-large;
        font-family: "DM Sans", Sans-serif;
        font-size: 18px;
        font-weight: 600;
        transition: all 0.3s;
        border: 2px solid transparent;

        &:hover:not(:disabled) {
            background-color: #f8f8f8;
            cursor: pointer;
        }

        &:disabled {
            opacity: 0.7;
            cursor: not-allowed;
        }
    }

    &__google-icon {
        width: 24px;
        height: 24px;
    }
}

.btn--google {
    background-color: $color-white;
    color: #1f1f1f;

    &:hover:not(:disabled) {
        background-color: #f8f8f8;
        opacity: 1;
    }
}
</style>
