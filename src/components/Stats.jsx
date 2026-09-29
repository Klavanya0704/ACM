import React from 'react';
import { Users, Landmark, Globe, Monitor } from 'lucide-react';

export default function Stats() {
  const stats = [
    { value: '100K+', label: 'Global Members', icon: Users },
    { value: '2,500+', label: 'Student Chapters', icon: Landmark },
    { value: '100+', label: 'Countries', icon: Globe },
    { value: '75+', label: 'Years of Impact', icon: Monitor },
  ];

  return (
    <section className="relative z-30 -mt-8 mb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className="glass-card rounded-2xl p-5 flex items-center space-x-4 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#0066CC] flex items-center justify-center shrink-0">
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                    {stat.value}
                  </div>
                  <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                    {stat.label}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
