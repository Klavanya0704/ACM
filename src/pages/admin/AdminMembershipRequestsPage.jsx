import React, { useEffect, useState } from 'react';
import {
  Search,
  Filter,
  UserCheck,
  CheckCircle2,
  Clock,
  XCircle,
  Eye,
  Trash2,
  AlertTriangle,
  X,
  FileText,
  Building2,
  GraduationCap,
  Phone,
  Mail,
  ShieldCheck
} from 'lucide-react';
import { membershipRequestsService } from '../../services/membershipRequestsService';

export default function AdminMembershipRequestsPage() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [yearFilter, setYearFilter] = useState('All');
  
  // Details Modal & Action state
  const [activeRequest, setActiveRequest] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [updating, setUpdating] = useState(false);
  const [toastMsg, setToastMsg] = useState('');

  const statusOptions = ['All', 'pending', 'reviewed', 'approved', 'rejected'];
  const yearOptions = ['All', '1st Year', '2nd Year', '3rd Year', '4th Year'];

  const loadData = async () => {
    setLoading(true);
    try {
      const data = await membershipRequestsService.getRequests();
      setRequests(data || []);
    } catch (err) {
      console.error('Failed to load membership requests:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleStatusChange = async (reqId, newStatus) => {
    setUpdating(true);
    try {
      await membershipRequestsService.updateStatus(reqId, newStatus);
      setToastMsg(`Request status updated to "${newStatus.toUpperCase()}"`);
      if (activeRequest && activeRequest.id === reqId) {
        setActiveRequest(prev => ({ ...prev, status: newStatus }));
      }
      await loadData();
      setTimeout(() => setToastMsg(''), 4000);
    } catch (err) {
      console.error('Status update error:', err);
      alert('Failed to update status: ' + err.message);
    } finally {
      setUpdating(false);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    setUpdating(true);
    try {
      await membershipRequestsService.deleteRequest(deleteTarget.id);
      setToastMsg(`Deleted request from "${deleteTarget.full_name}"`);
      if (activeRequest && activeRequest.id === deleteTarget.id) {
        setActiveRequest(null);
      }
      setDeleteTarget(null);
      await loadData();
      setTimeout(() => setToastMsg(''), 4000);
    } catch (err) {
      console.error('Delete error:', err);
      alert('Failed to delete request: ' + err.message);
    } finally {
      setUpdating(false);
    }
  };

  // Filter requests
  const filteredRequests = requests.filter((r) => {
    if (statusFilter !== 'All' && r.status !== statusFilter) return false;
    if (yearFilter !== 'All' && r.year_of_study !== yearFilter) return false;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      const matchName = (r.full_name || '').toLowerCase().includes(q);
      const matchRoll = (r.roll_number || '').toLowerCase().includes(q);
      const matchEmail = (r.email || '').toLowerCase().includes(q);
      const matchDept = (r.department || '').toLowerCase().includes(q);
      return matchName || matchRoll || matchEmail || matchDept;
    }

    return true;
  });

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
            <UserCheck className="w-3.5 h-3.5" />
            <span>Membership Workflow</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Membership Requests ({requests.length})
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Review incoming student interest submissions for SITE ACM Chapter.
          </p>
        </div>

        <div className="flex items-center space-x-2 bg-slate-100 px-4 py-2 rounded-2xl text-xs font-bold text-slate-700">
          <span>Pending: {requests.filter(r => r.status === 'pending').length}</span>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm">
        
        {/* Status Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-xs font-bold text-slate-400 mr-1 flex items-center">
            <Filter className="w-3.5 h-3.5 mr-1" />
            Status:
          </span>
          {statusOptions.map((opt) => (
            <button
              key={opt}
              onClick={() => setStatusFilter(opt)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold capitalize transition-all ${
                statusFilter === opt
                  ? 'bg-[#0066CC] text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {opt}
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div className="relative w-full lg:w-72">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search by name, roll no, or department..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500 bg-slate-50 text-slate-900"
          />
        </div>

      </div>

      {/* Requests Table */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-slate-400 text-xs">
            <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
            Loading membership submissions...
          </div>
        ) : filteredRequests.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-600">
              <thead className="bg-slate-50 border-b border-slate-100 font-bold text-slate-500 uppercase tracking-wider">
                <tr>
                  <th className="py-4 px-6">Applicant</th>
                  <th className="py-4 px-4">Roll Number</th>
                  <th className="py-4 px-4">Department & Year</th>
                  <th className="py-4 px-4">ACM Status</th>
                  <th className="py-4 px-4">Submitted Date</th>
                  <th className="py-4 px-4">Status</th>
                  <th className="py-4 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredRequests.map((req) => (
                  <tr key={req.id} className="hover:bg-slate-50/80 transition-colors">
                    
                    {/* Name & Contact */}
                    <td className="py-4 px-6 font-bold text-slate-900">
                      <div>{req.full_name}</div>
                      <div className="text-[10px] text-slate-400 font-normal">{req.email} • {req.phone}</div>
                    </td>

                    {/* Roll Number */}
                    <td className="py-4 px-4 font-mono font-bold text-slate-800">
                      {req.roll_number}
                    </td>

                    {/* Dept & Year */}
                    <td className="py-4 px-4">
                      <div className="font-semibold text-slate-800">{req.year_of_study}</div>
                      <div className="text-[10px] text-slate-500">{req.department}</div>
                    </td>

                    {/* ACM Status */}
                    <td className="py-4 px-4 font-medium text-slate-700">
                      {req.acm_membership_status || req.acm_status}
                    </td>

                    {/* Date */}
                    <td className="py-4 px-4 text-slate-500 whitespace-nowrap">
                      {req.submitted_at || req.created_at ? new Date(req.submitted_at || req.created_at).toLocaleDateString() : 'Recent'}
                    </td>

                    {/* Status Pill */}
                    <td className="py-4 px-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold capitalize ${
                          req.status === 'approved'
                            ? 'bg-emerald-100 text-emerald-800'
                            : req.status === 'reviewed'
                            ? 'bg-blue-100 text-blue-800'
                            : req.status === 'rejected'
                            ? 'bg-rose-100 text-rose-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {req.status || 'pending'}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-6 text-right space-x-1.5 whitespace-nowrap">
                      
                      {/* View Application Details */}
                      <button
                        onClick={() => setActiveRequest(req)}
                        className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all inline-flex items-center"
                        title="View Complete Request"
                      >
                        <Eye className="w-4 h-4" />
                      </button>

                      {/* Delete */}
                      <button
                        onClick={() => setDeleteTarget(req)}
                        className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all inline-flex items-center"
                        title="Delete Request"
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
            <UserCheck className="w-10 h-10 mx-auto text-slate-300" />
            <div className="font-bold text-slate-700">No membership requests found</div>
            <p className="text-xs text-slate-500">Submissions from the public /membership page will appear here automatically.</p>
          </div>
        )}
      </div>

      {/* Details Drawer / Modal */}
      {activeRequest && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-2xl w-full border border-slate-200 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
            
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <span className="text-[10px] font-bold text-[#0066CC] uppercase tracking-widest block">
                  APPLICATION DETAILS
                </span>
                <h3 className="text-xl font-extrabold text-slate-900">
                  {activeRequest.full_name}
                </h3>
              </div>
              <button
                onClick={() => setActiveRequest(null)}
                className="p-2 text-slate-400 hover:text-slate-700 rounded-xl hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Info Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="bg-slate-50 p-3.5 rounded-2xl space-y-1">
                <span className="text-slate-400 font-bold uppercase text-[10px]">Roll Number</span>
                <div className="font-mono font-bold text-slate-900 text-sm">{activeRequest.roll_number}</div>
              </div>

              <div className="bg-slate-50 p-3.5 rounded-2xl space-y-1">
                <span className="text-slate-400 font-bold uppercase text-[10px]">Institution / College</span>
                <div className="font-semibold text-slate-900">{activeRequest.college || activeRequest.institution}</div>
              </div>

              <div className="bg-slate-50 p-3.5 rounded-2xl space-y-1">
                <span className="text-slate-400 font-bold uppercase text-[10px]">Email</span>
                <div className="font-semibold text-slate-900">{activeRequest.email}</div>
              </div>

              <div className="bg-slate-50 p-3.5 rounded-2xl space-y-1">
                <span className="text-slate-400 font-bold uppercase text-[10px]">Phone</span>
                <div className="font-semibold text-slate-900">{activeRequest.phone || 'N/A'}</div>
              </div>

              <div className="bg-slate-50 p-3.5 rounded-2xl space-y-1">
                <span className="text-slate-400 font-bold uppercase text-[10px]">Department</span>
                <div className="font-semibold text-slate-900">{activeRequest.department}</div>
              </div>

              <div className="bg-slate-50 p-3.5 rounded-2xl space-y-1">
                <span className="text-slate-400 font-bold uppercase text-[10px]">Year of Study</span>
                <div className="font-semibold text-slate-900">{activeRequest.year_of_study}</div>
              </div>
            </div>

            {/* ACM Status */}
            <div className="bg-blue-50/80 p-4 rounded-2xl border border-blue-100 text-xs space-y-1">
              <span className="text-[10px] font-bold text-[#0066CC] uppercase">ACM Membership Status</span>
              <div className="font-extrabold text-[#071A3D] text-sm">{activeRequest.acm_status || activeRequest.acm_membership_status}</div>
            </div>

            {/* Areas of Interest */}
            {((activeRequest.interests && activeRequest.interests.length > 0) || (activeRequest.areas_of_interest && activeRequest.areas_of_interest.length > 0)) && (
              <div className="space-y-2">
                <span className="text-xs font-bold text-slate-700 block">Areas of Interest</span>
                <div className="flex flex-wrap gap-1.5">
                  {(activeRequest.interests || activeRequest.areas_of_interest).map((area, idx) => (
                    <span key={idx} className="bg-blue-50 text-[#0066CC] border border-blue-200 px-3 py-1 rounded-xl text-xs font-bold">
                      {area}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Interest Reason */}
            {(activeRequest.statement || activeRequest.interest_reason) && (
              <div className="space-y-1.5 bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <span className="text-xs font-bold text-slate-700 block">Statement / Reason for Joining</span>
                <p className="text-xs text-slate-600 leading-relaxed font-normal">
                  {activeRequest.statement || activeRequest.interest_reason}
                </p>
              </div>
            )}

            {/* Status Change Buttons */}
            <div className="space-y-2 pt-2 border-t border-slate-100">
              <span className="text-xs font-bold text-slate-700 block">Update Status:</span>
              <div className="flex flex-wrap items-center gap-2">
                {['pending', 'reviewed', 'approved', 'rejected'].map((st) => (
                  <button
                    key={st}
                    disabled={updating || activeRequest.status === st}
                    onClick={() => handleStatusChange(activeRequest.id, st)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold capitalize transition-all ${
                      activeRequest.status === st
                        ? 'bg-slate-900 text-white shadow-md'
                        : 'bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-[#0066CC] border border-slate-200'
                    }`}
                  >
                    Set {st}
                  </button>
                ))}
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full border border-slate-200 shadow-2xl space-y-6">
            <div className="flex items-center space-x-3 text-rose-600">
              <div className="p-3 bg-rose-100 rounded-2xl">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-extrabold text-slate-900">Confirm Deletion</h3>
                <p className="text-xs text-slate-500">This action cannot be undone.</p>
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-200">
              Are you sure you want to delete membership request from <strong>"{deleteTarget.full_name}"</strong>?
            </p>

            <div className="flex items-center justify-end space-x-3 pt-2">
              <button
                onClick={() => setDeleteTarget(null)}
                disabled={updating}
                className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-100 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                disabled={updating}
                className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-lg shadow-rose-600/20 transition-all disabled:opacity-50"
              >
                {updating ? 'Deleting...' : 'Yes, Delete Request'}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
