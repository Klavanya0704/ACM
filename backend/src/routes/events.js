import { Router } from 'express';
import { supabaseAdmin, isSupabaseBackendConfigured } from '../config/supabase.js';
import { requireAdmin } from '../middleware/auth.js';

const router = Router();

// In-memory / local fallback store if Supabase credentials are missing
let fallbackEvents = [
  {
    id: 'evt-1',
    title: 'PRAYATNA 2.0',
    slug: 'prayatna-2-0',
    category: 'Hackathon',
    mode: 'On Campus',
    event_date: '2025-07-02T03:30:00.000Z',
    location: 'SASI Institute of Technology & Engineering, Tadepalligudem',
    description: 'PRAYATNA 2.0 was an intensive internal hackathon organized by the SITE ACM Student Chapter in collaboration with the AITR ACM Student Chapter, Indore. Over 100 students participated in building innovative technology solutions across domains including Web, AI, and Mobile App Development.',
    speaker: 'SITE ACM Mentors',
    speaker_title: 'Student Chapter Mentors',
    attendance: 100,
    volunteers_count: 15,
    collaboration: 'AITR ACM Student Chapter, Indore',
    registration_status: 'Completed',
    is_featured: true,
    is_upcoming: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'evt-2',
    title: 'Cyber Security in Day0',
    slug: 'cyber-security-in-day0',
    category: 'Seminar',
    mode: 'On Campus',
    event_date: '2025-07-29T05:00:00.000Z',
    location: 'SASI Institute Auditorium, Tadepalligudem',
    description: 'A comprehensive guest lecture on Day-Zero vulnerability detection, ethical hacking, threat hunting, and modern cybersecurity defense strategies. Delivered by renowned academic expert Dr. Sibi Chakravarthi.',
    speaker: 'Dr. Sibi Chakravarthi (VIT-AP)',
    speaker_title: 'Academic Expert',
    attendance: 200,
    volunteers_count: 29,
    collaboration: 'VIT-AP University Guest Lecture Series',
    registration_status: 'Completed',
    is_featured: true,
    is_upcoming: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'evt-3',
    title: 'Hour of Code – Inspiring Young Minds',
    slug: 'hour-of-code',
    category: 'Outreach',
    mode: 'On Campus',
    event_date: '2025-12-29T04:00:00.000Z',
    location: 'ZPH Schools (Veerampalem & Kommugudem)',
    description: 'An impactful community outreach program where SITE ACM student volunteers visited rural ZPH Schools to introduce school students to programming logic and computational thinking.',
    speaker: 'SITE ACM Student Volunteers & Faculty Team',
    speaker_title: 'Volunteers & Faculty',
    attendance: 120,
    volunteers_count: 26,
    collaboration: 'ZPH Schools Community Outreach',
    registration_status: 'Completed',
    is_featured: true,
    is_upcoming: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
];

function sanitizeEventPayload(body) {
  const {
    title,
    slug,
    category,
    mode,
    event_date,
    date,
    location,
    description,
    speaker,
    speaker_name,
    speaker_title,
    speaker_designation,
    attendance,
    volunteers_count,
    volunteers,
    faculty_sponsors_count,
    collaboration,
    topics,
    image_url,
    image,
    registration_status,
    is_featured,
    isFeatured,
    is_upcoming,
    isUpcoming
  } = body;

  const generatedSlug = slug || (title ? title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') : 'event-' + Date.now());

  return {
    title,
    slug: generatedSlug,
    category: category || 'Technical Event',
    mode: mode || 'On Campus',
    event_date: event_date || date || new Date().toISOString(),
    location: location || 'SASI Campus',
    description: description || '',
    speaker: speaker || speaker_name || 'SITE ACM Mentors',
    speaker_title: speaker_title || speaker_designation || null,
    attendance: attendance !== undefined ? Number(attendance) : 0,
    volunteers_count: volunteers_count !== undefined ? Number(volunteers_count) : (volunteers ? Number(volunteers) : 0),
    faculty_sponsors_count: faculty_sponsors_count !== undefined ? Number(faculty_sponsors_count) : 0,
    collaboration: collaboration || null,
    topics: Array.isArray(topics) ? topics : (topics ? [topics] : []),
    image_url: image_url || image || null,
    registration_status: registration_status || 'Open',
    is_featured: Boolean(is_featured || isFeatured),
    is_upcoming: Boolean(is_upcoming || isUpcoming)
  };
}

/**
 * GET /api/events
 * Public: List all events
 */
router.get('/', async (req, res) => {
  try {
    if (isSupabaseBackendConfigured && supabaseAdmin) {
      const { data, error } = await supabaseAdmin
        .from('events')
        .select('*')
        .order('event_date', { ascending: false });

      if (!error && data && data.length > 0) {
        return res.json(data);
      }
    }
    return res.json(fallbackEvents);
  } catch (err) {
    console.error('Fetch Events Error:', err);
    return res.status(500).json({ error: 'Internal Server Error', message: err.message });
  }
});

/**
 * GET /api/events/:slug
 * Public: Get single event by slug or ID
 */
router.get('/:slug', async (req, res) => {
  const { slug } = req.params;
  try {
    if (isSupabaseBackendConfigured && supabaseAdmin) {
      const isUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(slug);
      let query = supabaseAdmin.from('events').select('*');
      if (isUUID) {
        query = query.or(`slug.eq.${slug},id.eq.${slug}`);
      } else {
        query = query.eq('slug', slug);
      }
      const { data, error } = await query.maybeSingle();

      if (!error && data) {
        return res.json(data);
      }
    }
    const found = fallbackEvents.find(e => e.slug === slug || e.id === slug);
    if (found) return res.json(found);
    return res.status(404).json({ error: 'Not Found', message: `Event "${slug}" not found.` });
  } catch (err) {
    return res.status(500).json({ error: 'Internal Server Error', message: err.message });
  }
});

/**
 * POST /api/admin/events
 * Admin: Create a new event
 */
router.post('/admin', requireAdmin, async (req, res) => {
  const { title, category, location } = req.body;

  if (!title || !category || !location) {
    return res.status(400).json({ error: 'Bad Request', message: 'Title, category, and location are required.' });
  }

  const cleanPayload = sanitizeEventPayload(req.body);
  const newEvent = {
    ...cleanPayload,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  };

  try {
    if (isSupabaseBackendConfigured && supabaseAdmin) {
      const { data, error } = await supabaseAdmin
        .from('events')
        .insert([newEvent])
        .select()
        .single();

      if (error) throw error;
      return res.status(201).json(data);
    } else {
      newEvent.id = 'evt-' + Date.now();
      fallbackEvents.unshift(newEvent);
      return res.status(201).json(newEvent);
    }
  } catch (err) {
    console.error('Create Event Error:', err);
    return res.status(500).json({ error: 'Failed to create event', message: err.message });
  }
});

/**
 * PUT /api/admin/events/:id
 * Admin: Update event by ID
 */
router.put('/admin/:id', requireAdmin, async (req, res) => {
  const { id } = req.params;
  const cleanPayload = sanitizeEventPayload(req.body);
  const updates = { ...cleanPayload, updated_at: new Date().toISOString() };

  try {
    if (isSupabaseBackendConfigured && supabaseAdmin) {
      const { data, error } = await supabaseAdmin
        .from('events')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return res.json(data);
    } else {
      const index = fallbackEvents.findIndex(e => e.id === id);
      if (index !== -1) {
        fallbackEvents[index] = { ...fallbackEvents[index], ...updates };
        return res.json(fallbackEvents[index]);
      }
      return res.status(404).json({ error: 'Not Found', message: 'Event not found.' });
    }
  } catch (err) {
    return res.status(500).json({ error: 'Failed to update event', message: err.message });
  }
});

/**
 * DELETE /api/admin/events/:id
 * Admin: Delete event by ID
 */
router.delete('/admin/:id', requireAdmin, async (req, res) => {
  const { id } = req.params;

  try {
    if (isSupabaseBackendConfigured && supabaseAdmin) {
      const { error } = await supabaseAdmin
        .from('events')
        .delete()
        .eq('id', id);

      if (error) throw error;
      return res.json({ success: true, message: 'Event deleted successfully.' });
    } else {
      fallbackEvents = fallbackEvents.filter(e => e.id !== id);
      return res.json({ success: true, message: 'Event deleted from fallback store.' });
    }
  } catch (err) {
    return res.status(500).json({ error: 'Failed to delete event', message: err.message });
  }
});

export default router;
