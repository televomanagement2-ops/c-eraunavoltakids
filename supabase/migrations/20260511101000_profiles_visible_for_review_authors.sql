-- Consente di leggere nome (e avatar) degli utenti che hanno almeno una recensione pubblica,
-- oltre alla propria riga e alla policy admin già esistente.

CREATE POLICY "profiles_select_if_has_review" ON public.profiles
  FOR SELECT TO anon, authenticated
  USING (
    id IN (
      SELECT DISTINCT
        user_id
      FROM
        public.reviews));
