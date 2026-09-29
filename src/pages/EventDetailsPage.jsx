import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { eventsService } from '../services/eventsService';
import { ArrowLeft, Building2, GraduationCap, Calendar, Clock, MapPin, Sparkles } from 'lucide-react';
import EventCard from '../components/EventCard';
import PublicRegistrationModal from '../components/PublicRegistrationModal';

export default function EventDetailsPage() {
  const { slug } = useParams();
  const [event, setEvent] = useState(null);
  const [relatedEvents, setRelatedEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

  useEffect(() => {
    async function loadEventData() {
      setLoading(true);
      try {
        const fetchedEvent = await eventsService.getEventBySlug(slug);
        const allEvents = await eventsService.getEvents();

        if (fetchedEvent) {
          const formatted = {
            id: fetchedEvent.id,
            title: fetchedEvent.title,
            slug: fetchedEvent.slug,
            description: fetchedEvent.description || '',
            date: fetchedEvent.event_date || fetchedEvent.date || 'Upcoming',
            time: fetchedEvent.event_time || fetchedEvent.time || '10:00 AM',
            category: fetchedEvent.category || 'Technical Event',
            location: fetchedEvent.location || 'SASI Campus',
            mode: fetchedEvent.mode || 'In-Person',
            image: fetchedEvent.image_url || fetchedEvent.image || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1000&q=80',
            speaker: fetchedEvent.speaker || '',
            speakerTitle: fetchedEvent.speaker_title || '',
            attendance: fetchedEvent.attendance || 0,
            volunteers: fetchedEvent.volunteers_count || fetchedEvent.volunteers || 0,
            topics: fetchedEvent.topics || [],
            collaboration: fetchedEvent.collaboration || '',
            registrationStatus: fetchedEvent.registration_status || 'Open',
          };
          setEvent(formatted);

          // Related events
          const others = (allEvents || [])
            .filter(e => (e.slug !== slug && e.id !== fetchedEvent.id))
            .slice(0, 3)
            .map(evt => ({
              id: evt.id,
              title: evt.title,
              slug: evt.slug || evt.id,
              description: evt.description || '',
              date: evt.event_date || evt.date || 'Upcoming',
              badgeMonth: evt.badgeMonth || 'SEP',
              badgeDay: evt.badgeDay || '30',
              category: evt.category || 'Technical Event',
              location: evt.location || 'SASI Campus',
              mode: evt.mode || 'In-Person',
              image: evt.image_url || evt.image || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1000&q=80',
            }));
          setRelatedEvents(others);
        } else {
          setEvent(null);
        }
      } catch (err) {
        console.error('Error fetching event detail:', err);
      } finally {
        setLoading(false);
      }
    }
    loadEventData();
  }, [slug]);

  if (loading) {
    return (
      <div className="py-24 text-center text-slate-400 text-xs">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
        Loading event details...
      </div>
    );
  }

  if (!event) {
    return (
      <div className="py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-slate-800">Event Not Found</h2>
        <Link to="/events" className="text-blue-600 font-semibold hover:underline">
          ← Return to Events
        </Link>
      </div>
    );
  }

  return (
    <main className="py-12 bg-slate-50 min-h-screen font-sans">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Back Link */}
        <div>
          <Link
            to="/events"
            className="inline-flex items-center text-xs font-semibold text-slate-500 hover:text-[#0066CC] transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back to All Events
          </Link>
        </div>

        {/* Event Main Header Card */}
        <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm space-y-6">
          
          <div className="relative h-80 sm:h-96 bg-slate-900 overflow-hidden">
            <img
              src={event.image}
              alt={event.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent"></div>

            <div className="absolute bottom-6 left-6 right-6 text-white space-y-2">
              <div className="flex items-center space-x-3 text-xs font-bold">
                <span className="bg-[#0066CC] px-3 py-1 rounded-full uppercase tracking-wider">
                  {event.category}
                </span>
                <span className="bg-white/20 backdrop-blur px-3 py-1 rounded-full">
                  {event.mode}
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                {event.title}
              </h1>
            </div>
          </div>

          {/* Metadata Quick Strip & Register CTA */}
          <div className="p-6 sm:p-8 space-y-8">
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-6 border-b border-slate-100">
              
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 text-xs flex-1">
                <div>
                  <span className="block text-slate-400 font-semibold uppercase text-[10px]">Date & Time</span>
                  <span className="font-bold text-slate-900 text-sm block">{event.date}</span>
                  <span className="text-slate-500 text-[11px]">{event.time}</span>
                </div>

                <div>
                  <span className="block text-slate-400 font-semibold uppercase text-[10px]">Location</span>
                  <span className="font-bold text-slate-900 text-sm">{event.location}</span>
                </div>

                {event.attendance ? (
                  <div>
                    <span className="block text-slate-400 font-semibold uppercase text-[10px]">Attendance</span>
                    <span className="font-bold text-slate-900 text-sm">{event.attendance} Participants</span>
                  </div>
                ) : (
                  <div>
                    <span className="block text-slate-400 font-semibold uppercase text-[10px]">Registration</span>
                    <span className="font-bold text-emerald-600 text-sm">{event.registrationStatus || 'Open'}</span>
                  </div>
                )}
              </div>

              {/* Primary CTA Register Button */}
              <button
                onClick={() => setIsRegisterModalOpen(true)}
                className="w-full sm:w-auto bg-[#0066CC] hover:bg-blue-700 text-white font-extrabold px-8 py-4 rounded-2xl shadow-xl shadow-blue-500/25 hover:shadow-blue-500/40 transition-all text-xs uppercase tracking-wider flex items-center justify-center space-x-2 shrink-0 transform hover:-translate-y-0.5"
              >
                <GraduationCap className="w-4 h-4" />
                <span>Register for Event</span>
              </button>

            </div>

            {/* Description & Speaker */}
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-slate-900">Event Details & Impact</h2>
              <p className="text-slate-600 text-sm leading-relaxed whitespace-pre-line">
                {event.description}
              </p>

              {event.speaker && (
                <div className="bg-blue-50/70 rounded-2xl p-5 border border-blue-100 space-y-1">
                  <div className="text-xs font-bold text-blue-600 uppercase tracking-wider">Keynote / Speaker</div>
                  <div className="text-base font-bold text-slate-900">{event.speaker}</div>
                  {event.speakerTitle && (
                    <div className="text-xs text-slate-600 font-medium">{event.speakerTitle}</div>
                  )}
                </div>
              )}

              {event.collaboration && (
                <div className="flex items-center space-x-2 text-xs font-medium text-slate-600 bg-slate-100 p-3 rounded-xl">
                  <Building2 className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>Collaboration: <strong>{event.collaboration}</strong></span>
                </div>
              )}

              {/* Topics Tags */}
              {event.topics && event.topics.length > 0 && (
                <div className="space-y-2 pt-2">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Covered Topics</span>
                  <div className="flex flex-wrap gap-2">
                    {event.topics.map((topic, i) => (
                      <span key={i} className="bg-slate-100 text-slate-700 font-semibold text-xs px-3 py-1 rounded-full border border-slate-200">
                        #{topic}
                      </span>
                    ))}
                  </div>
                </div>
              )}

            </div>

          </div>

        </div>

        {/* Related Events */}
        {relatedEvents.length > 0 && (
          <div className="space-y-6 pt-6">
            <h3 className="text-2xl font-bold text-slate-900">Other Documented Activities</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {relatedEvents.map((rel) => (
                <EventCard key={rel.id} event={rel} />
              ))}
            </div>
          </div>
        )}

      </div>

      {/* Interactive Public Student Registration Modal */}
      <PublicRegistrationModal
        event={event}
        isOpen={isRegisterModalOpen}
        onClose={() => setIsRegisterModalOpen(false)}
      />

    </main>
  );
}
