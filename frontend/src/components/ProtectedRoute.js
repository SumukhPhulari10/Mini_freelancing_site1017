import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const ProtectedRoute = ({ children, requiredRole }) => {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && user?.role !== requiredRole) {
    // Redirect to appropriate dashboard based on user role
    const dashboardPath = user?.role === 'client' ? '/client/dashboard' : '/freelancer/dashboard';
    return <Navigate to={dashboardPath} replace />;
  }

  return children;
};

export default ProtectedRoute;
