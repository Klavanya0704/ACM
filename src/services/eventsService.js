import { supabase, isSupabaseConfigured } from '../lib/supabase.js';
import { API_BASE_URL } from '../lib/api.js';
import { VERIFIED_EVENTS } from '../data/mockData.js';

const LOCAL_EVENTS_KEY = 'site_acm_events_db';

// Helper to derive badge month & day from a date string
export function deriveEventBadge(dateStr) {
  if (!dateStr) return { badgeMonth: 'TBD', badgeDay: '--' };
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return { badgeMonth: 'TBD', badgeDay: '--' };
  return {
    badgeMonth: d.toLocaleString('en-US', { month: 'short' }).toUpperCase(),
    badgeDay: String(d.getDate()).padStart(2, '0')
  };
}

// Normalizer to attach UI convenience properties while preserving DB fidelity
export function normalizeEvent(evt) {
  if (!evt) return null;
  const rawDate = evt.event_date || evt.date || '2026-09-30';
  const { badgeMonth, badgeDay } = deriveEventBadge(rawDate);

  return {
    ...evt,
    event_date: rawDate,
    date: rawDate,
    badgeMonth: evt.badgeMonth || evt.badge_month || badgeMonth,
    badgeDay: evt.badgeDay || evt.badge_day || badgeDay,
    speaker: evt.speaker || evt.speaker_name || '',
    speaker_title: evt.speaker_title || evt.speaker_designation || '',
    volunteers_count: evt.volunteers_count !== undefined ? evt.volunteers_count : (evt.volunteers || 0),
    image_url: evt.image_url || evt.image || '',
  };
}

// Helper to extract only canonical PostgreSQL columns defined in 20260929000000_site_acm_schema.sql
function sanitizeEventPayload(eventData) {
  const slug = eventData.slug || (eventData.title ? eventData.title.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') : 'event-' + Date.now());
  const rawDate = eventData.event_date || eventData.date || new Date().toISOString();

  const payload = {
    title: eventData.title,
    slug,
    category: eventData.category || 'Technical Event',
    mode: eventData.mode || 'On Campus',
    event_date: rawDate,
    location: eventData.location || 'SASI Campus',
    description: eventData.description || '',
    speaker: eventData.speaker || eventData.speaker_name || null,
    speaker_title: eventData.speaker_title || eventData.speaker_designation || null,
    attendance: eventData.attendance !== undefined ? Number(eventData.attendance) : 0,
    volunteers_count: eventData.volunteers_count !== undefined ? Number(eventData.volunteers_count) : (eventData.volunteers ? Number(eventData.volunteers) : 0),
    faculty_sponsors_count: eventData.faculty_sponsors_count !== undefined ? Number(eventData.faculty_sponsors_count) : 0,
    collaboration: eventData.collaboration || null,
    topics: Array.isArray(eventData.topics) ? eventData.topics : (eventData.topics ? [eventData.topics] : []),
    image_url: eventData.image_url || eventData.image || null,
    registration_status: eventData.registration_status || 'Open',
    is_featured: Boolean(eventData.is_featured || eventData.isFeatured),
    is_upcoming: Boolean(eventData.is_upcoming || eventData.isUpcoming),
  };

  return payload;
}

// Helper to initialize local storage with mock events if empty
function getLocalEvents() {
  const stored = localStorage.getItem(LOCAL_EVENTS_KEY);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch (e) {
      console.error('Failed to parse local events:', e);
    }
  }
  // Transform VERIFIED_EVENTS format for standard schema consistency
  const initialEvents = VERIFIED_EVENTS.map(evt => normalizeEvent({
    id: evt.id,
    title: evt.title,
    slug: evt.slug || evt.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    description: evt.description,
    event_date: evt.date || '2026-09-30',
    category: evt.category || 'Technical Event',
    location: evt.location || 'SASI Campus',
    mode: evt.mode || 'On Campus',
    image_url: evt.image,
    speaker: evt.speaker || '',
    speaker_title: evt.speakerTitle || '',
    registration_status: evt.registration_status || 'Open',
    attendance: evt.attendance || 0,
    volunteers_count: evt.volunteers || 0,
    topics: evt.topics || [],
    collaboration: evt.collaboration || '',
    is_featured: Boolean(evt.isFeatured),
    is_upcoming: Boolean(evt.isUpcoming),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }));

  localStorage.setItem(LOCAL_EVENTS_KEY, JSON.stringify(initialEvents));
  return initialEvents;
}

export const eventsService = {
  // Fetch all events
  async getEvents() {
    if (API_BASE_URL) {
      try {
        const res = await fetch(`${API_BASE_URL}/api/events`);
        if (res.ok) {
          const apiData = await res.json();
          if (Array.isArray(apiData) && apiData.length > 0) {
            return apiData.map(normalizeEvent);
          }
        }
      } catch (err) {
        console.warn('Backend API connection failed, checking Supabase/local fallback:', err);
      }
    }

    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .order('event_date', { ascending: false });

      if (!error && data && data.length > 0) {
        return data.map(normalizeEvent);
      }
    }
    return getLocalEvents().map(normalizeEvent);
  },

  // Get single event by slug or id
  async getEventBySlug(slug) {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .or(`slug.eq.${slug},id.eq.${slug}`)
        .maybeSingle();

      if (!error && data) return normalizeEvent(data);
    }
    const events = getLocalEvents();
    const found = events.find(e => e.slug === slug || e.id === slug) || null;
    return normalizeEvent(found);
  },

  // Get single event by id
  async getEventById(id) {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .eq('id', id)
        .maybeSingle();

      if (!error && data) return normalizeEvent(data);
    }
    const events = getLocalEvents();
    const found = events.find(e => e.id === id) || null;
    return normalizeEvent(found);
  },

  // Create new event
  async createEvent(eventData) {
    const canonicalPayload = sanitizeEventPayload(eventData);
    const newEvent = {
      ...canonicalPayload,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase
        .from('events')
        .insert([newEvent])
        .select();

      if (error) throw error;
      return normalizeEvent(data[0]);
    } else {
      const events = getLocalEvents();
      newEvent.id = 'evt-' + Date.now();
      events.unshift(newEvent);
      localStorage.setItem(LOCAL_EVENTS_KEY, JSON.stringify(events));
      return normalizeEvent(newEvent);
    }
  },

  // Update event
  async updateEvent(id, eventData) {
    const canonicalPayload = sanitizeEventPayload(eventData);
    const updated = {
      ...canonicalPayload,
      updated_at: new Date().toISOString(),
    };

    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase
        .from('events')
        .update(updated)
        .eq('id', id)
        .select();

      if (error) throw error;
      return normalizeEvent(data[0]);
    } else {
      const events = getLocalEvents();
      const index = events.findIndex(e => e.id === id);
      if (index !== -1) {
        events[index] = { ...events[index], ...updated };
        localStorage.setItem(LOCAL_EVENTS_KEY, JSON.stringify(events));
        return normalizeEvent(events[index]);
      }
      throw new Error('Event not found');
    }
  },

  // Delete event
  async deleteEvent(id) {
    if (isSupabaseConfigured && supabase) {
      const { error } = await supabase
        .from('events')
        .delete()
        .eq('id', id);

      if (error) throw error;
      return true;
    } else {
      const events = getLocalEvents();
      const filtered = events.filter(e => e.id !== id);
      localStorage.setItem(LOCAL_EVENTS_KEY, JSON.stringify(filtered));
      return true;
    }
  },

  // Upload event image file
  async uploadImage(file) {
    if (isSupabaseConfigured && supabase) {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${fileExt}`;
      const filePath = `event-banners/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('event-images')
        .upload(filePath, file);

      if (uploadError) {
        console.warn('Supabase storage upload failed, converting image to base64/URL preview:', uploadError.message);
        return await new Promise((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result);
          reader.readAsDataURL(file);
        });
      }

      const { data } = supabase.storage.from('event-images').getPublicUrl(filePath);
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
