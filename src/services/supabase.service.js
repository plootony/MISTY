import { createClient } from '@supabase/supabase-js'

// Инициализация Supabase клиента
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
    console.error('Supabase URL или Anon Key не установлены в переменных окружения')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: true
    }
})

// ============================================
// AUTH FUNCTIONS
// ============================================

/**
 * Авторизация через Google
 */
export async function signInWithGoogle() {
    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
            redirectTo: `${window.location.origin}/auth/callback`,
            queryParams: {
                access_type: 'offline',
                prompt: 'consent',
            }
        }
    })
    
    if (error) {
        console.error('Ошибка авторизации через Google:', error)
        throw error
    }
    
    return data
}

/**
 * Выход из системы
 */
export async function signOut() {
    const { error } = await supabase.auth.signOut()
    
    if (error) {
        console.error('Ошибка выхода:', error)
        throw error
    }
}

/**
 * Получение текущей сессии
 */
export async function getSession() {
    const { data: { session }, error } = await supabase.auth.getSession()
    
    if (error) {
        console.error('Ошибка получения сессии:', error)
        return null
    }
    
    return session
}

/**
 * Получение текущего пользователя
 */
export async function getCurrentUser() {
    const { data: { user }, error } = await supabase.auth.getUser()
    
    if (error) {
        console.error('Ошибка получения пользователя:', error)
        return null
    }
    
    return user
}

/**
 * Подписка на изменения состояния авторизации
 */
export function onAuthStateChange(callback) {
    return supabase.auth.onAuthStateChange((event, session) => {
        callback(event, session)
    })
}

// ============================================
// DATABASE FUNCTIONS
// ============================================

/**
 * Получение профиля пользователя
 */
export async function getProfile(userId) {
    const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single()
    
    if (error) {
        console.error('Ошибка получения профиля:', error)
        return null
    }
    
    return data
}

/**
 * Создание или обновление профиля
 */
export async function upsertProfile(userId, profileData) {
    const { data, error } = await supabase
        .from('profiles')
        .upsert({
            id: userId,
            ...profileData,
            updated_at: new Date().toISOString()
        })
        .select()
        .single()
    
    if (error) {
        console.error('Ошибка обновления профиля:', error)
        throw error
    }
    
    return data
}

/**
 * Сохранение истории гадания
 */
export async function saveReading(userId, readingData) {
    const { data, error } = await supabase
        .from('readings')
        .insert({
            user_id: userId,
            question: readingData.question,
            spread_type: readingData.spreadType,
            spread_name: readingData.spreadName,
            cards: readingData.cards,
            interpretation: readingData.interpretation,
            created_at: new Date().toISOString()
        })
        .select()
        .single()
    
    if (error) {
        console.error('Ошибка сохранения гадания:', error)
        throw error
    }
    
    return data
}

/**
 * Получение истории гаданий пользователя
 */
export async function getReadings(userId, limit = 10, offset = 0) {
    const { data, error } = await supabase
        .from('readings')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .range(offset, offset + limit - 1)
    
    if (error) {
        console.error('Ошибка получения истории гаданий:', error)
        return []
    }
    
    return data
}

