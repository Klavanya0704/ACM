import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { API_BASE_URL } from '../lib/api';

const LOCAL_REGISTRATIONS_KEY = 'site_acm_registrations_db';

const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

// Initial sample registrations for demo preview if database is empty
function getLocalRegistrations() {
  const stored = localStorage.getItem(LOCAL_REGISTRATIONS_KEY);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch (e) {
      console.error('Failed to parse local registrations:', e);
    }
  }

  const initialRegistrations = [
    {
      id: 'reg-101',
      event_id: null,
      event_title: 'Code to Cloud',
      full_name: 'Kolluri Durga Sai Lavanya',
      email: 'lavanya.k@sasi.ac.in',
      phone: '9876543210',
      college: 'Sasi Institute of Technology & Engineering',
      department: 'Computer Science & Engineering',
      year: '3rd Year',
      status: 'Registered',
      registered_at: new Date(Date.now() - 86400000 * 2).toISOString(),
    },
    {
      id: 'reg-102',
      event_id: null,
      event_title: 'Code to Cloud',
      full_name: 'Manuri Susatwik',
      email: 'susatwik.m@sasi.ac.in',
      phone: '9848022334',
      college: 'Sasi Institute of Technology & Engineering',
      department: 'Computer Science & Engineering',
      year: '4th Year',
      status: 'Attended',
      registered_at: new Date(Date.now() - 86400000 * 4).toISOString(),
    },
    {
      id: 'reg-103',
      event_id: null,
      event_title: 'Hour of Code - Special Edition',
      full_name: 'Akhil Kumar Yandamuri',
      email: 'akhil.y@sasi.ac.in',
      phone: '9123456780',
      college: 'Sasi Institute of Technology & Engineering',
      department: 'Information Technology',
      year: '2nd Year',
      status: 'Registered',
      registered_at: new Date(Date.now() - 86400000 * 6).toISOString(),
    },
  ];

  localStorage.setItem(LOCAL_REGISTRATIONS_KEY, JSON.stringify(initialRegistrations));
  return initialRegistrations;
}

export const registrationsService = {
  // Fetch all registrations
  async getRegistrations() {
    if (API_BASE_URL) {
      try {
        const res = await fetch(`${API_BASE_URL}/api/admin/registrations`, {
          headers: { 'x-admin-secret': 'site-acm-admin-secret' }
        });
        if (res.ok) {
          return await res.json();
        }
      } catch (err) {
        console.warn('Backend registrations fetch failed, using fallback:', err);
      }
    }

    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase
        .from('event_registrations')
        .select('*')
        .order('registered_at', { ascending: false });

      if (!error && data) {
        return data;
      }
    }
    return getLocalRegistrations();
  },

  // Submit new registration from public event detail page
  async registerForEvent(registrationData) {
    const validEventId = registrationData.event_id && UUID_REGEX.test(registrationData.event_id)
      ? registrationData.event_id
      : null;

    const record = {
      event_id: validEventId,
      event_title: registrationData.event_title || 'SITE Event',
      full_name: registrationData.full_name,
      email: registrationData.email,
      roll_number: registrationData.roll_number || null,
      department: registrationData.department || 'Computer Science & Engineering',
      year: registrationData.year || '3rd Year',
      phone: registrationData.phone || '',
      college: registrationData.college || 'Sasi Institute of Technology & Engineering',
      status: 'Registered',
      registered_at: new Date().toISOString(),
    };

    if (API_BASE_URL) {
      try {
        const eventParam = registrationData.event_id || 'general';
        const res = await fetch(`${API_BASE_URL}/api/events/${eventParam}/register`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(record)
        });
        if (res.ok) {
          return await res.json();
        }
      } catch (err) {
        console.warn('Backend API registration failed, checking Supabase/local:', err);
      }
    }

    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase
        .from('event_registrations')
        .insert([record])
        .select();

      if (error) throw error;
      return data[0];
    } else {
      const registrations = getLocalRegistrations();
      record.id = 'reg-' + Date.now();
      registrations.unshift(record);
      localStorage.setItem(LOCAL_REGISTRATIONS_KEY, JSON.stringify(registrations));
      return record;
    }
  },

  // Update registration status (Attended, Cancelled, Registered)
  async updateStatus(id, newStatus) {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase
        .from('event_registrations')
        .update({ status: newStatus })
        .eq('id', id)
        .select();

      if (error) throw error;
      return data[0];
    } else {
      const registrations = getLocalRegistrations();
      const index = registrations.findIndex(r => r.id === id);
      if (index !== -1) {
        registrations[index].status = newStatus;
        localStorage.setItem(LOCAL_REGISTRATIONS_KEY, JSON.stringify(registrations));
        return registrations[index];
      }
      throw new Error('Registration record not found');
    }
  },

  // Export registrations array as CSV file
  exportCSV(registrations, filename = 'SITE_ACM_Registrations.csv') {
    if (!registrations || registrations.length === 0) {
      alert('No registration data available to export.');
      return;
    }

    const headers = [
      'Student Name',
      'Email',
      'Phone',
      'College',
      'Department',
      'Year',
      'Event Title',
      'Registration Date',
      'Status'
    ];

    const rows = registrations.map(reg => [
      `"${(reg.full_name || '').replace(/"/g, '""')}"`,
      `"${(reg.email || '').replace(/"/g, '""')}"`,
      `"${(reg.phone || '').replace(/"/g, '""')}"`,
      `"${(reg.college || '').replace(/"/g, '""')}"`,
      `"${(reg.department || '').replace(/"/g, '""')}"`,
      `"${(reg.year || '').replace(/"/g, '""')}"`,
      `"${(reg.event_title || '').replace(/"/g, '""')}"`,
      `"${reg.registered_at ? new Date(reg.registered_at).toLocaleString() : ''}"`,
      `"${(reg.status || 'Registered').replace(/"/g, '""')}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};
