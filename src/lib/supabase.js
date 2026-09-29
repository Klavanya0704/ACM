import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Fallback helper for submitting contact form messages safely
export async function submitContactMessage(messageData) {
  if (isSupabaseConfigured && supabase) {
    const { data, error } = await supabase
      .from('contact_messages')
      .insert([messageData]);
    if (error) throw error;
    return data;
  } else {
    // Local storage fallback when Supabase keys are missing
    const existing = JSON.parse(localStorage.getItem('site_acm_contact_messages') || '[]');
    const newMessage = { ...messageData, id: Date.now().toString(), created_at: new Date().toISOString() };
    existing.push(newMessage);
    localStorage.setItem('site_acm_contact_messages', JSON.stringify(existing));
    return [newMessage];
  }
}
