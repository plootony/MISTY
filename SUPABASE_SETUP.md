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

-- Добавляем новые колонки если их нет
DO $$ 
BEGIN
    -- Добавляем user_number
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'profiles' AND column_name = 'user_number') THEN
        ALTER TABLE public.profiles ADD COLUMN user_number TEXT;
    END IF;
    
    -- Добавляем is_active
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'profiles' AND column_name = 'is_active') THEN
        ALTER TABLE public.profiles ADD COLUMN is_active BOOLEAN DEFAULT TRUE;
    END IF;
    
    -- Добавляем is_admin
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'profiles' AND column_name = 'is_admin') THEN
        ALTER TABLE public.profiles ADD COLUMN is_admin BOOLEAN DEFAULT FALSE;
    END IF;
END $$;

-- Обновляем существующие записи: устанавливаем значения по умолчанию
UPDATE public.profiles SET is_active = TRUE WHERE is_active IS NULL;
UPDATE public.profiles SET is_admin = FALSE WHERE is_admin IS NULL;

-- Добавляем UNIQUE constraint для user_number если его нет
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'profiles_user_number_key') THEN
        ALTER TABLE public.profiles ADD CONSTRAINT profiles_user_number_key UNIQUE (user_number);
    END IF;
END $$;

-- Включаем Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Удаляем старые политики если они существуют
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can insert own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
DROP POLICY IF EXISTS "Admins can view all profiles" ON public.profiles;
DROP POLICY IF EXISTS "Admins can update all profiles" ON public.profiles;
DROP POLICY IF EXISTS "Admins can delete profiles" ON public.profiles;

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

-- Политика: админы могут читать все профили
-- Используем auth.jwt() для избежания рекурсии
CREATE POLICY "Admins can view all profiles"
    ON public.profiles
    FOR SELECT
    USING (
        (auth.jwt() -> 'user_metadata' ->> 'is_admin')::boolean = true
        OR auth.uid() = id
    );

-- Политика: админы могут обновлять все профили
CREATE POLICY "Admins can update all profiles"
    ON public.profiles
    FOR UPDATE
    USING (
        (auth.jwt() -> 'user_metadata' ->> 'is_admin')::boolean = true
        OR auth.uid() = id
    );

-- Политика: админы могут удалять профили
CREATE POLICY "Admins can delete profiles"
    ON public.profiles
    FOR DELETE
    USING (
        (auth.jwt() -> 'user_metadata' ->> 'is_admin')::boolean = true
    );

-- Индексы для быстрого поиска
CREATE INDEX IF NOT EXISTS profiles_email_idx ON public.profiles(email);
CREATE INDEX IF NOT EXISTS profiles_user_number_idx ON public.profiles(user_number);
CREATE INDEX IF NOT EXISTS profiles_is_admin_idx ON public.profiles(is_admin);

-- ============================================
-- ФУНКЦИЯ ГЕНЕРАЦИИ УНИКАЛЬНОГО 6-ЗНАЧНОГО НОМЕРА
-- ============================================

CREATE OR REPLACE FUNCTION generate_unique_user_number()
RETURNS TEXT AS $$
DECLARE
    new_number TEXT;
    number_exists BOOLEAN;
BEGIN
    LOOP
        -- Генерируем 6-значный номер
        new_number := LPAD(FLOOR(RANDOM() * 1000000)::TEXT, 6, '0');
        
        -- Проверяем уникальность
        SELECT EXISTS(SELECT 1 FROM public.profiles WHERE user_number = new_number) INTO number_exists;
        
        -- Если номер уникален, выходим из цикла
        IF NOT number_exists THEN
            EXIT;
        END IF;
    END LOOP;
    
    RETURN new_number;
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- ГЕНЕРАЦИЯ НОМЕРОВ ДЛЯ СУЩЕСТВУЮЩИХ ПОЛЬЗОВАТЕЛЕЙ
-- ============================================

-- Генерируем номера для пользователей, у которых их нет
DO $$
DECLARE
    user_record RECORD;
BEGIN
    FOR user_record IN 
        SELECT id FROM public.profiles WHERE user_number IS NULL
    LOOP
        UPDATE public.profiles 
        SET user_number = generate_unique_user_number() 
        WHERE id = user_record.id;
    END LOOP;
END $$;

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

-- Удаляем старые политики если они существуют
DROP POLICY IF EXISTS "Users can view own readings" ON public.readings;
DROP POLICY IF EXISTS "Users can insert own readings" ON public.readings;

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

-- Удаляем старый триггер если существует
DROP TRIGGER IF EXISTS update_profiles_updated_at ON public.profiles;

-- Создаем триггер заново
CREATE TRIGGER update_profiles_updated_at
    BEFORE UPDATE ON public.profiles
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- УСТАНОВКА АДМИНИСТРАТОРА
-- ============================================

-- После первого входа администратора через Google OAuth,
-- выполните эти запросы для назначения прав администратора:

-- 1. Обновляем профиль в таблице profiles
UPDATE public.profiles 
SET is_admin = TRUE 
WHERE email = 'tonykeepfrozen@gmail.com';

-- 2. Обновляем user_metadata в auth.users (ВАЖНО для RLS политик!)
UPDATE auth.users
SET raw_user_meta_data = raw_user_meta_data || '{"is_admin": true}'::jsonb
WHERE email = 'tonykeepfrozen@gmail.com';

-- Проверка: убедитесь что оба поля обновлены
SELECT 
    u.email,
    p.is_admin as profile_is_admin,
    u.raw_user_meta_data->>'is_admin' as metadata_is_admin
FROM auth.users u
LEFT JOIN public.profiles p ON p.id = u.id
WHERE u.email = 'tonykeepfrozen@gmail.com';
```

## 📧 Шаг 4: Настройка Email авторизации

### Включение Email провайдера:

1. Перейдите в [Authentication Settings](https://supabase.com/dashboard/project/pkwacraoeckxijujupsk/auth/providers)
2. Найдите **Email** в списке провайдеров
3. Убедитесь что **Email** включен (по умолчанию включен)
4. Настройте параметры:
   - **Enable email confirmations**: ✅ Включено (пользователи должны подтвердить email)
   - **Secure email change**: ✅ Включено (безопасная смена email)

### Настройка Email Templates:

1. Перейдите в [Email Templates](https://supabase.com/dashboard/project/pkwacraoeckxijujupsk/auth/templates)
2. Настройте шаблоны писем:
   - **Confirm signup** - письмо для подтверждения регистрации
   - **Magic Link** - письмо с магической ссылкой для входа
   - **Change Email Address** - письмо для смены email
   - **Reset Password** - письмо для сброса пароля

### Redirect URLs:

В разделе **URL Configuration**:
- **Site URL**: `http://localhost:5173` (для разработки)
- **Redirect URLs**: 
  ```
  http://localhost:5173/auth/callback
  http://localhost:5173/**
  ```

Для продакшена добавьте:
```
https://yourdomain.com/auth/callback
https://yourdomain.com/**
```

## 🔐 Шаг 5: Настройка Google OAuth

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

## ✅ Шаг 6: Проверка настройки

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

## 🛡️ Шаг 7: Настройка Google reCAPTCHA v3

### Получение ключей reCAPTCHA:

1. Перейдите в [Google reCAPTCHA Admin Console](https://www.google.com/recaptcha/admin/create)
2. Зарегистрируйте новый сайт:
   - **Label**: Misty Tarot App
   - **reCAPTCHA type**: ✅ reCAPTCHA v3
   - **Domains**: 
     - `localhost` (для разработки)
     - `yourdomain.com` (для продакшена)
3. Примите условия использования
4. Нажмите **Submit**
5. Скопируйте **Site Key** и **Secret Key**

### Добавление в переменные окружения:

Добавьте в файл `.env`:

```env
# Google reCAPTCHA v3
VITE_RECAPTCHA_SITE_KEY=your_site_key_here
VITE_RECAPTCHA_SECRET_KEY=your_secret_key_here
```

> **⚠️ Важно:** 
> - `VITE_RECAPTCHA_SITE_KEY` - публичный ключ (используется на клиенте)
> - `VITE_RECAPTCHA_SECRET_KEY` - секретный ключ (НЕ добавляйте в клиентский код!)

### Настройка серверной валидации (опционально):

Для полной защиты рекомендуется создать Supabase Edge Function для проверки reCAPTCHA токена на сервере:

```typescript
// supabase/functions/verify-recaptcha/index.ts
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

serve(async (req) => {
  const { token } = await req.json()
  
  const response = await fetch(
    `https://www.google.com/recaptcha/api/siteverify`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `secret=${Deno.env.get('RECAPTCHA_SECRET_KEY')}&response=${token}`
    }
  )
  
  const data = await response.json()
  
  return new Response(
    JSON.stringify({ 
      success: data.success,
      score: data.score 
    }),
    { headers: { 'Content-Type': 'application/json' } }
  )
})
```

Для развертывания Edge Function:
```bash
supabase functions deploy verify-recaptcha
supabase secrets set RECAPTCHA_SECRET_KEY=your_secret_key_here
```

## 🔒 Безопасность

- ✅ Row Level Security (RLS) включен для всех таблиц
- ✅ Пользователи могут видеть только свои данные
- ✅ Google reCAPTCHA v3 защищает от ботов и DDoS
- ✅ `anon` ключ безопасен для использования на клиенте
- ⚠️ **НИКОГДА** не используйте `service_role` ключ на клиенте!

## 📚 Дополнительные ресурсы

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase Auth Guide](https://supabase.com/docs/guides/auth)
- [Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)

