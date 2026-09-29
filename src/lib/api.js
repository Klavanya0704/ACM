/**
 * SITE ACM Student Chapter - Central API & Environment Configuration
 * Provides unified access to environment variables, Supabase credentials,
 * and optional backend proxy endpoints.
 */

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';
export const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || '';
export const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);

export function getApiEndpoint(path) {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  if (API_BASE_URL) {
    return `${API_BASE_URL.replace(/\/$/, '')}${cleanPath}`;
  }
  return cleanPath;
}
