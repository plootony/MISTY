<script setup lang="ts">
import SpreadDeckCard from './SpreadDeckCard.vue';

</script>

<template>
    <div class="deck">
        <SpreadDeckCard v-for="card in 12" :key="card" />
    </div>
</template>

<style scoped lang="scss">
.deck {
    display: flex;
    max-width: 920px;
    width: 100%;
}
</style>