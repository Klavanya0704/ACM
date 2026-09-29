import { supabase, isSupabaseConfigured } from '../lib/supabase';

const LOCAL_MEMBERS_KEY = 'site_acm_members_db';

// Normalizer to attach UI convenience aliases while preserving DB fidelity
export function normalizeMember(m) {
  if (!m) return null;
  return {
    ...m,
    id: m.id,
    name: m.name,
    acm_member_id: m.acm_member_id || m.acm_number || m.acmNumber || '',
    acm_number: m.acm_member_id || m.acm_number || m.acmNumber || '',
    department: m.department || 'Computer Science & Engineering',
    year_of_study: m.year_of_study || m.year || '3rd Year',
    year: m.year_of_study || m.year || '3rd Year',
    acm_role: m.acm_role || m.role || 'Chapter Member',
    role: m.acm_role || m.role || 'Chapter Member',
    joined_date: m.joined_date || null,
    image_url: m.image_url || m.photo_url || '',
    photo_url: m.image_url || m.photo_url || '',
    is_active: m.is_active !== undefined ? Boolean(m.is_active) : true,
    is_acm_member: m.is_active !== undefined ? Boolean(m.is_active) : (m.is_acm_member !== undefined ? Boolean(m.is_acm_member) : true),
    created_at: m.created_at || new Date().toISOString()
  };
}

// Clean helper to produce only valid database columns for Supabase 'members' table
function sanitizeMemberPayload(memberData) {
  return {
    name: memberData.name,
    acm_member_id: memberData.acm_member_id || memberData.acm_number || memberData.acmNumber || null,
    department: memberData.department || 'Computer Science & Engineering',
    year_of_study: memberData.year_of_study || memberData.year || '3rd Year',
    acm_role: memberData.acm_role || memberData.role || 'Chapter Member',
    joined_date: memberData.joined_date || null,
    image_url: memberData.image_url || memberData.photo_url || null,
    is_active: memberData.is_active !== undefined ? Boolean(memberData.is_active) : (memberData.is_acm_member !== undefined ? Boolean(memberData.is_acm_member) : true),
  };
}

// 7 Official Verified SITE ACM Chapter Members
export function getInitialMembersRoster() {
  return [
    {
      id: 'mem-1',
      name: 'K. Sruthi',
      acm_member_id: 'ACM-IN-2024-001',
      department: 'Computer Science & Engineering',
      year_of_study: '4th Year',
      acm_role: 'CHAPTER MEMBER',
      is_active: true,
      created_at: '2026-01-01T00:00:00.000Z'
    },
    {
      id: 'mem-2',
      name: 'S. Prasanna Kumar',
      acm_member_id: 'ACM-IN-2024-002',
      department: 'Computer Science & Engineering',
      year_of_study: '4th Year',
      acm_role: 'CHAPTER MEMBER',
      is_active: true,
      created_at: '2026-01-02T00:00:00.000Z'
    },
    {
      id: 'mem-3',
      name: 'K. Sanju Sri',
      acm_member_id: 'ACM-IN-2024-003',
      department: 'Computer Science & Engineering',
      year_of_study: '4th Year',
      acm_role: 'CHAPTER MEMBER',
      is_active: true,
      created_at: '2026-01-03T00:00:00.000Z'
    },
    {
      id: 'mem-4',
      name: 'K. Lowkya',
      acm_member_id: 'ACM-IN-2024-004',
      department: 'Computer Science & Engineering',
      year_of_study: '4th Year',
      acm_role: 'CHAPTER MEMBER',
      is_active: true,
      created_at: '2026-01-04T00:00:00.000Z'
    },
    {
      id: 'mem-5',
      name: 'S. Harshitha',
      acm_member_id: 'ACM-IN-2024-005',
      department: 'Computer Science & Engineering',
      year_of_study: '4th Year',
      acm_role: 'CHAPTER MEMBER',
      is_active: true,
      created_at: '2026-01-05T00:00:00.000Z'
    },
    {
      id: 'mem-6',
      name: 'Varun',
      acm_member_id: 'ACM-IN-2024-006',
      department: 'Computer Science & Engineering',
      year_of_study: '4th Year',
      acm_role: 'CHAPTER MEMBER',
      is_active: true,
      created_at: '2026-01-06T00:00:00.000Z'
    },
    {
      id: 'mem-7',
      name: 'Lavanya',
      acm_member_id: 'ACM-IN-2024-007',
      department: 'Computer Science & Engineering',
      year_of_study: '3rd Year',
      acm_role: 'CHAPTER MEMBER',
      is_active: true,
      created_at: '2026-01-07T00:00:00.000Z'
    }
  ];
}

// Local storage helper
function getLocalMembers() {
  const stored = localStorage.getItem(LOCAL_MEMBERS_KEY);
  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed.map(normalizeMember);
      }
    } catch (e) {
      console.error('Failed to parse local members:', e);
    }
  }
  const initial = getInitialMembersRoster();
  localStorage.setItem(LOCAL_MEMBERS_KEY, JSON.stringify(initial));
  return initial.map(normalizeMember);
}

export const membersService = {
  // Get all members
  async getMembers() {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase
          .from('members')
          .select('*')
          .order('name', { ascending: true });

        if (!error && data && data.length > 0) {
          return data.map(normalizeMember);
        }
      } catch (err) {
        console.warn('Supabase query error, using verified roster fallback:', err);
      }
    }
    return getLocalMembers().map(normalizeMember);
  },

  // Get member by ID
  async getMemberById(id) {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase
          .from('members')
          .select('*')
          .eq('id', id)
          .maybeSingle();

        if (!error && data) return normalizeMember(data);
      } catch (err) {
        console.warn('Supabase getMemberById error:', err);
      }
    }
    const members = getLocalMembers();
    const found = members.find(m => m.id === id) || null;
    return normalizeMember(found);
  },

  // Create member
  async createMember(memberData) {
    const cleanPayload = sanitizeMemberPayload(memberData);
    const newMember = {
      ...cleanPayload,
      created_at: new Date().toISOString(),
    };

    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase
        .from('members')
        .insert([newMember])
        .select();

      if (error) throw error;
      return normalizeMember(data[0]);
    } else {
      const members = getLocalMembers();
      newMember.id = 'mem-' + Date.now();
      members.unshift(newMember);
      localStorage.setItem(LOCAL_MEMBERS_KEY, JSON.stringify(members));
      return normalizeMember(newMember);
    }
  },

  // Update member
  async updateMember(id, memberData) {
    const cleanPayload = sanitizeMemberPayload(memberData);

    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase
        .from('members')
        .update(cleanPayload)
        .eq('id', id)
        .select();

      if (error) throw error;
      return normalizeMember(data[0]);
    } else {
      const members = getLocalMembers();
      const index = members.findIndex(m => m.id === id);
      if (index !== -1) {
        members[index] = { ...members[index], ...cleanPayload };
        localStorage.setItem(LOCAL_MEMBERS_KEY, JSON.stringify(members));
        return normalizeMember(members[index]);
      }
      throw new Error('Member not found');
    }
  },

  // Delete member
  async deleteMember(id) {
    if (isSupabaseConfigured && supabase) {
      const { error } = await supabase
        .from('members')
        .delete()
        .eq('id', id);

      if (error) throw error;
      return true;
    } else {
      const members = getLocalMembers();
      const filtered = members.filter(m => m.id !== id);
      localStorage.setItem(LOCAL_MEMBERS_KEY, JSON.stringify(filtered));
      return true;
    }
  },

  // Upload member photo
  async uploadPhoto(file) {
    if (isSupabaseConfigured && supabase) {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${fileExt}`;
      const filePath = `avatars/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('member-photos')
        .upload(filePath, file);

      if (uploadError) {
        console.warn('Supabase storage upload failed, converting photo to base64 preview:', uploadError.message);
        return await new Promise((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result);
          reader.readAsDataURL(file);
        });
      }

      const { data } = supabase.storage.from('member-photos').getPublicUrl(filePath);
      return data.publicUrl;
    } else {
      return await new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(file);
      });
    }
  },
};
