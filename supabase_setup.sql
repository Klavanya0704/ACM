-- SITE ACM Student Chapter - Supabase Database Schema & Storage Setup
-- Run this SQL in your Supabase SQL Editor (https://app.supabase.com -> Project -> SQL Editor)

-- 1. Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Create Events Table
CREATE TABLE IF NOT EXISTS public.events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  event_date DATE NOT NULL,
  event_time TEXT,
  badge_month TEXT,
  badge_day TEXT,
  category TEXT DEFAULT 'Technical Event',
  location TEXT DEFAULT 'SASI Campus',
  mode TEXT DEFAULT 'In-Person',
  image_url TEXT,
  speaker_name TEXT,
  speaker_designation TEXT,
  registration_fee TEXT DEFAULT 'Free',
  max_participants INTEGER DEFAULT 100,
  registration_status TEXT DEFAULT 'Open', -- 'Open', 'Closed', 'Upcoming'
  attendance INTEGER DEFAULT 0,
  volunteers INTEGER DEFAULT 0,
  topics TEXT[],
  collaboration TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Create Event Registrations Table
CREATE TABLE IF NOT EXISTS public.event_registrations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_id UUID REFERENCES public.events(id) ON DELETE CASCADE,
  event_title TEXT,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  college TEXT DEFAULT 'Sasi Institute of Technology & Engineering',
  department TEXT NOT NULL,
  year TEXT NOT NULL,
  status TEXT DEFAULT 'Registered', -- 'Registered', 'Attended', 'Cancelled'
  registered_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Create Admin Profiles Table
CREATE TABLE IF NOT EXISTS public.admin_profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  role TEXT DEFAULT 'admin', -- 'admin', 'superadmin'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. Enable Row Level Security (RLS)
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.event_registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_profiles ENABLE ROW LEVEL SECURITY;

-- 6. RLS Policies for Events
-- Public can view events
CREATE POLICY "Public events read access" 
ON public.events FOR SELECT 
USING (true);

-- Authenticated Admins can create/update/delete events
CREATE POLICY "Admins full access on events" 
ON public.events FOR ALL 
USING (
  auth.role() = 'authenticated' AND 
  EXISTS (SELECT 1 FROM public.admin_profiles WHERE user_id = auth.uid())
);

-- 7. RLS Policies for Event Registrations
-- Public can submit registrations
CREATE POLICY "Public can submit registrations" 
ON public.event_registrations FOR INSERT 
WITH CHECK (true);

-- Admins can view/update/delete registrations
CREATE POLICY "Admins full access on registrations" 
ON public.event_registrations FOR ALL 
USING (
  auth.role() = 'authenticated' AND 
  EXISTS (SELECT 1 FROM public.admin_profiles WHERE user_id = auth.uid())
);

-- 8. RLS Policies for Admin Profiles
CREATE POLICY "Admins can view admin profiles" 
ON public.admin_profiles FOR SELECT 
USING (
  auth.role() = 'authenticated'
);

-- 9. Supabase Storage Bucket for Event Images
-- Note: Create a public bucket named 'event-images' in Supabase Dashboard -> Storage
-- Policy: Allow public read access to 'event-images'
-- Policy: Allow authenticated users to upload to 'event-images'

-- 10. Sample Seed Function / Initial Admin Registration Helper
-- Run this in SQL editor replacing 'your-user-uuid' and 'admin@siteacm.org' after signing up in Supabase Auth
-- INSERT INTO public.admin_profiles (user_id, name, email, role) 
-- VALUES ('<UUID_FROM_AUTH_USERS>', 'SITE ACM Admin', 'admin@siteacm.org', 'superadmin');
