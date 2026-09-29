import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import {
  ArrowLeft,
  Calendar,
  Image as ImageIcon,
  Upload,
  UserCheck,
  Save,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { eventsService } from '../../services/eventsService';

export default function AdminEventFormPage() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    description: '',
    event_date: '',
    event_time: '10:00 AM',
    category: 'Technical Event',
    location: 'SASI Campus',
    mode: 'In-Person',
    image_url: '',
    speaker_name: '',
    speaker_designation: '',
    registration_fee: 'Free',
    max_participants: 150,
    registration_status: 'Open',
  });

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(isEdit);
  const [errorMsg, setErrorMsg] = useState('');

  // Fetch event details if editing
  useEffect(() => {
    if (isEdit) {
      async function fetchEvent() {
        try {
          const evt = await eventsService.getEventById(id);
          if (evt) {
            let parsedDate = '';
            if (evt.event_date || evt.date) {
              const d = new Date(evt.event_date || evt.date);
              if (!isNaN(d.getTime())) {
                parsedDate = d.toISOString().split('T')[0];
              }
            }
            setFormData({
              title: evt.title || '',
              slug: evt.slug || '',
              description: evt.description || '',
              event_date: parsedDate,
              event_time: evt.event_time || evt.time || '10:00 AM',
              category: evt.category || 'Technical Event',
              location: evt.location || 'SASI Campus',
              mode: evt.mode || 'In-Person',
              image_url: evt.image_url || evt.image || '',
              speaker_name: evt.speaker || evt.speaker_name || '',
              speaker_designation: evt.speaker_title || evt.speaker_designation || '',
              registration_fee: evt.registration_fee || 'Free',
              max_participants: evt.max_participants || 150,
              registration_status: evt.registration_status || 'Open',
            });
            setImagePreview(evt.image_url || evt.image || '');
          }
        } catch (err) {
          console.error('Error fetching event for edit:', err);
          setErrorMsg('Failed to load event data.');
        } finally {
          setFetching(false);
        }
      }
      fetchEvent();
    }
  }, [id, isEdit]);

  // Handle Title input and auto-generate slug
  const handleTitleChange = (val) => {
    setFormData(prev => ({
      ...prev,
      title: val,
      slug: isEdit ? prev.slug : val.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''),
    }));
  };

  // Handle Image File select
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      let finalImageUrl = formData.image_url;

      if (imageFile) {
        finalImageUrl = await eventsService.uploadImage(imageFile);
      }

      // Convert date to ISO timestamp
      let isoDate = new Date().toISOString();
      if (formData.event_date) {
        const d = new Date(formData.event_date);
        if (!isNaN(d.getTime())) {
          isoDate = d.toISOString();
        }
      }

      const payload = {
        title: formData.title,
        slug: formData.slug || formData.title.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''),
        category: formData.category,
        mode: formData.mode,
        event_date: isoDate,
        location: formData.location,
        description: formData.description,
        speaker: formData.speaker_name || 'SITE ACM Mentors',
        speaker_title: formData.speaker_designation || '',
        registration_status: formData.registration_status,
        image_url: finalImageUrl || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1000&q=80',
        is_upcoming: formData.registration_status !== 'Closed',
        is_featured: false,
      };

      if (isEdit) {
        await eventsService.updateEvent(id, payload);
      } else {
        await eventsService.createEvent(payload);
      }

      navigate('/admin/events');
    } catch (err) {
      console.error('Form submission failed:', err);
      setErrorMsg(err.message || 'Failed to save event. Please check required fields.');
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="py-20 text-center text-slate-400 text-xs">
        <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
        Loading event form...
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      
      {/* Back Link */}
      <div>
        <Link
          to="/admin/events"
          className="inline-flex items-center text-xs font-bold text-slate-500 hover:text-[#0066CC] transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-1.5" />
          Back to Events List
        </Link>
      </div>

      {/* Header */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-sm space-y-2">
        <div className="inline-flex items-center space-x-2 bg-blue-50 border border-blue-200 px-3 py-1 rounded-full text-xs font-bold text-[#0066CC] uppercase tracking-wider">
          <Calendar className="w-3.5 h-3.5" />
          <span>{isEdit ? 'Edit Event' : 'New Event Registration'}</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          {isEdit ? `Edit: ${formData.title}` : 'Create New Chapter Event'}
        </h1>
        <p className="text-xs text-slate-500">
          Fill in the required information. Newly published events appear automatically on the public website.
        </p>
      </div>

      {errorMsg && (
        <div className="bg-rose-50 border border-rose-200 text-rose-700 p-4 rounded-2xl text-xs font-medium flex items-center space-x-2">
          <AlertCircle className="w-4 h-4 text-rose-500 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Main Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Section 1: Basic Information */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-sm space-y-6">
          <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center justify-between">
            <span>EVENT INFORMATION</span>
            <span className="text-xs font-semibold text-rose-500">* Required</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            
            {/* Title */}
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Event Title *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Code to Cloud"
                value={formData.title}
                onChange={(e) => handleTitleChange(e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-semibold text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white"
              />
            </div>

            {/* Slug */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Event Slug (URL Path)
              </label>
              <input
                type="text"
                placeholder="code-to-cloud"
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-mono text-slate-700 focus:outline-none focus:border-blue-600 focus:bg-white"
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Category *
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-semibold text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white"
              >
                <option value="Technical Event">Technical Event</option>
                <option value="Hackathon">Hackathon</option>
                <option value="Seminar">Seminar</option>
                <option value="Outreach">Outreach</option>
                <option value="Workshop">Workshop</option>
              </select>
            </div>

            {/* Date */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Event Date *
              </label>
              <input
                type="date"
                required
                value={formData.event_date}
                onChange={(e) => setFormData({ ...formData, event_date: e.target.value })}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-semibold text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white"
              />
            </div>

            {/* Time */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Event Time
              </label>
              <input
                type="text"
                placeholder="e.g. 10:00 AM - 01:00 PM"
                value={formData.event_time}
                onChange={(e) => setFormData({ ...formData, event_time: e.target.value })}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-semibold text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white"
              />
            </div>

            {/* Location */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Location / Venue
              </label>
              <input
                type="text"
                placeholder="e.g. SASI Main Auditorium"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-semibold text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white"
              />
            </div>

            {/* Mode */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Event Mode
              </label>
              <select
                value={formData.mode}
                onChange={(e) => setFormData({ ...formData, mode: e.target.value })}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-semibold text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white"
              >
                <option value="On Campus">On Campus</option>
                <option value="Online">Online</option>
                <option value="Hybrid">Hybrid</option>
              </select>
            </div>

            {/* Description */}
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Event Description & Impact Summary
              </label>
              <textarea
                rows="4"
                placeholder="Describe the objective, key takeaways, and schedule..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs text-slate-900 leading-relaxed focus:outline-none focus:border-blue-600 focus:bg-white"
              ></textarea>
            </div>

          </div>
        </div>

        {/* Section 2: Banner Image Upload */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-sm space-y-4">
          <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center space-x-2">
            <ImageIcon className="w-4 h-4 text-blue-600" />
            <span>EVENT BANNER IMAGE</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2">
                Upload Image File or Enter Direct Image URL
              </label>
              
              <div className="space-y-3">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full text-xs text-slate-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-blue-50 file:text-[#0066CC] hover:file:bg-blue-100 cursor-pointer"
                />

                <input
                  type="url"
                  placeholder="https://images.unsplash.com/photo-..."
                  value={formData.image_url}
                  onChange={(e) => {
                    setFormData({ ...formData, image_url: e.target.value });
                    setImagePreview(e.target.value);
                  }}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-blue-600"
                />
              </div>
            </div>

            {/* Preview Box */}
            <div className="h-44 rounded-2xl bg-slate-100 border-2 border-dashed border-slate-200 overflow-hidden flex items-center justify-center relative">
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="text-center text-slate-400 space-y-1">
                  <Upload className="w-6 h-6 mx-auto opacity-50" />
                  <span className="text-[11px] font-semibold block">No image selected</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Section 3: Speaker & Capacity Details */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-sm space-y-6">
          <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center space-x-2">
            <UserCheck className="w-4 h-4 text-blue-600" />
            <span>SPEAKER & CAPACITY DETAILS (OPTIONAL)</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Speaker Name
              </label>
              <input
                type="text"
                placeholder="e.g. Dr. Sivakumar Perumal"
                value={formData.speaker_name}
                onChange={(e) => setFormData({ ...formData, speaker_name: e.target.value })}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-semibold text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Speaker Designation / Title
              </label>
              <input
                type="text"
                placeholder="e.g. Head of CSE / ACM Senior Member"
                value={formData.speaker_designation}
                onChange={(e) => setFormData({ ...formData, speaker_designation: e.target.value })}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-semibold text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Registration Status *
              </label>
              <select
                value={formData.registration_status}
                onChange={(e) => setFormData({ ...formData, registration_status: e.target.value })}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-bold text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white"
              >
                <option value="Open">Open for Registration</option>
                <option value="Upcoming">Upcoming (Coming Soon)</option>
                <option value="Closed">Registration Closed</option>
              </select>
            </div>

          </div>
        </div>

        {/* Submit Actions */}
        <div className="flex items-center justify-end space-x-4 pt-4">
          <Link
            to="/admin/events"
            className="px-6 py-3.5 rounded-2xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-100 transition-all"
          >
            Cancel
          </Link>

          <button
            type="submit"
            disabled={loading}
            className="bg-[#0066CC] hover:bg-blue-700 text-white font-bold px-8 py-3.5 rounded-2xl shadow-xl shadow-blue-500/20 transition-all text-xs uppercase tracking-wider flex items-center space-x-2 disabled:opacity-50"
          >
            {loading ? (
              <span>Saving Event...</span>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>{isEdit ? 'Save Changes' : 'Create & Publish Event'}</span>
              </>
            )}
          </button>
        </div>

      </form>

    </div>
  );
}
