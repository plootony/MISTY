/**
 * Утилита для определения знака зодиака по дате рождения
 */

const zodiacSigns = [
    { name: 'Козерог', start: [12, 22], end: [1, 19] },
    { name: 'Водолей', start: [1, 20], end: [2, 18] },
    { name: 'Рыбы', start: [2, 19], end: [3, 20] },
    { name: 'Овен', start: [3, 21], end: [4, 19] },
    { name: 'Телец', start: [4, 20], end: [5, 20] },
    { name: 'Близнецы', start: [5, 21], end: [6, 20] },
    { name: 'Рак', start: [6, 21], end: [7, 22] },
    { name: 'Лев', start: [7, 23], end: [8, 22] },
    { name: 'Дева', start: [8, 23], end: [9, 22] },
    { name: 'Весы', start: [9, 23], end: [10, 22] },
    { name: 'Скорпион', start: [10, 23], end: [11, 21] },
    { name: 'Стрелец', start: [11, 22], end: [12, 21] }
];

/**
 * Определяет знак зодиака по дате рождения
 * @param {string} birthDate - Дата в формате DD.MM.YYYY или YYYY-MM-DD
 * @returns {string} - Название знака зодиака
 */
export function getZodiacSign(birthDate) {
    if (!birthDate) {
        return 'Неизвестно';
    }

    let day, month;

    // Поддержка форматов DD.MM.YYYY и YYYY-MM-DD
    if (birthDate.includes('.')) {
        const parts = birthDate.split('.');
        day = parseInt(parts[0], 10);
        month = parseInt(parts[1], 10);
    } else if (birthDate.includes('-')) {
        const parts = birthDate.split('-');
        month = parseInt(parts[1], 10);
        day = parseInt(parts[2], 10);
    } else {
        return 'Неизвестно';
    }

    if (isNaN(day) || isNaN(month) || month < 1 || month > 12 || day < 1 || day > 31) {
        return 'Неизвестно';
    }

    // Находим знак зодиака
    for (const sign of zodiacSigns) {
        const [startMonth, startDay] = sign.start;
        const [endMonth, endDay] = sign.end;

        // Обработка знаков, которые переходят через год (Козерог)
        if (startMonth > endMonth) {
            if ((month === startMonth && day >= startDay) || (month === endMonth && day <= endDay)) {
                return sign.name;
            }
        } else {
            if ((month === startMonth && day >= startDay) || 
                (month === endMonth && day <= endDay) ||
                (month > startMonth && month < endMonth)) {
                return sign.name;
            }
        }
    }

    return 'Неизвестно';
}
