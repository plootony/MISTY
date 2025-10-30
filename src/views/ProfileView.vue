<script setup>
import { ref } from 'vue';
import { useUserStore } from '@/stores/user.store';
import PhotoUpload from '@/components/PhotoUpload.vue';

const userStore = useUserStore();

const name = ref(userStore.userData.name);
const birthDate = ref(userStore.userData.birth);

// Моковая история запросов
const historyItems = ref([
    {
        id: 1,
        date: '25.10.2024',
        question: 'Что делать, если не к чему стремиться?',
        spread: {
            name: 'Три карты',
            cardsCount: 3
        },
        cards: [
            { name: 'Шут', position: 'Прямое', description: 'Свобода, начало, спонтанность' },
            { name: 'Маг', position: 'Прямое', description: 'Воля, концентрация, мастерство' },
            { name: 'Жрица', position: 'Перевернутое', description: 'Секреты, самообман' }
        ],
        finalReading: 'Это время для нового начала. Используйте свою силу воли и внутреннюю мудрость.'
    },
    {
        id: 2,
        date: '20.10.2024',
        question: 'Какие перспективы в карьере?',
        spread: {
            name: 'Одна карта',
            cardsCount: 1
        },
        cards: [
            { name: 'Колесо фортуны', position: 'Прямое', description: 'Судьба, перемены, поворот событий' }
        ],
        finalReading: 'Грядут значительные перемены. Будьте готовы к новым возможностям.'
    }
]);

const activeAccordion = ref(null);

const toggleAccordion = (id) => {
    activeAccordion.value = activeAccordion.value === id ? null : id;
};
</script>

<template>
    <div class="profile">
        <div class="profile__container">
            <h1 class="profile__main-title">Личный кабинет</h1>

            <div class="profile__content">
                <!-- Форма редактирования профиля -->
                <section class="profile__section">
                    <h2 class="profile__section-title">Мой профиль</h2>
                    
                    <form class="profile__form">
                        <PhotoUpload />

                        <div class="profile__field">
                            <label class="profile__label" for="name">Имя</label>
                            <input 
                                v-model="name"
                                type="text" 
                                id="name"
                                class="profile__input"
                            >
                        </div>

                        <div class="profile__field">
                            <label class="profile__label" for="birth-date">Дата рождения</label>
                            <input 
                                v-model="birthDate"
                                type="date" 
                                id="birth-date"
                                class="profile__input"
                            >
                        </div>

                        <button type="submit" class="btn btn--primary profile__submit">
                            Сохранить изменения
                        </button>
                    </form>
                </section>

                <!-- История запросов -->
                <section class="profile__section">
                    <h2 class="profile__section-title">История гаданий</h2>
                    
                    <div class="profile__history">
                        <div 
                            v-for="item in historyItems" 
                            :key="item.id"
                            class="history-item"
                            :class="{ 'history-item--active': activeAccordion === item.id }"
                        >
                            <button 
                                type="button"
                                class="history-item__header"
                                @click="toggleAccordion(item.id)"
                            >
                                <div class="history-item__info">
                                    <span class="history-item__date">{{ item.date }}</span>
                                    <h3 class="history-item__question">{{ item.question }}</h3>
                                    <span class="history-item__spread">{{ item.spread.name }}</span>
                                </div>
                                <span class="history-item__icon">
                                    {{ activeAccordion === item.id ? '−' : '+' }}
                                </span>
                            </button>

                            <div 
                                v-if="activeAccordion === item.id"
                                class="history-item__content"
                            >
                                <div class="history-item__cards">
                                    <h4 class="history-item__subtitle">Выпавшие карты:</h4>
                                    <div 
                                        v-for="(card, index) in item.cards" 
                                        :key="index"
                                        class="card-detail"
                                    >
                                        <div class="card-detail__header">
                                            <span class="card-detail__number">{{ index + 1 }}</span>
                                            <span class="card-detail__name">{{ card.name }}</span>
                                            <span class="card-detail__position">{{ card.position }}</span>
                                        </div>
                                        <p class="card-detail__description">{{ card.description }}</p>
                                    </div>
                                </div>

                                <div class="history-item__final">
                                    <h4 class="history-item__subtitle">Итоговое толкование:</h4>
                                    <p class="history-item__reading">{{ item.finalReading }}</p>
                                </div>
                            </div>
                        </div>

                        <p v-if="historyItems.length === 0" class="profile__empty">
                            У вас пока нет гаданий
                        </p>
                    </div>
                </section>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
@use "../assets/scss/vars.scss" as *;

.profile {
    min-height: 100vh;
    padding: $spacing-large $spacing-middle;

    &__container {
        max-width: 1200px;
        margin: 0 auto;
    }

    &__main-title {
        font-family: "Playfair Display", Sans-serif;
        font-size: 48px;
        font-weight: 600;
        color: $color-white;
        text-align: center;
        margin-bottom: $spacing-large;
    }

    &__content {
        display: grid;
        grid-template-columns: 1fr 2fr;
        gap: $spacing-large;
    }

    &__section {
        background-color: $color-bg-light;
        padding: $spacing-large;
        box-shadow: 0px 15px 35px 0px rgba(10, 10, 12, 0.3215686274509804);
    }

    &__section-title {
        font-family: "Playfair Display", Sans-serif;
        font-size: 28px;
        font-weight: 600;
        color: $color-white;
        margin-bottom: $spacing-large;
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
        font-size: 13px;
        font-weight: 600;
        color: $color-white;
        text-transform: uppercase;
        letter-spacing: 0.5px;
    }

    &__input {
        font-family: "Playfair Display", Sans-serif;
        font-size: 16px;
        padding: $spacing-small $spacing-middle;
        background-color: $color-bg-dark;
        color: $color-white;
        border: 2px solid transparent;
        outline: none;
        transition: border-color 0.3s;

        &:focus {
            border-color: $color-pastel-orange;
        }

        &[type="date"] {
            color-scheme: dark;
        }
    }

    &__submit {
        margin-top: $spacing-small;
        width: 100%;
    }

    &__history {
        display: flex;
        flex-direction: column;
        gap: $spacing-middle;
    }

    &__empty {
        font-family: "Inter", Sans-serif;
        font-size: 15px;
        color: $color-grey;
        text-align: center;
        padding: $spacing-large;
    }
}

.history-item {
    background-color: $color-bg-dark;
    border: 2px solid transparent;
    transition: border-color 0.3s;

    &--active {
        border-color: $color-pastel-orange;
    }

    &__header {
        width: 100%;
        padding: $spacing-middle;
        background: none;
        border: none;
        display: flex;
        justify-content: space-between;
        align-items: center;
        cursor: pointer;
        transition: background-color 0.3s;

        &:hover {
            background-color: rgba($color-bg-light, 0.5);
        }
    }

    &__info {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: $spacing-x-smal;
        text-align: left;
    }

    &__date {
        font-family: "Inter", Sans-serif;
        font-size: 13px;
        font-weight: 600;
        color: $color-pastel-orange;
        text-transform: uppercase;
    }

    &__question {
        font-family: "Playfair Display", Sans-serif;
        font-size: 20px;
        font-weight: 600;
        color: $color-white;
        margin: 0;
    }

    &__spread {
        font-family: "Inter", Sans-serif;
        font-size: 14px;
        color: $color-grey;
    }

    &__icon {
        font-size: 32px;
        color: $color-white;
        flex-shrink: 0;
        transition: transform 0.3s;
    }

    &--active &__icon {
        transform: rotate(180deg);
    }

    &__content {
        padding: 0 $spacing-middle $spacing-middle;
        display: flex;
        flex-direction: column;
        gap: $spacing-large;
    }

    &__subtitle {
        font-family: "Inter", Sans-serif;
        font-size: 14px;
        font-weight: 700;
        color: $color-pastel-orange;
        text-transform: uppercase;
        margin-bottom: $spacing-middle;
    }

    &__cards {
        display: flex;
        flex-direction: column;
        gap: $spacing-small;
    }

    &__final {
        border-top: 1px solid rgba($color-grey, 0.2);
        padding-top: $spacing-middle;
    }

    &__reading {
        font-family: "Inter", Sans-serif;
        font-size: 16px;
        line-height: 1.6;
        color: $color-white;
    }
}

.card-detail {
    background-color: $color-bg-light;
    padding: $spacing-middle;

    &__header {
        display: flex;
        align-items: center;
        gap: $spacing-small;
        margin-bottom: $spacing-x-smal;
    }

    &__number {
        width: 24px;
        height: 24px;
        border-radius: 50%;
        background-color: $color-pastel-orange;
        color: $color-bg-dark;
        display: flex;
        align-items: center;
        justify-content: center;
        font-family: "Inter", Sans-serif;
        font-size: 13px;
        font-weight: 700;
        flex-shrink: 0;
    }

    &__name {
        font-family: "Playfair Display", Sans-serif;
        font-size: 18px;
        font-weight: 600;
        color: $color-white;
    }

    &__position {
        font-family: "Inter", Sans-serif;
        font-size: 13px;
        color: $color-grey;
        margin-left: auto;
    }

    &__description {
        font-family: "Inter", Sans-serif;
        font-size: 15px;
        line-height: 1.5;
        color: $color-grey;
        margin: 0;
    }
}
</style>

