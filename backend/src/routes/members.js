import { Router } from 'express';
import { supabaseAdmin, isSupabaseBackendConfigured } from '../config/supabase.js';
import { requireAdmin } from '../middleware/auth.js';

const router = Router();

// 7 Official Verified SITE ACM Chapter Members
let fallbackMembers = [
  { id: 'mem-1', name: 'K. Sruthi', year: '4th Year', role: 'CHAPTER MEMBER', is_acm_member: true },
  { id: 'mem-2', name: 'S. Prasanna Kumar', year: '4th Year', role: 'CHAPTER MEMBER', is_acm_member: true },
  { id: 'mem-3', name: 'K. Sanju Sri', year: '4th Year', role: 'CHAPTER MEMBER', is_acm_member: true },
  { id: 'mem-4', name: 'K. Lowkya', year: '4th Year', role: 'CHAPTER MEMBER', is_acm_member: true },
  { id: 'mem-5', name: 'S. Harshitha', year: '4th Year', role: 'CHAPTER MEMBER', is_acm_member: true },
  { id: 'mem-6', name: 'Varun', year: '4th Year', role: 'CHAPTER MEMBER', is_acm_member: true },
  { id: 'mem-7', name: 'Lavanya', year: '3rd Year', role: 'CHAPTER MEMBER', is_acm_member: true }
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
  const { name, department, year, role, is_acm_member } = req.body;

  if (!name) {
    return res.status(400).json({ error: 'Bad Request', message: 'Member name is required.' });
  }

  const newMember = {
    name,
    department: department || 'Computer Science & Engineering',
    year: year || '3rd Year',
    role: role || 'CHAPTER MEMBER',
    is_acm_member: is_acm_member !== undefined ? Boolean(is_acm_member) : true,
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
