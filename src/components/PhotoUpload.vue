<script setup>
import { ref } from 'vue';

const photoPreview = ref(null);

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

defineExpose({
    photoPreview
});
</script>

<template>
    <div class="photo-upload">
        <div class="photo-upload__wrapper">
            <div v-if="photoPreview" class="photo-upload__preview">
                <img :src="photoPreview" alt="Фото профиля" class="photo-upload__image">
                <button 
                    type="button" 
                    class="photo-upload__remove"
                    @click="removePhoto"
                >
                    ✕
                </button>
            </div>
            <div v-else class="photo-upload__placeholder">
                <span class="photo-upload__icon">📷</span>
            </div>
        </div>
        
        <label class="photo-upload__label">
            <input 
                type="file" 
                accept="image/*"
                class="photo-upload__input"
                @change="handleFileUpload"
            >
            <span class="photo-upload__button">
                {{ photoPreview ? 'Изменить фото' : 'Загрузить фото' }}
            </span>
        </label>
    </div>
</template>

<style scoped lang="scss">
@use "../assets/scss/vars.scss" as *;

.photo-upload {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: $spacing-middle;

    &__wrapper {
        position: relative;
    }

    &__preview {
        position: relative;
        width: 150px;
        height: 150px;
        border-radius: 50%;
        overflow: hidden;
        border: 3px solid $color-pastel-orange;
    }

    &__image {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    &__remove {
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

    &__placeholder {
        width: 150px;
        height: 150px;
        border-radius: 50%;
        background-color: $color-bg-dark;
        border: 2px dashed $color-grey;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    &__icon {
        font-size: 48px;
        opacity: 0.5;
    }

    &__input {
        display: none;
    }

    &__label {
        cursor: pointer;
    }

    &__button {
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
}
</style>

