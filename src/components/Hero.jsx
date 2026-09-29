import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, UserPlus, BookOpen, Code, Users, TrendingUp, Landmark, Globe, Trophy } from 'lucide-react';
import { CHAPTER_INFO } from '../data/mockData';

export default function Hero() {
  const slides = [
    {
      url: "/acm_stage_event.jpg",
      thumbUrl: "/thumb_1.jpg",
      title: "Building Real-World Solutions",
      subtitle: "Innovate • Collaborate • Create Impact",
      category: "INTERNAL HACKATHON",
      tag: "HACKATHON"
    },
    {
      url: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1600&q=80",
      thumbUrl: "/thumb_2.jpg",
      title: "Ideas. Innovation. Impact.",
      subtitle: "SASI ACM Live Auditorium Session",
      category: "TECH TALKS SERIES",
      tag: "TECH TALK"
    },
    {
      url: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1600&q=80",
      thumbUrl: "/thumb_3.jpg",
      title: "Empowering Rural Schools",
      subtitle: "Hour of Code Community Outreach",
      category: "COMMUNITY OUTREACH",
      tag: "WORKSHOP"
    },
    {
      url: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1600&q=80",
      thumbUrl: "/thumb_4.jpg",
      title: "Day-Zero Defense & Ethics",
      subtitle: "Cyber Security & AI Ethics Lecture",
      category: "GUEST LECTURE",
      tag: "SEMINAR"
    }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      handleNextSlide();
    }, 6000);
    return () => clearInterval(timer);
  }, [currentSlide]);

  const handleNextSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setTimeout(() => setIsAnimating(false), 400);
  };

  const handleSelectSlide = (index) => {
    if (index === currentSlide || isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide(index);
    setTimeout(() => setIsAnimating(false), 400);
  };

  const globalStats = [
    { value: '100K+', label: 'Global ACM Members', icon: Users },
    { value: '2,500+', label: 'Student Chapters', icon: Landmark },
    { value: '100+', label: 'Countries', icon: Globe },
    { value: '75+', label: 'Years of Impact', icon: Trophy },
  ];

  return (
    <section 
      id="home" 
      className="relative w-full h-[100svh] min-h-[660px] max-h-[920px] overflow-hidden -mt-16 sm:-mt-20 pt-20 sm:pt-24 pb-3 flex flex-col justify-between select-none"
    >
      
      {/* ========================================================================= */}
      {/* 1. FULL UNBROKEN CAMPUS PHOTOGRAPH BACKGROUND (100% width, natural flow) */}
      {/* ========================================================================= */}

      <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
        {/* SASI Campus Building Photograph */}
        <img
          src="/sasi_entrance.jpg"
          alt="Sasi Institute of Technology & Engineering Campus"
          className="w-full h-full object-cover object-center filter contrast-[1.05] saturate-[1.10]"
        />
        
        {/* Soft Realistic Cinematic Dark-Blue Glass Overlay */}
        <div 
          className="absolute inset-0 w-full h-full"
          style={{
            background: 'linear-gradient(to right, rgba(3, 20, 45, 0.55) 0%, rgba(3, 20, 45, 0.30) 50%, rgba(0, 70, 140, 0.40) 100%)'
          }}
        ></div>

        {/* Ambient Cyan & Blue Glow Accents */}
        <div className="absolute top-1/3 left-10 w-[450px] h-[450px] bg-[#0066CC]/15 rounded-full filter blur-3xl"></div>
        <div className="absolute top-20 right-1/4 w-[400px] h-[400px] bg-[#22C7FF]/15 rounded-full filter blur-3xl"></div>

        {/* Far Left Vertical Scroll Bar Indicator */}
        <div className="hidden xl:flex absolute left-5 top-1/2 -translate-y-1/2 z-20 flex-col items-center space-y-3 opacity-70">
          <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
          <div className="w-[1px] h-10 bg-white/40"></div>
          <span className="text-[10px] text-white font-extrabold uppercase tracking-widest rotate-[-90deg] my-3">
            SCROLL
          </span>
          <div className="w-[1px] h-10 bg-white/40"></div>
          <span className="w-2 h-2 rounded-full border border-white"></span>
        </div>

        {/* Far Right Top Decorative Cursive Phrase */}
        <div className="hidden lg:block absolute top-24 right-8 z-10 text-right opacity-90 pointer-events-none font-serif italic text-white/90 leading-tight text-xl">
          <div className="text-xl font-light">Ideas</div>
          <div className="text-2xl font-normal text-cyan-300">Communities</div>
          <div className="text-xl font-light">Impact</div>
        </div>
      </div>


      {/* ========================================================================= */}
      {/* 2. FOREGROUND CONTENT & RIGHT CAROUSEL COMPOSITION */}
      {/* ========================================================================= */}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-20 flex-grow flex flex-col justify-between h-full">
        
        {/* Main 2-Column Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center flex-grow py-1 my-auto">
          
          {/* LEFT CONTENT COLUMN (~48% width) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 space-y-3 z-20"
          >
            
            {/* Sasi Campus Glass Pill */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="inline-flex items-center space-x-2 bg-[#051837]/80 border border-white/25 px-3 py-1 rounded-full text-[10px] font-extrabold text-white uppercase tracking-widest shadow-lg backdrop-blur-md"
            >
              <span className="w-2 h-2 rounded-full bg-[#22C7FF] animate-ping"></span>
              <span>SASI INSTITUTE OF TECHNOLOGY & ENGINEERING</span>
            </motion.div>

            {/* Main Title */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="space-y-0.5 drop-shadow-md"
            >
              <h1 className="text-4xl sm:text-5xl lg:text-[50px] font-extrabold tracking-tight text-white leading-tight">
                SITE ACM
              </h1>
              <div className="text-4xl sm:text-5xl lg:text-[46px] font-extrabold text-[#22C7FF] tracking-tight leading-tight">
                Student Chapter
              </div>
            </motion.div>

            {/* Description */}
            <motion.p 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xs sm:text-sm text-slate-100 font-medium max-w-[460px] leading-relaxed drop-shadow-sm"
            >
              Empowering students through technology, innovation, collaboration, and continuous learning.
            </motion.p>

            {/* CTAs */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="flex flex-wrap items-center gap-3 pt-0.5"
            >
              <Link
                to="/about"
                className="inline-flex items-center px-5 py-2.5 text-xs sm:text-sm font-bold text-[#061B3A] bg-white hover:bg-slate-100 rounded-full shadow-xl shadow-black/20 transition-all duration-200 hover:scale-105 active:scale-95"
              >
                <span>Explore Our Chapter</span>
                <ArrowRight className="w-4 h-4 ml-2 text-[#0066CC]" />
              </Link>
              
              <a
                href={CHAPTER_INFO.officialAcmUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2.5 text-xs sm:text-sm font-bold text-white bg-white/10 hover:bg-white/20 border border-white/30 rounded-full shadow-lg backdrop-blur-md transition-all duration-200 hover:scale-105 active:scale-95"
              >
                <UserPlus className="w-4 h-4 mr-2 text-[#22C7FF]" />
                <span>Join ACM</span>
              </a>
            </motion.div>

            {/* Pillars Row */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="pt-0.5 flex flex-wrap items-center gap-3 text-[11px] font-extrabold text-slate-200 uppercase tracking-widest"
            >
              <span className="flex items-center text-white">
                <BookOpen className="w-3.5 h-3.5 mr-1 text-[#22C7FF]" />
                LEARN
              </span>
              <span className="text-white/40">|</span>
              <span className="flex items-center text-[#22C7FF]">
                <Code className="w-3.5 h-3.5 mr-1 text-[#22C7FF]" />
                BUILD
              </span>
              <span className="text-white/40">|</span>
              <span className="flex items-center text-white">
                <Users className="w-3.5 h-3.5 mr-1 text-[#22C7FF]" />
                COLLABORATE
              </span>
              <span className="text-white/40">|</span>
              <span className="flex items-center text-white">
                <TrendingUp className="w-3.5 h-3.5 mr-1 text-[#22C7FF]" />
                GROW
              </span>
            </motion.div>

            {/* Community Micro-Row */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="pt-0.5 flex items-center space-x-2.5"
            >
              <div className="flex -space-x-1.5 overflow-hidden shrink-0">
                <div className="inline-block h-6 w-6 rounded-full ring-2 ring-white/60 bg-blue-600 text-white font-bold text-[8px] flex items-center justify-center">S</div>
                <div className="inline-block h-6 w-6 rounded-full ring-2 ring-white/60 bg-cyan-600 text-white font-bold text-[8px] flex items-center justify-center">A</div>
                <div className="inline-block h-6 w-6 rounded-full ring-2 ring-white/60 bg-indigo-600 text-white font-bold text-[8px] flex items-center justify-center">C</div>
                <div className="inline-block h-6 w-6 rounded-full ring-2 ring-white/60 bg-[#0066CC] text-white font-bold text-[8px] flex items-center justify-center">M</div>
              </div>
              <span className="text-[11px] text-slate-300 font-medium">
                Join a growing community of innovators, creators and problem solvers.
              </span>
            </motion.div>

          </motion.div>

          {/* RIGHT FEATURED CAROUSEL CARD + VERTICAL THUMBNAILS (~42% width) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-6 relative z-20 flex items-center justify-end"
          >
            
            <div className="flex flex-col sm:flex-row items-center gap-3 w-full max-w-[490px]">
              
              {/* Main Featured Carousel Card Frame */}
              <div className="flex-1 w-full relative rounded-[22px] overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.45)] border border-white/25 bg-[#05142D]/40 backdrop-blur-md h-[280px] sm:h-[300px] lg:h-[310px] group">
                
                {/* Active Event Slide Image */}
                <img
                  key={currentSlide}
                  src={slides[currentSlide].url}
                  alt={slides[currentSlide].title}
                  className={`w-full h-full object-cover object-center transform group-hover:scale-105 transition-all duration-700 ease-out ${
                    isAnimating ? 'opacity-80 scale-102 filter blur-[1px]' : 'opacity-100 scale-100'
                  }`}
                />

                {/* Dark Navy Gradient Overlay at Bottom */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#05142D] via-[#05142D]/35 to-transparent"></div>

                {/* Top Live Category Tag */}
                <div className="absolute top-3.5 left-4 z-20 bg-[#051837]/85 backdrop-blur-md px-2.5 py-1 rounded-full border border-cyan-300/30 text-white flex items-center space-x-2 shadow-md">
                  <span className="w-2 h-2 rounded-full bg-[#22C7FF] animate-ping"></span>
                  <span className="text-[9px] font-extrabold tracking-widest uppercase text-slate-100">
                    {slides[currentSlide].category}
                  </span>
                </div>

                {/* Bottom Left Title & Subtitle */}
                <div className="absolute bottom-4 left-4 right-18 z-20 space-y-0.5">
                  <div className="flex items-center space-x-1.5 text-[10px] font-extrabold text-[#22C7FF] tracking-wider uppercase drop-shadow">
                    <span>•</span>
                    <span>{slides[currentSlide].tag}</span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-extrabold tracking-tight text-white leading-tight drop-shadow-md">
                    {slides[currentSlide].title}
                  </h3>
                  <p className="text-[11px] text-slate-300 font-medium drop-shadow truncate">
                    {slides[currentSlide].subtitle}
                  </p>
                </div>

                {/* Circular White Arrow Action Button */}
                <button
                  onClick={handleNextSlide}
                  className="absolute bottom-4 right-4 z-20 w-9 h-9 rounded-full bg-white text-[#061B3A] shadow-xl flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 group/btn"
                  aria-label="Next Slide"
                >
                  <ArrowRight className="w-4 h-4 text-[#0066CC] group-hover/btn:translate-x-0.5 transition-transform" />
                </button>

                {/* Carousel Indicators */}
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-20 flex items-center space-x-1.5">
                  {slides.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSelectSlide(idx)}
                      aria-label={`Slide ${idx + 1}`}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        idx === currentSlide
                          ? 'w-4 bg-[#22C7FF] shadow-[0_0_8px_#22C7FF]'
                          : 'w-1.5 bg-white/40 hover:bg-white/70'
                      }`}
                    ></button>
                  ))}
                </div>

              </div>

              {/* 4 Vertically Stacked Thumbnails on the Far Right */}
              <div className="flex flex-row sm:flex-col gap-2 shrink-0">
                {slides.map((slide, idx) => (
                  <div
                    key={idx}
                    onClick={() => handleSelectSlide(idx)}
                    className={`cursor-pointer rounded-lg overflow-hidden border-2 transition-all duration-300 w-18 sm:w-20 h-11 sm:h-12 ${
                      idx === currentSlide
                        ? 'border-[#22C7FF] scale-105 shadow-[0_0_12px_rgba(34,199,255,0.6)] ring-2 ring-[#22C7FF]/40'
                        : 'border-white/40 opacity-75 hover:opacity-100 hover:border-white'
                    }`}
                  >
                    <img
                      src={slide.thumbUrl}
                      className="w-full h-full object-cover object-center"
                      alt={`Thumbnail ${idx + 1}`}
                    />
                  </div>
                ))}
              </div>

            </div>

          </motion.div>

        </div>

        {/* ========================================================================= */}
        {/* 3. ONE SINGLE FLOATING GLASS STATISTICS BAR AT BOTTOM OF HERO */}
        {/* ========================================================================= */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="pt-2 pb-2 w-full max-w-7xl mx-auto shrink-0 z-20"
        >
          <div className="bg-[#10325E]/60 backdrop-blur-xl border border-white/25 rounded-[20px] shadow-2xl px-5 py-3 grid grid-cols-2 lg:grid-cols-4 gap-3 divide-y lg:divide-y-0 lg:divide-x divide-white/20">
            {globalStats.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <div
                  key={idx}
                  className={`flex items-center space-x-3 ${idx !== 0 ? 'lg:pl-5 pt-2 lg:pt-0' : ''}`}
                >
                  <div className="w-9 h-9 rounded-full bg-blue-500/20 text-[#22C7FF] border border-cyan-400/30 flex items-center justify-center shrink-0 shadow-inner">
                    <Icon className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <div className="text-lg sm:text-xl font-extrabold text-white leading-tight drop-shadow-sm">
                      {stat.value}
                    </div>
                    <div className="text-[11px] font-bold text-slate-200 tracking-wide leading-tight">
                      {stat.label}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

      </div>
    </section>
  );
}

