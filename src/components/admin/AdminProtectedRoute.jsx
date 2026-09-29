import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { authService } from '../../services/authService';
import AdminLayout from './AdminLayout';
import { Loader2 } from 'lucide-react';

export default function AdminProtectedRoute({ children }) {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    let mounted = true;
    async function checkAuth() {
      try {
        const currentSession = await authService.getSession();
        if (mounted) {
          setSession(currentSession);
        }
      } catch (err) {
        console.error('Error fetching admin session:', err);
      } finally {
        if (mounted) setLoading(false);
      }
    }
    checkAuth();
    return () => { mounted = false; };
  }, [location.pathname]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center text-white">
        <div className="text-center space-y-3">
          <Loader2 className="w-8 h-8 text-blue-500 animate-spin mx-auto" />
          <div className="text-xs font-semibold text-slate-400">Verifying Admin Credentials...</div>
        </div>
      </div>
    );
  }

  if (!session) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  return <AdminLayout session={session}>{children}</AdminLayout>;
}
