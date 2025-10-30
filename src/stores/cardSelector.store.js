import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useCardSelector = defineStore('cardSelectorStore', () => {
    const deck = ref([
        {
            id: 'the-fool',
            name: 'Шут',
            number: 0,
            arcana: 'Старший аркан',
            image: '/images/cards/the-fool.png',
            upright: 'Свобода, начало, спонтанность, вера в жизнь.',
            reversed: 'Безрассудство, заблуждение, отсутствие цели.'
        },
        {
            id: 'the-magician',
            name: 'Маг',
            number: 1,
            arcana: 'Старший аркан',
            image: '/images/cards/the-magician.png',
            upright: 'Воля, концентрация, мастерство, потенциал.',
            reversed: 'Манипуляция, иллюзия контроля, пустые слова.'
        },
        {
            id: 'the-high-priestess',
            name: 'Жрица',
            number: 2,
            arcana: 'Старший аркан',
            image: '/images/cards/the-high-priestess.png',
            upright: 'Интуиция, тайна, внутренняя мудрость.',
            reversed: 'Секреты, самообман, потеря связи с интуицией.'
        },
        {
            id: 'the-empress',
            name: 'Императрица',
            number: 3,
            arcana: 'Старший аркан',
            image: '/images/cards/the-empress.png',
            upright: 'Изобилие, забота, творчество, рост.',
            reversed: 'Застой, зависимость, чрезмерная опека.'
        },
        {
            id: 'the-emperor',
            name: 'Император',
            number: 4,
            arcana: 'Старший аркан',
            image: '/images/cards/the-emperor.png',
            upright: 'Структура, власть, стабильность, порядок.',
            reversed: 'Тирания, контроль, страх потерять власть.'
        },
        {
            id: 'the-hierophant',
            name: 'Жрец',
            number: 5,
            arcana: 'Старший аркан',
            image: '/images/cards/the-hierophant.png',
            upright: 'Традиция, обучение, духовный наставник.',
            reversed: 'Догматизм, бунт против системы.'
        },
        {
            id: 'the-lovers',
            name: 'Влюблённые',
            number: 6,
            arcana: 'Старший аркан',
            image: '/images/cards/the-lovers.png',
            upright: 'Выбор, единство, гармония, близость.',
            reversed: 'Разлад, неверный выбор, искушение.'
        },
        {
            id: 'the-chariot',
            name: 'Колесница',
            number: 7,
            arcana: 'Старший аркан',
            image: '/images/cards/the-chariot.png',
            upright: 'Победа, воля, контроль, движение вперёд.',
            reversed: 'Потеря направления, внутренний конфликт.'
        },
        {
            id: 'strength',
            name: 'Сила',
            number: 8,
            arcana: 'Старший аркан',
            image: '/images/cards/strength.png',
            upright: 'Мужество, сострадание, внутренняя стойкость.',
            reversed: 'Сомнение в себе, слабость, импульсивность.'
        },
        {
            id: 'the-hermit',
            name: 'Отшельник',
            number: 9,
            arcana: 'Старший аркан',
            image: '/images/cards/the-hermit.png',
            upright: 'Поиск истины, одиночество, размышление.',
            reversed: 'Изоляция, отрешенность, нежелание видеть истину.'
        },
        {
            id: 'wheel-of-fortune',
            name: 'Колесо фортуны',
            number: 10,
            arcana: 'Старший аркан',
            image: '/images/cards/wheel-of-fortune.png',
            upright: 'Судьба, перемены, поворот событий.',
            reversed: 'Неудача, цикличность, сопротивление переменам.'
        },
        {
            id: 'justice',
            name: 'Справедливость',
            number: 11,
            arcana: 'Старший аркан',
            image: '/images/cards/justice.png',
            upright: 'Истина, закон, ответственность, баланс.',
            reversed: 'Искажение фактов, несправедливость, самообман.'
        }
    ])

    return { spreads }
})
