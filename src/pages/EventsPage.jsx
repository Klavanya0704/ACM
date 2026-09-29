import React, { useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { eventsService } from '../services/eventsService';
import EventCard from '../components/EventCard';
import { Calendar, Search, Sparkles } from 'lucide-react';

export default function EventsPage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const shouldReduceMotion = useReducedMotion();
  const categories = ['All', 'Technical Event', 'Hackathon', 'Seminar', 'Outreach', 'Workshop'];

  useEffect(() => {
    async function fetchEvents() {
      try {
        const data = await eventsService.getEvents();
        const mapped = (data || []).map(evt => ({
          id: evt.id,
          title: evt.title,
          slug: evt.slug || evt.id,
          description: evt.description || '',
          date: evt.event_date || evt.date || 'Upcoming',
          time: evt.event_time || evt.time || '',
          badgeMonth: evt.badgeMonth || 'SEP',
          badgeDay: evt.badgeDay || '30',
          category: evt.category || 'Technical Event',
          location: evt.location || 'SASI Campus',
          mode: evt.mode || 'In-Person',
          image: evt.image_url || evt.image || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1000&q=80',
          speaker: evt.speaker || '',
          speakerTitle: evt.speaker_title || '',
          attendance: evt.attendance || 0,
          volunteers: evt.volunteers_count || evt.volunteers || 0,
          topics: evt.topics || [],
          collaboration: evt.collaboration || '',
        }));
        setEvents(mapped);
      } catch (err) {
        console.error('Failed to load events for public site:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchEvents();
  }, []);

  const filteredEvents = events.filter((event) => {
    const matchesCategory = selectedCategory === 'All' || event.category === selectedCategory;
    const matchesSearch =
      (event.title || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (event.description || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (event.location || '').toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <main className="py-12 bg-[#F7FAFF] min-h-screen text-slate-900 font-sans relative overflow-hidden">
      
      {/* Subtle Background Pattern & Glow */}
      <div className="absolute inset-0 circuit-bg-pattern opacity-15 pointer-events-none"></div>
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#0066CC]/10 rounded-full blur-[130px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 relative z-10">
        
        {/* ==========================================
            1. PAGE HERO
           ========================================== */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto space-y-4 pt-4"
        >
          <div className="inline-flex items-center space-x-2 bg-blue-50/90 border border-blue-200/80 px-3.5 py-1.5 rounded-full text-xs font-bold text-[#0066CC] uppercase tracking-widest backdrop-blur-sm shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#0066CC]" />
            <span>SITE ACM ACTIVITIES</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#071A3D]">
            Events & <span className="text-[#0066CC]">Workshops</span>
          </h1>

          {/* Thin decorative blue line */}
          <div className="h-0.5 w-20 bg-[#0066CC] rounded-full mx-auto"></div>

          <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto font-normal">
            Join our engaging technical events, hackathons, guest lectures, and community outreach programs designed to foster technical growth and collaboration.
          </p>
        </motion.div>

        {/* ==========================================
            2. FLOATING GLASSMORPHISM FILTER & SEARCH PANEL
           ========================================== */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="bg-white/85 backdrop-blur-xl p-4 sm:p-5 rounded-[22px] border border-slate-200/80 shadow-lg shadow-slate-200/50 flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  selectedCategory === cat
                    ? 'bg-[#0066CC] text-white shadow-md shadow-blue-500/25'
                    : 'bg-slate-100/90 text-slate-600 hover:bg-slate-200/80'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#0066CC]" />
            <input
              type="text"
              placeholder="Search events by title or location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl border border-slate-200/80 focus:outline-none focus:border-[#0066CC] bg-slate-50/90 text-slate-900 font-semibold"
            />
          </div>

        </motion.div>

        {/* ==========================================
            3. EVENT CARDS GRID
           ========================================== */}
        {loading ? (
          <div className="py-20 text-center text-slate-400 text-xs">
            <div className="w-8 h-8 border-4 border-[#0066CC] border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
            Loading chapter events...
          </div>
        ) : filteredEvents.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredEvents.map((event, idx) => (
              <EventCard key={event.id} event={event} index={idx} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 space-y-3 shadow-sm">
            <Calendar className="w-12 h-12 text-slate-300 mx-auto" />
            <h3 className="text-lg font-bold text-slate-800">No events found</h3>
            <p className="text-xs text-slate-500">Try adjusting your search criteria or filter categories.</p>
          </div>
        )}

      </div>
    </main>
  );
}
