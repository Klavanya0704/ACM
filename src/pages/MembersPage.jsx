import React, { useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Search, Filter, Users, Sparkles, GraduationCap, CheckCircle2, ShieldCheck, Mail, Calendar } from 'lucide-react';
import { membersService } from '../services/membersService';
import { VERIFIED_TEAM, CHAPTER_INFO } from '../data/mockData';

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
        className="absolute -top-20 -left-20 w-[550px] h-[550px] bg-gradient-to-br from-blue-300/25 via-sky-200/15 to-transparent rounded-full blur-[100px]"
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
        className="absolute top-1/3 -right-20 w-[500px] h-[500px] bg-gradient-to-bl from-cyan-300/20 via-blue-200/25 to-transparent rounded-full blur-[90px]"
      ></motion.div>

      {/* Dotted Grid Pattern Overlay */}
      <svg className="absolute inset-0 w-full h-full opacity-40" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="members-light-dotted" width="28" height="28" patternUnits="userSpaceOnUse">
            <circle cx="3" cy="3" r="1.2" fill="#0066CC" fillOpacity="0.14" />
          </pattern>
        </defs>
        <rect width="280" height="280" x="4%" y="4%" fill="url(#members-light-dotted)" opacity="0.8" />
        <rect width="240" height="300" x="82%" y="15%" fill="url(#members-light-dotted)" opacity="0.6" />
      </svg>
    </div>
  );
}

// Custom initials generator for student names
function getInitials(name) {
  if (!name) return 'ACM';
  const parts = name.trim().split(/\s+/).map(p => p.replace(/\./g, '')).filter(Boolean);
  if (parts.length === 1) return parts[0][0].toUpperCase();
  if (parts.length === 2) return (parts[0][0] + parts[1][0]).toUpperCase();
  return (parts[0][0] + parts[1][0] + parts[2][0]).toUpperCase();
}

export default function MembersPage() {
  const [studentMembers, setStudentMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedYear, setSelectedYear] = useState('All');

  useEffect(() => {
    async function loadMembers() {
      try {
        setLoading(true);
        // Clear old mock storage if present
        localStorage.removeItem('site_acm_members_db');
        const data = await membersService.getMembers();
        setStudentMembers(data || []);
      } catch (err) {
        console.error('Failed to load members:', err);
      } finally {
        setLoading(false);
      }
    }
    loadMembers();
  }, []);

  const yearOptions = ['All', '1st Year', '2nd Year', '3rd Year', '4th Year'];

  // Filter Logic for Section 2 (Student Members)
  const filteredStudents = studentMembers.filter((m) => {
    const memberYear = m.year_of_study || m.year;
    const memberRole = m.acm_role || m.role;

    if (selectedYear !== 'All' && memberYear !== selectedYear) {
      return false;
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      const matchName = (m.name || '').toLowerCase().includes(q);
      const matchRole = (memberRole || '').toLowerCase().includes(q);
      const matchDept = (m.department || '').toLowerCase().includes(q);
      return matchName || matchRole || matchDept;
    }

    return true;
  });

  return (
    <main className="relative min-h-screen bg-gradient-to-b from-[#F7FAFE] via-[#EDF4FC] to-[#F4F8FE] text-slate-900 font-sans overflow-hidden">
      
      <AnimatedBackground />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-20 space-y-16 relative z-10">
        
        {/* ==========================================
            1. PAGE TOP HEADER & STATISTICS BAR
           ========================================== */}
        <div className="text-center max-w-3xl mx-auto space-y-4 pt-4">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center space-x-2 bg-blue-50/90 border border-blue-200/80 px-3.5 py-1.5 rounded-full text-xs font-bold text-[#0066CC] uppercase tracking-widest backdrop-blur-md shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#0066CC]" />
            <span>MEMBERS DIRECTORY</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-5xl font-extrabold text-[#071A3D] tracking-tight leading-tight"
          >
            Chapter <span className="text-[#0066CC]">Members & Leadership</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="text-slate-600 text-sm sm:text-base leading-relaxed font-normal max-w-2xl mx-auto"
          >
            Meet the student leaders, faculty sponsor, and members who make the SITE ACM Student Chapter community active, collaborative, and growing.
          </motion.p>

          {/* Official Statistics Row */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 pt-2 text-xs font-bold"
          >
            <div className="flex items-center space-x-2 bg-white/90 border border-blue-200/90 px-4 py-2.5 rounded-2xl shadow-sm text-[#071A3D] backdrop-blur-md">
              <Users className="w-4 h-4 text-[#0066CC]" />
              <span>{CHAPTER_INFO.chapterMembersCount} Chapter Members</span>
            </div>

            <div className="flex items-center space-x-2 bg-white/90 border border-blue-200/90 px-4 py-2.5 rounded-2xl shadow-sm text-[#0066CC] backdrop-blur-md">
              <ShieldCheck className="w-4 h-4 text-[#0066CC]" />
              <span>{CHAPTER_INFO.acmMembersCount} ACM Members</span>
            </div>

            <div className="flex items-center space-x-2 bg-blue-50/90 border border-blue-200/90 px-4 py-2.5 rounded-2xl shadow-sm text-[#0066CC] backdrop-blur-md">
              <CheckCircle2 className="w-4 h-4 text-[#0066CC]" />
              <span>{studentMembers.length} Member Profiles Published</span>
            </div>
          </motion.div>
        </div>


        {/* ==========================================
            SECTION 1: OFFICIAL CHAPTER LEADERSHIP
           ========================================== */}
        <div className="space-y-8">
          
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-blue-200/60 pb-4">
            <div>
              <div className="inline-flex items-center space-x-2 bg-blue-50 text-[#0066CC] border border-blue-200 px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-widest mb-1">
                <ShieldCheck className="w-3 h-3 text-[#0066CC]" />
                <span>EXECUTIVE BOARD</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#071A3D] tracking-tight">
                Chapter Leadership
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 font-medium">
                Official SITE ACM Student Chapter leadership
              </p>
            </div>

            <div className="inline-flex items-center space-x-2 bg-white/80 border border-slate-200/80 px-3.5 py-1.5 rounded-xl text-xs font-semibold text-slate-600 shadow-sm backdrop-blur-sm">
              <Calendar className="w-3.5 h-3.5 text-[#0066CC]" />
              <span>Chartered: September 4, 2018</span>
            </div>
          </div>

          {/* 6 Leadership Officers Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {VERIFIED_TEAM.map((officer, idx) => (
              <motion.div
                key={officer.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="bg-white/85 backdrop-blur-xl border border-blue-200/80 hover:border-[#0066CC] rounded-[22px] p-6 shadow-md hover:shadow-xl hover:shadow-blue-600/10 transition-all duration-300 relative group overflow-hidden flex flex-col justify-between"
              >
                {/* Soft Radial Ambient Glow */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-400/0 group-hover:bg-blue-400/10 rounded-full blur-2xl transition-colors duration-500 pointer-events-none"></div>

                <div className="space-y-4 relative z-10">
                  
                  {/* Officer Initials Avatar & Category Badge */}
                  <div className="flex items-center justify-between">
                    <div className="w-14 h-14 rounded-2xl bg-blue-50/90 group-hover:bg-blue-100/90 border border-blue-200/80 group-hover:border-[#0066CC]/60 flex items-center justify-center text-base font-extrabold text-[#0066CC] shadow-inner group-hover:scale-105 transition-all duration-300">
                      {officer.initials}
                    </div>

                    <span className="text-[10px] font-extrabold text-[#0066CC] bg-blue-50 group-hover:bg-blue-100 px-2.5 py-1 rounded-full border border-blue-200/80 transition-colors uppercase tracking-wider">
                      {officer.category}
                    </span>
                  </div>

                  {/* Officer Name & Role */}
                  <div className="space-y-1">
                    <h3 className="text-lg font-extrabold text-[#071A3D] group-hover:text-[#0066CC] transition-colors leading-snug">
                      {officer.name}
                    </h3>

                    <div className="text-xs font-extrabold text-[#0066CC] uppercase tracking-wider">
                      {officer.role}
                    </div>

                    <div className="text-[11px] text-slate-500 font-medium pt-0.5">
                      {officer.department}
                    </div>
                  </div>

                </div>

                {/* Email Footer Strip */}
                {officer.email && (
                  <div className="pt-3 mt-4 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 relative z-10">
                    <span className="truncate">{officer.email}</span>
                    <Mail className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#0066CC] shrink-0 ml-2 transition-colors" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>

        </div>


        {/* Decorative Section Divider */}
        <div className="relative flex items-center justify-center">
          <div className="w-full border-t border-blue-200/80"></div>
          <span className="absolute bg-[#EDF4FC] px-4 text-xs font-extrabold text-[#0066CC] uppercase tracking-widest flex items-center space-x-1">
            <Users className="w-4 h-4 mr-1 text-[#0066CC]" />
            <span>MEMBER DIRECTORY</span>
          </span>
        </div>


        {/* ==========================================
            SECTION 2: CHAPTER MEMBERS (STUDENTS)
           ========================================== */}
        <div className="space-y-8">
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#071A3D] tracking-tight">
                Chapter Members
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 font-medium">
                Student members of the SITE ACM Student Chapter
              </p>
            </div>

            <div className="text-xs font-bold text-slate-500 bg-white/80 border border-slate-200/80 px-3.5 py-1.5 rounded-xl shadow-sm">
              Showing {filteredStudents.length} of {studentMembers.length} Published Profiles
            </div>
          </div>

          {/* Filter & Search Bar for Student Members */}
          <div className="bg-white/85 backdrop-blur-xl p-4 sm:p-5 rounded-3xl border border-white/90 shadow-lg shadow-blue-900/5 space-y-4">
            <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
              
              {/* Year Filter Pills */}
              <div className="flex flex-wrap items-center gap-2">
                <div className="flex items-center space-x-1.5 text-xs font-bold text-slate-500 mr-1">
                  <Filter className="w-4 h-4 text-[#0066CC]" />
                  <span className="hidden sm:inline font-bold">Year:</span>
                </div>

                {yearOptions.map((year) => (
                  <button
                    key={year}
                    onClick={() => setSelectedYear(year)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all duration-200 ${
                      selectedYear === year
                        ? 'bg-[#0066CC] text-white shadow-md shadow-blue-600/30 scale-105'
                        : 'bg-slate-100/80 hover:bg-blue-50 text-slate-600 hover:text-[#0066CC]'
                    }`}
                  >
                    {year}
                  </button>
                ))}
              </div>

              {/* Search Box */}
              <div className="relative w-full lg:w-80 shrink-0">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search member name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 text-xs font-medium rounded-2xl border border-slate-200/90 focus:outline-none focus:border-[#0066CC] focus:ring-2 focus:ring-blue-100 bg-white/90 shadow-inner text-slate-900"
                />
              </div>

            </div>
          </div>

          {/* 7 Verified Student Member Cards Grid */}
          {loading ? (
            <div className="py-20 text-center space-y-3">
              <div className="w-8 h-8 border-4 border-[#0066CC] border-t-transparent rounded-full animate-spin mx-auto"></div>
              <p className="text-xs font-semibold text-slate-500">Loading student member profiles...</p>
            </div>
          ) : filteredStudents.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredStudents.map((member, idx) => (
                <motion.div
                  key={member.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{ duration: 0.5, delay: idx * 0.05 }}
                  whileHover={{ y: -3, transition: { duration: 0.2 } }}
                  className="bg-white/80 backdrop-blur-xl border border-blue-100/90 hover:border-[#0066CC]/60 rounded-[22px] p-6 shadow-md hover:shadow-xl hover:shadow-blue-600/10 transition-all duration-300 relative group overflow-hidden flex flex-col justify-between"
                >
                  {/* Soft Hover Ambient Light */}
                  <div className="absolute top-0 right-0 w-28 h-28 bg-blue-400/0 group-hover:bg-blue-400/10 rounded-full blur-2xl transition-colors duration-500 pointer-events-none"></div>

                  <div className="space-y-4 relative z-10">
                    
                    {/* Initials Avatar & Role Tag */}
                    <div className="flex items-center justify-between">
                      {member.image_url || member.photo_url ? (
                        <img
                          src={member.image_url || member.photo_url}
                          alt={member.name}
                          className="w-14 h-14 rounded-2xl object-cover border border-blue-200/80 shadow-sm"
                        />
                      ) : (
                        <div className="w-14 h-14 rounded-2xl bg-blue-50/90 group-hover:bg-blue-100/90 border border-blue-200/80 group-hover:border-[#0066CC]/60 flex items-center justify-center text-sm font-extrabold text-[#0066CC] shadow-inner group-hover:scale-105 transition-all duration-300">
                          {getInitials(member.name)}
                        </div>
                      )}

                      <span className="text-[10px] font-extrabold text-[#0066CC] bg-blue-50 group-hover:bg-blue-100 px-2.5 py-1 rounded-full border border-blue-200/80 transition-colors uppercase tracking-wider">
                        {member.acm_role || member.role || 'CHAPTER MEMBER'}
                      </span>
                    </div>

                    {/* Member Name & Academic Year ONLY */}
                    <div className="space-y-1">
                      <h3 className="text-lg font-extrabold text-[#071A3D] group-hover:text-[#0066CC] transition-colors leading-snug">
                        {member.name}
                      </h3>

                      <div className="flex items-center space-x-1.5 text-xs text-slate-600 font-semibold pt-1">
                        <GraduationCap className="w-4 h-4 text-[#0066CC] shrink-0" />
                        <span>{member.year_of_study || member.year}</span>
                      </div>

                      {/* Department display ONLY if provided */}
                      {member.department && (
                        <div className="text-[11px] text-slate-500 font-medium pt-0.5">
                          {member.department}
                        </div>
                      )}
                    </div>

                  </div>

                </motion.div>
              ))}
            </div>
          ) : (
            /* Clean Empty State */
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-12 text-center border border-white/90 max-w-xl mx-auto space-y-4 shadow-lg shadow-blue-900/5">
              <div className="w-16 h-16 rounded-full bg-blue-50 text-[#0066CC] flex items-center justify-center mx-auto">
                <Users className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-extrabold text-[#071A3D]">No Published Member Profiles Found</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-md mx-auto font-normal">
                {searchQuery || selectedYear !== 'All'
                  ? `No published profiles matched your search or selected filter (${selectedYear}).`
                  : 'No member profiles have been published yet.'}
              </p>
              {(searchQuery || selectedYear !== 'All') && (
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedYear('All');
                  }}
                  className="inline-flex items-center px-4 py-2 text-xs font-bold text-[#0066CC] bg-blue-50 hover:bg-blue-100 rounded-full border border-blue-200 transition-colors"
                >
                  Reset Filter & Search
                </button>
              )}
            </div>
          )}

        </div>

      </div>
    </main>
  );
}
