# SITE ACM Student Chapter — Supabase Integration

This folder contains the official database configuration, schema migrations, and setup instructions for the SITE ACM Student Chapter website.

## Setup Instructions

1. **Create Supabase Project**
   - Log into [Supabase Console](https://supabase.com/dashboard).
   - Click **New Project** and enter `SITE ACM Student Chapter`.

2. **Run Migration Script**
   - Open **SQL Editor** in Supabase Studio.
   - Copy the contents of `migrations/20260929000000_site_acm_schema.sql` and execute the SQL query.

3. **Get API Credentials**
   - Go to **Project Settings -> API**.
   - Copy **Project URL** and **anon public key**.
   - Add them to your `.env` file:
     ```env
     VITE_SUPABASE_URL=https://your-project.supabase.co
     VITE_SUPABASE_ANON_KEY=your-anon-key
     ```

4. **Row Level Security (RLS)**
   - Public read access is enabled for public site tables (`events`, `members`, `team_members`, etc.).
   - Public insert access is allowed for forms (`event_registrations`, `membership_requests`, `contact_messages`).
   - Admin routes utilize authenticated credentials or local fallback data when unauthenticated.
