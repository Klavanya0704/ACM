import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { VERIFIED_TEAM } from '../data/mockData';
import { Mail, Sparkles, ShieldCheck, CheckCircle2, Award, Users, Calendar } from 'lucide-react';

// Light Animated Background Layer Component
function AnimatedBackground() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* Soft Ambient Blobs */}
      <motion.div
        animate={
          shouldReduceMotion
            ? {}
            : {
                x: [-15, 15, -15],
                y: [-10, 10, -10],
                scale: [1, 1.05, 1],
              }
        }
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -top-20 -left-20 w-[600px] h-[600px] bg-gradient-to-br from-blue-300/25 via-sky-200/15 to-transparent rounded-full blur-[100px]"
      ></motion.div>

      <motion.div
        animate={
          shouldReduceMotion
            ? {}
            : {
                x: [20, -20, 20],
                y: [12, -12, 12],
                scale: [1, 1.06, 1],
              }
        }
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/3 -right-20 w-[550px] h-[550px] bg-gradient-to-bl from-cyan-300/20 via-blue-200/25 to-transparent rounded-full blur-[90px]"
      ></motion.div>

      {/* Dotted Grid Pattern Overlay */}
      <svg className="absolute inset-0 w-full h-full opacity-45" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="team-light-dotted" width="28" height="28" patternUnits="userSpaceOnUse">
            <circle cx="3" cy="3" r="1.2" fill="#0066CC" fillOpacity="0.14" />
          </pattern>
        </defs>
        <rect width="280" height="280" x="4%" y="4%" fill="url(#team-light-dotted)" opacity="0.8" />
        <rect width="240" height="300" x="80%" y="15%" fill="url(#team-light-dotted)" opacity="0.6" />
      </svg>

      {/* Floating Particles */}
      <motion.div
        animate={shouldReduceMotion ? {} : { y: [-6, 6, -6], opacity: [0.4, 0.9, 0.4] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-16 left-[22%] w-2.5 h-2.5 bg-[#0066CC] rounded-full shadow-[0_0_10px_rgba(0,102,204,0.5)]"
      ></motion.div>

      <motion.div
        animate={shouldReduceMotion ? {} : { y: [6, -6, 6], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-[50%] right-[12%] w-3 h-3 bg-[#0066CC] rounded-full shadow-[0_0_12px_rgba(0,102,204,0.6)]"
      ></motion.div>
    </div>
  );
}

export default function TeamPage() {
  const shouldReduceMotion = useReducedMotion();

  // Explicitly ensure order of 6 leadership members
  const memberList = [
    VERIFIED_TEAM.find(m => m.initials === 'SP') || VERIFIED_TEAM[0],
    VERIFIED_TEAM.find(m => m.initials === 'MS') || VERIFIED_TEAM[1],
    VERIFIED_TEAM.find(m => m.initials === 'DS') || VERIFIED_TEAM[2],
    VERIFIED_TEAM.find(m => m.initials === 'AK') || VERIFIED_TEAM[3],
    VERIFIED_TEAM.find(m => m.initials === 'KD') || VERIFIED_TEAM[4],
    VERIFIED_TEAM.find(m => m.initials === 'TK') || VERIFIED_TEAM[5],
  ];

  const fadeIn = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 25 },
    visible: (custom = 0) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: custom * 0.1,
        ease: [0.25, 0.1, 0.25, 1],
      },
    }),
  };

  return (
    <main className="relative min-h-screen bg-gradient-to-b from-[#F7FAFE] via-[#EDF4FC] to-[#F4F8FE] text-slate-900 font-sans overflow-hidden">
      
      {/* Background Decorative Layer */}
      <AnimatedBackground />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-20 space-y-16 relative z-10">
        
        {/* ==========================================
            1. PAGE HERO & OFFICIAL INFO PANEL
           ========================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center pt-4">
          
          {/* Left Column */}
          <div className="lg:col-span-7 space-y-6">
            
            <motion.div
              initial="hidden"
              animate="visible"
              custom={0}
              variants={fadeIn}
              className="inline-flex items-center space-x-2 bg-blue-50/90 border border-blue-200/80 px-3.5 py-1.5 rounded-full text-xs font-bold text-[#0066CC] uppercase tracking-widest backdrop-blur-md shadow-sm"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#0066CC]" />
              <span>OUR CHAPTER</span>
            </motion.div>

            <motion.h1
              initial="hidden"
              animate="visible"
              custom={1}
              variants={fadeIn}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#071A3D] leading-[1.12]"
            >
              SITE ACM <br className="hidden sm:inline" />
              <span className="text-[#0066CC]">Chapter Leadership</span>
            </motion.h1>

            <motion.p
              initial="hidden"
              animate="visible"
              custom={2}
              variants={fadeIn}
              className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-2xl font-normal"
            >
              Meet the student leaders and faculty sponsor guiding the SITE ACM Student Chapter.
            </motion.p>

            <motion.div
              initial="hidden"
              animate="visible"
              custom={3}
              variants={fadeIn}
              className="flex flex-wrap items-center gap-4 pt-2 text-xs font-semibold text-slate-700"
            >
              <div className="flex items-center space-x-2 bg-white/90 border border-slate-200/90 px-3.5 py-2 rounded-xl shadow-sm backdrop-blur-md">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Verified Executive Board</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/90 border border-slate-200/90 px-3.5 py-2 rounded-xl shadow-sm backdrop-blur-md">
                <ShieldCheck className="w-4 h-4 text-[#0066CC]" />
                <span>ACM Chartered Administration</span>
              </div>
            </motion.div>

          </div>

          {/* Right Column: Glass Information Panel */}
          <motion.div
            initial={{ opacity: 0, x: shouldReduceMotion ? 0 : 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-5"
          >
            <div
              style={{
                background: 'rgba(255, 255, 255, 0.8)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.9)',
              }}
              className="rounded-3xl p-8 shadow-xl shadow-blue-900/5 space-y-6 relative overflow-hidden group hover:border-blue-300/60 transition-all duration-300"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-400/10 rounded-full blur-2xl pointer-events-none"></div>

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

              <div className="bg-blue-50/80 border border-blue-100/90 rounded-2xl p-4 text-center space-y-1 backdrop-blur-sm">
                <div className="text-[10px] font-bold text-[#0066CC] uppercase tracking-widest">
                  CHARTERED
                </div>
                <div className="text-xl sm:text-2xl font-extrabold text-[#071A3D]">
                  September 4, 2018
                </div>
                <div className="text-[11px] text-slate-500 font-medium">
                  Official Chapter Charter
                </div>
              </div>

            </div>
          </motion.div>

        </div>

        {/* ==========================================
            2. LEADERSHIP SECTION (6 Glass Cards)
           ========================================== */}
        <div className="space-y-8 pt-4">
          
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeIn}
            className="text-center space-y-2"
          >
            <span className="text-[10px] font-bold text-[#0066CC] uppercase tracking-widest">
              CHAPTER LEADERSHIP
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#071A3D] tracking-tight">
              Meet Our Leadership
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 max-w-xl mx-auto">
              Student leaders working together to build learning, collaboration, and technical opportunities through SITE ACM.
            </p>
          </motion.div>

          {/* 6 Leadership Members Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {memberList.map((member, index) => (
              <motion.div
                key={member.id}
                initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.45, delay: index * 0.08, ease: [0.25, 0.1, 0.25, 1] }}
                whileHover={shouldReduceMotion ? {} : { y: -5, transition: { duration: 0.25 } }}
                style={{
                  background: 'rgba(255, 255, 255, 0.75)',
                  backdropFilter: 'blur(18px)',
                  WebkitBackdropFilter: 'blur(18px)',
                  border: '1px solid rgba(0, 102, 204, 0.12)',
                  borderRadius: '22px',
                }}
                className="p-8 shadow-lg shadow-blue-900/5 hover:border-blue-400/40 hover:shadow-xl hover:shadow-blue-900/10 transition-colors duration-300 space-y-6 text-center group flex flex-col justify-between"
              >
                <div className="space-y-4">
                  {/* Circular Initials Badge */}
                  <div
                    style={{
                      background: 'rgba(0, 102, 204, 0.08)',
                      border: '1px solid rgba(0, 102, 204, 0.2)',
                    }}
                    className="w-16 h-16 rounded-full text-[#0066CC] font-black text-xl flex items-center justify-center mx-auto shadow-sm group-hover:scale-105 transition-transform duration-300"
                  >
                    {member.initials}
                  </div>

                  {/* Name & Position */}
                  <div className="space-y-1">
                    <h3 className="text-xl font-extrabold text-[#071A3D] group-hover:text-[#0066CC] transition-colors duration-250">
                      {member.name}
                    </h3>
                    <div className="text-xs font-bold text-[#0066CC] uppercase tracking-wider">
                      {member.role}
                    </div>
                    <div className="text-[11px] text-slate-500 font-medium">
                      {member.department}
                    </div>
                  </div>
                </div>

                {/* Subtle Accent Line & Email */}
                <div className="space-y-3 pt-3 border-t border-slate-100">
                  <div className="h-0.5 w-10 bg-[#0066CC]/30 rounded-full mx-auto"></div>
                  {member.email && (
                    <div className="flex items-center justify-center space-x-2 text-xs font-medium text-slate-500">
                      <Mail className="w-3.5 h-3.5 text-[#0066CC] shrink-0" />
                      <a
                        href={`mailto:${member.email}`}
                        className="hover:text-[#0066CC] hover:underline truncate max-w-[200px]"
                      >
                        {member.email}
                      </a>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

        </div>

        {/* ==========================================
            3. CHAPTER INFORMATION STRIP
           ========================================== */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeIn}
          style={{
            background: 'rgba(255, 255, 255, 0.75)',
            backdropFilter: 'blur(18px)',
            WebkitBackdropFilter: 'blur(18px)',
            border: '1px solid rgba(0, 102, 204, 0.12)',
            borderRadius: '22px',
          }}
          className="p-6 sm:p-8 shadow-lg shadow-blue-900/5 max-w-4xl mx-auto"
        >
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
            
            <div className="space-y-1 pt-2 sm:pt-0">
              <span className="text-[10px] font-bold text-[#0066CC] uppercase tracking-wider block">
                CHARTERED
              </span>
              <span className="text-base font-extrabold text-[#071A3D] block">
                September 4, 2018
              </span>
              <span className="text-[11px] text-slate-500 block">Official Chapter Charter</span>
            </div>

            <div className="space-y-1 pt-4 sm:pt-0">
              <span className="text-[10px] font-bold text-[#0066CC] uppercase tracking-wider block">
                MEMBERS
              </span>
              <span className="text-base font-extrabold text-[#071A3D] block">
                56 Chapter Members
              </span>
              <span className="text-[11px] text-slate-500 block">55 ACM Members</span>
            </div>

            <div className="space-y-1 pt-4 sm:pt-0">
              <span className="text-[10px] font-bold text-[#0066CC] uppercase tracking-wider block">
                NEXT ELECTION
              </span>
              <span className="text-base font-extrabold text-[#071A3D] block">
                June 2027
              </span>
              <span className="text-[11px] text-slate-500 block">Scheduled Officer Election</span>
            </div>

          </div>
        </motion.div>

      </div>
    </main>
  );
}
