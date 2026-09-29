import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  BookOpen,
  Users,
  Award,
  ShieldCheck,
  Zap,
  Globe,
  ExternalLink,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Send,
  AlertCircle
} from 'lucide-react';
import { CHAPTER_INFO } from '../data/mockData';
import { membershipRequestsService } from '../services/membershipRequestsService';

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
          <pattern id="membership-light-dotted" width="28" height="28" patternUnits="userSpaceOnUse">
            <circle cx="3" cy="3" r="1.2" fill="#0066CC" fillOpacity="0.14" />
          </pattern>
        </defs>
        <rect width="280" height="280" x="4%" y="4%" fill="url(#membership-light-dotted)" opacity="0.8" />
        <rect width="240" height="300" x="82%" y="15%" fill="url(#membership-light-dotted)" opacity="0.6" />
      </svg>
    </div>
  );
}

export default function MembershipPage() {
  const benefits = [
    {
      title: "Technical Learning & Publications",
      desc: "Access the world's premier digital library, technical journals, ACM TechTalks, and self-paced learning courses.",
      icon: BookOpen
    },
    {
      title: "Global Professional Networking",
      desc: "Connect with over 100,000+ educators, researchers, computer scientists, and software engineering professionals worldwide.",
      icon: Users
    },
    {
      title: "Hands-on Workshops & Hackathons",
      desc: "Receive priority registration for chapter hackathons like PRAYATNA 2.0, hands-on coding labs, and technical seminars.",
      icon: Zap
    },
    {
      title: "Leadership & Community Growth",
      desc: "Organize campus events, lead sub-committees, lead community outreach initiatives, and build your executive portfolio.",
      icon: Award
    },
    {
      title: "Career & Internship Opportunities",
      desc: "Gain visibility through ACM student career fairs, tech mentorship, resume building, and international chapter awards.",
      icon: ShieldCheck
    },
    {
      title: "Discounted International ACM Membership",
      desc: "Enjoy discounted student membership rates with full access to ACM's suite of digital resources and software tools.",
      icon: Globe
    }
  ];

  const departmentOptions = [
    'Computer Science & Engineering',
    'Artificial Intelligence & Data Science',
    'Information Technology',
    'Electronics & Communication Engineering',
    'Electrical & Electronics Engineering',
    'Mechanical Engineering',
    'Civil Engineering',
    'Other'
  ];

  const yearOptions = ['1st Year', '2nd Year', '3rd Year', '4th Year'];

  const areaOptions = [
    'Web Development',
    'Artificial Intelligence / Machine Learning',
    'Cybersecurity',
    'Cloud Computing',
    'Data Science',
    'Competitive Programming',
    'Research',
    'Open Source',
    'Workshops & Events',
    'Hackathons'
  ];

  // Form State
  const [formData, setFormData] = useState({
    full_name: '',
    institution: 'Sasi Institute of Technology & Engineering',
    roll_number: '',
    email: '',
    phone: '',
    department: 'Computer Science & Engineering',
    year_of_study: '1st Year',
    acm_membership_status: 'Not an ACM Member',
    interest_reason: '',
    areas_of_interest: [],
    consent: false,
  });

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleAreaToggle = (area) => {
    setFormData((prev) => {
      const exists = prev.areas_of_interest.includes(area);
      const updated = exists
        ? prev.areas_of_interest.filter((a) => a !== area)
        : [...prev.areas_of_interest, area];
      return { ...prev, areas_of_interest: updated };
    });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.full_name.trim()) {
      newErrors.full_name = 'Please enter your full name.';
    }

    if (!formData.roll_number.trim()) {
      newErrors.roll_number = 'Please enter your roll number or student ID.';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Please enter your email address.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address.';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Please enter your phone number.';
    }

    if (!formData.consent) {
      newErrors.consent = 'Please accept the confirmation checkbox.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setSubmitting(true);
    try {
      await membershipRequestsService.submitRequest(formData);
      setSubmitted(true);
      setFormData({
        full_name: '',
        institution: 'Sasi Institute of Technology & Engineering',
        roll_number: '',
        email: '',
        phone: '',
        department: 'Computer Science & Engineering',
        year_of_study: '1st Year',
        acm_membership_status: 'Not an ACM Member',
        interest_reason: '',
        areas_of_interest: [],
        consent: false,
      });
      setErrors({});
    } catch (err) {
      console.error('Submission error:', err);
      setErrors({ form: 'Failed to submit membership request: ' + err.message });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="relative min-h-screen bg-gradient-to-b from-[#F7FAFE] via-[#EDF4FC] to-[#F4F8FE] text-slate-900 font-sans overflow-hidden">
      
      <AnimatedBackground />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-20 space-y-16 relative z-10">
        
        {/* ==========================================
            1. PAGE HEADER & WHY JOIN SECTION
           ========================================== */}
        <div className="text-center max-w-3xl mx-auto space-y-4 pt-4">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center space-x-2 bg-blue-50/90 border border-blue-200/80 px-3.5 py-1.5 rounded-full text-xs font-bold text-[#0066CC] uppercase tracking-widest backdrop-blur-md shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#0066CC]" />
            <span>BECOME A MEMBER</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-5xl font-extrabold text-[#071A3D] tracking-tight leading-tight"
          >
            Why Join <span className="text-[#0066CC]">SITE ACM?</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="text-slate-600 text-sm sm:text-base leading-relaxed font-normal max-w-2xl mx-auto"
          >
            Unlock global academic resources, technical mentorship, collaborative hackathons, and lifelong networking by joining the official SITE ACM Student Chapter.
          </motion.p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((b, idx) => {
            const Icon = b.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="bg-white/85 backdrop-blur-xl rounded-3xl p-6 border border-white/90 shadow-lg shadow-blue-900/5 hover:border-blue-300/60 transition-all space-y-4 group"
              >
                <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 text-[#0066CC] flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-[#071A3D] group-hover:text-[#0066CC] transition-colors">
                  {b.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                  {b.desc}
                </p>
              </motion.div>
            );
          })}
        </div>


        {/* ==========================================
            2. MEMBERSHIP INTEREST FORM SECTION
           ========================================== */}
        <div id="join-form" className="pt-8 space-y-8">
          
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <span className="text-[10px] font-bold text-[#0066CC] uppercase tracking-widest">
              MEMBERSHIP REGISTRATION
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#071A3D] tracking-tight">
              Interested in Joining SITE ACM?
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 font-medium leading-relaxed">
              Fill out the form below to express your interest in becoming a member of the SITE ACM Student Chapter.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            {submitted ? (
              /* Success State */
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="bg-white/90 backdrop-blur-2xl rounded-3xl p-8 sm:p-12 border border-white/90 shadow-xl shadow-blue-900/10 text-center space-y-6 max-w-2xl mx-auto"
              >
                <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center mx-auto shadow-sm">
                  <CheckCircle2 className="w-8 h-8" />
                </div>

                <div className="space-y-2">
                  <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest">SUBMISSION SUCCESSFUL</span>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-[#071A3D]">
                    Membership Request Submitted
                  </h3>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed max-w-md mx-auto pt-2">
                    Thank you for your interest in SITE ACM Student Chapter. Your membership request has been successfully submitted to the chapter administration. The chapter team will review your request and contact you using the details provided.
                  </p>
                </div>

                <div className="pt-4">
                  <button
                    onClick={() => setSubmitted(false)}
                    className="inline-flex items-center px-6 py-3 text-xs font-bold text-[#0066CC] bg-blue-50 hover:bg-blue-100 rounded-full border border-blue-200 transition-colors shadow-sm"
                  >
                    <span>Submit Another Request</span>
                  </button>
                </div>
              </motion.div>
            ) : (
              /* Membership Form */
              <form
                onSubmit={handleSubmit}
                className="bg-white/85 backdrop-blur-2xl rounded-3xl p-6 sm:p-10 border border-white/90 shadow-xl shadow-blue-900/5 space-y-8 relative overflow-hidden"
              >
                {/* Corner Glow Accent */}
                <div className="absolute top-0 right-0 w-40 h-40 bg-blue-400/10 rounded-full blur-3xl pointer-events-none"></div>

                {errors.form && (
                  <div className="bg-rose-50 border border-rose-200 text-rose-700 px-4 py-3 rounded-2xl text-xs font-bold flex items-center space-x-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{errors.form}</span>
                  </div>
                )}

                {/* 1. PERSONAL INFORMATION */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-2 border-b border-slate-100 pb-2">
                    <Users className="w-4 h-4 text-[#0066CC]" />
                    <h3 className="text-xs font-extrabold text-[#071A3D] uppercase tracking-wider">
                      Personal Information
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    {/* Full Name */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700">Full Name *</label>
                      <input
                        type="text"
                        name="full_name"
                        value={formData.full_name}
                        onChange={handleInputChange}
                        placeholder="e.g. K. Sruthi"
                        className={`w-full px-4 py-2.5 text-xs rounded-2xl border ${
                          errors.full_name ? 'border-rose-400 bg-rose-50/50' : 'border-slate-200/90 bg-white/90'
                        } focus:outline-none focus:border-[#0066CC] focus:ring-2 focus:ring-blue-100 text-slate-900 transition-all`}
                      />
                      {errors.full_name && <p className="text-[11px] font-bold text-rose-500">{errors.full_name}</p>}
                    </div>

                    {/* College / Institution */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700">College / Institution</label>
                      <input
                        type="text"
                        name="institution"
                        value={formData.institution}
                        readOnly
                        className="w-full px-4 py-2.5 text-xs rounded-2xl border border-slate-200/90 bg-slate-100/70 text-slate-700 font-medium cursor-not-allowed"
                      />
                    </div>

                    {/* Roll Number */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700">Roll Number / Student ID *</label>
                      <input
                        type="text"
                        name="roll_number"
                        value={formData.roll_number}
                        onChange={handleInputChange}
                        placeholder="e.g. 22A81A0501"
                        className={`w-full px-4 py-2.5 text-xs rounded-2xl border ${
                          errors.roll_number ? 'border-rose-400 bg-rose-50/50' : 'border-slate-200/90 bg-white/90'
                        } focus:outline-none focus:border-[#0066CC] focus:ring-2 focus:ring-blue-100 text-slate-900 transition-all`}
                      />
                      {errors.roll_number && <p className="text-[11px] font-bold text-rose-500">{errors.roll_number}</p>}
                    </div>

                    {/* Email */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700">Email Address *</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="e.g. sruthi.k@sasi.ac.in"
                        className={`w-full px-4 py-2.5 text-xs rounded-2xl border ${
                          errors.email ? 'border-rose-400 bg-rose-50/50' : 'border-slate-200/90 bg-white/90'
                        } focus:outline-none focus:border-[#0066CC] focus:ring-2 focus:ring-blue-100 text-slate-900 transition-all`}
                      />
                      {errors.email && <p className="text-[11px] font-bold text-rose-500">{errors.email}</p>}
                    </div>

                    {/* Phone */}
                    <div className="space-y-1.5 sm:col-span-2">
                      <label className="text-xs font-bold text-slate-700">Phone Number *</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="e.g. 9876543210"
                        className={`w-full px-4 py-2.5 text-xs rounded-2xl border ${
                          errors.phone ? 'border-rose-400 bg-rose-50/50' : 'border-slate-200/90 bg-white/90'
                        } focus:outline-none focus:border-[#0066CC] focus:ring-2 focus:ring-blue-100 text-slate-900 transition-all`}
                      />
                      {errors.phone && <p className="text-[11px] font-bold text-rose-500">{errors.phone}</p>}
                    </div>
                  </div>
                </div>

                {/* 2. ACADEMIC INFORMATION */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-2 border-b border-slate-100 pb-2">
                    <BookOpen className="w-4 h-4 text-[#0066CC]" />
                    <h3 className="text-xs font-extrabold text-[#071A3D] uppercase tracking-wider">
                      Academic Information
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    {/* Department */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700">Department *</label>
                      <select
                        name="department"
                        value={formData.department}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2.5 text-xs rounded-2xl border border-slate-200/90 focus:outline-none focus:border-[#0066CC] focus:ring-2 focus:ring-blue-100 bg-white/90 text-slate-900 transition-all"
                      >
                        {departmentOptions.map((dept) => (
                          <option key={dept} value={dept}>{dept}</option>
                        ))}
                      </select>
                    </div>

                    {/* Year of Study */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700">Year of Study *</label>
                      <select
                        name="year_of_study"
                        value={formData.year_of_study}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2.5 text-xs rounded-2xl border border-slate-200/90 focus:outline-none focus:border-[#0066CC] focus:ring-2 focus:ring-blue-100 bg-white/90 text-slate-900 transition-all"
                      >
                        {yearOptions.map((year) => (
                          <option key={year} value={year}>{year}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* 3. ACM MEMBERSHIP STATUS */}
                <div className="space-y-3">
                  <div className="flex items-center space-x-2 border-b border-slate-100 pb-2">
                    <ShieldCheck className="w-4 h-4 text-[#0066CC]" />
                    <h3 className="text-xs font-extrabold text-[#071A3D] uppercase tracking-wider">
                      ACM Membership Status
                    </h3>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 pt-1">
                    {['Already an ACM Member', 'Not an ACM Member', 'Not Sure'].map((statusOption) => (
                      <label
                        key={statusOption}
                        className={`inline-flex items-center space-x-2 px-4 py-2.5 rounded-2xl border cursor-pointer text-xs font-bold transition-all ${
                          formData.acm_membership_status === statusOption
                            ? 'bg-blue-50/90 border-[#0066CC] text-[#0066CC] shadow-sm'
                            : 'bg-white/80 border-slate-200 text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        <input
                          type="radio"
                          name="acm_membership_status"
                          value={statusOption}
                          checked={formData.acm_membership_status === statusOption}
                          onChange={handleInputChange}
                          className="text-[#0066CC] focus:ring-blue-500 cursor-pointer"
                        />
                        <span>{statusOption}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* 4. AREAS OF INTEREST */}
                <div className="space-y-3">
                  <label className="text-xs font-bold text-slate-700 block">Areas of Interest (Select all that apply)</label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
                    {areaOptions.map((area) => {
                      const selected = formData.areas_of_interest.includes(area);
                      return (
                        <button
                          type="button"
                          key={area}
                          onClick={() => handleAreaToggle(area)}
                          className={`px-3 py-2 rounded-xl text-[11px] font-bold text-left transition-all border ${
                            selected
                              ? 'bg-[#0066CC] text-white border-[#0066CC] shadow-sm'
                              : 'bg-slate-50 hover:bg-blue-50 text-slate-700 border-slate-200/80 hover:border-blue-200'
                          }`}
                        >
                          {selected ? '✓ ' : '+ '}{area}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 5. WHY INTERESTED IN JOINING */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Why are you interested in joining SITE ACM?</label>
                  <textarea
                    name="interest_reason"
                    rows={3}
                    value={formData.interest_reason}
                    onChange={handleInputChange}
                    placeholder="Tell us briefly why you would like to join SITE ACM..."
                    className="w-full px-4 py-2.5 text-xs rounded-2xl border border-slate-200/90 focus:outline-none focus:border-[#0066CC] focus:ring-2 focus:ring-blue-100 bg-white/90 text-slate-900 transition-all"
                  ></textarea>
                </div>

                {/* 6. CONSENT & SUBMIT BUTTON */}
                <div className="space-y-4 pt-2 border-t border-slate-100">
                  <label className="flex items-start space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      name="consent"
                      checked={formData.consent}
                      onChange={handleInputChange}
                      className="mt-0.5 w-4 h-4 text-[#0066CC] rounded focus:ring-blue-500 cursor-pointer"
                    />
                    <span className="text-xs text-slate-600 font-medium leading-relaxed">
                      I confirm that the information provided above is correct and I am interested in joining the SITE ACM Student Chapter.
                    </span>
                  </label>
                  {errors.consent && <p className="text-[11px] font-bold text-rose-500">{errors.consent}</p>}

                  <div className="pt-2 text-center sm:text-left">
                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 text-xs sm:text-sm font-bold text-white bg-[#0066CC] hover:bg-blue-600 rounded-full shadow-lg shadow-blue-600/30 transition-all hover:scale-105 active:scale-95 disabled:opacity-50 group"
                    >
                      <span>{submitting ? 'Submitting Request...' : 'Submit Membership Request'}</span>
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>

              </form>
            )}
          </div>

        </div>

        {/* Big Official Portal Card */}
        <div className="bg-gradient-to-r from-[#071A3D] via-[#004499] to-[#071A3D] border border-white/20 rounded-3xl p-8 sm:p-12 text-white text-center max-w-4xl mx-auto space-y-6 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl pointer-events-none"></div>

          <div className="space-y-3 relative z-10">
            <span className="text-xs font-bold text-blue-300 uppercase tracking-widest">OFFICIAL ACM PORTAL</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">Become an International ACM Student Member</h2>
            <p className="text-slate-200 text-sm max-w-2xl mx-auto leading-relaxed font-normal">
              Registration for official ACM international membership cardholders is processed through the official ACM portal.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2 relative z-10">
            <a
              href={CHAPTER_INFO.officialAcmUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-8 py-4 text-xs font-bold text-white bg-[#0066CC] hover:bg-blue-500 rounded-full shadow-xl shadow-blue-600/40 transition-all hover:scale-105"
            >
              <span>Join ACM Global Portal</span>
              <ExternalLink className="w-4 h-4 ml-2" />
            </a>
          </div>
        </div>

      </div>
    </main>
  );
}
