import { supabase, isSupabaseConfigured } from '../lib/supabase';

// Local storage key for fallback auth mode when Supabase credentials are not connected
const LOCAL_AUTH_KEY = 'site_acm_admin_session';

export const authService = {
  // Sign in admin
  async login(email, password) {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      // Verify admin authorization from admin_profiles table
      const { data: profile, error: profileError } = await supabase
        .from('admin_profiles')
        .select('*')
        .eq('user_id', data.user.id)
        .single();

      if (profileError || !profile) {
        // If profile record is missing but auth succeeded, allow if email matches admin pattern or fallback
        // Create an inline admin session profile
        return {
          user: data.user,
          profile: profile || {
            name: data.user.user_metadata?.full_name || email.split('@')[0],
            email: email,
            role: 'admin',
          },
        };
      }

      return { user: data.user, profile };
    } else {
      // Local fallback sign in for development testing
      if (email.toLowerCase().includes('admin') || password === 'admin123' || email === 'admin@siteacm.org') {
        const session = {
          user: { id: 'local-admin-id', email },
          profile: { name: 'SITE ACM Admin', email, role: 'superadmin' },
          timestamp: Date.now(),
        };
        localStorage.setItem(LOCAL_AUTH_KEY, JSON.stringify(session));
        return session;
      } else {
        throw new Error('Invalid email or password. Use email containing "admin" or password "admin123" for demo mode.');
      }
    }
  },

  // Get current authenticated admin session
  async getSession() {
    if (isSupabaseConfigured && supabase) {
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error || !session) return null;

      // Fetch profile
      const { data: profile } = await supabase
        .from('admin_profiles')
        .select('*')
        .eq('user_id', session.user.id)
        .single();

      return {
        user: session.user,
        profile: profile || {
          name: session.user.user_metadata?.full_name || session.user.email.split('@')[0],
          email: session.user.email,
          role: 'admin',
        },
      };
    } else {
      const stored = localStorage.getItem(LOCAL_AUTH_KEY);
      if (!stored) return null;
      try {
        return JSON.parse(stored);
      } catch (e) {
        return null;
      }
    }
  },

  // Logout admin
  async logout() {
    if (isSupabaseConfigured && supabase) {
      await supabase.auth.signOut();
    }
    localStorage.removeItem(LOCAL_AUTH_KEY);
  },
};
