import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useFirebaseAuth } from '../firebase/FirebaseAuthContext';

const ProtectedRoute = ({ children, requiredRole, requireVerification = true }) => {
  const { isAuthenticated, isLoading, user, userProfile } = useFirebaseAuth();
  const [showLoading, setShowLoading] = useState(true);

  // Debug logging
  console.log('ProtectedRoute:', { 
    isAuthenticated, 
    isLoading, 
    emailVerified: user?.emailVerified,
    userRole: userProfile?.role, 
    requiredRole 
  });

  // Safety timeout - stop showing loading after 3 seconds max
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  // Show loading only briefly during auth check (max 3 seconds)
  if (isLoading && showLoading) {
    return (
      <div className="min-h-screen bg-dark-primary flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-3 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-text-secondary text-sm">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    console.log('ProtectedRoute: Not authenticated, redirecting to login');
    return <Navigate to="/login" replace />;
  }

  // Check email verification if required
  if (requireVerification && !user?.emailVerified) {
    console.log('ProtectedRoute: Email not verified, redirecting to verify-email');
    return <Navigate to="/verify-email" replace />;
  }

  if (requiredRole && userProfile?.role !== requiredRole) {
    const dashboardPath = userProfile?.role === 'client' ? '/client/dashboard' : '/freelancer/dashboard';
    console.log('ProtectedRoute: Wrong role, redirecting to', dashboardPath);
    return <Navigate to={dashboardPath} replace />;
  }

  console.log('ProtectedRoute: Rendering children');
  return children;
};

export default ProtectedRoute;
