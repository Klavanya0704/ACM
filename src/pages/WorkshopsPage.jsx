import React, { useState } from 'react';
import { WORKSHOP_CATEGORIES } from '../data/mockData';
import { Brain, Code, ShieldCheck, Cloud, Terminal, Cpu, ArrowRight, CheckCircle } from 'lucide-react';

export default function WorkshopsPage() {
  const [registeredId, setRegisteredId] = useState(null);

  const getIcon = (iconName) => {
    switch (iconName) {
      case 'Brain': return Brain;
      case 'Code': return Code;
      case 'ShieldCheck': return ShieldCheck;
      case 'Cloud': return Cloud;
      case 'Terminal': return Terminal;
      default: return Cpu;
    }
  };

  return (
    <main className="py-12 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 pt-4">
          <div className="inline-flex items-center space-x-2 bg-blue-50 border border-blue-200 px-3 py-1 rounded-full text-xs font-bold text-blue-700 uppercase tracking-widest">
            <span>TECHNICAL SKILL BUILDING</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            Technical <span className="text-[#0066CC]">Workshops</span>
          </h1>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Specialized hands-on technical workshops designed to build practical industry skills across AI/ML, Cybersecurity, Cloud Computing, Full-Stack Web, and Competitive Programming.
          </p>
        </div>

        {/* Workshops Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {WORKSHOP_CATEGORIES.map((ws) => {
            const IconComponent = getIcon(ws.icon);
            const isRegistered = registeredId === ws.id;

            return (
              <div
                key={ws.id}
                className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-lg hover:border-blue-300 transition-all flex flex-col justify-between space-y-6 group"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#0066CC] flex items-center justify-center group-hover:scale-110 transition-transform">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-slate-100 text-slate-600">
                      {ws.workshopsCount}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-[#0066CC] transition-colors">
                    {ws.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {ws.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-400">Interactive Track</span>
                  
                  <button
                    onClick={() => setRegisteredId(ws.id)}
                    className={`inline-flex items-center text-xs font-semibold px-4 py-2 rounded-full transition-all ${
                      isRegistered
                        ? 'bg-emerald-600 text-white'
                        : 'bg-[#0066CC] hover:bg-blue-700 text-white'
                    }`}
                  >
                    {isRegistered ? (
                      <>
                        <CheckCircle className="w-3.5 h-3.5 mr-1" />
                        Interested
                      </>
                    ) : (
                      <>
                        <span>Register Interest</span>
                        <ArrowRight className="w-3.5 h-3.5 ml-1" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Database Placeholder Notice */}
        <div className="bg-blue-50/70 border border-blue-200/80 rounded-2xl p-6 text-center max-w-2xl mx-auto space-y-2">
          <h4 className="text-sm font-bold text-blue-900">Upcoming Workshop Schedule</h4>
          <p className="text-xs text-blue-700 leading-relaxed">
            Detailed dates, syllabus prerequisites, and mentor credentials for individual workshops are dynamically loaded from our Supabase backend repository.
          </p>
        </div>

      </div>
    </main>
  );
}
