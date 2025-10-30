<script setup>
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/user.store';
import { useModalStore } from '@/stores/modal.store';

const router = useRouter();
const userStore = useUserStore();
const modalStore = useModalStore();

const startOver = () => {
    modalStore.resetSelection();
    router.push('/');
};

const closeModal = () => {
    modalStore.closeAnswerModal();
};
</script>

<template>
    <div class="modal">
        <div class="modal__overlay" @click="closeModal"></div>
        <div class="modal__container">
            <div class="modal__content modal__content--answer">
                <div class="answer">
                    <div class="answer__header">
                        <img src="@/assets/images/stars-icon.png" alt="star icon" class="answer__icon">
                        <p class="answer__label">ОТВЕТ НА ТВОЙ ВОПРОС</p>
                    </div>

                    <h1 class="answer__question">Что делать, если не к чему стремиться?</h1>

                    <div class="answer__content">
                        <p class="answer__text">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam mi tellus, pulvinar vel tempus eget, finibus 
                            vitae ante. Fusce sit amet velit eleifend, iaculis velit quis, malesuada 
                            lacus. Vestibulum sodales magna a volutpat tempus. Mauris vestibulum id urna viverra ultrices. Nullam rhoncus elit eget 
                            libero varius dapibus.Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                            Etiam mi tellus, pulvinar vel tempus eget, finibus vitae ante. 
                            Fusce sit amet velit eleifend, iaculis velit quis, malesuada 
                            lacus. Vestibulum sodales magna a volutpat tempus. Mauris 
                            vestibulum id urna viverra ultrices. Nullam rhoncus elit eget 
                            libero varius dapibus.
                        </p>
                    </div>

                    <button class="btn btn--primary" @click="startOver">Еще раз</button>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
@use "../assets/scss/vars.scss" as *;

.modal {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1000;
    display: flex;
    align-items: center;
    justify-content: center;

    &__overlay {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, 0.8);
    }

    &__container {
        position: relative;
        z-index: 1001;
        max-width: 90vw;
        max-height: 90vh;
        overflow: auto;
    }

    &__content {
        background-color: $color-bg-light;
        box-shadow: 0px 15px 35px 0px rgba(10, 10, 12, 0.3215686274509804);

        &--answer {
            max-width: 920px;
        }
    }
}

.answer {
    padding: $spacing-large;
    display: flex;
    flex-direction: column;
    gap: $spacing-middle;

    &__header {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: $spacing-x-smal;
    }

    &__icon {
        width: 42px;
        height: auto;
    }

    &__label {
        font-family: "Inter", Sans-serif;
        color: $color-pastel-orange;
        font-size: 14px;
        font-weight: 800;
        text-transform: uppercase;
        letter-spacing: 1px;
    }

    &__question {
        font-family: "Playfair Display", Sans-serif;
        font-size: 38px;
        font-weight: 600;
        line-height: 1.3em;
        color: $color-white;
    }

    &__content {
        flex: 1;
        margin-bottom: $spacing-middle;
    }

    &__text {
        font-family: "Inter", Sans-serif;
        font-size: 16px;
        line-height: 1.8;
        color: $color-white;
    }
}
</style>

