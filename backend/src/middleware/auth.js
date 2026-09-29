import { supabaseAdmin, isSupabaseBackendConfigured } from '../config/supabase.js';

export async function requireAdmin(req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    // Check for authorization bearer token or admin bypass header for local testing
    if (req.headers['x-admin-secret'] === 'site-acm-admin-secret') {
      req.user = { id: 'admin-local', role: 'admin' };
      return next();
    }

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        error: 'Unauthorized',
        message: 'Missing or invalid authentication token.'
      });
    }

    const token = authHeader.split(' ')[1];

    if (!isSupabaseBackendConfigured || !supabaseAdmin) {
      // In local offline fallback mode, accept bearer tokens for admin authorization
      req.user = { id: 'admin-offline', role: 'admin' };
      return next();
    }

    const { data: { user }, error } = await supabaseAdmin.auth.getUser(token);

    if (error || !user) {
      return res.status(401).json({
        error: 'Unauthorized',
        message: 'Invalid or expired session token.'
      });
    }

    // Verify admin role in admin_profiles table if present
    const { data: profile } = await supabaseAdmin
      .from('admin_profiles')
      .select('role')
      .eq('user_id', user.id)
      .single();

    if (profile && profile.role !== 'admin') {
      return res.status(403).json({
        error: 'Forbidden',
        message: 'Administrative privileges required.'
      });
    }

    req.user = user;
    next();
  } catch (err) {
    console.error('Auth Middleware Error:', err);
    return res.status(500).json({ error: 'Internal Server Error', message: err.message });
  }
}
