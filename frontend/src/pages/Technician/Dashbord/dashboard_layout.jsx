import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../../../components/Navbar_tech'; // Ensure the correct import for your Navbar

function DashboardLayout() {
  return (
    <div>    
      {/* Navbar */}
      <Navbar />

      {/* Content area will take up the full space */}
      <div className="flex-1 p-4 min-h-screen">
        <Outlet />
      </div>
    </div>
  );
}

export default DashboardLayout;
