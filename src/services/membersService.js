import { supabase, isSupabaseConfigured } from '../lib/supabase';

const LOCAL_MEMBERS_KEY = 'site_acm_members_db';

// 7 Official Verified SITE ACM Chapter Members
export function getInitialMembersRoster() {
  return [
    {
      id: 'mem-1',
      name: 'K. Sruthi',
      year: '4th Year',
      role: 'CHAPTER MEMBER',
      is_acm_member: true,
      created_at: '2026-01-01T00:00:00.000Z'
    },
    {
      id: 'mem-2',
      name: 'S. Prasanna Kumar',
      year: '4th Year',
      role: 'CHAPTER MEMBER',
      is_acm_member: true,
      created_at: '2026-01-02T00:00:00.000Z'
    },
    {
      id: 'mem-3',
      name: 'K. Sanju Sri',
      year: '4th Year',
      role: 'CHAPTER MEMBER',
      is_acm_member: true,
      created_at: '2026-01-03T00:00:00.000Z'
    },
    {
      id: 'mem-4',
      name: 'K. Lowkya',
      year: '4th Year',
      role: 'CHAPTER MEMBER',
      is_acm_member: true,
      created_at: '2026-01-04T00:00:00.000Z'
    },
    {
      id: 'mem-5',
      name: 'S. Harshitha',
      year: '4th Year',
      role: 'CHAPTER MEMBER',
      is_acm_member: true,
      created_at: '2026-01-05T00:00:00.000Z'
    },
    {
      id: 'mem-6',
      name: 'Varun',
      year: '4th Year',
      role: 'CHAPTER MEMBER',
      is_acm_member: true,
      created_at: '2026-01-06T00:00:00.000Z'
    },
    {
      id: 'mem-7',
      name: 'Lavanya',
      year: '3rd Year',
      role: 'CHAPTER MEMBER',
      is_acm_member: true,
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
      // Purge old mock data if it contains generated/fake member records
      if (Array.isArray(parsed)) {
        const hasFake = parsed.some(m => m.name && (
          m.name.includes('Venkata') ||
          m.name.includes('Bhavya') ||
          m.name.includes('Dinesh') ||
          m.name.includes('Harshitha Guntupalli') ||
          m.name.includes('Pavan Kalyan') ||
          m.name.includes('Lakshmi Prasanna') ||
          m.name.includes('Rohith Varma')
        ));
        if (!hasFake && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.error('Failed to parse local members:', e);
    }
  }
  const initial = getInitialMembersRoster();
  localStorage.setItem(LOCAL_MEMBERS_KEY, JSON.stringify(initial));
  return initial;
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
          return data;
        }
      } catch (err) {
        console.warn('Supabase query error, using 7-member verified fallback:', err);
      }
    }
    return getLocalMembers();
  },

  // Get member by ID
  async getMemberById(id) {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase
          .from('members')
          .select('*')
          .eq('id', id)
          .single();

        if (!error && data) return data;
      } catch (err) {
        console.warn('Supabase getMemberById error:', err);
      }
    }
    const members = getLocalMembers();
    return members.find(m => m.id === id) || null;
  },

  // Create member
  async createMember(memberData) {
    const newMember = {
      ...memberData,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase
        .from('members')
        .insert([newMember])
        .select();

      if (error) throw error;
      return data[0];
    } else {
      const members = getLocalMembers();
      newMember.id = 'mem-' + Date.now();
      members.unshift(newMember);
      localStorage.setItem(LOCAL_MEMBERS_KEY, JSON.stringify(members));
      return newMember;
    }
  },

  // Update member
  async updateMember(id, memberData) {
    const updated = {
      ...memberData,
      updated_at: new Date().toISOString(),
    };

    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase
        .from('members')
        .update(updated)
        .eq('id', id)
        .select();

      if (error) throw error;
      return data[0];
    } else {
      const members = getLocalMembers();
      const index = members.findIndex(m => m.id === id);
      if (index !== -1) {
        members[index] = { ...members[index], ...updated };
        localStorage.setItem(LOCAL_MEMBERS_KEY, JSON.stringify(members));
        return members[index];
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
