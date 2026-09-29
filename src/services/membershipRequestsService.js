import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { API_BASE_URL } from '../lib/api';

const LOCAL_REQUESTS_KEY = 'site_acm_membership_requests_db';

function getLocalRequests() {
  const stored = localStorage.getItem(LOCAL_REQUESTS_KEY);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch (e) {
      console.error('Failed to parse local membership requests:', e);
    }
  }
  return [];
}

export const membershipRequestsService = {
  // Fetch all membership requests (for admin)
  async getRequests() {
    if (API_BASE_URL) {
      try {
        const res = await fetch(`${API_BASE_URL}/api/admin/membership-requests`, {
          headers: { 'x-admin-secret': 'site-acm-admin-secret' }
        });
        if (res.ok) {
          return await res.json();
        }
      } catch (err) {
        console.warn('Backend API membership requests fetch failed:', err);
      }
    }

    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase
          .from('membership_requests')
          .select('*')
          .order('submitted_at', { ascending: false });

        if (!error && data) {
          return data;
        }
      } catch (err) {
        console.warn('Supabase query error for membership requests, falling back to local storage:', err);
      }
    }
    return getLocalRequests();
  },

  // Submit a new membership request (public)
  async submitRequest(requestData) {
    const newRequest = {
      full_name: requestData.full_name,
      college: requestData.college || requestData.institution || 'Sasi Institute of Technology & Engineering',
      roll_number: requestData.roll_number,
      email: requestData.email,
      phone: requestData.phone || '',
      department: requestData.department,
      year_of_study: requestData.year_of_study,
      acm_status: requestData.acm_status || requestData.acm_membership_status || 'Not an ACM Member',
      interests: Array.isArray(requestData.interests) ? requestData.interests : (requestData.areas_of_interest || []),
      statement: requestData.statement || requestData.interest_reason || '',
      consent: requestData.consent !== undefined ? Boolean(requestData.consent) : true,
      status: 'pending',
      submitted_at: new Date().toISOString(),
    };

    if (API_BASE_URL) {
      try {
        const res = await fetch(`${API_BASE_URL}/api/membership-requests`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newRequest)
        });
        if (res.ok) {
          return await res.json();
        }
      } catch (err) {
        console.warn('Backend API membership submit failed, trying Supabase/local:', err);
      }
    }

    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase
        .from('membership_requests')
        .insert([newRequest])
        .select();

      if (error) throw error;
      return data[0];
    } else {
      const requests = getLocalRequests();
      newRequest.id = 'req-' + Date.now();
      requests.unshift(newRequest);
      localStorage.setItem(LOCAL_REQUESTS_KEY, JSON.stringify(requests));
      return newRequest;
    }
  },

  // Update status (admin)
  async updateStatus(id, newStatus) {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase
        .from('membership_requests')
        .update({ status: newStatus })
        .eq('id', id)
        .select();

      if (error) throw error;
      return data[0];
    } else {
      const requests = getLocalRequests();
      const index = requests.findIndex(r => r.id === id);
      if (index !== -1) {
        requests[index].status = newStatus;
        localStorage.setItem(LOCAL_REQUESTS_KEY, JSON.stringify(requests));
        return requests[index];
      }
      throw new Error('Request not found');
    }
  },

  // Delete request (admin)
  async deleteRequest(id) {
    if (isSupabaseConfigured && supabase) {
      const { error } = await supabase
        .from('membership_requests')
        .delete()
        .eq('id', id);

      if (error) throw error;
      return true;
    } else {
      const requests = getLocalRequests();
      const filtered = requests.filter(r => r.id !== id);
      localStorage.setItem(LOCAL_REQUESTS_KEY, JSON.stringify(filtered));
      return true;
    }
  },
};
