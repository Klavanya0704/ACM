import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { CHAPTER_INFO, TIMELINE_HISTORY } from '../data/mockData';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import {
  Target,
  Eye,
  Calendar,
  Users,
  ShieldCheck,
  Activity,
  Award,
  BookOpen,
  Code2,
  Users2,
  Sparkles,
  ChevronRight,
  Globe,
  Building2,
  CheckCircle2,
  Cpu,
  MapPin
} from 'lucide-react';

// Count-up helper component that animates numeric value when in view
function AnimatedNumber({ value, duration = 1.4 }) {
  const [current, setCurrent] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (!isInView) return;
    if (shouldReduceMotion) {
      setCurrent(value);
      return;
    }

    let start = null;
    const target = Number(value);

    const step = (timestamp) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / (duration * 1000), 1);
      const easeOutQuad = 1 - (1 - progress) * (1 - progress);
      setCurrent(Math.floor(easeOutQuad * target));

      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        setCurrent(target);
      }
    };

    window.requestAnimationFrame(step);
  }, [isInView, value, duration, shouldReduceMotion]);

  return <span ref={ref}>{current}</span>;
}

// Dedicated Animated Background Component: 5 Large Drifting Circles, 20 Floating Dots, Rotating Orbital Rings & Glows
function AnimatedAboutBackground() {
  const shouldReduceMotion = useReducedMotion();

  // 20 Floating Blue Dots Configuration with varied positions, durations and deltas
  const floatingDots = [
    { left: '8%', top: '12%', size: 'w-2 h-2', duration: 11, x: [-12, 14, -12], y: [-15, 15, -15] },
    { left: '22%', top: '7%', size: 'w-2.5 h-2.5', duration: 14, x: [15, -12, 15], y: [18, -12, 18] },
    { left: '38%', top: '16%', size: 'w-2 h-2', duration: 12, x: [-10, 16, -10], y: [-14, 14, -14] },
    { left: '52%', top: '9%', size: 'w-3 h-3', duration: 16, x: [14, -14, 14], y: [-16, 16, -16] },
    { left: '68%', top: '14%', size: 'w-2 h-2', duration: 10, x: [-16, 12, -16], y: [12, -18, 12] },
    { left: '84%', top: '8%', size: 'w-2.5 h-2.5', duration: 15, x: [12, -15, 12], y: [-15, 15, -15] },

    { left: '5%', top: '34%', size: 'w-2 h-2', duration: 13, x: [14, -10, 14], y: [-18, 12, -18] },
    { left: '28%', top: '38%', size: 'w-2.5 h-2.5', duration: 17, x: [-15, 15, -15], y: [14, -16, 14] },
    { left: '46%', top: '42%', size: 'w-2 h-2', duration: 9, x: [12, -12, 12], y: [-12, 15, -12] },
    { left: '74%', top: '36%', size: 'w-3 h-3', duration: 18, x: [-18, 14, -18], y: [16, -14, 16] },
    { left: '92%', top: '40%', size: 'w-2 h-2', duration: 11, x: [10, -14, 10], y: [-14, 14, -14] },

    { left: '12%', top: '62%', size: 'w-2.5 h-2.5', duration: 14, x: [-14, 16, -14], y: [15, -15, 15] },
    { left: '32%', top: '58%', size: 'w-2 h-2', duration: 12, x: [16, -12, 16], y: [-12, 18, -12] },
    { left: '60%', top: '64%', size: 'w-3 h-3', duration: 15, x: [-12, 15, -12], y: [18, -14, 18] },
    { left: '80%', top: '66%', size: 'w-2 h-2', duration: 13, x: [15, -15, 15], y: [-16, 12, -16] },

    { left: '16%', top: '82%', size: 'w-2 h-2', duration: 16, x: [-16, 12, -16], y: [14, -14, 14] },
    { left: '42%', top: '86%', size: 'w-2.5 h-2.5', duration: 10, x: [12, -16, 12], y: [-15, 15, -15] },
    { left: '66%', top: '84%', size: 'w-2 h-2', duration: 14, x: [-14, 14, -14], y: [16, -12, 16] },
    { left: '88%', top: '88%', size: 'w-3 h-3', duration: 17, x: [16, -12, 16], y: [-14, 16, -14] },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      
      {/* 1. LARGE TRANSLUCENT DRIFTING CIRCLES (5 Blobs, 18-28s infinite alternate movement) */}
      
      {/* Circle 1: Top Left */}
      <motion.div
        animate={
          shouldReduceMotion
            ? {}
            : {
                x: [-40, 50, -40],
                y: [-30, 40, -30],
                scale: [1, 1.08, 1],
              }
        }
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -top-16 -left-16 w-[550px] h-[550px] bg-gradient-to-br from-[#0066CC]/20 via-sky-200/25 to-transparent rounded-full blur-[90px]"
      ></motion.div>

      {/* Circle 2: Top Right */}
      <motion.div
        animate={
          shouldReduceMotion
            ? {}
            : {
                x: [40, -40, 40],
                y: [30, -30, 30],
                scale: [1, 1.06, 1],
              }
        }
        transition={{ duration: 26, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-10 -right-16 w-[650px] h-[650px] bg-gradient-to-bl from-cyan-400/20 via-blue-200/25 to-transparent rounded-full blur-[100px]"
      ></motion.div>

      {/* Circle 3: Center Mid */}
      <motion.div
        animate={
          shouldReduceMotion
            ? {}
            : {
                x: [-35, 35, -35],
                y: [35, -35, 35],
                scale: [1, 1.07, 1],
              }
        }
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-[38%] left-[20%] w-[500px] h-[500px] bg-blue-300/20 rounded-full blur-[110px]"
      ></motion.div>

      {/* Circle 4: Bottom Left */}
      <motion.div
        animate={
          shouldReduceMotion
            ? {}
            : {
                x: [-30, 40, -30],
                y: [-40, 30, -40],
                scale: [1, 1.05, 1],
              }
        }
        transition={{ duration: 24, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-[10%] -left-10 w-[580px] h-[580px] bg-gradient-to-tr from-[#0066CC]/15 via-blue-200/20 to-transparent rounded-full blur-[95px]"
      ></motion.div>

      {/* Circle 5: Bottom Right */}
      <motion.div
        animate={
          shouldReduceMotion
            ? {}
            : {
                x: [45, -35, 45],
                y: [-25, 35, -25],
                scale: [1, 1.08, 1],
              }
        }
        transition={{ duration: 28, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-5 -right-10 w-[600px] h-[600px] bg-gradient-to-tl from-sky-300/20 via-cyan-200/20 to-transparent rounded-full blur-[100px]"
      ></motion.div>

      {/* 2. SOFT BLUE ATMOSPHERIC LIGHT GLOWS (6-10s breathing) */}
      <motion.div
        animate={
          shouldReduceMotion
            ? {}
            : {
                scale: [1, 1.09, 1],
                opacity: [0.15, 0.32, 0.15],
              }
        }
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[850px] h-[500px] bg-blue-400/15 rounded-full blur-[130px]"
      ></motion.div>

      {/* 3. ROTATING ORBITAL SVG RINGS & DOTTED GRIDS */}
      <motion.svg
        animate={shouldReduceMotion ? {} : { rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
        className="absolute top-[-100px] right-[-100px] w-[900px] h-[900px] opacity-45 origin-center"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g stroke="#0066CC">
          <circle cx="450" cy="450" r="320" fill="none" strokeOpacity="0.14" strokeWidth="1" />
          <circle cx="450" cy="450" r="420" fill="none" strokeOpacity="0.09" strokeWidth="1" strokeDasharray="6 6" />
          <circle cx="450" cy="450" r="520" fill="none" strokeOpacity="0.06" strokeWidth="1" strokeDasharray="4 4" />
        </g>
      </motion.svg>

      {/* Secondary Left Rotating Ring */}
      <motion.svg
        animate={shouldReduceMotion ? {} : { rotate: -360 }}
        transition={{ duration: 75, repeat: Infinity, ease: 'linear' }}
        className="absolute top-[40%] left-[-150px] w-[800px] h-[800px] opacity-35 origin-center"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g stroke="#0066CC">
          <circle cx="400" cy="400" r="360" fill="none" strokeOpacity="0.1" strokeWidth="1" strokeDasharray="5 5" />
          <circle cx="400" cy="400" r="460" fill="none" strokeOpacity="0.06" strokeWidth="1" />
        </g>
      </motion.svg>

      {/* Dotted Grid Pattern Layers */}
      <svg className="absolute inset-0 w-full h-full opacity-50" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="about-dotted-pattern" width="28" height="28" patternUnits="userSpaceOnUse">
            <circle cx="3" cy="3" r="1.2" fill="#0066CC" fillOpacity="0.14" />
          </pattern>
        </defs>
        <rect width="280" height="280" x="3%" y="2%" fill="url(#about-dotted-pattern)" opacity="0.8" />
        <rect width="240" height="320" x="83%" y="10%" fill="url(#about-dotted-pattern)" opacity="0.6" />
      </svg>

      {/* 4. 20 FLOATING BLUE DOTS */}
      {floatingDots.map((dot, i) => (
        <motion.div
          key={i}
          animate={
            shouldReduceMotion
              ? {}
              : {
                  x: dot.x,
                  y: dot.y,
                  opacity: [0.35, 0.85, 0.35],
                }
          }
          transition={{
            duration: dot.duration,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          style={{ left: dot.left, top: dot.top }}
          className={`absolute ${dot.size} bg-[#0066CC] rounded-full shadow-[0_0_8px_rgba(0,102,204,0.5)]`}
        ></motion.div>
      ))}

      {/* 5. MOVING CONNECTION POINTS WITH PULSING RINGS */}
      <motion.div
        animate={
          shouldReduceMotion
            ? {}
            : {
                x: [-10, 10, -10],
                y: [-6, 6, -6],
              }
        }
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-[6%] right-[26%] flex items-center justify-center"
      >
        <div className="w-3 h-3 bg-[#0066CC] rounded-full shadow-[0_0_12px_rgba(0,102,204,0.7)]"></div>
        <motion.div
          animate={
            shouldReduceMotion
              ? {}
              : {
                  scale: [1, 1.8, 1],
                  opacity: [0.6, 0, 0.6],
                }
          }
          transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute w-6 h-6 border border-[#0066CC] rounded-full"
        ></motion.div>
      </motion.div>

    </div>
  );
}

export default function AboutPage() {
  const shouldReduceMotion = useReducedMotion();

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 15 },
    visible: (custom = 0) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: custom * 0.12,
        ease: [0.25, 0.1, 0.25, 1],
      },
    }),
  };

  const scaleUp = {
    hidden: { opacity: 0, scale: shouldReduceMotion ? 1 : 0.97 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] },
    },
  };

  const slideFromLeft = {
    hidden: { opacity: 0, x: shouldReduceMotion ? 0 : -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
    },
  };

  const slideFromRight = {
    hidden: { opacity: 0, x: shouldReduceMotion ? 0 : 30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
    },
  };

  return (
    <main className="relative min-h-screen bg-gradient-to-b from-[#F7FAFE] via-[#EDF4FC] to-[#F4F8FE] text-slate-900 font-sans overflow-hidden">
      
      {/* Decorative Layer (z-index 0, pointer-events none) */}
      <AnimatedAboutBackground />

      {/* Main Content Container (z-index 10) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-20 space-y-20 relative z-10">
        
        {/* ==========================================
            1. HERO / PAGE INTRO
           ========================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center pt-4">
          
          {/* Left Column */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Eyebrow */}
            <motion.div
              initial="hidden"
              animate="visible"
              custom={0}
              variants={fadeIn}
              className="inline-flex items-center space-x-2 bg-blue-50/90 border border-blue-200/80 px-3.5 py-1.5 rounded-full text-xs font-bold text-[#0066CC] uppercase tracking-widest backdrop-blur-md shadow-sm"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#0066CC]" />
              <span>ABOUT OUR CHAPTER</span>
            </motion.div>

            {/* Title */}
            <motion.h1
              initial="hidden"
              animate="visible"
              custom={1}
              variants={fadeIn}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#071A3D] leading-[1.12]"
            >
              SITE ACM <br className="hidden sm:inline" />
              <span className="text-[#0066CC]">Student Chapter</span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial="hidden"
              animate="visible"
              custom={2}
              variants={fadeIn}
              className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-2xl font-normal"
            >
              Officially chartered at Sasi Institute of Technology & Engineering, Tadepalligudem, empowering students through technology, research, collaboration, and continuous learning.
            </motion.p>

            {/* Verification Badges */}
            <motion.div
              initial="hidden"
              animate="visible"
              custom={3}
              variants={fadeIn}
              className="flex flex-wrap items-center gap-4 pt-2 text-xs font-semibold text-slate-700"
            >
              <div className="flex items-center space-x-2 bg-white/90 border border-slate-200/90 px-3.5 py-2 rounded-xl shadow-sm backdrop-blur-md">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Officially Chartered Chapter</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/90 border border-slate-200/90 px-3.5 py-2 rounded-xl shadow-sm backdrop-blur-md">
                <Globe className="w-4 h-4 text-[#0066CC]" />
                <span>Global ACM Network</span>
              </div>
            </motion.div>

          </div>

          {/* Right Column: Premium Light Glassmorphism Info Panel */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={scaleUp}
            className="lg:col-span-5"
          >
            <div className="bg-white/80 backdrop-blur-2xl border border-white/90 rounded-3xl p-8 shadow-xl shadow-blue-900/5 space-y-6 relative overflow-hidden group hover:border-blue-300/60 transition-all duration-300">
              
              {/* Corner Glow Accent */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-400/10 rounded-full blur-2xl pointer-events-none"></div>

              {/* Logo & Header */}
              <div className="flex items-center space-x-4 pb-6 border-b border-slate-100">
                <div className="w-16 h-16 bg-white p-2.5 rounded-2xl shadow-md flex items-center justify-center shrink-0 border border-slate-200/80">
                  <img
                    src="/acm_logo.svg"
                    alt="Official ACM Logo"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div>
                  <div className="text-xs font-bold text-[#0066CC] uppercase tracking-widest">
                    OFFICIAL CHAPTER
                  </div>
                  <h3 className="text-xl font-extrabold text-[#071A3D] tracking-tight">
                    SITE ACM Student Chapter
                  </h3>
                  <div className="text-xs text-slate-500 mt-0.5 font-medium">
                    Sasi Institute of Tech & Engg
                  </div>
                </div>
              </div>

              {/* Charter Info Box */}
              <div className="bg-blue-50/80 border border-blue-100/90 rounded-2xl p-4 text-center space-y-1 backdrop-blur-sm">
                <div className="text-[10px] font-bold text-[#0066CC] uppercase tracking-widest">
                  CHAPTER CHARTER DATE
                </div>
                <div className="text-xl sm:text-2xl font-extrabold text-[#071A3D]">
                  September 4, 2018
                </div>
                <div className="text-[11px] text-slate-500 font-medium">
                  Chartered under ACM International
                </div>
              </div>

              {/* Meta details */}
              <div className="grid grid-cols-2 gap-3 text-xs pt-1">
                <div className="bg-white/90 p-3 rounded-xl border border-slate-200/80 shadow-sm flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-[#0066CC] shrink-0" />
                  <div>
                    <span className="text-slate-400 text-[10px] block font-semibold">Location</span>
                    <span className="font-bold text-slate-800">Tadepalligudem, AP</span>
                  </div>
                </div>
                <div className="bg-white/90 p-3 rounded-xl border border-slate-200/80 shadow-sm flex items-center space-x-2">
                  <Building2 className="w-4 h-4 text-[#0066CC] shrink-0" />
                  <div>
                    <span className="text-slate-400 text-[10px] block font-semibold">Department</span>
                    <span className="font-bold text-slate-800">CSE & Tech Depts</span>
                  </div>
                </div>
              </div>

            </div>
          </motion.div>

        </div>

        {/* ==========================================
            2. CHAPTER SNAPSHOT (Metrics Row + Count Up)
           ========================================== */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeIn}
          className="space-y-6 pt-4"
        >
          <div className="text-center space-y-1">
            <span className="text-[10px] font-bold text-[#0066CC] uppercase tracking-widest">
              CHAPTER METRICS
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#071A3D] tracking-tight">
              Chapter <span className="text-[#0066CC]">Snapshot</span>
            </h2>
          </div>

          <div className="relative">
            {/* Horizontal Line */}
            <div className="hidden lg:block absolute top-1/2 left-8 right-8 h-[1px] bg-gradient-to-r from-transparent via-blue-200 to-transparent -z-10"></div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              
              {/* Card 1: Charter Date */}
              <motion.div
                whileHover={shouldReduceMotion ? {} : { y: -4, transition: { duration: 0.25 } }}
                className="bg-white/85 backdrop-blur-xl border border-white/90 rounded-3xl p-6 text-center space-y-3 shadow-lg shadow-blue-900/5 hover:border-blue-300/60 transition-colors duration-250 group cursor-default"
              >
                <div className="w-12 h-12 bg-blue-50 border border-blue-100 text-[#0066CC] rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform shadow-sm">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-[10px] font-bold text-[#0066CC] uppercase tracking-wider">
                    Charter Date
                  </div>
                  <div className="text-2xl font-extrabold text-[#071A3D] mt-0.5">
                    Sept 4, 2018
                  </div>
                  <div className="text-[11px] text-slate-500 font-medium mt-1">
                    Official Chartering
                  </div>
                </div>
              </motion.div>

              {/* Card 2: Chapter Members */}
              <motion.div
                whileHover={shouldReduceMotion ? {} : { y: -4, transition: { duration: 0.25 } }}
                className="bg-white/85 backdrop-blur-xl border border-white/90 rounded-3xl p-6 text-center space-y-3 shadow-lg shadow-blue-900/5 hover:border-blue-300/60 transition-colors duration-250 group cursor-default"
              >
                <div className="w-12 h-12 bg-indigo-50 border border-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform shadow-sm">
                  <Users className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-[10px] font-bold text-indigo-600 uppercase tracking-wider">
                    Chapter Members
                  </div>
                  <div className="text-3xl font-extrabold text-[#071A3D] mt-0.5">
                    <AnimatedNumber value={CHAPTER_INFO.chapterMembersCount} />
                  </div>
                  <div className="text-[11px] text-slate-500 font-medium mt-1">
                    Registered Active Members
                  </div>
                </div>
              </motion.div>

              {/* Card 3: ACM Members */}
              <motion.div
                whileHover={shouldReduceMotion ? {} : { y: -4, transition: { duration: 0.25 } }}
                className="bg-white/85 backdrop-blur-xl border border-white/90 rounded-3xl p-6 text-center space-y-3 shadow-lg shadow-blue-900/5 hover:border-blue-300/60 transition-colors duration-250 group cursor-default"
              >
                <div className="w-12 h-12 bg-cyan-50 border border-cyan-100 text-cyan-600 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform shadow-sm">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-[10px] font-bold text-cyan-600 uppercase tracking-wider">
                    ACM Members
                  </div>
                  <div className="text-3xl font-extrabold text-[#071A3D] mt-0.5">
                    <AnimatedNumber value={CHAPTER_INFO.acmMembersCount} />
                  </div>
                  <div className="text-[11px] text-slate-500 font-medium mt-1">
                    Global ACM Cardholders
                  </div>
                </div>
              </motion.div>

              {/* Card 4: 2025-26 Activities */}
              <motion.div
                whileHover={shouldReduceMotion ? {} : { y: -4, transition: { duration: 0.25 } }}
                className="bg-white/85 backdrop-blur-xl border border-white/90 rounded-3xl p-6 text-center space-y-3 shadow-lg shadow-blue-900/5 hover:border-blue-300/60 transition-colors duration-250 group cursor-default"
              >
                <div className="w-12 h-12 bg-emerald-50 border border-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform shadow-sm">
                  <Activity className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider">
                    2025–26 Activities
                  </div>
                  <div className="text-3xl font-extrabold text-[#071A3D] mt-0.5">
                    <AnimatedNumber value={CHAPTER_INFO.activitiesCount2025_26} />
                  </div>
                  <div className="text-[11px] text-slate-500 font-medium mt-1">
                    Avg Attendance: {CHAPTER_INFO.averageAttendance}
                  </div>
                </div>
              </motion.div>

            </div>
          </div>
        </motion.div>

        {/* ==========================================
            3. OUR MISSION + OUR VISION
           ========================================== */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
          
          {/* Mission Card */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={slideFromLeft}
            className="bg-white/85 backdrop-blur-2xl border border-white/90 rounded-3xl p-8 sm:p-10 shadow-xl shadow-blue-900/5 space-y-6 relative overflow-hidden group hover:border-blue-300/60 transition-all duration-300"
          >
            <div className="w-14 h-14 rounded-2xl bg-blue-50 border border-blue-100 text-[#0066CC] flex items-center justify-center shadow-sm">
              <Target className="w-7 h-7" />
            </div>

            <div className="space-y-3">
              <div className="h-0.5 w-16 bg-[#0066CC] rounded-full"></div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#071A3D] tracking-tight">
                Our Mission
              </h3>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-normal">
                To nurture an engaging academic environment where students gain exposure to cutting-edge computing research, hands-on programming skills, industry best practices, and collaborative teamwork to solve real-world challenges.
              </p>
            </div>
          </motion.div>

          {/* Vision Card */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={slideFromRight}
            className="bg-white/85 backdrop-blur-2xl border border-white/90 rounded-3xl p-8 sm:p-10 shadow-xl shadow-blue-900/5 space-y-6 relative overflow-hidden group hover:border-blue-300/60 transition-all duration-300"
          >
            <div className="w-14 h-14 rounded-2xl bg-cyan-50 border border-cyan-100 text-cyan-600 flex items-center justify-center shadow-sm">
              <Eye className="w-7 h-7" />
            </div>

            <div className="space-y-3">
              <div className="h-0.5 w-16 bg-cyan-500 rounded-full"></div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#071A3D] tracking-tight">
                Our Vision
              </h3>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-normal">
                To establish SITE ACM Student Chapter as a premier technology community in Andhra Pradesh, producing innovative problem-solvers, competitive programmers, and ethical technological leaders who contribute meaningfully to society.
              </p>
            </div>
          </motion.div>

        </div>

        {/* ==========================================
            4. CHAPTER IDENTITY SECTION
           ========================================== */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeIn}
          className="space-y-8 pt-4"
        >
          <div className="text-center space-y-2">
            <span className="text-[10px] font-bold text-[#0066CC] uppercase tracking-widest">
              ORGANIZATIONAL PILLARS
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#071A3D] tracking-tight">
              Chapter Identity
            </h2>
            <p className="text-xs text-slate-500 max-w-xl mx-auto">
              Synthesizing global academic standards with institutional innovation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Identity 1 */}
            <div className="bg-white/85 backdrop-blur-xl border border-white/90 rounded-3xl p-7 space-y-4 shadow-lg shadow-blue-900/5 hover:border-blue-300/60 transition-all duration-300">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-blue-50 border border-blue-100 rounded-2xl text-[#0066CC]">
                  <Globe className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-lg font-extrabold text-[#071A3D]">ACM</div>
                  <div className="text-[11px] text-[#0066CC] font-bold">
                    Association for Computing Machinery
                  </div>
                </div>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                World's largest educational and scientific computing society, advancing computing as a science and profession through research and innovation.
              </p>
            </div>

            {/* Identity 2 */}
            <div className="bg-white/85 backdrop-blur-xl border border-white/90 rounded-3xl p-7 space-y-4 shadow-lg shadow-blue-900/5 hover:border-blue-300/60 transition-all duration-300">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-cyan-50 border border-cyan-100 rounded-2xl text-cyan-600">
                  <Cpu className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-lg font-extrabold text-[#071A3D]">SITE ACM</div>
                  <div className="text-[11px] text-cyan-600 font-bold">
                    Student Chapter
                  </div>
                </div>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Official student chapter chartered on September 4, 2018, conducting technical talk series, hackathons, and research activities across campus.
              </p>
            </div>

            {/* Identity 3 */}
            <div className="bg-white/85 backdrop-blur-xl border border-white/90 rounded-3xl p-7 space-y-4 shadow-lg shadow-blue-900/5 hover:border-blue-300/60 transition-all duration-300">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-indigo-50 border border-indigo-100 rounded-2xl text-indigo-600">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-lg font-extrabold text-[#071A3D]">SASI</div>
                  <div className="text-[11px] text-indigo-600 font-bold">
                    Sasi Institute of Tech & Engg
                  </div>
                </div>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Premier engineering institution located in Tadepalligudem, West Godavari District, Andhra Pradesh, providing world-class infrastructure.
              </p>
            </div>

          </div>
        </motion.div>

        {/* ==========================================
            5. WHY ACM / FEATURE CONNECTION ANIMATION
           ========================================== */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeIn}
          className="space-y-8 pt-4"
        >
          <div className="text-center space-y-2">
            <span className="text-[10px] font-bold text-[#0066CC] uppercase tracking-widest">
              CORE FOUNDATION
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#071A3D] tracking-tight">
              What We Represent
            </h2>
            <p className="text-xs text-slate-500 max-w-xl mx-auto">
              Four fundamental pillars guiding all SITE ACM activities and events.
            </p>
          </div>

          <div className="relative">
            
            {/* Animated Connecting Line */}
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, ease: 'easeInOut' }}
              className="hidden lg:block absolute top-1/2 left-12 right-12 h-[2px] bg-gradient-to-r from-blue-300 via-[#0066CC] to-blue-300 origin-left -z-10 shadow-sm"
            ></motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              
              {/* Feature 1 */}
              <motion.div
                initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="bg-white/85 backdrop-blur-xl border border-white/90 rounded-3xl p-6 space-y-4 shadow-lg shadow-blue-900/5 hover:border-blue-300/60 transition-all duration-300 group"
              >
                <div className="w-12 h-12 bg-blue-50 border border-blue-100 text-[#0066CC] rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm">
                  <Code2 className="w-6 h-6" />
                </div>
                <div className="space-y-1.5">
                  <h4 className="text-base font-bold text-[#071A3D]">Technology</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Hands-on software development, algorithm problem solving, and modern technical practices.
                  </p>
                </div>
              </motion.div>

              {/* Feature 2 */}
              <motion.div
                initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.25 }}
                className="bg-white/85 backdrop-blur-xl border border-white/90 rounded-3xl p-6 space-y-4 shadow-lg shadow-blue-900/5 hover:border-blue-300/60 transition-all duration-300 group"
              >
                <div className="w-12 h-12 bg-cyan-50 border border-cyan-100 text-cyan-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm">
                  <BookOpen className="w-6 h-6" />
                </div>
                <div className="space-y-1.5">
                  <h4 className="text-base font-bold text-[#071A3D]">Research</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Academic computing research, technical talk series, and expert keynote guest lectures.
                  </p>
                </div>
              </motion.div>

              {/* Feature 3 */}
              <motion.div
                initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="bg-white/85 backdrop-blur-xl border border-white/90 rounded-3xl p-6 space-y-4 shadow-lg shadow-blue-900/5 hover:border-blue-300/60 transition-all duration-300 group"
              >
                <div className="w-12 h-12 bg-indigo-50 border border-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm">
                  <Users2 className="w-6 h-6" />
                </div>
                <div className="space-y-1.5">
                  <h4 className="text-base font-bold text-[#071A3D]">Collaboration</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Inter-departmental teamwork, competitive hackathons, and community outreach programs.
                  </p>
                </div>
              </motion.div>

              {/* Feature 4 */}
              <motion.div
                initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.55 }}
                className="bg-white/85 backdrop-blur-xl border border-white/90 rounded-3xl p-6 space-y-4 shadow-lg shadow-blue-900/5 hover:border-blue-300/60 transition-all duration-300 group"
              >
                <div className="w-12 h-12 bg-emerald-50 border border-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm">
                  <Sparkles className="w-6 h-6" />
                </div>
                <div className="space-y-1.5">
                  <h4 className="text-base font-bold text-[#071A3D]">Continuous Learning</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Interactive skill workshops, tech guest seminars, and continuous professional growth.
                  </p>
                </div>
              </motion.div>

            </div>
          </div>
        </motion.div>

        {/* ==========================================
            6. CHAPTER MILESTONE & TIMELINE
           ========================================== */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeIn}
          className="space-y-10 pt-4"
        >
          
          <div className="text-center space-y-2">
            <span className="text-[10px] font-bold text-[#0066CC] uppercase tracking-widest">
              CHAPTER MILESTONE & HISTORY
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#071A3D] tracking-tight">
              Our Journey & Milestones
            </h2>
            <p className="text-xs text-slate-500 max-w-xl mx-auto">
              Documented chapter milestones since chartering on September 4, 2018.
            </p>
          </div>

          {/* Static Timeline Container */}
          <div className="relative ml-4 md:ml-32 space-y-8 pl-6 md:pl-10">
            
            {/* Extremely subtle ambient background floating dots */}
            <motion.div
              animate={{ y: [-10, 10, -10], opacity: [0.08, 0.18, 0.08] }}
              transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -top-8 right-8 w-3 h-3 bg-[#0066CC] rounded-full pointer-events-none z-0"
            ></motion.div>
            <motion.div
              animate={{ y: [10, -10, 10], opacity: [0.1, 0.18, 0.1] }}
              transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute bottom-6 left-1/3 w-2.5 h-2.5 bg-[#0066CC] rounded-full pointer-events-none z-0"
            ></motion.div>

            {/* Clean, static 2px ACM-blue vertical line */}
            <div className="absolute left-[7px] top-3 bottom-3 w-[2px] bg-[#0066CC]/30 pointer-events-none"></div>

            {TIMELINE_HISTORY.map((item, idx) => (
              <div key={idx} className="relative">
                
                {/* Completely static 16px circular dot with white center & ACM-blue border */}
                <div className="absolute -left-[25px] md:-left-[41px] top-6 w-4 h-4 rounded-full bg-white border-[3px] border-[#0066CC] shadow-sm pointer-events-none z-10"></div>

                {/* Scroll entrance animation ONLY on the card */}
                <motion.div
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 0.7, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="bg-white/85 backdrop-blur-xl border border-white/90 hover:border-blue-300/60 rounded-3xl p-6 transition-all duration-300 space-y-2 shadow-lg shadow-blue-900/5 relative z-10"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-xs font-extrabold px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-[#0066CC]">
                      {item.year}
                    </span>
                    {item.date && (
                      <span className="text-xs font-semibold text-slate-500">{item.date}</span>
                    )}
                  </div>
                  <h3 className="text-lg font-bold text-[#071A3D]">{item.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                    {item.description}
                  </p>
                </motion.div>

              </div>
            ))}
          </div>

        </motion.div>

        {/* ==========================================
            7. COMMUNITY IMPACT BANNER
           ========================================== */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeIn}
          className="bg-gradient-to-r from-[#071A3D] via-[#004499] to-[#071A3D] border border-white/20 rounded-3xl p-8 sm:p-12 text-white space-y-6 shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl pointer-events-none"></div>

          <div className="max-w-3xl space-y-3 relative z-10">
            <span className="text-[10px] font-bold text-blue-300 uppercase tracking-widest">
              COMMUNITY IMPACT
            </span>
            <h2 className="text-3xl font-extrabold text-white tracking-tight">
              Inspiring Rural Schools & Future Technologists
            </h2>
            <p className="text-slate-200 text-sm sm:text-base leading-relaxed">
              Through initiatives like the rural "Hour of Code" outreach at ZPH Schools in Veerampalem and Kommugudem, our chapter actively bridges the digital divide for over 120 school children with 26 dedicated student volunteers.
            </p>
          </div>

          <div className="relative z-10 pt-2">
            <Link
              to="/events"
              className="inline-flex items-center px-6 py-3.5 text-xs font-bold text-white bg-[#0066CC] hover:bg-blue-600 rounded-2xl shadow-xl shadow-blue-600/30 transition-all uppercase tracking-wider"
            >
              <span>Explore Chapter Activities</span>
              <ChevronRight className="w-4 h-4 ml-1.5" />
            </Link>
          </div>
        </motion.div>

      </div>
    </main>
  );
}
