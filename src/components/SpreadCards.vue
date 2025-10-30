<script setup>
import SpreadCard from './SpreadCard.vue';
</script>

<template>
    <div class="spread-cards">
        <SpreadCard v-for="card in 9" :key="card" />
    </div>

    <button class="btn btn--primary">Выбрать</button>
</template>


<style scoped lang="scss">
@use "../assets/scss/vars.scss" as *;

.spread-cards {
    display: flex;
    align-items: center;
    gap: $spacing-middle;
    flex-wrap: wrap;
}
</style>