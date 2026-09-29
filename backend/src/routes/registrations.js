import { Router } from 'express';
import { supabaseAdmin, isSupabaseBackendConfigured } from '../config/supabase.js';
import { requireAdmin } from '../middleware/auth.js';

const router = Router();

const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

let fallbackRegistrations = [];

/**
 * POST /api/events/:eventId/register
 * Public: Student event registration endpoint
 */
router.post('/events/:eventId/register', async (req, res) => {
  const { eventId } = req.params;
  const { full_name, email, roll_number, department, year, phone, college, event_title } = req.body;

  if (!full_name || !email) {
    return res.status(400).json({
      error: 'Validation Error',
      message: 'Full name and email address are required.'
    });
  }

  const validEventId = eventId && UUID_REGEX.test(eventId) ? eventId : null;

  const registrationRecord = {
    event_id: validEventId,
    event_title: event_title || 'SITE Event',
    full_name,
    email,
    roll_number: roll_number || null,
    department: department || 'Computer Science & Engineering',
    year: year || '3rd Year',
    phone: phone || '',
    college: college || 'Sasi Institute of Technology & Engineering',
    status: 'Registered',
    registered_at: new Date().toISOString()
  };

  try {
    if (isSupabaseBackendConfigured && supabaseAdmin) {
      const { data, error } = await supabaseAdmin
        .from('event_registrations')
        .insert([registrationRecord])
        .select()
        .single();

      if (error) throw error;
      return res.status(201).json(data);
    } else {
      registrationRecord.id = 'reg-' + Date.now();
      fallbackRegistrations.unshift(registrationRecord);
      return res.status(201).json(registrationRecord);
    }
  } catch (err) {
    console.error('Registration Error:', err);
    return res.status(500).json({ error: 'Failed to process registration', message: err.message });
  }
});

/**
 * GET /api/admin/registrations
 * Admin: Fetch all student event registrations
 */
router.get('/admin/registrations', requireAdmin, async (req, res) => {
  try {
    if (isSupabaseBackendConfigured && supabaseAdmin) {
      const { data, error } = await supabaseAdmin
        .from('event_registrations')
        .select('*')
        .order('registered_at', { ascending: false });

      if (!error && data) {
        return res.json(data);
      }
    }
    return res.json(fallbackRegistrations);
  } catch (err) {
    return res.status(500).json({ error: 'Internal Server Error', message: err.message });
  }
});

/**
 * PATCH /api/admin/registrations/:id/status
 * Admin: Update registration status (Registered, Attended, Cancelled)
 */
router.patch('/admin/registrations/:id/status', requireAdmin, async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!status) {
    return res.status(400).json({ error: 'Bad Request', message: 'Status string is required.' });
  }

  try {
    if (isSupabaseBackendConfigured && supabaseAdmin) {
      const { data, error } = await supabaseAdmin
        .from('event_registrations')
        .update({ status })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return res.json(data);
    } else {
      const reg = fallbackRegistrations.find(r => r.id === id);
      if (reg) {
        reg.status = status;
        return res.json(reg);
      }
      return res.status(404).json({ error: 'Not Found', message: 'Registration record not found.' });
    }
  } catch (err) {
    return res.status(500).json({ error: 'Failed to update registration status', message: err.message });
  }
});

export default router;
