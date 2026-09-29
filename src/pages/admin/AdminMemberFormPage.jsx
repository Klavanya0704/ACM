import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { ArrowLeft, Save, Upload, Users, ShieldCheck, UserCheck } from 'lucide-react';
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
    year: '4th Year',
    department: '',
    is_acm_member: true,
    acm_number: '',
    role: 'CHAPTER MEMBER',
    email: '',
    photo_url: '',
  });

  const yearsOptions = ['1st Year', '2nd Year', '3rd Year', '4th Year', 'Faculty'];
  const departmentOptions = [
    'Not Specified',
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
              year: data.year || '3rd Year',
              department: data.department || 'Computer Science & Engineering',
              is_acm_member: Boolean(data.is_acm_member),
              acm_number: data.acm_number || '',
              role: data.role || '',
              email: data.email || '',
              photo_url: data.photo_url || '',
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
      setFormData((prev) => ({ ...prev, photo_url: url }));
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
      if (isEditing) {
        await membersService.updateMember(id, formData);
      } else {
        await membersService.createMember(formData);
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
              {isEditing ? 'Update existing member information and photo.' : 'Add a new verified student or faculty member.'}
            </p>
          </div>
        </div>
      </div>

      {errorMsg && (
        <div className="bg-rose-50 border border-rose-200 text-rose-700 px-4 py-3 rounded-2xl text-xs font-bold">
          {errorMsg}
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-sm space-y-6">
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          
          {/* Member Name */}
          <div className="space-y-1.5 sm:col-span-2">
            <label className="text-xs font-bold text-slate-700">Full Name *</label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. M. Satish Kumar"
              className="w-full px-4 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500 bg-slate-50"
            />
          </div>

          {/* Academic Year */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700">Academic Year</label>
            <select
              name="year"
              value={formData.year}
              onChange={handleChange}
              className="w-full px-4 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500 bg-slate-50"
            >
              {yearsOptions.map((y) => (
                <option key={y} value={y}>{y}</option>
              ))}
            </select>
          </div>

          {/* Department */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700">Department</label>
            <select
              name="department"
              value={formData.department}
              onChange={handleChange}
              className="w-full px-4 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500 bg-slate-50"
            >
              {departmentOptions.map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>

          {/* Email */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700">Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="e.g. satish.m@sasi.ac.in"
              className="w-full px-4 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500 bg-slate-50"
            />
          </div>

          {/* Optional Role */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700">Role (Optional)</label>
            <input
              type="text"
              name="role"
              value={formData.role}
              onChange={handleChange}
              placeholder="e.g. Chapter Member, Executive Member, Web Lead"
              className="w-full px-4 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500 bg-slate-50"
            />
          </div>

          {/* ACM Membership Toggle */}
          <div className="space-y-1.5 sm:col-span-2 bg-blue-50/70 p-4 rounded-2xl border border-blue-100 flex items-center justify-between">
            <div>
              <div className="text-xs font-bold text-slate-900 flex items-center space-x-1.5">
                <ShieldCheck className="w-4 h-4 text-[#0066CC]" />
                <span>ACM International Member</span>
              </div>
              <div className="text-[11px] text-slate-500">
                Check if the student has a registered ACM global membership card number.
              </div>
            </div>

            <input
              type="checkbox"
              name="is_acm_member"
              checked={formData.is_acm_member}
              onChange={handleChange}
              className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500 cursor-pointer"
            />
          </div>

          {/* ACM Member Number */}
          {formData.is_acm_member && (
            <div className="space-y-1.5 sm:col-span-2">
              <label className="text-xs font-bold text-slate-700">ACM Member Number (Optional)</label>
              <input
                type="text"
                name="acm_number"
                value={formData.acm_number}
                onChange={handleChange}
                placeholder="e.g. ACM-8492019"
                className="w-full px-4 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500 bg-slate-50"
              />
            </div>
          )}

          {/* Profile Photo Upload */}
          <div className="space-y-2 sm:col-span-2">
            <label className="text-xs font-bold text-slate-700">Profile Photo</label>
            <div className="flex items-center space-x-4">
              {formData.photo_url ? (
                <img
                  src={formData.photo_url}
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
