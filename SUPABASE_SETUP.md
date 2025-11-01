# 🔮 Настройка Supabase для проекта Misty

## 📋 Шаг 1: Получение API ключей

1. Перейдите в [Supabase Dashboard](https://supabase.com/dashboard/project/pkwacraoeckxijujupsk/api)
2. В разделе **Project API keys** найдите:
   - **Project URL** - ваш URL проекта
   - **anon public** - публичный ключ для клиентской стороны

## 🔑 Шаг 2: Добавление переменных окружения

Добавьте следующие переменные в файл `.env`:

```env
# Mistral AI API Key (уже есть)
VITE_MISTRAL_API_KEY=ZXL7WRkz7gnViD4MI1YF34Ntdxwe6ENo

# Supabase Configuration
VITE_SUPABASE_URL=https://pkwacraoeckxijujupsk.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key_here
```

> **⚠️ Важно:** Замените `your_anon_key_here` на реальный ключ из вашего dashboard

## 🗄️ Шаг 3: Создание таблиц в базе данных

Перейдите в [SQL Editor](https://supabase.com/dashboard/project/pkwacraoeckxijujupsk/sql) и выполните следующий SQL:

```sql
-- ============================================
-- ТАБЛИЦА ПРОФИЛЕЙ ПОЛЬЗОВАТЕЛЕЙ
-- ============================================

CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    email TEXT,
    birth TEXT,
    tariff TEXT DEFAULT 'neophyte' CHECK (tariff IN ('neophyte', 'initiated', 'adept', 'oracle', 'supreme-arcana')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Включаем Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Политика: пользователи могут читать только свой профиль
CREATE POLICY "Users can view own profile"
    ON public.profiles
    FOR SELECT
    USING (auth.uid() = id);

-- Политика: пользователи могут вставлять только свой профиль
CREATE POLICY "Users can insert own profile"
    ON public.profiles
    FOR INSERT
    WITH CHECK (auth.uid() = id);

-- Политика: пользователи могут обновлять только свой профиль
CREATE POLICY "Users can update own profile"
    ON public.profiles
    FOR UPDATE
    USING (auth.uid() = id);

-- Индекс для быстрого поиска по email
CREATE INDEX IF NOT EXISTS profiles_email_idx ON public.profiles(email);

-- ============================================
-- ТАБЛИЦА ИСТОРИИ ГАДАНИЙ
-- ============================================

CREATE TABLE IF NOT EXISTS public.readings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    question TEXT NOT NULL,
    spread_type TEXT NOT NULL,
    spread_name TEXT NOT NULL,
    cards JSONB NOT NULL,
    interpretation TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Включаем Row Level Security
ALTER TABLE public.readings ENABLE ROW LEVEL SECURITY;

-- Политика: пользователи могут читать только свои гадания
CREATE POLICY "Users can view own readings"
    ON public.readings
    FOR SELECT
    USING (auth.uid() = user_id);

-- Политика: пользователи могут создавать свои гадания
CREATE POLICY "Users can insert own readings"
    ON public.readings
    FOR INSERT
    WITH CHECK (auth.uid() = user_id);

-- Индексы для быстрого поиска
CREATE INDEX IF NOT EXISTS readings_user_id_idx ON public.readings(user_id);
CREATE INDEX IF NOT EXISTS readings_created_at_idx ON public.readings(created_at DESC);

-- ============================================
-- ТРИГГЕР ДЛЯ АВТОМАТИЧЕСКОГО ОБНОВЛЕНИЯ updated_at
-- ============================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_profiles_updated_at
    BEFORE UPDATE ON public.profiles
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
```

## 🔐 Шаг 4: Настройка Google OAuth

1. Перейдите в [Authentication Settings](https://supabase.com/dashboard/project/pkwacraoeckxijujupsk/auth/providers)
2. Найдите **Google** в списке провайдеров
3. Включите Google OAuth
4. Добавьте следующие настройки:
   - **Authorized redirect URIs**: `http://localhost:5173/auth/callback` (для разработки)
   - Для продакшена добавьте: `https://yourdomain.com/auth/callback`

### Получение Google OAuth credentials:

1. Перейдите в [Google Cloud Console](https://console.cloud.google.com/)
2. Создайте новый проект или выберите существующий
3. Включите **Google+ API**
4. Перейдите в **Credentials** → **Create Credentials** → **OAuth 2.0 Client ID**
5. Выберите **Web application**
6. Добавьте **Authorized redirect URIs**:
   ```
   https://pkwacraoeckxijujupsk.supabase.co/auth/v1/callback
   ```
7. Скопируйте **Client ID** и **Client Secret**
8. Вставьте их в настройки Google провайдера в Supabase

## ✅ Шаг 5: Проверка настройки

После выполнения всех шагов:

1. Перезапустите dev сервер:
   ```bash
   npm run dev
   ```

2. Откройте приложение в браузере
3. Попробуйте войти через Google
4. Проверьте, что:
   - Создается запись в таблице `auth.users`
   - Создается профиль в таблице `public.profiles`
   - Редирект работает корректно

## 🎯 Структура данных

### Таблица `profiles`
```
id          UUID (PK)
name        TEXT
email       TEXT
birth       TEXT (формат: DD.MM.YYYY)
tariff      TEXT (neophyte, initiated, adept, oracle, supreme-arcana)
created_at  TIMESTAMP
updated_at  TIMESTAMP
```

### Таблица `readings`
```
id              UUID (PK)
user_id         UUID (FK → auth.users)
question        TEXT
spread_type     TEXT (one-card, three-cards, horseshoe, celtic-cross, year-circle)
spread_name     TEXT
cards           JSONB (массив выбранных карт с толкованиями)
interpretation  TEXT (финальное толкование)
created_at      TIMESTAMP
```

## 🔒 Безопасность

- ✅ Row Level Security (RLS) включен для всех таблиц
- ✅ Пользователи могут видеть только свои данные
- ✅ `anon` ключ безопасен для использования на клиенте
- ⚠️ **НИКОГДА** не используйте `service_role` ключ на клиенте!

## 📚 Дополнительные ресурсы

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase Auth Guide](https://supabase.com/docs/guides/auth)
- [Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)

