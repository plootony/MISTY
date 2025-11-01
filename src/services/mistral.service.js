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
 * Генерация толкования карт Таро (для будущего использования)
 * @param {string} question - Вопрос пользователя
 * @param {Array} cards - Массив выбранных карт
 * @param {Object} spread - Информация о раскладе
 * @returns {Promise<string>}
 */
export async function generateTarotReading(question, cards, spread) {
    // Используем rate limiter для соблюдения ограничения 1 запрос/секунду
    return mistralRateLimiter.execute(async () => {
        try {
            const client = initMistralClient();

            const systemPrompt = `Ты опытный таролог с глубокими знаниями в эзотерике и мистике. 
Твоя задача - дать глубокое, мистическое и точное толкование карт Таро.
Используй символизм, архетипы и интуитивные прозрения.
Говори загадочно, но понятно. Будь мудрым наставником.`;

            const cardsDescription = cards.map((card, index) => 
                `Позиция ${index + 1}: ${card.name} (${card.arcana})`
            ).join('\n');

            const result = await client.chat.complete({
                model: 'mistral-small-latest',
                messages: [
                    {
                        role: 'system',
                        content: systemPrompt
                    },
                    {
                        role: 'user',
                        content: `Расклад: ${spread.name}
Вопрос: "${question}"

Выпавшие карты:
${cardsDescription}

Дай развернутое толкование.`
                    }
                ],
                temperature: 0.7,
                max_tokens: 1000
            });

            return result.choices[0].message.content;

        } catch (error) {
            console.error('Ошибка генерации толкования:', error);
            throw new Error('Не удалось получить толкование карт');
        }
    });
}
