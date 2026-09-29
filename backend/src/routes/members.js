import { Router } from 'express';
import { supabaseAdmin, isSupabaseBackendConfigured } from '../config/supabase.js';
import { requireAdmin } from '../middleware/auth.js';

const router = Router();

// 7 Official Verified SITE ACM Chapter Members
let fallbackMembers = [
  { id: 'mem-1', name: 'K. Sruthi', acm_member_id: 'ACM-IN-2024-001', department: 'Computer Science & Engineering', year_of_study: '4th Year', acm_role: 'CHAPTER MEMBER', is_active: true, created_at: '2026-01-01T00:00:00.000Z' },
  { id: 'mem-2', name: 'S. Prasanna Kumar', acm_member_id: 'ACM-IN-2024-002', department: 'Computer Science & Engineering', year_of_study: '4th Year', acm_role: 'CHAPTER MEMBER', is_active: true, created_at: '2026-01-02T00:00:00.000Z' },
  { id: 'mem-3', name: 'K. Sanju Sri', acm_member_id: 'ACM-IN-2024-003', department: 'Computer Science & Engineering', year_of_study: '4th Year', acm_role: 'CHAPTER MEMBER', is_active: true, created_at: '2026-01-03T00:00:00.000Z' },
  { id: 'mem-4', name: 'K. Lowkya', acm_member_id: 'ACM-IN-2024-004', department: 'Computer Science & Engineering', year_of_study: '4th Year', acm_role: 'CHAPTER MEMBER', is_active: true, created_at: '2026-01-04T00:00:00.000Z' },
  { id: 'mem-5', name: 'S. Harshitha', acm_member_id: 'ACM-IN-2024-005', department: 'Computer Science & Engineering', year_of_study: '4th Year', acm_role: 'CHAPTER MEMBER', is_active: true, created_at: '2026-01-05T00:00:00.000Z' },
  { id: 'mem-6', name: 'Varun', acm_member_id: 'ACM-IN-2024-006', department: 'Computer Science & Engineering', year_of_study: '4th Year', acm_role: 'CHAPTER MEMBER', is_active: true, created_at: '2026-01-06T00:00:00.000Z' },
  { id: 'mem-7', name: 'Lavanya', acm_member_id: 'ACM-IN-2024-007', department: 'Computer Science & Engineering', year_of_study: '3rd Year', acm_role: 'CHAPTER MEMBER', is_active: true, created_at: '2026-01-07T00:00:00.000Z' }
];

/**
 * GET /api/members
 * Public: List official chapter members
 */
router.get('/', async (req, res) => {
  try {
    if (isSupabaseBackendConfigured && supabaseAdmin) {
      const { data, error } = await supabaseAdmin
        .from('members')
        .select('*')
        .order('name', { ascending: true });

      if (!error && data && data.length > 0) {
        return res.json(data);
      }
    }
    return res.json(fallbackMembers);
  } catch (err) {
    return res.status(500).json({ error: 'Internal Server Error', message: err.message });
  }
});

/**
 * POST /api/admin/members
 * Admin: Add new chapter member
 */
router.post('/admin', requireAdmin, async (req, res) => {
  const {
    name,
    acm_member_id,
    acm_number,
    department,
    year_of_study,
    year,
    acm_role,
    role,
    joined_date,
    image_url,
    photo_url,
    is_active,
    is_acm_member
  } = req.body;

  if (!name) {
    return res.status(400).json({ error: 'Bad Request', message: 'Member name is required.' });
  }

  const newMember = {
    name: name.trim(),
    acm_member_id: acm_member_id || acm_number || null,
    department: department || 'Computer Science & Engineering',
    year_of_study: year_of_study || year || '3rd Year',
    acm_role: acm_role || role || 'CHAPTER MEMBER',
    joined_date: joined_date || null,
    image_url: image_url || photo_url || null,
    is_active: is_active !== undefined ? Boolean(is_active) : (is_acm_member !== undefined ? Boolean(is_acm_member) : true),
    created_at: new Date().toISOString()
  };

  try {
    if (isSupabaseBackendConfigured && supabaseAdmin) {
      const { data, error } = await supabaseAdmin
        .from('members')
        .insert([newMember])
        .select()
        .single();

      if (error) throw error;
      return res.status(201).json(data);
    } else {
      newMember.id = 'mem-' + Date.now();
      fallbackMembers.unshift(newMember);
      return res.status(201).json(newMember);
    }
  } catch (err) {
    return res.status(500).json({ error: 'Failed to create member', message: err.message });
  }
});

/**
 * DELETE /api/admin/members/:id
 * Admin: Remove chapter member
 */
router.delete('/admin/:id', requireAdmin, async (req, res) => {
  const { id } = req.params;

  try {
    if (isSupabaseBackendConfigured && supabaseAdmin) {
      const { error } = await supabaseAdmin
        .from('members')
        .delete()
        .eq('id', id);

      if (error) throw error;
      return res.json({ success: true, message: 'Member deleted.' });
    } else {
      fallbackMembers = fallbackMembers.filter(m => m.id !== id);
      return res.json({ success: true, message: 'Member deleted from fallback roster.' });
    }
  } catch (err) {
    return res.status(500).json({ error: 'Failed to delete member', message: err.message });
  }
});

export default router;
