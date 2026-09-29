import React, { useState } from 'react';
import { Trophy, Sparkles } from 'lucide-react';

export default function AchievementsPage() {
  const [achievements, setAchievements] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Hackathons', 'Competitions', 'Awards', 'Chapter Milestones'];

  return (
    <main className="py-12 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 pt-4">
          <div className="inline-flex items-center space-x-2 bg-blue-50 border border-blue-200 px-3 py-1 rounded-full text-xs font-bold text-blue-700 uppercase tracking-widest">
            <span>RECOGNITION & HONORS</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            Chapter <span className="text-[#0066CC]">Achievements</span>
          </h1>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Celebrating the competition victories, hackathon awards, certifications, and academic milestones achieved by SITE ACM Student Chapter members.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 bg-white p-3 rounded-2xl border border-slate-200 shadow-sm max-w-xl mx-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                selectedCategory === cat
                  ? 'bg-[#0066CC] text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Display or Elegant Empty State */}
        {achievements.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {achievements.map((item) => (
              <div key={item.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <h3 className="font-bold text-slate-900">{item.title}</h3>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 max-w-2xl mx-auto space-y-4 shadow-sm">
            <div className="w-16 h-16 rounded-full bg-blue-50 text-[#0066CC] flex items-center justify-center mx-auto">
              <Trophy className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Database-Driven Recognition Repository</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-lg mx-auto">
              Achievements and hackathon victories are dynamically fetched from the database table. When students win upcoming hackathons and competitions, awards will automatically render here.
            </p>
            <div className="inline-flex items-center space-x-1.5 text-xs font-semibold text-blue-600 bg-blue-50 px-4 py-2 rounded-full">
              <Sparkles className="w-4 h-4" />
              <span>Ready for 2025–26 Submissions</span>
            </div>
          </div>
        )}

      </div>
    </main>
  );
}
