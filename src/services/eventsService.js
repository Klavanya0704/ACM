import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { VERIFIED_EVENTS } from '../data/mockData';

const LOCAL_EVENTS_KEY = 'site_acm_events_db';

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
  const initialEvents = VERIFIED_EVENTS.map(evt => ({
    id: evt.id,
    title: evt.title,
    slug: evt.slug || evt.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    description: evt.description,
    event_date: evt.date || '2026-09-30',
    event_time: evt.time || '10:00 AM',
    badge_month: evt.badgeMonth || 'SEP',
    badge_day: evt.badgeDay || '30',
    category: evt.category || 'Technical Event',
    location: evt.location || 'SASI Campus',
    mode: evt.mode || 'In-Person',
    image_url: evt.image,
    speaker_name: evt.speaker || '',
    speaker_designation: evt.speakerTitle || '',
    registration_fee: 'Free',
    max_participants: 150,
    registration_status: 'Open',
    attendance: evt.attendance || 0,
    volunteers: evt.volunteers || 0,
    topics: evt.topics || [],
    collaboration: evt.collaboration || '',
    created_at: new Date().toISOString()
  }));

  localStorage.setItem(LOCAL_EVENTS_KEY, JSON.stringify(initialEvents));
  return initialEvents;
}

export const eventsService = {
  // Fetch all events
  async getEvents() {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .order('event_date', { ascending: false });

      if (!error && data && data.length > 0) {
        return data;
      }
    }
    return getLocalEvents();
  },

  // Get single event by slug or id
  async getEventBySlug(slug) {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .eq('slug', slug)
        .single();

      if (!error && data) return data;
    }
    const events = getLocalEvents();
    return events.find(e => e.slug === slug || e.id === slug) || null;
  },

  // Get single event by id
  async getEventById(id) {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .eq('id', id)
        .single();

      if (!error && data) return data;
    }
    const events = getLocalEvents();
    return events.find(e => e.id === id) || null;
  },

  // Create new event
  async createEvent(eventData) {
    const slug = eventData.slug || eventData.title.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-');
    const newEvent = {
      ...eventData,
      slug,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase
        .from('events')
        .insert([newEvent])
        .select();

      if (error) throw error;
      return data[0];
    } else {
      const events = getLocalEvents();
      newEvent.id = 'evt-' + Date.now();
      events.unshift(newEvent);
      localStorage.setItem(LOCAL_EVENTS_KEY, JSON.stringify(events));
      return newEvent;
    }
  },

  // Update event
  async updateEvent(id, eventData) {
    const updated = {
      ...eventData,
      updated_at: new Date().toISOString(),
    };

    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase
        .from('events')
        .update(updated)
        .eq('id', id)
        .select();

      if (error) throw error;
      return data[0];
    } else {
      const events = getLocalEvents();
      const index = events.findIndex(e => e.id === id);
      if (index !== -1) {
        events[index] = { ...events[index], ...updated };
        localStorage.setItem(LOCAL_EVENTS_KEY, JSON.stringify(events));
        return events[index];
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
