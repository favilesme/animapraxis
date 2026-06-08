
-- 1. Profiles table
CREATE TABLE IF NOT EXISTS public.profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  telegram_chat_id text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- 2. Grants
GRANT SELECT, INSERT, UPDATE ON public.profiles TO authenticated;
GRANT ALL ON public.profiles TO service_role;

-- 3. Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- 4. Policies
DROP POLICY IF EXISTS "Users can read their own profile" ON public.profiles;
CREATE POLICY "Users can read their own profile"
  ON public.profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

DROP POLICY IF EXISTS "Users can insert their own profile" ON public.profiles;
CREATE POLICY "Users can insert their own profile"
  ON public.profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;
CREATE POLICY "Users can update their own profile"
  ON public.profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

DROP POLICY IF EXISTS "Service role can read all profiles" ON public.profiles;
CREATE POLICY "Service role can read all profiles"
  ON public.profiles FOR SELECT
  TO service_role
  USING (true);

DROP POLICY IF EXISTS "Service role can update telegram_chat_id" ON public.profiles;
CREATE POLICY "Service role can update telegram_chat_id"
  ON public.profiles FOR UPDATE
  TO service_role
  USING (true)
  WITH CHECK (true);

-- 5. updated_at trigger
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS update_profiles_updated_at ON public.profiles;
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- 6. update_telegram_id function
CREATE OR REPLACE FUNCTION public.update_telegram_id(user_id uuid, chat_id text)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  rows_affected integer;
BEGIN
  UPDATE public.profiles
     SET telegram_chat_id = chat_id,
         updated_at = now()
   WHERE id = user_id;

  GET DIAGNOSTICS rows_affected = ROW_COUNT;

  IF rows_affected = 0 THEN
    INSERT INTO public.profiles (id, telegram_chat_id)
    VALUES (user_id, chat_id)
    ON CONFLICT (id) DO UPDATE SET telegram_chat_id = EXCLUDED.telegram_chat_id;
    GET DIAGNOSTICS rows_affected = ROW_COUNT;
  END IF;

  RETURN rows_affected > 0;
END;
$$;

REVOKE ALL ON FUNCTION public.update_telegram_id(uuid, text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.update_telegram_id(uuid, text) TO service_role;
