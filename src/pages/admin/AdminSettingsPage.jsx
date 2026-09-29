import React from 'react';
import { Settings, ShieldCheck, Database, Server, Key, CheckCircle, Info } from 'lucide-react';
import { isSupabaseConfigured } from '../../lib/supabase';

export default function AdminSettingsPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      
      {/* Header */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-sm">
        <div className="inline-flex items-center space-x-2 bg-slate-100 border border-slate-200 px-3 py-1 rounded-full text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
          <Settings className="w-3.5 h-3.5" />
          <span>System Settings</span>
        </div>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
          Admin Settings & System Health
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Manage system configuration, Supabase integration, and environment status.
        </p>
      </div>

      {/* Database Connection Status Card */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-sm space-y-6">
        <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center space-x-2">
          <Database className="w-4 h-4 text-blue-600" />
          <span>SUPABASE DATABASE & STORAGE CONFIGURATION</span>
        </h2>

        <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-200">
          <div className="flex items-center space-x-3">
            <div
              className={`w-3 h-3 rounded-full ${
                isSupabaseConfigured ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'
              }`}
            ></div>
            <div>
              <div className="font-bold text-xs text-slate-900">
                {isSupabaseConfigured ? 'Supabase Connected & Active' : 'Demo Mode Active (Local Storage Fallback)'}
              </div>
              <div className="text-[10px] text-slate-500">
                {isSupabaseConfigured
                  ? 'Real-time PostgreSQL and Storage buckets connected via VITE_SUPABASE_URL.'
                  : 'VITE_SUPABASE_URL environment variables not set. Using local offline storage fallback for seamless testing.'}
              </div>
            </div>
          </div>

          <span
            className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
              isSupabaseConfigured
                ? 'bg-emerald-100 text-emerald-800'
                : 'bg-amber-100 text-amber-800'
            }`}
          >
            {isSupabaseConfigured ? 'Online' : 'Demo Fallback'}
          </span>
        </div>

        <div className="space-y-3 pt-2">
          <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
            Database Setup Script (SQL)
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            The database migration script `supabase_setup.sql` is ready in the root directory. Execute it in your Supabase SQL Editor to create tables (`events`, `event_registrations`, `admin_profiles`), RLS security policies, and storage buckets.
          </p>
        </div>
      </div>

      {/* Security & Access Info Card */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-sm space-y-6">
        <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center space-x-2">
          <ShieldCheck className="w-4 h-4 text-blue-600" />
          <span>SECURITY & ACCESS CONTROL</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
            <span className="font-bold text-slate-900 block">Row-Level Security (RLS)</span>
            <span className="text-slate-500 text-[11px] block">
              Public access is strictly restricted to reading published events and submitting student registrations.
            </span>
          </div>

          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
            <span className="font-bold text-slate-900 block">Admin Role Authorization</span>
            <span className="text-slate-500 text-[11px] block">
              All admin operations check authentication tokens and cross-reference the `admin_profiles` table.
            </span>
          </div>
        </div>
      </div>

    </div>
  );
}
