import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, ExternalLink } from 'lucide-react';
import { CHAPTER_INFO } from '../data/mockData';

export default function Footer() {
  return (
    <footer className="bg-[#0F172A] text-slate-400 text-xs py-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-8 border-b border-slate-800/80">
          
          {/* Column 1: Brand Info */}
          <div className="md:col-span-5 space-y-3">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-xs">
                acm
              </div>
              <span className="text-white font-extrabold text-base tracking-tight">SITE ACM Student Chapter</span>
            </div>
            <p className="text-slate-400 leading-relaxed text-xs max-w-md">
              Sasi Institute of Technology & Engineering, Tadepalligudem, AP, India. Empowering students through technology, innovation, collaboration, and continuous learning.
            </p>
            <div className="pt-2 flex items-center space-x-4 text-slate-300 font-semibold text-xs">
              <span>Chartered: <strong className="text-white">{CHAPTER_INFO.charteredDate}</strong></span>
              <span>•</span>
              <span>Members: <strong className="text-white">{CHAPTER_INFO.chapterMembersCount}</strong></span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="md:col-span-3 space-y-2">
            <h4 className="text-white font-bold text-sm tracking-wide uppercase">Quick Navigation</h4>
            <ul className="space-y-1.5 text-xs">
              <li><Link to="/about" className="hover:text-white transition-colors">About Chapter</Link></li>
              <li><Link to="/events" className="hover:text-white transition-colors">Events & Workshops</Link></li>
              <li><Link to="/workshops" className="hover:text-white transition-colors">Technical Workshops</Link></li>
              <li><Link to="/team" className="hover:text-white transition-colors">Leadership & Officers</Link></li>
              <li><Link to="/members" className="hover:text-white transition-colors">Members Directory</Link></li>
              <li><Link to="/achievements" className="hover:text-white transition-colors">Chapter Achievements</Link></li>
            </ul>
          </div>

          {/* Column 3: Contact & Official */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-white font-bold text-sm tracking-wide uppercase">Contact Information</h4>
            <ul className="space-y-2 text-xs">
              <li className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <span>{CHAPTER_INFO.location}</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-blue-400 shrink-0" />
                <a href={`mailto:${CHAPTER_INFO.email}`} className="hover:text-white transition-colors">{CHAPTER_INFO.email}</a>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-blue-400 shrink-0" />
                <span>{CHAPTER_INFO.phone}</span>
              </li>
            </ul>

            <div className="pt-2">
              <a
                href={CHAPTER_INFO.officialAcmUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-full shadow-sm transition-all"
              >
                <span>Official ACM Portal</span>
                <ExternalLink className="w-3.5 h-3.5 ml-1.5" />
              </a>
            </div>
          </div>

        </div>

        {/* Copyright Strip */}
        <div className="flex flex-col sm:flex-row items-center justify-between space-y-2 sm:space-y-0 text-slate-500 text-[11px]">
          <div>
            © {new Date().getFullYear()} SITE ACM Student Chapter. All Rights Reserved.
          </div>
          <div className="flex space-x-4">
            <Link to="/contact" className="hover:text-slate-300">Contact Us</Link>
            <Link to="/membership" className="hover:text-slate-300">Membership</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
