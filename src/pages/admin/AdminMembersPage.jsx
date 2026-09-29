import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  PlusCircle,
  Search,
  Users,
  Edit,
  Trash2,
  AlertTriangle,
  CheckCircle2,
  ShieldCheck,
  GraduationCap
} from 'lucide-react';
import { membersService } from '../../services/membersService';
import { CHAPTER_INFO } from '../../data/mockData';

export default function AdminMembersPage() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('All');
  
  // Delete Confirmation Modal State
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [toastMsg, setToastMsg] = useState('');

  const navigate = useNavigate();

  const filterOptions = ['All', '1st Year', '2nd Year', '3rd Year', '4th Year', 'ACM Members', 'Chapter Members'];

  const loadData = async () => {
    setLoading(true);
    try {
      const data = await membersService.getMembers();
      setMembers(data || []);
    } catch (err) {
      console.error('Failed to load members:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Filter members by search query and category
  const filteredMembers = members.filter((m) => {
    const isAcm = m.is_active !== undefined ? m.is_active : m.is_acm_member;
    const year = m.year_of_study || m.year;
    const role = m.acm_role || m.role;
    const acmId = m.acm_member_id || m.acm_number;

    if (selectedFilter !== 'All') {
      if (selectedFilter === 'ACM Members' && !isAcm) return false;
      if (selectedFilter === 'Chapter Members' && isAcm) return false;
      if (['1st Year', '2nd Year', '3rd Year', '4th Year'].includes(selectedFilter) && year !== selectedFilter) {
        return false;
      }
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      const matchName = (m.name || '').toLowerCase().includes(q);
      const matchDept = (m.department || '').toLowerCase().includes(q);
      const matchRole = (role || '').toLowerCase().includes(q);
      const matchAcm = (acmId || '').toLowerCase().includes(q);
      return matchName || matchDept || matchRole || matchAcm;
    }

    return true;
  });

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await membersService.deleteMember(deleteTarget.id);
      setToastMsg(`Successfully deleted "${deleteTarget.name}"`);
      setDeleteTarget(null);
      await loadData();
      setTimeout(() => setToastMsg(''), 4000);
    } catch (err) {
      console.error('Delete error:', err);
      alert('Failed to delete member: ' + err.message);
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

      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm">
        <div>
          <div className="inline-flex items-center space-x-2 bg-blue-50 border border-blue-200 px-3 py-1 rounded-full text-xs font-bold text-[#0066CC] uppercase tracking-wider mb-1">
            <Users className="w-3.5 h-3.5" />
            <span>Member Management</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            SITE ACM Chapter Members ({members.length})
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Manage student member profiles, academic year, department, and ACM membership status.
          </p>
        </div>

        <Link
          to="/admin/members/new"
          className="bg-[#0066CC] hover:bg-blue-700 text-white px-5 py-3 rounded-2xl text-xs font-bold shadow-lg shadow-blue-500/20 transition-all flex items-center space-x-2 shrink-0"
        >
          <PlusCircle className="w-4 h-4" />
          <span>+ Add New Member</span>
        </Link>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm">
        
        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
          {filterOptions.map((opt) => (
            <button
              key={opt}
              onClick={() => setSelectedFilter(opt)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                selectedFilter === opt
                  ? 'bg-[#0066CC] text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {opt}
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search member name or department..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500 bg-slate-50 text-slate-900"
          />
        </div>

      </div>

      {/* Members Table */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-slate-400 text-xs">
            <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
            Loading members roster...
          </div>
        ) : filteredMembers.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-600">
              <thead className="bg-slate-50 border-b border-slate-100 font-bold text-slate-500 uppercase tracking-wider">
                <tr>
                  <th className="py-4 px-6">Member Name</th>
                  <th className="py-4 px-4">Academic Year</th>
                  <th className="py-4 px-4">Department</th>
                  <th className="py-4 px-4">ACM Membership</th>
                  <th className="py-4 px-4">Role</th>
                  <th className="py-4 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredMembers.map((m) => (
                  <tr key={m.id} className="hover:bg-slate-50/80 transition-colors">
                    
                    {/* Name & Avatar */}
                    <td className="py-4 px-6 font-bold text-slate-900">
                      <div className="flex items-center space-x-3">
                        {m.image_url || m.photo_url ? (
                          <img
                            src={m.image_url || m.photo_url}
                            alt={m.name}
                            className="w-9 h-9 rounded-xl object-cover shrink-0 border border-slate-200"
                          />
                        ) : (
                          <div className="w-9 h-9 rounded-xl bg-blue-100 text-[#0066CC] flex items-center justify-center font-bold text-xs shrink-0">
                            {m.name ? m.name[0] : 'M'}
                          </div>
                        )}
                        <div>
                          <div className="text-slate-900 font-bold text-xs">{m.name}</div>
                          {m.email && <div className="text-[10px] text-slate-400 font-normal">{m.email}</div>}
                        </div>
                      </div>
                    </td>

                    {/* Academic Year */}
                    <td className="py-4 px-4 font-semibold text-slate-700 whitespace-nowrap">
                      {m.year_of_study || m.year || '3rd Year'}
                    </td>

                    {/* Department */}
                    <td className="py-4 px-4 text-slate-600 font-medium">
                      {m.department}
                    </td>

                    {/* ACM Membership Status */}
                    <td className="py-4 px-4">
                      {m.acm_member_id || m.acm_number || m.is_acm_member ? (
                        <span className="bg-emerald-50 text-emerald-700 font-bold px-2.5 py-1 rounded-lg border border-emerald-200 text-[10px] inline-flex items-center space-x-1">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          <span>ACM Member ({m.acm_member_id || m.acm_number || 'International'})</span>
                        </span>
                      ) : (
                        <span className="bg-slate-100 text-slate-600 font-semibold px-2.5 py-1 rounded-lg text-[10px]">
                          Chapter Member
                        </span>
                      )}
                    </td>

                    {/* Role */}
                    <td className="py-4 px-4 font-medium text-slate-700">
                      {m.acm_role || m.role || 'Member'}
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-6 text-right space-x-1.5 whitespace-nowrap">
                      
                      {/* Edit */}
                      <Link
                        to={`/admin/members/${m.id}/edit`}
                        className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all inline-flex items-center"
                        title="Edit Member"
                      >
                        <Edit className="w-4 h-4" />
                      </Link>

                      {/* Delete */}
                      <button
                        onClick={() => setDeleteTarget(m)}
                        className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all inline-flex items-center"
                        title="Delete Member"
                      >
                        <Trash2 className="w-4 h-4" />
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
            <div className="font-bold text-slate-700">No matching members found</div>
            <p className="text-xs text-slate-500">Try adjusting your filters or click "+ Add New Member".</p>
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
                <h3 className="text-lg font-extrabold text-slate-900">Confirm Member Deletion</h3>
                <p className="text-xs text-slate-500">This action cannot be undone.</p>
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-200">
              Are you sure you want to delete <strong>"{deleteTarget.name}"</strong> from the official chapter directory?
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
                {deleting ? 'Deleting...' : 'Yes, Delete Member'}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
