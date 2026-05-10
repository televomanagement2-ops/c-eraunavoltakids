-- Crea/aggiorna la riga in public.profiles per auth.uid() se manca (es. trigger non eseguito).

CREATE OR REPLACE FUNCTION public.ensure_profile ()
  RETURNS void
  LANGUAGE plpgsql
  SECURITY DEFINER
  SET search_path = public
  AS $$
DECLARE
  u RECORD;
BEGIN
  SELECT
    id,
    email,
    raw_user_meta_data INTO u
  FROM
    auth.users
  WHERE
    id = auth.uid();

  IF u.id IS NULL THEN
    RETURN;
  END IF;

  INSERT INTO public.profiles (id, full_name, avatar_url)
    VALUES (u.id, COALESCE(u.raw_user_meta_data ->> 'full_name', u.raw_user_meta_data ->> 'name', split_part(COALESCE(u.email, ''), '@', 1)), u.raw_user_meta_data ->> 'avatar_url')
  ON CONFLICT (id)
    DO NOTHING;
END;
$$;

GRANT EXECUTE ON FUNCTION public.ensure_profile () TO authenticated;
