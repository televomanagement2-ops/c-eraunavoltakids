-- Website / e-commerce infantile — schema pubblico + RLS + Storage
-- gen_random_uuid() è disponibile nel progetto Supabase (PostgreSQL / pgcrypto)

-- ---------------------------------------------------------------------------
-- Tabelle
-- ---------------------------------------------------------------------------

CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users (id) ON DELETE CASCADE,
  full_name TEXT,
  avatar_url TEXT,
  role TEXT NOT NULL DEFAULT 'customer' CHECK (role IN ('customer', 'admin')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE public.brands (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  tagline TEXT,
  description TEXT NOT NULL DEFAULT '',
  highlights JSONB NOT NULL DEFAULT '[]'::jsonb
);

CREATE TABLE public.products (
  id TEXT PRIMARY KEY,
  brand_id TEXT REFERENCES public.brands (id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  price NUMERIC(12, 2) NOT NULL CHECK (price >= 0),
  category TEXT NOT NULL,
  sizes TEXT[] NOT NULL DEFAULT '{}',
  colors TEXT[] NOT NULL DEFAULT '{}',
  images TEXT[] NOT NULL DEFAULT '{}',
  is_new BOOLEAN NOT NULL DEFAULT false,
  is_sold_out BOOLEAN NOT NULL DEFAULT false,
  stock INT NOT NULL DEFAULT 0 CHECK (stock >= 0),
  rating NUMERIC(4, 2) NOT NULL DEFAULT 0 CHECK (rating >= 0 AND rating <= 5),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE public.reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id TEXT NOT NULL REFERENCES public.products (id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users (id) ON DELETE CASCADE,
  rating SMALLINT NOT NULL CHECK (rating BETWEEN 1 AND 5),
  body TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, product_id)
);

CREATE TABLE public.wishlist_items (
  user_id UUID NOT NULL REFERENCES auth.users (id) ON DELETE CASCADE,
  product_id TEXT NOT NULL REFERENCES public.products (id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  PRIMARY KEY (user_id, product_id)
);

CREATE TABLE public.finance_entries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  entry_date DATE NOT NULL,
  label TEXT NOT NULL,
  amount NUMERIC(14, 2) NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_reviews_product_id ON public.reviews (product_id);
CREATE INDEX idx_reviews_user_id ON public.reviews (user_id);

-- ---------------------------------------------------------------------------
-- Funzioni ausiliarie & trigger Profilo utente + rating prodotti
-- ---------------------------------------------------------------------------

CREATE OR REPLACE FUNCTION public.is_admin ()
  RETURNS BOOLEAN
  LANGUAGE sql
  STABLE
  SECURITY DEFINER
  SET search_path = public
  AS $$
  SELECT
    EXISTS (
      SELECT
        1
      FROM
        public.profiles
      WHERE
        id = auth.uid ()
        AND role = 'admin');
$$;

COMMENT ON FUNCTION public.is_admin IS
  'True se auth.uid() ha profiles.role = admin (RLS su profiles aggirata dalla funzione).';

CREATE OR REPLACE FUNCTION public.handle_new_user ()
  RETURNS TRIGGER
  LANGUAGE plpgsql
  SECURITY DEFINER
  SET search_path = public
  AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, avatar_url)
    VALUES (
      NEW.id,
      COALESCE(
        NEW.raw_user_meta_data ->> 'full_name',
        NEW.raw_user_meta_data ->> 'name',
        split_part(COALESCE(NEW.email, ''), '@', 1)),
      NEW.raw_user_meta_data ->> 'avatar_url');
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user ();

CREATE OR REPLACE FUNCTION public.refresh_product_rating ()
  RETURNS TRIGGER
  LANGUAGE plpgsql
  SECURITY DEFINER
  SET search_path = public
  AS $$
DECLARE
  pid text;
BEGIN
  pid := COALESCE(NEW.product_id, OLD.product_id);
  UPDATE
    public.products
  SET
    rating = COALESCE((
      SELECT
        ROUND(AVG(r.rating)::numeric, 2)
      FROM
        public.reviews r
      WHERE
        r.product_id = pid), 0),
    updated_at = now()
  WHERE
    id = pid;
  RETURN COALESCE(NEW, OLD);
END;
$$;

CREATE TRIGGER on_review_changes_refresh_rating
  AFTER INSERT OR DELETE OR UPDATE OF rating, product_id ON public.reviews
  FOR EACH ROW
  EXECUTE FUNCTION public.refresh_product_rating ();

CREATE OR REPLACE FUNCTION public.set_updated_at ()
  RETURNS TRIGGER
  LANGUAGE plpgsql
  AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER profiles_set_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.set_updated_at ();

CREATE TRIGGER products_set_updated_at
  BEFORE UPDATE ON public.products
  FOR EACH ROW
  EXECUTE FUNCTION public.set_updated_at ();

CREATE TRIGGER reviews_set_updated_at
  BEFORE UPDATE ON public.reviews
  FOR EACH ROW
  EXECUTE FUNCTION public.set_updated_at ();

-- ---------------------------------------------------------------------------
-- Row Level Security
-- ---------------------------------------------------------------------------

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.brands ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wishlist_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.finance_entries ENABLE ROW LEVEL SECURITY;

-- profiles
CREATE POLICY "profiles_select_own_or_admin" ON public.profiles
  FOR SELECT TO authenticated
  USING (auth.uid () = id OR public.is_admin ());

CREATE POLICY "profiles_update_own" ON public.profiles
  FOR UPDATE TO authenticated
  USING (auth.uid () = id)
  WITH CHECK (auth.uid () = id);

CREATE POLICY "profiles_update_admin" ON public.profiles
  FOR UPDATE TO authenticated
  USING (public.is_admin ())
  WITH CHECK (public.is_admin ());

-- brands
CREATE POLICY "brands_select_public" ON public.brands
  FOR SELECT TO anon, authenticated
  USING (true);

CREATE POLICY "brands_write_admin" ON public.brands
  FOR ALL TO authenticated
  USING (public.is_admin ())
  WITH CHECK (public.is_admin ());

-- products
CREATE POLICY "products_select_public" ON public.products
  FOR SELECT TO anon, authenticated
  USING (true);

CREATE POLICY "products_write_admin" ON public.products
  FOR ALL TO authenticated
  USING (public.is_admin ())
  WITH CHECK (public.is_admin ());

-- reviews
CREATE POLICY "reviews_select_public" ON public.reviews
  FOR SELECT TO anon, authenticated
  USING (true);

CREATE POLICY "reviews_insert_owner" ON public.reviews
  FOR INSERT TO authenticated
  WITH CHECK (auth.uid () = user_id);

CREATE POLICY "reviews_update_owner_or_admin" ON public.reviews
  FOR UPDATE TO authenticated
  USING (auth.uid () = user_id OR public.is_admin ())
  WITH CHECK (auth.uid () = user_id OR public.is_admin ());

CREATE POLICY "reviews_delete_owner_or_admin" ON public.reviews
  FOR DELETE TO authenticated
  USING (auth.uid () = user_id OR public.is_admin ());

-- wishlist
CREATE POLICY "wishlist_select_own" ON public.wishlist_items
  FOR SELECT TO authenticated
  USING (auth.uid () = user_id);

CREATE POLICY "wishlist_insert_own" ON public.wishlist_items
  FOR INSERT TO authenticated
  WITH CHECK (auth.uid () = user_id);

CREATE POLICY "wishlist_delete_own" ON public.wishlist_items
  FOR DELETE TO authenticated
  USING (auth.uid () = user_id);

-- finance (solo admin)
CREATE POLICY "finance_admin_all" ON public.finance_entries
  FOR ALL TO authenticated
  USING (public.is_admin ())
  WITH CHECK (public.is_admin ());

-- ---------------------------------------------------------------------------
-- Privilegi tabella (RLS filtra comunque)
-- ---------------------------------------------------------------------------

GRANT USAGE ON SCHEMA public TO anon, authenticated;

GRANT SELECT ON public.brands TO anon, authenticated;
GRANT SELECT ON public.products TO anon, authenticated;
GRANT SELECT ON public.reviews TO anon, authenticated;

GRANT INSERT, UPDATE, DELETE ON public.reviews TO authenticated;
GRANT SELECT, INSERT, DELETE ON public.wishlist_items TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.finance_entries TO authenticated;
GRANT SELECT, UPDATE ON public.profiles TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.brands TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.products TO authenticated;

-- ---------------------------------------------------------------------------
-- Storage: bucket + policy
-- ---------------------------------------------------------------------------

INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
  VALUES (
    'product-images',
    'product-images',
    TRUE,
    5242880,
    ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif'])
ON CONFLICT (id) DO NOTHING;

INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
  VALUES (
    'avatars',
    'avatars',
    TRUE,
    2097152,
    ARRAY['image/jpeg', 'image/png', 'image/webp'])
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "product_images_public_read" ON storage.objects
  FOR SELECT TO anon, authenticated
  USING (bucket_id = 'product-images');

CREATE POLICY "product_images_admin_insert" ON storage.objects
  FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'product-images' AND public.is_admin ());

CREATE POLICY "product_images_admin_update" ON storage.objects
  FOR UPDATE TO authenticated
  USING (bucket_id = 'product-images' AND public.is_admin ())
  WITH CHECK (bucket_id = 'product-images' AND public.is_admin ());

CREATE POLICY "product_images_admin_delete" ON storage.objects
  FOR DELETE TO authenticated
  USING (bucket_id = 'product-images' AND public.is_admin ());

CREATE POLICY "avatars_public_read" ON storage.objects
  FOR SELECT TO anon, authenticated
  USING (bucket_id = 'avatars');

CREATE POLICY "avatars_own_insert" ON storage.objects
  FOR INSERT TO authenticated
  WITH CHECK (
    bucket_id = 'avatars'
    AND auth.uid () IS NOT NULL
    AND (storage.foldername (name))[1] = auth.uid ()::text);

CREATE POLICY "avatars_own_update" ON storage.objects
  FOR UPDATE TO authenticated
  USING (
    bucket_id = 'avatars'
    AND auth.uid () IS NOT NULL
    AND (storage.foldername (name))[1] = auth.uid ()::text)
  WITH CHECK (
    bucket_id = 'avatars'
    AND auth.uid () IS NOT NULL
    AND (storage.foldername (name))[1] = auth.uid ()::text);

CREATE POLICY "avatars_own_delete" ON storage.objects
  FOR DELETE TO authenticated
  USING (
    bucket_id = 'avatars'
    AND auth.uid () IS NOT NULL
    AND (storage.foldername (name))[1] = auth.uid ()::text);
