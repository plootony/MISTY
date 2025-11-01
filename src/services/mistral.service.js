import { Mistral } from '@mistralai/mistralai';
import { mistralRateLimiter } from '@/utils/rateLimiter';
import { parseAIResponse, normalizeValidationResponse, isValidValidationResponse } from '@/utils/jsonParser';

// Инициализация клиента Mistral AI
let mistralClient = null;

const initMistralClient = () => {
    if (!mistralClient) {
        const apiKey = import.meta.env.VITE_MISTRAL_API_KEY;
        if (!apiKey) {
            throw new Error('VITE_MISTRAL_API_KEY не установлен в переменных окружения');
        }
        mistralClient = new Mistral({ apiKey });
    }
    return mistralClient;
};

/**
 * Валидация вопроса пользователя на соответствие теме Таро и эзотерики
 * @param {string} question - Вопрос пользователя
 * @returns {Promise<{isValid: boolean, reason?: string, suggestion?: string}>}
 */
export async function validateTarotQuestion(question) {
    // Используем rate limiter для соблюдения ограничения 1 запрос/секунду
    return mistralRateLimiter.execute(async () => {
        try {
            const client = initMistralClient();

            const systemPrompt = `Ты эксперт по Таро, эзотерике и мистике. Твоя задача - определить, подходит ли вопрос для гадания на картах Таро.

ПОДХОДЯЩИЕ вопросы:
- О личной жизни, отношениях, любви
- О карьере, работе, финансах
- О личностном росте, духовном развитии
- О будущем, прошлом, настоящем
- О принятии решений
- О внутреннем состоянии, эмоциях
- О жизненном пути и предназначении
- О здоровье (в общем смысле, не медицинские диагнозы)

НЕ ПОДХОДЯЩИЕ вопросы:
- Технические вопросы (программирование, математика, физика)
- Фактологические вопросы (столицы, даты, исторические факты)
- Медицинские диагнозы
- Юридические консультации
- Вопросы не по теме (рецепты, спорт, погода и т.д.)
- Оскорбительные или неуважительные вопросы
- Вопросы о причинении вреда

ВАЖНО: Ответь ТОЛЬКО чистым JSON без markdown форматирования, без обёрток типа \`\`\`json.
Формат ответа:
{
  "isValid": true,
  "reason": "краткая причина (если не валиден)",
  "suggestion": "предложение как переформулировать (если не валиден)"
}`;

            const result = await client.chat.complete({
                model: 'mistral-small-latest',
                messages: [
                    {
                        role: 'system',
                        content: systemPrompt
                    },
                    {
                        role: 'user',
                        content: `Проанализируй вопрос: "${question}"`
                    }
                ],
                temperature: 0.3, // Низкая температура для более предсказуемых результатов
                response_format: { type: 'json_object' },
                max_tokens: 300
            });

            const response = result.choices[0].message.content;
            
            // Парсинг JSON с использованием утилиты
            const validation = parseAIResponse(response);
            
            // Валидация структуры ответа
            if (!isValidValidationResponse(validation)) {
                console.warn('Некорректная структура ответа:', validation);
                throw new Error('Некорректная структура ответа от AI');
            }

            // Нормализация и возврат результата
            return normalizeValidationResponse(validation);

        } catch (error) {
            console.error('Ошибка валидации вопроса:', error);
            console.error('Детали ошибки:', error.message);
            
            // В случае ошибки API возвращаем fallback валидацию
            return {
                isValid: true, // Разрешаем по умолчанию, чтобы не блокировать пользователя
                reason: null,
                suggestion: null,
                error: 'Не удалось проверить вопрос. Попробуйте еще раз.'
            };
        }
    });
}

/**
 * Толкование отдельной карты в контексте вопроса и позиции
 * @param {string} question - Вопрос пользователя
 * @param {Object} card - Выбранная карта с позицией
 * @param {Object} position - Информация о позиции карты в раскладе
 * @returns {Promise<string>}
 */
export async function interpretSingleCard(question, card, position) {
    return mistralRateLimiter.execute(async () => {
        try {
            const client = initMistralClient();

            const systemPrompt = `Ты опытный таролог. Дай краткое, но глубокое толкование карты Таро в контексте вопроса и позиции в раскладе.
Используй мистический, но понятный язык. Будь конкретным и практичным.
Ответ должен быть 2-3 абзаца, не более 200 слов.`;

            const cardPosition = card.isReversed ? 'перевёрнутом' : 'прямом';
            const cardMeaning = card.isReversed ? card.reversed : card.upright;

            const result = await client.chat.complete({
                model: 'mistral-small-latest',
                messages: [
                    {
                        role: 'system',
                        content: systemPrompt
                    },
                    {
                        role: 'user',
                        content: `Вопрос: "${question}"

Позиция: ${position.name} - ${position.meaning}

Карта: ${card.name} (${card.arcana}) в ${cardPosition} положении
Значение: ${cardMeaning}

Дай толкование этой карты в контексте вопроса и позиции.`
                    }
                ],
                temperature: 0.7,
                max_tokens: 300
            });

            return result.choices[0].message.content;

        } catch (error) {
            console.error('Ошибка толкования карты:', error);
            throw new Error('Не удалось получить толкование карты');
        }
    });
}

/**
 * Финальное толкование всего расклада
 * @param {Object} userData - Данные пользователя (имя, дата рождения)
 * @param {string} zodiacSign - Знак зодиака
 * @param {string} question - Вопрос пользователя
 * @param {Object} spread - Информация о раскладе
 * @param {Array} selectedCards - Массив выбранных карт с позициями
 * @returns {Promise<string>}
 */
export async function generateFullReading(userData, zodiacSign, question, spread, selectedCards) {
    return mistralRateLimiter.execute(async () => {
        try {
            const client = initMistralClient();

            const systemPrompt = `Ты мудрый таролог с глубокими знаниями эзотерики и астрологии.
Дай полное, развёрнутое толкование расклада Таро, учитывая:
- Личность человека и его знак зодиака
- Тип расклада и значение позиций
- Взаимосвязь между картами
- Практические советы и рекомендации

Используй мистический, образный язык. Обращайся к человеку по имени.
Структурируй ответ: вступление, анализ карт, общий вывод и совет.
Объём: 400-600 слов.`;

            const cardsDescription = selectedCards.map((card, index) => {
                const position = spread.positions[index];
                const cardPosition = card.isReversed ? 'перевёрнутое' : 'прямое';
                return `${position.name}: ${card.name} (${cardPosition} положение) - ${card.meaning}`;
            }).join('\n');

            const result = await client.chat.complete({
                model: 'mistral-small-latest',
                messages: [
                    {
                        role: 'system',
                        content: systemPrompt
                    },
                    {
                        role: 'user',
                        content: `Имя: ${userData.name}
Знак зодиака: ${zodiacSign}
Вопрос: "${question}"

Расклад: ${spread.name}
Описание: ${spread.description}

Выпавшие карты:
${cardsDescription}

Дай полное толкование расклада, учитывая личность ${userData.name} как представителя знака ${zodiacSign}.`
                    }
                ],
                temperature: 0.7,
                max_tokens: 1000
            });

            return result.choices[0].message.content;

        } catch (error) {
            console.error('Ошибка генерации финального толкования:', error);
            throw new Error('Не удалось получить толкование расклада');
        }
    });
}
