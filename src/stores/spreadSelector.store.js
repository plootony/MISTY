import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useSpreadSelector = defineStore('spreadSelectorStore', () => {
   const spreads = ref([
      {
         id: 'one-card',
         name: 'Одна карта',
         description: 'Краткий ответ или совет. Один ключевой аспект ситуации.',
         cardsCount: 1
      },
      {
         id: 'three-cards',
         name: 'Три карты',
         description: 'Прошлое, настоящее и будущее — классический быстрый расклад.',
         cardsCount: 3
      },
      {
         id: 'celtic-cross',
         name: 'Кельтский крест',
         description: 'Глубокий анализ ситуации с десятью позициями.',
         cardsCount: 10
      },
      {
         id: 'horseshoe',
         name: 'Подкова',
         description: 'Семь карт для анализа развития событий и скрытых факторов.',
         cardsCount: 7
      },
      {
         id: 'year-circle',
         name: 'Годовой круг',
         description: 'Двенадцать карт, отражающих месяцы года и их энергии.',
         cardsCount: 12
      }
   ])

   return { spreads }
})
