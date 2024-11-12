import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUserRole } from '../hooks/useUserRole';

export function ProtectedRoute({ children, requiredRole }) {
  const { role, loading } = useUserRole();

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (!role) {
    return <Navigate to="/login" />;
  }

  if (requiredRole && role !== requiredRole && role !== 'admin') {
    return <Navigate to="/unauthorized" />;
  }

  return children;
} 