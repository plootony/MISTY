<template>
    <div class="deck-card">
        <img class="deck-card__image" v-if="false" src="@/assets/images/card.png" alt="deck card">
    </div>
</template>


<style scoped lang="scss">
.deck-card {
    max-width: 495px;
    width: 100%;
    height: 600px;
    border-radius: 12px;
    background-image: url("@/assets/images/card-back.png");

    &__image {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
}
</style>