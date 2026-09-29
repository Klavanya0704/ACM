import React, { useState } from 'react';
import { GALLERY_ITEMS } from '../data/mockData';
import { X, ZoomIn } from 'lucide-react';

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeImage, setActiveImage] = useState(null);

  const categories = ['All', 'Events', 'Workshops', 'Hackathons', 'Guest Sessions', 'Outreach', 'Team'];

  const filteredItems = GALLERY_ITEMS.filter(
    (item) => selectedCategory === 'All' || item.category === selectedCategory
  );

  return (
    <main className="py-12 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 pt-4">
          <div className="inline-flex items-center space-x-2 bg-blue-50 border border-blue-200 px-3 py-1 rounded-full text-xs font-bold text-blue-700 uppercase tracking-widest">
            <span>PHOTO GALLERY</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            Chapter <span className="text-[#0066CC]">Moments</span>
          </h1>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Visual highlights from technical workshops, hackathons, guest seminars, and community outreach programs at Sasi Institute of Technology & Engineering.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 bg-white p-3 rounded-2xl border border-slate-200 shadow-sm max-w-2xl mx-auto">
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

        {/* Masonry / Responsive Photo Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveImage(item)}
              className="relative group rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-slate-200 bg-slate-900 cursor-pointer transition-all duration-300 h-64"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-5">
                <div className="text-white space-y-1 w-full flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest block">
                      {item.category}
                    </span>
                    <h4 className="font-bold text-sm text-white">{item.title}</h4>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur flex items-center justify-center text-white">
                    <ZoomIn className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox Modal */}
        {activeImage && (
          <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4">
            <div className="relative max-w-4xl w-full bg-slate-900 rounded-3xl overflow-hidden border border-slate-800 shadow-2xl">
              <button
                onClick={() => setActiveImage(null)}
                className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-slate-950/80 hover:bg-blue-600 text-white flex items-center justify-center transition-colors border border-white/20"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="relative h-[450px] bg-black">
                <img
                  src={activeImage.image}
                  alt={activeImage.title}
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="p-6 text-white space-y-1 bg-slate-900">
                <span className="text-xs font-bold text-blue-400 uppercase tracking-widest">
                  {activeImage.category}
                </span>
                <h3 className="text-xl font-bold">{activeImage.title}</h3>
              </div>
            </div>
          </div>
        )}

      </div>
    </main>
  );
}
