import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  Sparkles,
  Calendar,
  Users,
  ShieldCheck,
  Building2,
  MapPin,
  Award,
  Hash,
  GraduationCap,
  Clock,
  ArrowRight,
  CheckCircle2
} from 'lucide-react';
import { CHAPTER_INFO } from '../data/mockData';

export default function WhatIsAcm() {
  const shouldReduceMotion = useReducedMotion();

  // Factual Journey Timeline items
  const journeyTimeline = [
    {
      year: '2018',
      title: 'Chapter Chartered',
      detail: 'September 4, 2018',
    },
    {
      year: '2022',
      title: 'Chapter status history continued through ACM administration',
      detail: '',
    },
    {
      year: '2024',
      title: 'Chapter returned to Active status in ACM records',
      detail: '',
    },
    {
      year: '2025–26',
      title: '14 documented meetings/events',
      detail: 'Average meeting attendance: 24',
    },
    {
      year: '2026',
      title: 'Current ACM administrative records:',
      detail: '56 Chapter Members • 55 ACM Members',
    },
  ];

  return (
    <section
      id="about"
      className="py-20 relative bg-gradient-to-br from-[#F4F8FF] via-[#EBF3FF] to-[#F7FAFF] circuit-bg-pattern border-y border-blue-100 overflow-hidden font-sans"
    >
      {/* Subtle Background Ambient Animated Lighting & Blobs */}
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
        className="absolute top-1/4 left-10 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl pointer-events-none z-0"
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
        className="absolute bottom-10 right-10 w-[480px] h-[480px] bg-cyan-400/15 rounded-full blur-3xl pointer-events-none z-0"
      ></motion.div>

      {/* Floating Decorative Dots */}
      <motion.div
        animate={shouldReduceMotion ? {} : { y: [-6, 6, -6], opacity: [0.4, 0.9, 0.4] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-16 left-[20%] w-2.5 h-2.5 bg-[#0066CC] rounded-full shadow-[0_0_10px_rgba(0,102,204,0.5)] z-0"
      ></motion.div>

      <motion.div
        animate={shouldReduceMotion ? {} : { y: [6, -6, 6], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-[45%] right-[15%] w-3 h-3 bg-[#0066CC] rounded-full shadow-[0_0_12px_rgba(0,102,204,0.6)] z-0"
      ></motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        
        {/* Section Header */}
        <div className="space-y-3">
          <div className="inline-flex items-center space-x-2 bg-blue-50/90 border border-blue-200/80 px-3.5 py-1.5 rounded-full text-xs font-bold text-[#0066CC] uppercase tracking-widest backdrop-blur-sm shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#0066CC]" />
            <span>ABOUT OUR CHAPTER</span>
          </div>

          <h2 className="text-4xl sm:text-5xl font-extrabold text-[#071A3D] tracking-tight">
            About SITE ACM <span className="text-[#0066CC]">Student Chapter</span>
          </h2>
          <div className="w-16 h-1 bg-[#0066CC] rounded-full mt-2"></div>
        </div>

        {/* Main Grid: Left Intro & Timeline vs Right Official Profile Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* ========================================================================= */}
          {/* LEFT COLUMN: Chapter Introduction & Factual Journey Timeline (~7 Cols) */}
          {/* ========================================================================= */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Chapter Paragraphs */}
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-white/90 shadow-lg shadow-blue-950/5 space-y-4">
              <p className="text-slate-700 text-sm sm:text-base leading-relaxed font-normal">
                The <strong>SITE ACM Student Chapter</strong> is a university student chapter of the Association for Computing Machinery (ACM), established at Sasi Institute of Technology & Engineering, Tadepalligudem.
              </p>

              <p className="text-slate-700 text-sm sm:text-base leading-relaxed font-normal">
                The chapter was officially chartered on <strong>September 4, 2018</strong>, with the aim of creating a platform for students to learn, collaborate, explore computing technologies, and participate in technical and professional activities.
              </p>

              <p className="text-slate-700 text-sm sm:text-base leading-relaxed font-normal">
                Through technical events, hackathons, guest lectures, workshops, and outreach activities, the chapter encourages students to develop practical skills, connect with the computing community, and grow as future technology professionals.
              </p>
            </div>

            {/* OUR JOURNEY Timeline */}
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-white/90 shadow-lg shadow-blue-950/5 space-y-6">
              
              <div className="flex items-center space-x-2 border-b border-slate-100 pb-3">
                <Clock className="w-4 h-4 text-[#0066CC]" />
                <h3 className="text-base font-extrabold text-[#071A3D] uppercase tracking-wider">
                  OUR JOURNEY
                </h3>
              </div>

              {/* Static Timeline Container */}
              <div className="relative ml-3 space-y-6 pl-6">
                {/* Clean, static 2px ACM-blue vertical line */}
                <div className="absolute left-[7px] top-2 bottom-2 w-[2px] bg-[#0066CC]/30 pointer-events-none"></div>

                {journeyTimeline.map((item, index) => (
                  <div key={index} className="relative">
                    {/* Completely static 16px circular dot with white center & ACM-blue border */}
                    <div className="absolute -left-[25px] top-1 w-4 h-4 rounded-full bg-white border-[3px] border-[#0066CC] shadow-sm pointer-events-none z-10"></div>

                    {/* Scroll entrance animation ONLY on the card content */}
                    <motion.div
                      initial={{ opacity: 0, y: 25 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.15 }}
                      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                      className="space-y-0.5"
                    >
                      <div className="inline-block px-2.5 py-0.5 rounded-md bg-blue-50 border border-blue-100 text-[#0066CC] text-xs font-bold">
                        {item.year}
                      </div>
                      <div className="text-xs sm:text-sm font-bold text-[#071A3D]">
                        {item.title}
                      </div>
                      {item.detail && (
                        <div className="text-xs text-slate-500 font-medium">
                          {item.detail}
                        </div>
                      )}
                    </motion.div>
                  </div>
                ))}
              </div>

            </div>

          </div>

          {/* ========================================================================= */}
          {/* RIGHT COLUMN: Official Chapter Profile Card (~5 Cols) */}
          {/* ========================================================================= */}
          <div className="lg:col-span-5">
            <div className="bg-white/85 backdrop-blur-2xl border border-white/90 rounded-3xl p-6 sm:p-8 shadow-xl shadow-blue-950/5 space-y-6 relative overflow-hidden group hover:border-blue-300/60 transition-all duration-300">
              
              {/* Corner Glow */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-400/10 rounded-full blur-2xl pointer-events-none"></div>

              {/* Header Badge & Title */}
              <div className="space-y-3 pb-5 border-b border-slate-100">
                <div className="inline-flex items-center space-x-1.5 bg-blue-50 border border-blue-200 px-3 py-1 rounded-full text-[10px] font-bold text-[#0066CC] uppercase tracking-widest">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#0066CC]" />
                  <span>OFFICIAL CHAPTER</span>
                </div>

                <div className="flex items-start space-x-4 pt-1">
                  <div className="w-14 h-14 bg-white p-2 rounded-2xl shadow-md flex items-center justify-center shrink-0 border border-slate-200">
                    <img
                      src="/acm_logo.svg"
                      alt="Official ACM Logo"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-extrabold text-[#071A3D] tracking-tight">
                      SITE ACM Student Chapter
                    </h3>
                    <div className="text-xs font-semibold text-[#0066CC] mt-0.5">
                      Association for Computing Machinery (ACM)
                    </div>
                  </div>
                </div>

                <div className="space-y-1 text-xs text-slate-600 font-medium pt-2">
                  <div className="flex items-center space-x-2">
                    <Building2 className="w-4 h-4 text-slate-400 shrink-0" />
                    <span>Sasi Institute of Technology & Engineering</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
                    <span>Tadepalligudem, Andhra Pradesh</span>
                  </div>
                </div>
              </div>

              {/* Charter Date Block */}
              <div className="bg-blue-50/80 border border-blue-100 rounded-2xl p-4 text-center space-y-1 backdrop-blur-sm">
                <div className="text-[10px] font-bold text-[#0066CC] uppercase tracking-widest">
                  CHARTER DATE
                </div>
                <div className="text-xl font-extrabold text-[#071A3D]">
                  September 4, 2018
                </div>
                <div className="text-[11px] text-slate-500 font-medium">
                  Official Chapter Charter
                </div>
              </div>

              {/* Members Count Strip */}
              <div className="grid grid-cols-2 gap-3 text-center">
                <div className="bg-white/90 p-3.5 rounded-2xl border border-slate-200/80 shadow-sm space-y-0.5">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    CHAPTER MEMBERS
                  </span>
                  <span className="text-2xl font-extrabold text-[#071A3D]">
                    56
                  </span>
                </div>

                <div className="bg-white/90 p-3.5 rounded-2xl border border-slate-200/80 shadow-sm space-y-0.5">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    ACM MEMBERS
                  </span>
                  <span className="text-2xl font-extrabold text-[#0066CC]">
                    55
                  </span>
                </div>
              </div>

              {/* ACM Group ID & Chapter Type */}
              <div className="grid grid-cols-2 gap-3 text-xs pt-1 border-t border-slate-100">
                <div className="p-3 bg-slate-50/90 rounded-xl border border-slate-200/80 space-y-0.5">
                  <span className="text-slate-400 text-[10px] font-bold uppercase block">
                    ACM GROUP ID
                  </span>
                  <span className="font-extrabold text-[#071A3D] font-mono text-sm">
                    178171
                  </span>
                </div>

                <div className="p-3 bg-slate-50/90 rounded-xl border border-slate-200/80 space-y-0.5">
                  <span className="text-slate-400 text-[10px] font-bold uppercase block">
                    CHAPTER TYPE
                  </span>
                  <span className="font-bold text-[#071A3D]">
                    Student • University
                  </span>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
