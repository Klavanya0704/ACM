import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  PlusCircle,
  Search,
  Calendar,
  Eye,
  Edit,
  Trash2,
  AlertTriangle,
  X,
  ExternalLink,
  CheckCircle2
} from 'lucide-react';
import { eventsService } from '../../services/eventsService';
import { registrationsService } from '../../services/registrationsService';

export default function AdminEventsPage() {
  const [events, setEvents] = useState([]);
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  // Delete Confirmation Modal State
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [toastMsg, setToastMsg] = useState('');

  const navigate = useNavigate();

  const categories = ['All', 'Technical Event', 'Hackathon', 'Seminar', 'Outreach', 'Workshop'];

  const loadData = async () => {
    setLoading(true);
    try {
      const [fetchedEvents, fetchedRegs] = await Promise.all([
        eventsService.getEvents(),
        registrationsService.getRegistrations(),
      ]);
      setEvents(fetchedEvents || []);
      setRegistrations(fetchedRegs || []);
    } catch (err) {
      console.error('Failed to load events:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Filter events by search query and category
  const filteredEvents = events.filter((evt) => {
    const matchesCategory = selectedCategory === 'All' || evt.category === selectedCategory;
    const matchesSearch =
      (evt.title || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (evt.location || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (evt.description || '').toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await eventsService.deleteEvent(deleteTarget.id);
      setToastMsg(`Successfully deleted "${deleteTarget.title}"`);
      setDeleteTarget(null);
      await loadData();
      setTimeout(() => setToastMsg(''), 4000);
    } catch (err) {
      console.error('Delete error:', err);
      alert('Failed to delete event: ' + err.message);
    } finally {
      setDeleting(false);
    }
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
          <div className="inline-flex items-center space-x-2 bg-blue-50 border border-blue-200 px-3 py-1 rounded-full text-xs font-bold text-[#0066CC] uppercase tracking-wider mb-1">
            <Calendar className="w-3.5 h-3.5" />
            <span>Event Management</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            SITE ACM Events ({filteredEvents.length})
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Create, edit, manage, or archive chapter events and workshops.
          </p>
        </div>

        <Link
          to="/admin/events/new"
          className="bg-[#0066CC] hover:bg-blue-700 text-white px-5 py-3 rounded-2xl text-xs font-bold shadow-lg shadow-blue-500/20 transition-all flex items-center space-x-2 shrink-0"
        >
          <PlusCircle className="w-4 h-4" />
          <span>+ Add New Event</span>
        </Link>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm">
        
        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                selectedCategory === cat
                  ? 'bg-[#0066CC] text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search events by title or location..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500 bg-slate-50 text-slate-900"
          />
        </div>

      </div>

      {/* Events Table */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-slate-400 text-xs">
            <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
            Loading events...
          </div>
        ) : filteredEvents.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-600">
              <thead className="bg-slate-50 border-b border-slate-100 font-bold text-slate-500 uppercase tracking-wider">
                <tr>
                  <th className="py-4 px-6">Event</th>
                  <th className="py-4 px-4">Date & Time</th>
                  <th className="py-4 px-4">Category</th>
                  <th className="py-4 px-4">Location</th>
                  <th className="py-4 px-4">Registrations</th>
                  <th className="py-4 px-4">Status</th>
                  <th className="py-4 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredEvents.map((evt) => {
                  const regCount = registrations.filter(
                    r => r.event_id === evt.id || r.event_title === evt.title
                  ).length;

                  return (
                    <tr key={evt.id} className="hover:bg-slate-50/80 transition-colors">
                      
                      {/* Title & Banner Snippet */}
                      <td className="py-4 px-6 font-bold text-slate-900">
                        <div className="flex items-center space-x-3">
                          {evt.image_url || evt.image ? (
                            <img
                              src={evt.image_url || evt.image}
                              alt={evt.title}
                              className="w-10 h-10 rounded-xl object-cover shrink-0 border border-slate-200"
                            />
                          ) : (
                            <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-xs shrink-0">
                              ACM
                            </div>
                          )}
                          <div>
                            <div className="text-slate-900 font-bold text-xs max-w-xs truncate">
                              {evt.title}
                            </div>
                            <div className="text-[10px] text-slate-400 font-normal">
                              Slug: /{evt.slug || evt.id}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Date */}
                      <td className="py-4 px-4 whitespace-nowrap font-medium">
                        {evt.date || evt.event_date}
                        {evt.event_time && (
                          <div className="text-[10px] text-slate-400">{evt.event_time}</div>
                        )}
                      </td>

                      {/* Category */}
                      <td className="py-4 px-4">
                        <span className="bg-blue-50 text-blue-700 font-bold px-2.5 py-1 rounded-lg border border-blue-100 text-[10px]">
                          {evt.category || 'Technical Event'}
                        </span>
                      </td>

                      {/* Location */}
                      <td className="py-4 px-4 text-slate-600 font-medium">
                        {evt.location || 'SASI Campus'}
                      </td>

                      {/* Registrations count */}
                      <td className="py-4 px-4 font-bold text-slate-900">
                        <span className="bg-slate-100 text-slate-800 px-2.5 py-1 rounded-lg">
                          {regCount} Students
                        </span>
                      </td>

                      {/* Status */}
                      <td className="py-4 px-4">
                        <span
                          className={`font-bold px-2.5 py-1 rounded-lg text-[10px] ${
                            (evt.registration_status || 'Open') === 'Open'
                              ? 'bg-emerald-100 text-emerald-800'
                              : (evt.registration_status || '').toLowerCase() === 'closed'
                              ? 'bg-rose-100 text-rose-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          {evt.registration_status || 'Open'}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="py-4 px-6 text-right space-x-1.5 whitespace-nowrap">
                        
                        {/* View Public Page */}
                        <Link
                          to={`/events/${evt.slug}`}
                          target="_blank"
                          className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all inline-flex items-center"
                          title="View Public Event Page"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </Link>

                        {/* Edit */}
                        <Link
                          to={`/admin/events/${evt.id}/edit`}
                          className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all inline-flex items-center"
                          title="Edit Event"
                        >
                          <Edit className="w-4 h-4" />
                        </Link>

                        {/* Delete */}
                        <button
                          onClick={() => setDeleteTarget(evt)}
                          className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all inline-flex items-center"
                          title="Delete Event"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>

                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-12 text-center text-slate-400 space-y-3">
            <Calendar className="w-10 h-10 mx-auto text-slate-300" />
            <div className="font-bold text-slate-700">No matching events found</div>
            <p className="text-xs text-slate-500">Try adjusting your filters or click "+ Add New Event".</p>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full border border-slate-200 shadow-2xl space-y-6">
            <div className="flex items-center space-x-3 text-rose-600">
              <div className="p-3 bg-rose-100 rounded-2xl">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-extrabold text-slate-900">Confirm Event Deletion</h3>
                <p className="text-xs text-slate-500">This action cannot be undone.</p>
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-200">
              Are you sure you want to delete <strong>"{deleteTarget.title}"</strong>? Associated student registration records will be preserved safely.
            </p>

            <div className="flex items-center justify-end space-x-3 pt-2">
              <button
                onClick={() => setDeleteTarget(null)}
                disabled={deleting}
                className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-100 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                disabled={deleting}
                className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-lg shadow-rose-600/20 transition-all disabled:opacity-50"
              >
                {deleting ? 'Deleting...' : 'Yes, Delete Event'}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
