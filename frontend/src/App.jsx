import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css'; 
import Homepage from './pages/Homepage';
import Mainbooking from './pages/Mainbooking';
import Mainhomecontent from './pages/Mainhomecontent';
import Mainportfolio from './pages/Mainportfolio';
import Mainreminder from './pages/Mainreminder';
import Mainservice from './pages/Mainservice';
import Mainaboutus from './pages/Mainaboutus';
import Login from './components/Login/Login';
import Layout1 from './components/Landingpage/Layout1';
import Layout from './components/Adminpanel/Shared/Layout';
import AdminDashboard from './components/Adminpanel/AdminDashboard';
import Adminlogin from './components/Adminpanel/Adminlogin';
import Appointments from './components/Adminpanel/Appointments';
import Technician from './components/Adminpanel/Technician';
import Customer from './components/Adminpanel/Customer';
import UserProfile from './components/Adminpanel/UserProfile';
import { Settings } from 'lucide-react';
import Logout from './components/Adminpanel/Logout';
import Layoutmain from './pages/Layoutmain';
import Register from './components/Login/Register';
import Customerbooking from './components/Booking/Customerbooking';
import Customer_booking from './pages/Customer_booking';
import ProtectedRoute from './components/ProtectedRoute';
import Mainproduct from './pages/Mainproduct';
import Logintech from './pages/Technician/Login/Login';
import ActivateAccount from './components/Login/ActivateAccount';
import ForgotPassword from './components/Login/ForgotPassword';
import ResetPassword from './components/Login/ResetPassword';
import Techdashbord from './pages/Technician/Dashbord/Techdashbord';
import NewAdminDashboard from './NewAdminpanel/NewAdminDashboard';
import DashboardLayout from './pages/Technician/Dashbord/dashboard_layout'; // Corrected the import name
import ProtectedRoute_tech from './components/ProtectedRoute_tech';
import CameraSearch from './components/chatBot/chatWithBot';
import ProtectedRoute_role from './components/ProtectedRoute_role';
import Admin_Main_Service from './components/Adminpanel/Admin_Main_Service';
import Utilites_service_service from './components/Adminpanel/Utilites_service_service';
import Admin_products from './components/Adminpanel/Admin_products';
import Booking_Details from './components/Adminpanel/Booking_Details';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    const userRole = localStorage.getItem('role');
    setIsLoggedIn(!!token); // Set logged-in state based on token presence
    setRole(userRole); // Set role state based on stored role
  }, []);

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Layout1 />}>
          <Route index element={<Homepage />} />
        </Route>


        <Route path="/" element={<Layoutmain />}>
          <Route path="/aboutus" element={<Mainaboutus />} />
        </Route>

        {/* Protected Routes */}
        <Route path="/" element={<Layoutmain />}>
          <Route
            path="/booking"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <Mainbooking />
              </ProtectedRoute>
            }
          />
          <Route
            path="/homecontent"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <Mainhomecontent />
              </ProtectedRoute>
            }
          />
          <Route
            path="/portfolio"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <Mainportfolio />
              </ProtectedRoute>
            }
          />
          <Route
            path="/reminder"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <Mainreminder />
              </ProtectedRoute>
            }
          />
          <Route
            path="/service"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <Mainservice />
              </ProtectedRoute>
            }
          />
          <Route
            path="/Customer_booking"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <Customer_booking />
              </ProtectedRoute>
            }
          />
          <Route
            path="/Products"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <Mainproduct />
              </ProtectedRoute>
            }
          />
        </Route>

        {/* Redirect login and register if already logged in */}
        <Route
          path="/login"
          element={isLoggedIn ? <Navigate to="/" replace /> : <Login />}
        />
        <Route
          path="/register"
          element={isLoggedIn ? <Navigate to="/" replace /> : <Register />}
        />

        {/* Tech Login Route */}
        <Route
          path="/technicianlogin"
          element={isLoggedIn ? <Navigate to="/techdashboard" replace /> : <Logintech />}
        />

        {/* Admin Routes */}
        <Route path="/admin" element={<Layout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="appointments" element={<Appointments />} />
          <Route path="technician" element={<Technician />} />
          <Route path="customer" element={<Customer />} />
          <Route path="profile" element={<UserProfile />} />
          <Route path='adminmainservice' element={<Admin_Main_Service/>}/>
          <Route path='utilitesservice' element={<Utilites_service_service/>}/>
          <Route path='adminproducts' element={<Admin_products/>}/>
          <Route path='bookingdetailsall' element={<Booking_Details/>}/>
          <Route path="settings" element={<Settings />} />
          <Route path="logout" element={<Logout />} />
        </Route>

        <Route path="/adminlogin" element={<Adminlogin />} />
        <Route path="/customerbooking" element={<Customerbooking />} />
        <Route path="/activate/:uid/:token" element={<ActivateAccount />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/password/reset/confirm/:uid/:token" element={<ResetPassword />} />
        <Route path="/newadmindashboard" element={<NewAdminDashboard />} />
        
        {/* Tech Dashboard Route */}
        <Route path="/techdashboard" element={
          <ProtectedRoute_tech isLoggedIn={isLoggedIn}>
            <ProtectedRoute_role isLoggedIn={isLoggedIn} role={role}>
              <DashboardLayout />
            </ProtectedRoute_role>
          </ProtectedRoute_tech>
        }>
          <Route index element={<Techdashbord />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
