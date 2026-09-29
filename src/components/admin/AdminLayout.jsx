import React, { useState } from 'react';
import { NavLink, Link, useNavigate, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Calendar,
  Users,
  PlusCircle,
  Settings,
  LogOut,
  Menu,
  X,
  ChevronRight,
  ExternalLink,
  ShieldCheck,
  UserCheck
} from 'lucide-react';
import { authService } from '../../services/authService';

export default function AdminLayout({ children, session }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    await authService.logout();
    navigate('/admin/login');
  };

  const navItems = [
    { name: 'Dashboard', path: '/admin', exact: true, icon: LayoutDashboard },
    { name: 'Events', path: '/admin/events', icon: Calendar },
    { name: 'Members', path: '/admin/members', icon: Users },
    { name: 'Requests', path: '/admin/membership-requests', icon: UserCheck },
    { name: 'Registrations', path: '/admin/registrations', icon: Users },
    { name: 'Add Event', path: '/admin/events/new', icon: PlusCircle },
    { name: 'Settings', path: '/admin/settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col lg:flex-row text-slate-900 font-sans">
      
      {/* Mobile Top Bar */}
      <div className="lg:hidden bg-[#051630] text-white px-4 py-3 border-b border-slate-800 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center space-x-3">
          <img src="/acm_logo.svg" alt="ACM Logo" className="h-8 w-auto bg-white p-1 rounded-lg" />
          <div>
            <div className="font-extrabold text-sm tracking-wide text-white">SITE ACM</div>
            <div className="text-[10px] text-blue-400 font-semibold uppercase tracking-wider">Admin Panel</div>
          </div>
        </div>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-2 text-slate-300 hover:text-white focus:outline-none"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Desktop Sidebar & Mobile Drawer */}
      <aside
        className={`fixed lg:sticky top-0 left-0 z-50 h-screen w-72 bg-[#051630] text-white flex flex-col justify-between border-r border-slate-800 transition-transform duration-300 shadow-2xl shrink-0 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="p-6 space-y-8 flex-1 overflow-y-auto">
          
          {/* Logo Branding */}
          <div className="flex items-center space-x-3 pb-6 border-b border-slate-800">
            <img
              src="/acm_logo.svg"
              alt="Official ACM Logo"
              className="h-10 w-auto bg-white p-1.5 rounded-xl shadow-md"
            />
            <div>
              <div className="font-extrabold text-base tracking-tight text-white flex items-center">
                SITE ACM
                <ShieldCheck className="w-4 h-4 ml-1.5 text-blue-400" />
              </div>
              <div className="text-xs font-semibold text-blue-400 uppercase tracking-widest">
                Admin Control
              </div>
            </div>
          </div>

          {/* Navigation Items */}
          <nav className="space-y-1.5">
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-3 mb-2">
              Main Menu
            </div>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = item.exact
                ? location.pathname === item.path
                : location.pathname.startsWith(item.path);

              return (
                <NavLink
                  key={item.name}
                  to={item.path}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center justify-between px-4 py-3 rounded-2xl text-xs font-bold transition-all ${
                    isActive
                      ? 'bg-[#0066CC] text-white shadow-lg shadow-blue-600/30'
                      : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                    <span>{item.name}</span>
                  </div>
                  {isActive && <ChevronRight className="w-3.5 h-3.5 opacity-80" />}
                </NavLink>
              );
            })}
          </nav>

          {/* Quick Link to Public Site */}
          <div className="pt-4 border-t border-slate-800/80">
            <Link
              to="/"
              target="_blank"
              className="flex items-center justify-between px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-white hover:bg-slate-800/50 transition-colors group"
            >
              <span className="flex items-center space-x-2">
                <span>View Public Site</span>
              </span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-blue-400" />
            </Link>
          </div>

        </div>

        {/* Footer Admin User Profile & Logout */}
        <div className="p-4 border-t border-slate-800 bg-[#030e20]">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 truncate">
              <div className="w-9 h-9 rounded-xl bg-blue-600/30 border border-blue-400/40 text-blue-300 flex items-center justify-center font-bold text-xs shrink-0">
                {session?.profile?.name ? session.profile.name.charAt(0) : 'A'}
              </div>
              <div className="truncate">
                <div className="text-xs font-bold text-white truncate">
                  {session?.profile?.name || 'Administrator'}
                </div>
                <div className="text-[10px] text-slate-400 truncate">
                  {session?.profile?.email || 'admin@siteacm.org'}
                </div>
              </div>
            </div>
            
            <button
              onClick={handleLogout}
              title="Logout"
              className="p-2 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-xl transition-all"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>

      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen">
        <main className="p-4 sm:p-6 lg:p-8 flex-1 w-full max-w-none min-w-0 box-border">
          {children}
        </main>
      </div>

    </div>
  );
}
