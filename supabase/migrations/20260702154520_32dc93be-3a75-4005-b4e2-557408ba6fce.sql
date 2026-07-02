
-- Lock down SECURITY DEFINER functions to service_role only
REVOKE EXECUTE ON FUNCTION public.update_telegram_id(uuid, text) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.update_telegram_id(uuid, text) TO service_role;

REVOKE EXECUTE ON FUNCTION public.email_queue_dispatch() FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.email_queue_dispatch() TO service_role;

REVOKE EXECUTE ON FUNCTION public.email_queue_wake() FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.email_queue_wake() TO service_role;

-- Explicit service_role-only policies for telegram_conversations
CREATE POLICY "service_role_select_telegram_conversations"
  ON public.telegram_conversations FOR SELECT TO service_role USING (true);
CREATE POLICY "service_role_insert_telegram_conversations"
  ON public.telegram_conversations FOR INSERT TO service_role WITH CHECK (true);
CREATE POLICY "service_role_update_telegram_conversations"
  ON public.telegram_conversations FOR UPDATE TO service_role USING (true) WITH CHECK (true);
CREATE POLICY "service_role_delete_telegram_conversations"
  ON public.telegram_conversations FOR DELETE TO service_role USING (true);

-- Ensure anon/authenticated cannot reach the table via Data API
REVOKE ALL ON public.telegram_conversations FROM PUBLIC, anon, authenticated;
GRANT ALL ON public.telegram_conversations TO service_role;
