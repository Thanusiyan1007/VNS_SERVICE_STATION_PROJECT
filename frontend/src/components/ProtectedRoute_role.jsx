// ProtectedRoute_role.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute_role = ({ isLoggedIn, role, children }) => {
  // If the user is logged in and has the role 'user', restrict access to techdashboard
  if (isLoggedIn && role === 'customer') {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute_role;
