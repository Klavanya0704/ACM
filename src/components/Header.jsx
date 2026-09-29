import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Menu, X, ArrowRight } from 'lucide-react';
import { CHAPTER_INFO } from '../data/mockData';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Events', path: '/events' },
    { name: 'Workshops', path: '/workshops' },
    { name: 'Team', path: '/team' },
    { name: 'Members', path: '/members' },
    { name: 'Achievements', path: '/achievements' },
    { name: 'Membership', path: '/membership' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <header className="sticky top-0 lg:top-4 z-50 w-full max-w-7xl mx-auto px-3 sm:px-6 transition-all duration-300">
      <div className="bg-[#051630]/90 backdrop-blur-xl border border-white/20 rounded-2xl lg:rounded-[28px] px-4 lg:px-6 py-2.5 shadow-2xl flex items-center justify-between">
        
        {/* Left Branding with Official ACM Logo Asset */}
        <Link to="/" className="flex items-center space-x-3 cursor-pointer group shrink-0">
          <img
            src="/acm_logo.svg"
            alt="ACM Official Logo"
            className="h-10 sm:h-11 w-auto object-contain drop-shadow-[0_0_10px_rgba(0,163,255,0.4)] group-hover:scale-105 transition-transform shrink-0"
          />
          <div className="flex flex-col justify-center">
            <div className="flex items-center space-x-1.5">
              <span className="text-white font-extrabold text-base tracking-tight leading-none">SITE ACM</span>
              <span className="bg-[#0066CC] text-white text-[9px] font-bold px-1.5 py-0.5 rounded tracking-wider uppercase">Chapter</span>
            </div>
            <span className="text-[8px] sm:text-[9px] text-slate-300 font-semibold tracking-wider uppercase pt-0.5 leading-none">SASI INSTITUTE OF TECH & ENGG</span>
          </div>
        </Link>

        {/* Center Nav Links */}
        <nav className="hidden xl:flex items-center space-x-1 text-xs font-semibold text-slate-200">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `px-3 py-1.5 rounded-full transition-all duration-200 ${
                  isActive
                    ? 'text-white font-bold bg-[#0066CC] shadow-md shadow-blue-600/40'
                    : 'hover:text-white hover:bg-white/10 text-slate-200'
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}
        </nav>

        {/* Right CTA */}
        <div className="hidden sm:flex items-center space-x-3 shrink-0">
          <a
            href={CHAPTER_INFO.officialAcmUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-2 text-xs font-bold text-white bg-[#0066CC] hover:bg-blue-600 rounded-full shadow-lg shadow-blue-600/40 transition-all duration-200 hover:scale-105 active:scale-95"
          >
            <span>Join ACM</span>
            <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="xl:hidden p-2 text-slate-300 hover:text-white focus:outline-none"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden mt-2 bg-[#051630]/95 backdrop-blur-2xl border border-white/20 rounded-2xl p-4 space-y-2 text-sm font-medium text-slate-200 shadow-2xl">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) =>
                `block py-2 px-3 rounded-xl ${isActive ? 'text-white bg-[#0066CC] font-bold' : 'hover:bg-white/10 hover:text-white'}`
              }
            >
              {item.name}
            </NavLink>
          ))}
          <div className="pt-2 border-t border-white/10">
            <a
              href={CHAPTER_INFO.officialAcmUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center w-full px-4 py-2 text-xs font-bold text-white bg-[#0066CC] rounded-full shadow-md"
            >
              <span>Join ACM</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
