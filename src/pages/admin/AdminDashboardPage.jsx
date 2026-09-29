import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Calendar,
  Users,
  GraduationCap,
  Sparkles,
  ArrowUpRight,
  PlusCircle,
  Clock,
  Eye,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { eventsService } from '../../services/eventsService';
import { registrationsService } from '../../services/registrationsService';
import { membershipRequestsService } from '../../services/membershipRequestsService';

export default function AdminDashboardPage() {
  const [events, setEvents] = useState([]);
  const [registrations, setRegistrations] = useState([]);
  const [membershipRequests, setMembershipRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDashboardData() {
      try {
        const [fetchedEvents, fetchedRegs, fetchedReqs] = await Promise.all([
          eventsService.getEvents(),
          registrationsService.getRegistrations(),
          membershipRequestsService.getRequests(),
        ]);
        setEvents(fetchedEvents || []);
        setRegistrations(fetchedRegs || []);
        setMembershipRequests(fetchedReqs || []);
      } catch (err) {
        console.error('Failed to load dashboard data:', err);
      } finally {
        setLoading(false);
      }
    }
    loadDashboardData();
  }, []);

  // Compute real metrics
  const totalEventsCount = events.length;
  const upcomingEventsCount = events.filter(e => {
    const status = (e.registration_status || '').toLowerCase();
    if (status === 'upcoming' || status === 'open') return true;
    const evtDate = new Date(e.event_date || e.date);
    return evtDate >= new Date();
  }).length;

  const totalRegistrationsCount = registrations.length;

  // Membership Requests Metrics
  const totalRequestsCount = membershipRequests.length;
  const pendingRequestsCount = membershipRequests.filter(r => r.status === 'pending').length;
  const reviewedRequestsCount = membershipRequests.filter(r => r.status === 'reviewed').length;
  const approvedRequestsCount = membershipRequests.filter(r => r.status === 'approved').length;
  const rejectedRequestsCount = membershipRequests.filter(r => r.status === 'rejected').length;

  const recentEvents = events.slice(0, 5);
  const recentRegistrations = registrations.slice(0, 5);

  if (loading) {
    return (
      <div className="py-20 text-center space-y-3">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
        <p className="text-xs text-slate-500 font-semibold">Loading real-time dashboard stats...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 w-full min-w-0">
      
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-sm min-w-0">
        <div>
          <div className="inline-flex items-center space-x-2 bg-blue-50 border border-blue-200 px-3 py-1 rounded-full text-xs font-bold text-[#0066CC] uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Overview & Analytics</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            SITE ACM Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Real-time activity stats, event status, membership submissions, and student registrations.
          </p>
        </div>

        <Link
          to="/admin/events/new"
          className="bg-[#0066CC] hover:bg-blue-700 text-white px-5 py-3 rounded-2xl text-xs font-bold shadow-lg shadow-blue-500/20 transition-all flex items-center space-x-2 shrink-0"
        >
          <PlusCircle className="w-4 h-4" />
          <span>+ Create New Event</span>
        </Link>
      </div>

      {/* Top Statistic Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 min-w-0">
        
        {/* Card 1: Total Events */}
        <div className="bg-white p-5 lg:p-6 rounded-3xl border border-slate-200/80 shadow-sm space-y-3 relative overflow-hidden group min-w-0">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Events</span>
            <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl shrink-0">
              <Calendar className="w-5 h-5" />
            </div>
          </div>
          <div className="space-y-1">
            <div className="text-3xl font-extrabold text-slate-900">{totalEventsCount}</div>
            <div className="text-[11px] font-medium text-slate-500">Documented activities</div>
          </div>
        </div>

        {/* Card 2: Membership Requests */}
        <Link to="/admin/membership-requests" className="bg-white p-5 lg:p-6 rounded-3xl border border-slate-200/80 shadow-sm space-y-3 relative overflow-hidden group hover:border-[#0066CC] transition-colors min-w-0 block">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#0066CC] uppercase tracking-wider">Membership Requests</span>
            <div className="p-3 bg-blue-50 text-[#0066CC] rounded-2xl shrink-0">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="space-y-1">
            <div className="text-3xl font-extrabold text-slate-900">{totalRequestsCount}</div>
            <div className="flex flex-wrap items-center gap-x-1.5 gap-y-1 text-[10px] font-bold text-slate-500 pt-0.5">
              <span className="text-amber-600 font-bold whitespace-nowrap">{pendingRequestsCount} Pending</span>
              <span className="text-slate-300">•</span>
              <span className="text-blue-600 whitespace-nowrap">{reviewedRequestsCount} Reviewed</span>
              <span className="text-slate-300">•</span>
              <span className="text-emerald-600 whitespace-nowrap">{approvedRequestsCount} Approved</span>
            </div>
          </div>
        </Link>

        {/* Card 3: Total Registrations */}
        <div className="bg-white p-5 lg:p-6 rounded-3xl border border-slate-200/80 shadow-sm space-y-3 relative overflow-hidden group min-w-0">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Registrations</span>
            <div className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl shrink-0">
              <GraduationCap className="w-5 h-5" />
            </div>
          </div>
          <div className="space-y-1">
            <div className="text-3xl font-extrabold text-slate-900">{totalRegistrationsCount}</div>
            <div className="text-[11px] font-medium text-slate-500">Student signups</div>
          </div>
        </div>

        {/* Card 4: Upcoming Events */}
        <div className="bg-white p-5 lg:p-6 rounded-3xl border border-slate-200/80 shadow-sm space-y-3 relative overflow-hidden group min-w-0">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Upcoming Events</span>
            <div className="p-3 bg-amber-50 text-amber-600 rounded-2xl shrink-0">
              <Clock className="w-5 h-5" />
            </div>
          </div>
          <div className="space-y-1">
            <div className="text-3xl font-extrabold text-slate-900">{upcomingEventsCount}</div>
            <div className="text-[11px] font-medium text-slate-500">Open or scheduled</div>
          </div>
        </div>

      </div>

      {/* Tables Row */}
      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] gap-6 lg:gap-8 min-w-0">
        
        {/* Recent Events Table */}
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden flex flex-col min-w-0 w-full">
          <div className="p-6 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Recent Events</h2>
              <p className="text-xs text-slate-500">Latest technical sessions & hackathons</p>
            </div>
            <Link
              to="/admin/events"
              className="text-xs font-bold text-[#0066CC] hover:underline flex items-center space-x-1"
            >
              <span>Manage Events</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="overflow-x-auto flex-1 w-full min-w-0">
            <table className="w-full text-left text-xs text-slate-600 table-auto border-collapse">
              <thead className="bg-slate-50 border-b border-slate-100 font-bold text-slate-500 uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="py-3.5 px-4 sm:px-6 font-extrabold text-slate-700">Event Name</th>
                  <th className="py-3.5 px-3 sm:px-4 font-extrabold text-slate-700 whitespace-nowrap">Date</th>
                  <th className="py-3.5 px-3 sm:px-4 font-extrabold text-slate-700 whitespace-nowrap">Category</th>
                  <th className="py-3.5 px-3 sm:px-4 font-extrabold text-slate-700 whitespace-nowrap">Status</th>
                  <th className="py-3.5 px-4 sm:px-6 font-extrabold text-slate-700 text-center w-14 whitespace-nowrap">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {recentEvents.length > 0 ? (
                  recentEvents.map((evt) => {
                    return (
                      <tr key={evt.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="py-3.5 px-4 sm:px-6 font-bold text-slate-900 leading-snug break-words">
                          {evt.title}
                        </td>
                        <td className="py-3.5 px-3 sm:px-4 whitespace-nowrap text-slate-600 font-medium text-[11px]">
                          {evt.date || evt.event_date}
                        </td>
                        <td className="py-3.5 px-3 sm:px-4 whitespace-nowrap">
                          <span className="bg-blue-50 text-blue-700 font-semibold px-2.5 py-1 rounded-lg border border-blue-100 text-[10px] inline-block">
                            {evt.category || 'Event'}
                          </span>
                        </td>
                        <td className="py-3.5 px-3 sm:px-4 whitespace-nowrap">
                          <span
                            className={`font-semibold px-2.5 py-1 rounded-md text-[10px] inline-block ${
                              (evt.registration_status || 'Open') === 'Open'
                                ? 'bg-emerald-100 text-emerald-800'
                                : 'bg-slate-100 text-slate-600'
                            }`}
                          >
                            {evt.registration_status || 'Upcoming'}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 sm:px-6 text-center w-14 whitespace-nowrap">
                          <Link
                            to={`/admin/events/${evt.id}/edit`}
                            className="p-1.5 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors inline-flex items-center justify-center"
                            title="Edit Event"
                          >
                            <Eye className="w-4 h-4" />
                          </Link>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="5" className="py-8 text-center text-slate-400">
                      No events found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Registrations Table */}
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden flex flex-col min-w-0 w-full">
          <div className="p-6 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Recent Registrations</h2>
              <p className="text-xs text-slate-500">Latest student event signups</p>
            </div>
            <Link
              to="/admin/registrations"
              className="text-xs font-bold text-[#0066CC] hover:underline flex items-center space-x-1"
            >
              <span>View All Registrations →</span>
            </Link>
          </div>

          <div className="overflow-x-auto flex-1 w-full min-w-0">
            <table className="w-full text-left text-xs text-slate-600 table-auto border-collapse">
              <thead className="bg-slate-50 border-b border-slate-100 font-bold text-slate-500 uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="py-3.5 px-4 sm:px-6 font-extrabold text-slate-700 whitespace-nowrap">Student Name</th>
                  <th className="py-3.5 px-3 sm:px-4 font-extrabold text-slate-700">Event</th>
                  <th className="py-3.5 px-3 sm:px-4 font-extrabold text-slate-700 whitespace-nowrap">Registered Date</th>
                  <th className="py-3.5 px-4 sm:px-6 font-extrabold text-slate-700 whitespace-nowrap">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {recentRegistrations.length > 0 ? (
                  recentRegistrations.map((reg) => (
                    <tr key={reg.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3.5 px-4 sm:px-6">
                        <div className="font-bold text-slate-900 leading-snug break-words">{reg.full_name}</div>
                        <div className="text-[10px] text-slate-400 break-all">{reg.email}</div>
                      </td>
                      <td className="py-3.5 px-3 sm:px-4 font-semibold text-slate-800 leading-snug break-words">
                        {reg.event_title || 'SITE Event'}
                      </td>
                      <td className="py-3.5 px-3 sm:px-4 text-slate-500 text-[11px] whitespace-nowrap font-medium">
                        {reg.registered_at ? new Date(reg.registered_at).toLocaleDateString() : 'Recent'}
                      </td>
                      <td className="py-3.5 px-4 sm:px-6 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold ${
                            reg.status === 'Attended'
                              ? 'bg-emerald-100 text-emerald-800'
                              : reg.status === 'Cancelled'
                              ? 'bg-rose-100 text-rose-800'
                              : 'bg-blue-100 text-blue-800'
                          }`}
                        >
                          {reg.status || 'Registered'}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="py-8 text-center text-slate-400">
                      No registrations recorded yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>

    </div>
  );
}
