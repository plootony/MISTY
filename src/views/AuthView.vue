<script setup>
import { ref } from 'vue';

const isLogin = ref(true);
const email = ref('');
const password = ref('');
const confirmPassword = ref('');

const toggleMode = () => {
    isLogin.value = !isLogin.value;
};
</script>

<template>
    <div class="auth">
        <div class="auth__container">
            <div class="auth__header">
                <img src="@/assets/images/stars-icon.png" alt="star icon" class="auth__icon">
                <h1 class="auth__title">{{ isLogin ? 'Вход' : 'Регистрация' }}</h1>
                <p class="auth__subtitle">
                    {{ isLogin ? 'Войдите, чтобы продолжить гадание' : 'Создайте аккаунт для сохранения результатов' }}
                </p>
            </div>

            <form class="auth__form">
                <div class="auth__field">
                    <label class="auth__label" for="email">Email</label>
                    <input 
                        v-model="email"
                        type="email" 
                        id="email"
                        class="auth__input" 
                        placeholder="your@email.com"
                    >
                </div>

                <div class="auth__field">
                    <label class="auth__label" for="password">Пароль</label>
                    <input 
                        v-model="password"
                        type="password" 
                        id="password"
                        class="auth__input" 
                        placeholder="••••••••"
                    >
                </div>

                <div v-if="!isLogin" class="auth__field">
                    <label class="auth__label" for="confirm-password">Подтвердите пароль</label>
                    <input 
                        v-model="confirmPassword"
                        type="password" 
                        id="confirm-password"
                        class="auth__input" 
                        placeholder="••••••••"
                    >
                </div>

                <button type="submit" class="btn btn--primary auth__submit">
                    {{ isLogin ? 'Войти' : 'Зарегистрироваться' }}
                </button>
            </form>

            <div class="auth__footer">
                <p class="auth__toggle-text">
                    {{ isLogin ? 'Нет аккаунта?' : 'Уже есть аккаунт?' }}
                    <button type="button" class="auth__toggle-link" @click="toggleMode">
                        {{ isLogin ? 'Зарегистрироваться' : 'Войти' }}
                    </button>
                </p>
            </div>
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

    &__form {
        display: flex;
        flex-direction: column;
        gap: $spacing-middle;
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
    }

    &__submit {
        margin-top: $spacing-small;
        width: 100%;
    }

    &__footer {
        margin-top: $spacing-large;
        text-align: center;
    }

    &__toggle-text {
        font-family: "Inter", Sans-serif;
        font-size: 15px;
        color: $color-grey;
    }

    &__toggle-link {
        background: none;
        border: none;
        color: $color-pastel-orange;
        font-family: "Inter", Sans-serif;
        font-size: 15px;
        font-weight: 600;
        cursor: pointer;
        text-decoration: underline;
        transition: color 0.3s;

        &:hover {
            color: $color-orange;
        }
    }
}
</style>
