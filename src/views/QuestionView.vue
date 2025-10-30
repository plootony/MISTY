<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/user.store';
import { useModalStore } from '@/stores/modal.store';

const router = useRouter();
const userStore = useUserStore();
const modalStore = useModalStore();
const question = ref('');

const submitQuestion = () => {
    modalStore.userQuestion = question.value;
    router.push('/card-selection');
};
</script>

<template>
    <div class="question">
        <div class="question__header">
            <img src="@/assets/images/stars-icon.png" alt="star icon" class="question__icon">
            <p class="question__greeting">ПРИВЕТСТВУЮ ТЕБЯ, {{ userStore.userData.name.toUpperCase() }}</p>
            <h1 class="question__title">Задай свой вопрос</h1>
            <p class="question__subtitle">Хорошо подумай прежде, чем задать вопрос</p>
        </div>

        <div class="question__content">
            <textarea 
                v-model="question"
                class="question__textarea" 
                name="spreadText" 
                placeholder="Что делать, если не к чему стремиться?"
            ></textarea>
            
            <button class="btn btn--primary" @click="submitQuestion">Задать вопрос</button>
        </div>
    </div>
</template>

<style scoped lang="scss">
@use "../assets/scss/vars.scss" as *;

.question {
    min-height: 100vh;
    padding: $spacing-large $spacing-middle;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: $spacing-large;

    &__header {
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        gap: $spacing-small;
    }

    &__icon {
        width: 42px;
        height: auto;
    }

    &__greeting {
        font-family: "Inter", Sans-serif;
        color: $color-pastel-orange;
        font-size: 14px;
        font-weight: 800;
        text-transform: uppercase;
        letter-spacing: 1px;
    }

    &__title {
        font-family: "Playfair Display", Sans-serif;
        font-size: 46px;
        font-weight: 600;
        line-height: 1.3em;
        color: $color-white;
    }

    &__subtitle {
        font-family: "Inter", Sans-serif;
        font-size: 16px;
        color: $color-grey;
    }

    &__content {
        max-width: 920px;
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        gap: $spacing-middle;
    }

    &__textarea {
        font-family: "Playfair Display", Sans-serif;
        font-size: 18px;
        padding: $spacing-middle;
        width: 100%;
        min-height: 290px;
        background-color: $color-bg-light;
        color: $color-white;
        border: none;
        outline: none;
        resize: none;

        &::placeholder {
            color: $color-grey;
        }

        &:focus {
            outline: 2px solid $color-pastel-orange;
        }
    }
}
</style>

