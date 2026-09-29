import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Hero from '../components/Hero';
import WhatIsAcm from '../components/WhatIsAcm';
import EventCard from '../components/EventCard';
import HomeLeadership from '../components/HomeLeadership';
import { VERIFIED_EVENTS } from '../data/mockData';

export default function HomePage() {
  return (
    <main>
      {/* Hero Section with Integrated Stat Cards & Auditorium Canvas */}
      <Hero />

      {/* What is ACM Section */}
      <WhatIsAcm />

      {/* Upcoming Events & Workshops Section */}
      <section id="events" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div className="space-y-2 max-w-xl">
              <div className="text-xs font-bold text-[#0066CC] uppercase tracking-widest">UPCOMING EVENTS</div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                Events & <span className="text-[#0066CC]">Workshops</span>
              </h2>
              <p className="text-slate-600 text-sm sm:text-base">
                Join our engaging technical events, workshops, hackathons, and seminars to learn, build, and grow together.
              </p>
            </div>

            <div className="mt-6 md:mt-0">
              <Link
                to="/events"
                className="inline-flex items-center px-5 py-2.5 text-xs font-semibold text-slate-700 hover:text-blue-600 border border-slate-300 hover:border-blue-600 rounded-full transition-all"
              >
                <span>View All Events</span>
                <ArrowRight className="w-3.5 h-3.5 ml-2" />
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {VERIFIED_EVENTS.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>

        </div>
      </section>

      {/* Premium SITE ACM Chapter Leadership Section */}
      <HomeLeadership />
    </main>
  );
}

