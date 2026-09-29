import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { ArrowLeft, Save, Upload, ShieldCheck } from 'lucide-react';
import { membersService } from '../../services/membersService';

export default function AdminMemberFormPage() {
  const { id } = useParams();
  const isEditing = Boolean(id);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(isEditing);
  const [saving, setSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    year_of_study: '4th Year',
    department: 'Computer Science & Engineering',
    is_active: true,
    acm_member_id: '',
    acm_role: 'CHAPTER MEMBER',
    image_url: '',
    joined_date: '',
  });

  const yearsOptions = ['1st Year', '2nd Year', '3rd Year', '4th Year', 'Faculty'];
  const departmentOptions = [
    'Computer Science & Engineering',
    'Artificial Intelligence & Data Science',
    'Information Technology',
    'Electronics & Communication Engineering',
    'Electrical & Electronics Engineering',
    'Mechanical Engineering',
    'Civil Engineering'
  ];

  useEffect(() => {
    if (isEditing) {
      async function fetchMember() {
        try {
          const data = await membersService.getMemberById(id);
          if (data) {
            setFormData({
              name: data.name || '',
              year_of_study: data.year_of_study || data.year || '3rd Year',
              department: data.department || 'Computer Science & Engineering',
              is_active: data.is_active !== undefined ? Boolean(data.is_active) : true,
              acm_member_id: data.acm_member_id || data.acm_number || '',
              acm_role: data.acm_role || data.role || 'CHAPTER MEMBER',
              image_url: data.image_url || data.photo_url || '',
              joined_date: data.joined_date || '',
            });
          } else {
            setErrorMsg('Member profile not found.');
          }
        } catch (err) {
          console.error('Failed to load member:', err);
          setErrorMsg('Failed to load member details.');
        } finally {
          setLoading(false);
        }
      }
      fetchMember();
    }
  }, [id, isEditing]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handlePhotoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setSaving(true);
      const url = await membersService.uploadPhoto(file);
      setFormData((prev) => ({ ...prev, image_url: url }));
    } catch (err) {
      console.error('Photo upload error:', err);
      alert('Photo upload failed: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      setErrorMsg('Member name is required.');
      return;
    }

    setSaving(true);
    setErrorMsg('');

    try {
      const payload = {
        name: formData.name.trim(),
        department: formData.department || 'Computer Science & Engineering',
        year_of_study: formData.year_of_study || '3rd Year',
        acm_role: formData.acm_role || 'CHAPTER MEMBER',
        acm_member_id: formData.acm_member_id ? formData.acm_member_id.trim() : null,
        image_url: formData.image_url || null,
        joined_date: formData.joined_date || null,
        is_active: Boolean(formData.is_active),
      };

      if (isEditing) {
        await membersService.updateMember(id, payload);
      } else {
        await membersService.createMember(payload);
      }
      navigate('/admin/members');
    } catch (err) {
      console.error('Save error:', err);
      setErrorMsg('Failed to save member profile: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="py-20 text-center space-y-3">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
        <p className="text-xs text-slate-500 font-semibold">Loading member profile...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      
      {/* Header */}
      <div className="flex items-center justify-between bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm">
        <div className="flex items-center space-x-3">
          <Link
            to="/admin/members"
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-all"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              {isEditing ? 'Edit Member Profile' : 'Add New Chapter Member'}
            </h1>
            <p className="text-xs text-slate-500">
              Manage official SITE ACM Chapter member profiles listed on the verified roster.
            </p>
          </div>
        </div>
      </div>

      {errorMsg && (
        <div className="bg-rose-50 border border-rose-200 text-rose-700 p-4 rounded-2xl text-xs font-semibold">
          {errorMsg}
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-sm space-y-6">
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          
          {/* Member Name */}
          <div className="space-y-1.5 sm:col-span-2">
            <label className="text-xs font-bold text-slate-700">Member Full Name *</label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. K. Sruthi"
              className="w-full px-4 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500 bg-slate-50 text-slate-900 font-medium"
            />
          </div>

          {/* Academic Year */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700">Year of Study *</label>
            <select
              name="year_of_study"
              value={formData.year_of_study}
              onChange={handleChange}
              className="w-full px-4 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500 bg-slate-50 text-slate-900 font-medium"
            >
              {yearsOptions.map((y) => (
                <option key={y} value={y}>{y}</option>
              ))}
            </select>
          </div>

          {/* Department */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700">Department *</label>
            <select
              name="department"
              value={formData.department}
              onChange={handleChange}
              className="w-full px-4 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500 bg-slate-50 text-slate-900 font-medium"
            >
              {departmentOptions.map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>

          {/* Role */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700">Chapter Role</label>
            <input
              type="text"
              name="acm_role"
              value={formData.acm_role}
              onChange={handleChange}
              placeholder="e.g. CHAPTER MEMBER, Web Lead, Executive Member"
              className="w-full px-4 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500 bg-slate-50 text-slate-900 font-medium"
            />
          </div>

          {/* Joined Date */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700">Joined Date (Optional)</label>
            <input
              type="date"
              name="joined_date"
              value={formData.joined_date}
              onChange={handleChange}
              className="w-full px-4 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500 bg-slate-50 text-slate-900 font-medium"
            />
          </div>

          {/* Active Status Toggle */}
          <div className="space-y-1.5 sm:col-span-2 bg-blue-50/70 p-4 rounded-2xl border border-blue-100 flex items-center justify-between">
            <div>
              <div className="text-xs font-bold text-slate-900 flex items-center space-x-1.5">
                <ShieldCheck className="w-4 h-4 text-[#0066CC]" />
                <span>Active Member Status</span>
              </div>
              <div className="text-[11px] text-slate-500">
                Mark as active verified student member of SITE ACM Student Chapter.
              </div>
            </div>

            <input
              type="checkbox"
              name="is_active"
              checked={formData.is_active}
              onChange={handleChange}
              className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500 cursor-pointer"
            />
          </div>

          {/* ACM Member ID */}
          <div className="space-y-1.5 sm:col-span-2">
            <label className="text-xs font-bold text-slate-700">ACM Member ID / Number (Optional)</label>
            <input
              type="text"
              name="acm_member_id"
              value={formData.acm_member_id}
              onChange={handleChange}
              placeholder="e.g. ACM-IN-2024-001"
              className="w-full px-4 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500 bg-slate-50 text-slate-900 font-mono"
            />
          </div>

          {/* Profile Photo Upload */}
          <div className="space-y-2 sm:col-span-2">
            <label className="text-xs font-bold text-slate-700">Profile Photo</label>
            <div className="flex items-center space-x-4">
              {formData.image_url ? (
                <img
                  src={formData.image_url}
                  alt="Preview"
                  className="w-16 h-16 rounded-2xl object-cover border border-slate-200 shadow-sm"
                />
              ) : (
                <div className="w-16 h-16 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center font-bold text-lg">
                  {formData.name ? formData.name[0] : 'M'}
                </div>
              )}

              <label className="cursor-pointer bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2.5 rounded-xl text-xs font-bold inline-flex items-center space-x-2 transition-all">
                <Upload className="w-4 h-4" />
                <span>Upload Profile Image</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="hidden"
                />
              </label>
            </div>
          </div>

        </div>

        {/* Buttons */}
        <div className="flex items-center justify-end space-x-3 pt-4 border-t border-slate-100">
          <Link
            to="/admin/members"
            className="px-5 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-100 transition-all"
          >
            Cancel
          </Link>

          <button
            type="submit"
            disabled={saving}
            className="bg-[#0066CC] hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl text-xs font-bold shadow-lg shadow-blue-500/20 transition-all flex items-center space-x-2 disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? 'Saving...' : (isEditing ? 'Update Member Profile' : 'Create Member Profile')}</span>
          </button>
        </div>

      </form>

    </div>
  );
}
