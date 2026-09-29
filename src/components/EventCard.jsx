import React from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { MapPin, ArrowRight, Sparkles, Users } from 'lucide-react';

export default function EventCard({ event, index = 0 }) {
  const shouldReduceMotion = useReducedMotion();

  const bannerImage = event.image || event.image_url || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1000&q=80';
  
  // Dynamically derive date badge from canonical event_date or date string
  let badgeMonth = event.badgeMonth || event.badge_month;
  let badgeDay = event.badgeDay || event.badge_day;

  if (!badgeMonth || !badgeDay) {
    const rawDate = event.event_date || event.date;
    if (rawDate) {
      const d = new Date(rawDate);
      if (!isNaN(d.getTime())) {
        badgeMonth = badgeMonth || d.toLocaleString('en-US', { month: 'short' }).toUpperCase();
        badgeDay = badgeDay || String(d.getDate()).padStart(2, '0');
      }
    }
    badgeMonth = badgeMonth || 'TBD';
    badgeDay = badgeDay || '--';
  }

  return (
    <motion.div
      initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.45, delay: index * 0.06, ease: [0.25, 0.1, 0.25, 1] }}
      whileHover={shouldReduceMotion ? {} : { y: -5, transition: { duration: 0.25 } }}
      className="bg-white rounded-[22px] border border-slate-200/90 overflow-hidden shadow-sm hover:shadow-xl hover:shadow-blue-900/10 hover:border-blue-400/40 transition-colors duration-300 flex flex-col group h-full"
    >
      {/* 16:9 Banner Image Container */}
      <div className="relative aspect-video overflow-hidden bg-slate-100 shrink-0">
        <img
          src={bannerImage}
          alt={event.title}
          className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500 ease-out"
        />
        
        {/* Floating Overlapping Date Badge */}
        <div className="absolute bottom-3 left-4 bg-white/95 backdrop-blur-md rounded-xl px-3.5 py-1.5 shadow-lg border border-slate-200/80 text-center space-y-0.5">
          <span className="block text-[10px] font-extrabold uppercase tracking-wider text-[#0066CC]">
            {badgeMonth}
          </span>
          <span className="block text-lg font-black text-[#071A3D] leading-none">
            {badgeDay}
          </span>
          <div className="h-0.5 w-full bg-[#0066CC] rounded-full mt-1"></div>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-6 flex-1 flex flex-col justify-between space-y-5 bg-white">
        
        <div className="space-y-3">
          {/* Category Pill & Location */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="inline-flex items-center font-bold text-[#0066CC] bg-blue-50/90 px-3 py-1 rounded-full border border-blue-100 text-[11px]">
              <Sparkles className="w-3 h-3 mr-1 text-[#0066CC]" />
              {event.category}
            </span>
            <span className="inline-flex items-center text-slate-500 font-semibold text-[11px]">
              <MapPin className="w-3.5 h-3.5 mr-1 text-slate-400" />
              {event.location || event.mode}
            </span>
          </div>

          {/* Event Title */}
          <h3 className="font-extrabold text-[#071A3D] text-lg sm:text-xl leading-snug group-hover:text-[#0066CC] transition-colors duration-250">
            {event.title}
          </h3>
        </div>

        {/* Attendance Area & Divider */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
          <span className="text-xs font-bold text-slate-600 flex items-center">
            {event.attendance ? (
              <>
                <Users className="w-4 h-4 mr-1.5 text-[#0066CC]" />
                <span>{event.attendance}+ Attendees</span>
              </>
            ) : (
              <span className="text-emerald-600 font-bold">Registration Open</span>
            )}
          </span>

          <Link
            to={`/events/${event.slug}`}
            className="w-9 h-9 rounded-full bg-slate-100 border border-slate-200/80 group-hover:bg-[#0066CC] group-hover:border-[#0066CC] text-slate-600 group-hover:text-white flex items-center justify-center transition-all duration-300 shadow-sm"
            title="View Event Details"
          >
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </motion.div>
  );
}
