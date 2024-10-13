import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute_tech = ({ isLoggedIn, children }) => {
  if (!isLoggedIn) {
    // If not logged in, redirect to login page
    return <Navigate to="/technicianlogin" />;
  }

  // If logged in, render the children components (protected content)
  return children;
};

export default ProtectedRoute_tech;
