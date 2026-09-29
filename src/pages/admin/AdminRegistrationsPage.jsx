import React, { useEffect, useState } from 'react';
import {
  Users,
  Search,
  Download,
  Filter,
  CheckCircle,
  XCircle,
  Eye,
  User,
  Mail,
  Phone,
  Building,
  GraduationCap,
  Calendar,
  X,
  CheckCircle2
} from 'lucide-react';
import { registrationsService } from '../../services/registrationsService';
import { eventsService } from '../../services/eventsService';

export default function AdminRegistrationsPage() {
  const [registrations, setRegistrations] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters & Search
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEvent, setSelectedEvent] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');

  // Selected Detail Modal state
  const [activeReg, setActiveReg] = useState(null);
  const [updating, setUpdating] = useState(false);
  const [toastMsg, setToastMsg] = useState('');

  const loadData = async () => {
    setLoading(true);
    try {
      const [regsData, eventsData] = await Promise.all([
        registrationsService.getRegistrations(),
        eventsService.getEvents(),
      ]);
      setRegistrations(regsData || []);
      setEvents(eventsData || []);
    } catch (err) {
      console.error('Error loading registrations:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Filter registrations
  const filteredRegistrations = registrations.filter((reg) => {
    const matchesEvent = selectedEvent === 'All' || reg.event_title === selectedEvent || reg.event_id === selectedEvent;
    const matchesStatus = selectedStatus === 'All' || (reg.status || 'Registered') === selectedStatus;
    const matchesSearch =
      (reg.full_name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (reg.email || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (reg.event_title || '').toLowerCase().includes(searchQuery.toLowerCase());
    return matchesEvent && matchesStatus && matchesSearch;
  });

  // Unique event titles for filter dropdown
  const eventTitles = Array.from(
    new Set(registrations.map(r => r.event_title).filter(Boolean))
  );

  // Status Change Handler
  const handleStatusUpdate = async (id, newStatus) => {
    setUpdating(true);
    try {
      await registrationsService.updateStatus(id, newStatus);
      setToastMsg(`Status updated to "${newStatus}"`);
      if (activeReg && activeReg.id === id) {
        setActiveReg({ ...activeReg, status: newStatus });
      }
      await loadData();
      setTimeout(() => setToastMsg(''), 3000);
    } catch (err) {
      console.error('Failed to update status:', err);
      alert('Failed to update status: ' + err.message);
    } finally {
      setUpdating(false);
    }
  };

  const handleExportCSV = () => {
    registrationsService.exportCSV(filteredRegistrations, `SITE_ACM_Registrations_${Date.now()}.csv`);
  };

  return (
    <div className="space-y-6">
      
      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed top-6 right-6 z-50 bg-emerald-600 text-white px-5 py-3 rounded-2xl shadow-xl text-xs font-bold flex items-center space-x-2 animate-bounce">
          <CheckCircle2 className="w-4 h-4" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm">
        <div>
          <div className="inline-flex items-center space-x-2 bg-indigo-50 border border-indigo-200 px-3 py-1 rounded-full text-xs font-bold text-indigo-700 uppercase tracking-wider mb-1">
            <Users className="w-3.5 h-3.5" />
            <span>Student Registrations</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Registered Students ({filteredRegistrations.length})
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            View student signups, update attendance, and export attendance rosters.
          </p>
        </div>

        <button
          onClick={handleExportCSV}
          className="bg-slate-900 hover:bg-slate-800 text-white px-5 py-3 rounded-2xl text-xs font-bold shadow-lg transition-all flex items-center space-x-2 shrink-0"
        >
          <Download className="w-4 h-4" />
          <span>Export CSV</span>
        </button>
      </div>

      {/* Filters and Search Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm">
        
        {/* Search Input */}
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search by name, email, or event..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500 bg-slate-50 text-slate-900"
          />
        </div>

        {/* Event Filter */}
        <div>
          <select
            value={selectedEvent}
            onChange={(e) => setSelectedEvent(e.target.value)}
            className="w-full px-3 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500 bg-slate-50 text-slate-900 font-semibold"
          >
            <option value="All">All Events ({eventTitles.length})</option>
            {eventTitles.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>

        {/* Status Filter */}
        <div>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="w-full px-3 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500 bg-slate-50 text-slate-900 font-semibold"
          >
            <option value="All">All Statuses</option>
            <option value="Registered">Registered</option>
            <option value="Attended">Attended</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>

      </div>

      {/* Registrations Table */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-slate-400 text-xs">
            <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
            Loading registrations...
          </div>
        ) : filteredRegistrations.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-600">
              <thead className="bg-slate-50 border-b border-slate-100 font-bold text-slate-500 uppercase tracking-wider">
                <tr>
                  <th className="py-4 px-6">Student Name</th>
                  <th className="py-4 px-4">Contact</th>
                  <th className="py-4 px-4">Department & Year</th>
                  <th className="py-4 px-4">Event</th>
                  <th className="py-4 px-4">Registered Date</th>
                  <th className="py-4 px-4">Status</th>
                  <th className="py-4 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredRegistrations.map((reg) => (
                  <tr key={reg.id} className="hover:bg-slate-50/80 transition-colors">
                    
                    {/* Student Name */}
                    <td className="py-4 px-6 font-bold text-slate-900 whitespace-nowrap">
                      {reg.full_name}
                    </td>

                    {/* Email & Phone */}
                    <td className="py-4 px-4">
                      <div className="font-semibold text-slate-800">{reg.email}</div>
                      <div className="text-[10px] text-slate-400">{reg.phone || 'N/A'}</div>
                    </td>

                    {/* Department */}
                    <td className="py-4 px-4 whitespace-nowrap">
                      <div className="font-medium text-slate-800">{reg.department}</div>
                      <div className="text-[10px] text-slate-400 font-semibold">{reg.year}</div>
                    </td>

                    {/* Event */}
                    <td className="py-4 px-4 font-bold text-blue-700 max-w-[160px] truncate">
                      {reg.event_title || 'SITE Event'}
                    </td>

                    {/* Registered Date */}
                    <td className="py-4 px-4 text-slate-500 whitespace-nowrap">
                      {reg.registered_at ? new Date(reg.registered_at).toLocaleDateString() : 'N/A'}
                    </td>

                    {/* Status */}
                    <td className="py-4 px-4">
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

                    {/* Actions */}
                    <td className="py-4 px-6 text-right space-x-2">
                      <button
                        onClick={() => setActiveReg(reg)}
                        className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all inline-flex items-center"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-12 text-center text-slate-400 space-y-3">
            <Users className="w-10 h-10 mx-auto text-slate-300" />
            <div className="font-bold text-slate-700">No student registrations found</div>
            <p className="text-xs text-slate-500">Try changing your search query or filters.</p>
          </div>
        )}
      </div>

      {/* Student Registration Detail Modal */}
      {activeReg && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden border border-slate-200 shadow-2xl space-y-6">
            
            {/* Header */}
            <div className="bg-slate-900 text-white p-6 relative">
              <button
                onClick={() => setActiveReg(null)}
                className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-full hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="text-[10px] font-bold text-blue-400 uppercase tracking-widest mb-1">
                Student Registration Details
              </div>
              <h3 className="text-xl font-bold">{activeReg.full_name}</h3>
              <p className="text-xs text-slate-400">{activeReg.email}</p>
            </div>

            {/* Details Content */}
            <div className="p-6 space-y-6">
              
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Student Information
                </h4>
                <div className="grid grid-cols-2 gap-3 text-xs bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  <div>
                    <span className="text-slate-400 block text-[10px]">Phone</span>
                    <span className="font-bold text-slate-900">{activeReg.phone || 'Not provided'}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Year of Study</span>
                    <span className="font-bold text-slate-900">{activeReg.year}</span>
                  </div>
                  <div className="col-span-2">
                    <span className="text-slate-400 block text-[10px]">Department</span>
                    <span className="font-bold text-slate-900">{activeReg.department}</span>
                  </div>
                  <div className="col-span-2">
                    <span className="text-slate-400 block text-[10px]">College</span>
                    <span className="font-bold text-slate-900">{activeReg.college}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Event & Status
                </h4>
                <div className="grid grid-cols-2 gap-3 text-xs bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  <div className="col-span-2">
                    <span className="text-slate-400 block text-[10px]">Registered Event</span>
                    <span className="font-extrabold text-blue-700 text-sm">{activeReg.event_title}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Registration Date</span>
                    <span className="font-bold text-slate-900">
                      {activeReg.registered_at ? new Date(activeReg.registered_at).toLocaleString() : 'N/A'}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Current Status</span>
                    <span className="font-bold text-slate-900">{activeReg.status || 'Registered'}</span>
                  </div>
                </div>
              </div>

              {/* Quick Action Buttons */}
              <div className="space-y-2 pt-2 border-t border-slate-100">
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                  Update Registration Status
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => handleStatusUpdate(activeReg.id, 'Attended')}
                    disabled={updating}
                    className="py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl font-bold text-xs shadow-md transition-all flex items-center justify-center space-x-1.5 disabled:opacity-50"
                  >
                    <CheckCircle className="w-4 h-4" />
                    <span>Mark as Attended</span>
                  </button>

                  <button
                    onClick={() => handleStatusUpdate(activeReg.id, 'Cancelled')}
                    disabled={updating}
                    className="py-3 px-4 bg-rose-600 hover:bg-rose-700 text-white rounded-2xl font-bold text-xs shadow-md transition-all flex items-center justify-center space-x-1.5 disabled:opacity-50"
                  >
                    <XCircle className="w-4 h-4" />
                    <span>Cancel Registration</span>
                  </button>
                </div>
              </div>

            </div>

          </div>
        </div>
      )}

    </div>
  );
}
