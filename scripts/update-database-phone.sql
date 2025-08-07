-- Add phone verification columns to profiles table
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS phone text,
ADD COLUMN IF NOT EXISTS phone_verified boolean DEFAULT false;

-- Create index for phone lookups
CREATE INDEX IF NOT EXISTS profiles_phone_idx ON public.profiles(phone);

-- Update the handle_new_user function to include phone data
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, avatar_url, phone)
  VALUES (
    new.id, 
    new.raw_user_meta_data->>'full_name', 
    new.raw_user_meta_data->>'avatar_url',
    new.phone
  );
  RETURN new;
END;
$$ language plpgsql security definer;

-- Create a function to update phone verification status
CREATE OR REPLACE FUNCTION public.update_phone_verification()
RETURNS trigger AS $$
BEGIN
  -- Update phone verification when user's phone is confirmed
  IF NEW.phone_confirmed_at IS NOT NULL AND OLD.phone_confirmed_at IS NULL THEN
    UPDATE public.profiles 
    SET phone_verified = true 
    WHERE id = NEW.id;
  END IF;
  RETURN NEW;
END;
$$ language plpgsql security definer;

-- Create trigger for phone verification updates
DROP TRIGGER IF EXISTS on_auth_user_phone_confirmed ON auth.users;
CREATE TRIGGER on_auth_user_phone_confirmed
  AFTER UPDATE ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.update_phone_verification();
