import { Router } from 'express';
import { supabaseAdmin, isSupabaseBackendConfigured } from '../config/supabase.js';
import { requireAdmin } from '../middleware/auth.js';

const router = Router();

let fallbackRequests = [];

/**
 * POST /api/membership-requests
 * Public: Student membership interest form submission
 */
router.post('/membership-requests', async (req, res) => {
  const {
    full_name,
    college,
    roll_number,
    email,
    phone,
    department,
    year_of_study,
    acm_status,
    interests,
    statement,
    consent
  } = req.body;

  if (!full_name || !email || !roll_number || !department || !year_of_study) {
    return res.status(400).json({
      error: 'Validation Error',
      message: 'Full name, email, roll number, department, and year of study are required.'
    });
  }

  const newRequest = {
    full_name,
    college: college || 'Sasi Institute of Technology & Engineering',
    roll_number,
    email,
    phone: phone || '',
    department,
    year_of_study,
    acm_status: acm_status || 'Not an ACM Member',
    interests: interests || [],
    statement: statement || '',
    consent: consent !== undefined ? Boolean(consent) : true,
    status: 'pending',
    submitted_at: new Date().toISOString()
  };

  try {
    if (isSupabaseBackendConfigured && supabaseAdmin) {
      const { data, error } = await supabaseAdmin
        .from('membership_requests')
        .insert([newRequest])
        .select()
        .single();

      if (error) throw error;
      return res.status(201).json(data);
    } else {
      newRequest.id = 'req-' + Date.now();
      fallbackRequests.unshift(newRequest);
      return res.status(201).json(newRequest);
    }
  } catch (err) {
    console.error('Membership Request Error:', err);
    return res.status(500).json({ error: 'Failed to submit membership request', message: err.message });
  }
});

/**
 * GET /api/admin/membership-requests
 * Admin: Retrieve all student membership requests
 */
router.get('/admin/membership-requests', requireAdmin, async (req, res) => {
  try {
    if (isSupabaseBackendConfigured && supabaseAdmin) {
      const { data, error } = await supabaseAdmin
        .from('membership_requests')
        .select('*')
        .order('submitted_at', { ascending: false });

      if (!error && data) {
        return res.json(data);
      }
    }
    return res.json(fallbackRequests);
  } catch (err) {
    return res.status(500).json({ error: 'Internal Server Error', message: err.message });
  }
});

/**
 * PATCH /api/admin/membership-requests/:id/status
 * Admin: Update request status (pending, reviewed, approved, rejected)
 */
router.patch('/admin/membership-requests/:id/status', requireAdmin, async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const validStatuses = ['pending', 'reviewed', 'approved', 'rejected'];
  if (!status || !validStatuses.includes(status)) {
    return res.status(400).json({
      error: 'Bad Request',
      message: `Status must be one of: ${validStatuses.join(', ')}`
    });
  }

  try {
    if (isSupabaseBackendConfigured && supabaseAdmin) {
      const { data, error } = await supabaseAdmin
        .from('membership_requests')
        .update({ status })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return res.json(data);
    } else {
      const reqRecord = fallbackRequests.find(r => r.id === id);
      if (reqRecord) {
        reqRecord.status = status;
        return res.json(reqRecord);
      }
      return res.status(404).json({ error: 'Not Found', message: 'Membership request not found.' });
    }
  } catch (err) {
    return res.status(500).json({ error: 'Failed to update status', message: err.message });
  }
});

export default router;
