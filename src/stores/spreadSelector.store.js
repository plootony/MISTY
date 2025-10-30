import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useSpreadSelector = defineStore('spreadSelectorStore', () => {
   const spreads = ref([
      {
         id: 'one-card',
         name: 'Одна карта',
         description: 'Краткий ответ или совет. Один ключевой аспект ситуации.',
         cardsCount: 1,
         image: '/images/spreads/one-card.png'
      },
      {
         id: 'three-cards',
         name: 'Три карты',
         description: 'Прошлое, настоящее и будущее — классический быстрый расклад.',
         cardsCount: 3,
         image: '/images/spreads/three-cards.png'
      },
      {
         id: 'celtic-cross',
         name: 'Кельтский крест',
         description: 'Глубокий анализ ситуации с десятью позициями.',
         cardsCount: 10,
         image: '/images/spreads/celtic-cross.png'
      },
      {
         id: 'horseshoe',
         name: 'Подкова',
         description: 'Семь карт для анализа развития событий и скрытых факторов.',
         cardsCount: 7,
         image: '/images/spreads/horseshoe.png'
      },
      {
         id: 'year-circle',
         name: 'Годовой круг',
         description: 'Двенадцать карт, отражающих месяцы года и их энергии.',
         cardsCount: 12,
         image: '/images/spreads/year-circle.png'
      }
   ])

   return { spreads }
})
