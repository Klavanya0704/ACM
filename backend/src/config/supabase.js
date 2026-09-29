import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY || '';

export const isSupabaseBackendConfigured = Boolean(supabaseUrl && supabaseServiceKey);

if (!isSupabaseBackendConfigured) {
  console.warn('[SITE ACM Backend] Warning: SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY is missing. Operating in fallback mode.');
}

export const supabaseAdmin = isSupabaseBackendConfigured
  ? createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    })
  : null;
