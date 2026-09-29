import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

// Public Components & Pages
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import EventsPage from './pages/EventsPage';
import EventDetailsPage from './pages/EventDetailsPage';
import WorkshopsPage from './pages/WorkshopsPage';
import TeamPage from './pages/TeamPage';
import MembersPage from './pages/MembersPage';
import AchievementsPage from './pages/AchievementsPage';
import MembershipPage from './pages/MembershipPage';
import GalleryPage from './pages/GalleryPage';
import ContactPage from './pages/ContactPage';

// Admin Components & Pages
import AdminProtectedRoute from './components/admin/AdminProtectedRoute';
import AdminLoginPage from './pages/admin/AdminLoginPage';
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import AdminEventsPage from './pages/admin/AdminEventsPage';
import AdminEventFormPage from './pages/admin/AdminEventFormPage';
import AdminMembersPage from './pages/admin/AdminMembersPage';
import AdminMemberFormPage from './pages/admin/AdminMemberFormPage';
import AdminRegistrationsPage from './pages/admin/AdminRegistrationsPage';
import AdminMembershipRequestsPage from './pages/admin/AdminMembershipRequestsPage';
import AdminSettingsPage from './pages/admin/AdminSettingsPage';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <div className="min-h-screen flex flex-col justify-between bg-slate-50 text-slate-900 font-sans">
      <ScrollToTop />
      
      {/* Public Header is rendered only for public routes */}
      {!isAdminRoute && <Header />}

      <div className="flex-grow">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/events/:slug" element={<EventDetailsPage />} />
          <Route path="/workshops" element={<WorkshopsPage />} />
          <Route path="/team" element={<TeamPage />} />
          <Route path="/members" element={<MembersPage />} />
          <Route path="/achievements" element={<AchievementsPage />} />
          <Route path="/membership" element={<MembershipPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/contact" element={<ContactPage />} />

          {/* Admin Authentication Route */}
          <Route path="/admin/login" element={<AdminLoginPage />} />

          {/* Protected Admin Routes */}
          <Route
            path="/admin"
            element={
              <AdminProtectedRoute>
                <AdminDashboardPage />
              </AdminProtectedRoute>
            }
          />
          <Route
            path="/admin/events"
            element={
              <AdminProtectedRoute>
                <AdminEventsPage />
              </AdminProtectedRoute>
            }
          />
          <Route
            path="/admin/events/new"
            element={
              <AdminProtectedRoute>
                <AdminEventFormPage />
              </AdminProtectedRoute>
            }
          />
          <Route
            path="/admin/add-event"
            element={
              <AdminProtectedRoute>
                <AdminEventFormPage />
              </AdminProtectedRoute>
            }
          />
          <Route
            path="/admin/events/:id/edit"
            element={
              <AdminProtectedRoute>
                <AdminEventFormPage />
              </AdminProtectedRoute>
            }
          />

          {/* Admin Members Routes */}
          <Route
            path="/admin/members"
            element={
              <AdminProtectedRoute>
                <AdminMembersPage />
              </AdminProtectedRoute>
            }
          />
          <Route
            path="/admin/members/new"
            element={
              <AdminProtectedRoute>
                <AdminMemberFormPage />
              </AdminProtectedRoute>
            }
          />
          <Route
            path="/admin/members/:id/edit"
            element={
              <AdminProtectedRoute>
                <AdminMemberFormPage />
              </AdminProtectedRoute>
            }
          />

          <Route
            path="/admin/registrations"
            element={
              <AdminProtectedRoute>
                <AdminRegistrationsPage />
              </AdminProtectedRoute>
            }
          />
          <Route
            path="/admin/membership-requests"
            element={
              <AdminProtectedRoute>
                <AdminMembershipRequestsPage />
              </AdminProtectedRoute>
            }
          />
          <Route
            path="/admin/settings"
            element={
              <AdminProtectedRoute>
                <AdminSettingsPage />
              </AdminProtectedRoute>
            }
          />

        </Routes>
      </div>

      {/* Public Footer is rendered only for public routes */}
      {!isAdminRoute && <Footer />}
    </div>
  );
}
