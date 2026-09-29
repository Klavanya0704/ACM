import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { CHAPTER_INFO } from '../data/mockData';
import { submitContactMessage } from '../lib/supabase';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState({ loading: false, success: false, error: null });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      setStatus({ loading: false, success: false, error: 'Please fill in all required fields.' });
      return;
    }

    setStatus({ loading: true, success: false, error: null });
    try {
      await submitContactMessage(formData);
      setStatus({ loading: false, success: true, error: null });
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      console.error(err);
      setStatus({ loading: false, success: false, error: 'Failed to send message. Please try again.' });
    }
  };

  return (
    <main className="py-12 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 pt-4">
          <div className="inline-flex items-center space-x-2 bg-blue-50 border border-blue-200 px-3 py-1 rounded-full text-xs font-bold text-blue-700 uppercase tracking-widest">
            <span>GET IN TOUCH</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            Contact <span className="text-[#0066CC]">SITE ACM</span>
          </h1>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Have questions about student membership, event collaborations, guest lectures, or chapter activities? Reach out to our executive team.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Contact Info Cards */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-6">
              <h3 className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-4">
                Official Address & Information
              </h3>

              <ul className="space-y-5 text-xs sm:text-sm">
                <li className="flex items-start space-x-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0066CC] flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block font-bold text-slate-900 text-base">SITE ACM Student Chapter</span>
                    <span className="text-slate-600 leading-relaxed block mt-0.5">
                      Sasi Institute of Technology & Engineering<br />
                      Tadepalligudem, West Godavari District<br />
                      Andhra Pradesh, India – 534101
                    </span>
                  </div>
                </li>

                <li className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0066CC] flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block font-bold text-slate-900">Faculty Sponsor Email</span>
                    <a href={`mailto:${CHAPTER_INFO.email}`} className="text-[#0066CC] hover:underline font-semibold">
                      {CHAPTER_INFO.email}
                    </a>
                  </div>
                </li>

                <li className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0066CC] flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block font-bold text-slate-900">Contact Number</span>
                    <span className="text-slate-700 font-semibold">{CHAPTER_INFO.phone}</span>
                  </div>
                </li>
              </ul>

              <div className="pt-4 border-t border-slate-100">
                <span className="text-xs font-semibold text-slate-400 block mb-2">Chartered Status</span>
                <span className="inline-flex items-center text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                  <CheckCircle2 className="w-4 h-4 mr-1.5" />
                  Active Chapter (Chartered Sept 4, 2018)
                </span>
              </div>
            </div>

          </div>

          {/* Contact Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-sm space-y-6">
            <h3 className="text-2xl font-bold text-slate-900">Send Us a Message</h3>

            {status.success && (
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 text-emerald-800 text-xs font-semibold flex items-center space-x-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>Thank you! Your message has been sent successfully. We will get back to you shortly.</span>
              </div>
            )}

            {status.error && (
              <div className="bg-rose-50 border border-rose-200 rounded-2xl p-4 text-rose-800 text-xs font-semibold flex items-center space-x-2">
                <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
                <span>{status.error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5 text-xs sm:text-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="block font-bold text-slate-700">Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500 bg-slate-50"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block font-bold text-slate-700">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email address"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500 bg-slate-50"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block font-bold text-slate-700">Subject *</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Subject of your message"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500 bg-slate-50"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block font-bold text-slate-700">Message *</label>
                <textarea
                  name="message"
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Type your message details here..."
                  required
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500 bg-slate-50"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={status.loading}
                className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 text-xs font-bold text-white bg-[#0066CC] hover:bg-blue-700 rounded-full shadow-lg shadow-blue-600/30 transition-all disabled:opacity-50"
              >
                {status.loading ? (
                  <span>Sending Message...</span>
                ) : (
                  <>
                    <span>Send Message</span>
                    <Send className="w-4 h-4 ml-2" />
                  </>
                )}
              </button>
            </form>
          </div>

        </div>

      </div>
    </main>
  );
}
