import { Router } from 'express';
import { supabaseAdmin, isSupabaseBackendConfigured } from '../config/supabase.js';

const router = Router();

/**
 * POST /api/auth/login
 * Admin Login Endpoint
 */
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Bad Request', message: 'Email and password are required.' });
  }

  try {
    if (isSupabaseBackendConfigured && supabaseAdmin) {
      const { data, error } = await supabaseAdmin.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        return res.status(401).json({ error: 'Authentication Failed', message: error.message });
      }

      return res.json({
        user: data.user,
        session: data.session,
        access_token: data.session.access_token
      });
    } else {
      // Local fallback testing mode
      if (email === 'admin@siteacm.org' && password === 'admin123') {
        return res.json({
          user: { id: 'admin-local', email: 'admin@siteacm.org', user_metadata: { name: 'SITE ACM Admin' } },
          access_token: 'site-acm-admin-secret-token'
        });
      }
      return res.status(401).json({ error: 'Authentication Failed', message: 'Invalid credentials. Use admin@siteacm.org / admin123 in offline test mode.' });
    }
  } catch (err) {
    return res.status(500).json({ error: 'Internal Server Error', message: err.message });
  }
});

export default router;
