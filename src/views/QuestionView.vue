<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/user.store';
import { useModalStore } from '@/stores/modal.store';
import NotificationToast from '@/components/NotificationToast.vue';
import ButtonSpinner from '@/components/ButtonSpinner.vue';

const router = useRouter();
const userStore = useUserStore();
const modalStore = useModalStore();
const question = ref('');
const isLoading = ref(false);

const notification = ref({
    show: false,
    type: 'error',
    message: ''
});

// Список запрещенных слов (можно расширить)
const forbiddenWords = ['дурак', 'идиот', 'тупой', 'урод', 'мразь'];

const validateQuestion = (text) => {
    // Проверка на пустой вопрос
    if (!text.trim()) {
        return {
            valid: false,
            message: 'Пожалуйста, задайте вопрос'
        };
    }

    // Проверка минимальной длины
    if (text.trim().length < 10) {
        return {
            valid: false,
            message: 'Вопрос слишком короткий. Минимум 10 символов'
        };
    }

    // Проверка на оскорбительные слова
    const lowerText = text.toLowerCase();
    const foundForbidden = forbiddenWords.find(word => lowerText.includes(word));
    if (foundForbidden) {
        return {
            valid: false,
            message: 'Вопрос содержит недопустимые выражения. Пожалуйста, перефразируйте'
        };
    }

    // Проверка на чрезмерное использование заглавных букв (CAPS LOCK)
    const uppercaseCount = (text.match(/[A-ZА-Я]/g) || []).length;
    const totalLetters = (text.match(/[a-zA-Zа-яА-Я]/g) || []).length;
    if (totalLetters > 0 && uppercaseCount / totalLetters > 0.7) {
        return {
            valid: false,
            message: 'Пожалуйста, не используйте CAPS LOCK'
        };
    }

    return { valid: true };
};

const showNotification = (type, message) => {
    notification.value = {
        show: true,
        type,
        message
    };

    // Автоматически скрыть через 5 секунд
    setTimeout(() => {
        notification.value.show = false;
    }, 5000);
};

const closeNotification = () => {
    notification.value.show = false;
};

const submitQuestion = async () => {
    const validation = validateQuestion(question.value);
    
    if (!validation.valid) {
        showNotification('error', validation.message);
        return;
    }

    isLoading.value = true;

    // Имитация проверки вопроса на сервере (можно заменить на реальный API запрос)
    await new Promise(resolve => setTimeout(resolve, 1500));

    isLoading.value = false;
    modalStore.userQuestion = question.value;
    router.push('/card-selection');
};
</script>

<template>
    <div class="question">
        <NotificationToast 
            :show="notification.show"
            :type="notification.type"
            :message="notification.message"
            @close="closeNotification"
        />

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
                :disabled="isLoading"
            ></textarea>
            
            <button 
                class="btn btn--primary" 
                @click="submitQuestion"
                :disabled="isLoading"
            >
                <ButtonSpinner v-if="isLoading" />
                <span>Задать вопрос</span>
            </button>
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
        transition: opacity 0.3s;

        &::placeholder {
            color: $color-grey;
        }

        &:focus {
            outline: 2px solid $color-pastel-orange;
        }

        &:disabled {
            opacity: 0.6;
            cursor: not-allowed;
        }
    }
}

// Стили для кнопки с disabled состоянием
.btn {
    &:disabled {
        opacity: 0.7;
        cursor: not-allowed;
    }
}
</style>

