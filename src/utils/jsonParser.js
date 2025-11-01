/**
 * Утилита для надёжного парсинга JSON из ответов AI
 * Обрабатывает случаи, когда JSON обёрнут в markdown code blocks
 */

/**
 * Очищает текст от markdown code blocks и парсит JSON
 * @param {string} text - Текст, который может содержать JSON
 * @returns {Object} - Распарсенный JSON объект
 * @throws {Error} - Если не удалось распарсить JSON
 */
export function parseAIResponse(text) {
    if (!text || typeof text !== 'string') {
        throw new Error('Некорректный входной текст');
    }

    let cleanText = text.trim();

    // Удаляем markdown code blocks (```json ... ``` или ``` ... ```)
    if (cleanText.startsWith('```')) {
        // Удаляем открывающий блок (```json или ```)
        cleanText = cleanText.replace(/^```(?:json|JSON)?\s*\n?/i, '');
        // Удаляем закрывающий блок (```)
        cleanText = cleanText.replace(/\n?```\s*$/i, '');
        cleanText = cleanText.trim();
    }

    // Пытаемся распарсить очищенный текст
    try {
        return JSON.parse(cleanText);
    } catch (firstError) {
        // Если не получилось, пытаемся найти JSON в тексте с помощью регулярки
        const jsonMatch = cleanText.match(/\{[\s\S]*\}/);
        
        if (jsonMatch) {
            try {
                return JSON.parse(jsonMatch[0]);
            } catch (secondError) {
                throw new Error(`Не удалось распарсить JSON: ${secondError.message}`);
            }
        }
        
        throw new Error(`JSON не найден в тексте: ${firstError.message}`);
    }
}

/**
 * Валидирует структуру ответа валидации
 * @param {Object} data - Объект для валидации
 * @returns {boolean} - true если структура корректна
 */
export function isValidValidationResponse(data) {
    if (!data || typeof data !== 'object') {
        return false;
    }

    // Проверяем наличие обязательного поля isValid
    if (typeof data.isValid !== 'boolean') {
        return false;
    }

    // Если isValid === false, должны быть reason или suggestion
    if (data.isValid === false) {
        if (!data.reason && !data.suggestion) {
            return false;
        }
    }

    return true;
}

/**
 * Нормализует ответ валидации, добавляя отсутствующие поля
 * @param {Object} data - Объект для нормализации
 * @returns {Object} - Нормализованный объект
 */
export function normalizeValidationResponse(data) {
    return {
        isValid: data.isValid === true,
        reason: data.reason || null,
        suggestion: data.suggestion || null
    };
}
