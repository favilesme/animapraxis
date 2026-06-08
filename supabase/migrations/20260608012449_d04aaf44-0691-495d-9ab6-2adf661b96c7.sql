
REVOKE ALL ON FUNCTION public.update_telegram_id(uuid, text) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.update_telegram_id(uuid, text) TO service_role;
