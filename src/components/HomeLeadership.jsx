import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Users, ArrowRight, CheckCircle2 } from 'lucide-react';
import { VERIFIED_TEAM } from '../data/mockData';

export default function HomeLeadership() {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 25 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <section className="py-20 relative bg-gradient-to-br from-[#F4F8FF] via-[#EBF3FF] to-[#F7FAFF] border-t border-blue-100 overflow-hidden font-sans">
      {/* Background Ambient Glows & Translucent Shapes */}
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl pointer-events-none z-0"></div>
      <div className="absolute bottom-10 right-1/4 w-[420px] h-[420px] bg-cyan-400/10 rounded-full blur-3xl pointer-events-none z-0"></div>

      {/* Decorative Floating Dots */}
      <div className="absolute top-12 right-[20%] w-2.5 h-2.5 bg-[#0066CC]/30 rounded-full z-0"></div>
      <div className="absolute bottom-16 left-[15%] w-3 h-3 bg-[#0066CC]/20 rounded-full z-0"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center space-x-2 bg-blue-50/90 border border-blue-200/80 px-3.5 py-1.5 rounded-full text-xs font-bold text-[#0066CC] uppercase tracking-widest backdrop-blur-sm shadow-sm">
            <Users className="w-3.5 h-3.5 text-[#0066CC]" />
            <span>OUR CHAPTER</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#071A3D] tracking-tight">
            SITE ACM <span className="text-[#0066CC]">Chapter Leadership</span>
          </h2>

          <p className="text-slate-600 text-sm sm:text-base font-normal max-w-xl mx-auto leading-relaxed">
            Meet the student leaders and faculty sponsor guiding the SITE ACM Student Chapter.
          </p>

          <div className="w-16 h-1 bg-[#0066CC] rounded-full mx-auto mt-2"></div>
        </div>

        {/* Leadership Grid with Framer Motion scroll trigger & hover */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {VERIFIED_TEAM.map((member) => (
            <motion.div
              key={member.id}
              variants={cardVariants}
              whileHover={{ 
                y: -5,
                transition: { duration: 0.2, ease: "easeOut" }
              }}
              className="bg-white/80 backdrop-blur-xl border border-blue-100 hover:border-[#0066CC]/60 rounded-[22px] p-6 shadow-md hover:shadow-xl hover:shadow-blue-600/10 transition-all duration-300 relative group overflow-hidden flex flex-col justify-between"
            >
              {/* Soft Radial Ambient Glow inside Card on Hover */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-400/0 group-hover:bg-blue-400/10 rounded-full blur-2xl transition-colors duration-500 pointer-events-none"></div>

              <div className="space-y-4 relative z-10">
                {/* Initials Badge */}
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-blue-50/90 group-hover:bg-blue-100/90 border border-blue-200/80 group-hover:border-[#0066CC]/60 flex items-center justify-center text-base font-extrabold text-[#0066CC] shadow-inner group-hover:scale-105 transition-all duration-300">
                    {member.initials}
                  </div>

                  <span className="text-[10px] font-bold text-slate-400 group-hover:text-[#0066CC] uppercase tracking-wider bg-slate-50 group-hover:bg-blue-50/80 px-2.5 py-1 rounded-full border border-slate-200/60 group-hover:border-blue-200 transition-colors">
                    {member.category}
                  </span>
                </div>

                {/* Member Info */}
                <div className="space-y-1">
                  <h3 className="text-lg font-extrabold text-[#071A3D] group-hover:text-[#0066CC] transition-colors leading-snug">
                    {member.name}
                  </h3>
                  <div className="text-xs font-extrabold text-[#0066CC] uppercase tracking-wider">
                    {member.role}
                  </div>
                  <div className="text-[11px] text-slate-500 font-medium">
                    {member.department}
                  </div>
                </div>
              </div>

              {/* Card Footer Strip / Email */}
              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 relative z-10">
                <span className="text-[11px] text-slate-400 group-hover:text-slate-600 truncate transition-colors">
                  {member.email}
                </span>
                <CheckCircle2 className="w-4 h-4 text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity shrink-0 ml-2" />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Compact Chapter Info Strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-white/80 backdrop-blur-xl border border-blue-100 rounded-2xl p-4 sm:p-5 shadow-sm max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-0 divide-y sm:divide-y-0 sm:divide-x divide-blue-100 text-center"
        >
          <div className="py-2 sm:py-0 sm:px-4">
            <div className="text-[10px] font-extrabold text-[#0066CC] uppercase tracking-widest">
              CHARTERED
            </div>
            <div className="text-sm sm:text-base font-extrabold text-[#071A3D] mt-0.5">
              September 4, 2018
            </div>
          </div>

          <div className="py-2 sm:py-0 sm:px-4">
            <div className="text-[10px] font-extrabold text-[#0066CC] uppercase tracking-widest">
              MEMBERS
            </div>
            <div className="text-sm sm:text-base font-extrabold text-[#071A3D] mt-0.5">
              56 Chapter Members
            </div>
          </div>

          <div className="py-2 sm:py-0 sm:px-4">
            <div className="text-[10px] font-extrabold text-[#0066CC] uppercase tracking-widest">
              NEXT ELECTION
            </div>
            <div className="text-sm sm:text-base font-extrabold text-[#071A3D] mt-0.5">
              June 2027
            </div>
          </div>
        </motion.div>

        {/* Bottom CTA to /team */}
        <div className="text-center pt-2">
          <Link
            to="/team"
            className="inline-flex items-center px-6 py-3 text-xs sm:text-sm font-bold text-[#0066CC] hover:text-white bg-blue-50/90 hover:bg-[#0066CC] border border-blue-200/90 rounded-full transition-all duration-200 shadow-sm hover:shadow-md group"
          >
            <span>Explore Full Chapter Leadership & Team</span>
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

      </div>
    </section>
  );
}
