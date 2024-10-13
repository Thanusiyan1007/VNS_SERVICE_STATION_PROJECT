import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaUser, FaCog, FaTools, FaBars, FaTimes } from 'react-icons/fa';
import { GiNotebook } from "react-icons/gi";
import logo from '../../../Assets/Untitled-2 2.svg'; // Add your logo path
import { IoLogOut } from "react-icons/io5";

function TechnicianSidebar() {
  const [isOpen, setIsOpen] = useState(false);

  // Toggle the sidebar visibility
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className='relative'>
      {/* Mobile Hamburger Icon */}
      <button 
        className="lg:hidden p-4 fixed top-0 left-0 z-50 text-white" 
        onClick={toggleSidebar}>
        {isOpen ? <FaTimes className="h-8 w-8" /> : <FaBars className="h-8 w-8" />}
      </button>

      {/* Sidebar */}
      <div
        className={`bg-gradient-to-b from-gray-800 to-gray-700 w-64 p-4 sm:p-6 flex flex-col h-full fixed z-40 transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 transition-transform duration-300 ease-in-out`}>
        
        {/* Top part with logo */}
        <div className='mb-8 flex items-center justify-center sm:justify-start'>
          <img src={logo} alt="Logo" className='w-10 sm:w-12 h-10 sm:h-12 mr-2' />
          <h1 className='text-gray-100 text-lg sm:text-xl font-bold'>Tech Dashboard</h1>
        </div>

        {/* Navigation links */}
        <div className='flex-1'>
          <nav>
            <ul>
              <li className='mb-4'>
                <Link to="/techdashboard" className='flex items-center text-gray-200 hover:bg-gray-600 p-3 rounded-md transition duration-200'>
                  <FaHome className='mr-2 sm:mr-3' />
                  <span>Dashboard</span>
                </Link>
              </li>
              <li className='mb-4'>
                <Link to="/technician-appointments" className='flex items-center text-gray-200 hover:bg-gray-600 p-3 rounded-md transition duration-200'>
                  <GiNotebook className='mr-2 sm:mr-3' />
                  <span>Appointments</span>
                </Link>
              </li>
              <li className='mb-4'>
                <Link to="/technician-tasks" className='flex items-center text-gray-200 hover:bg-gray-600 p-3 rounded-md transition duration-200'>
                  <FaTools className='mr-2 sm:mr-3' />
                  <span>Tasks</span>
                </Link>
              </li>
            </ul>
            <hr className='my-4 border-t-2 border-gray-500' />
            <ul>
              <li className='mb-4'>
                <Link to="/technician-profile" className='flex items-center text-gray-200 hover:bg-gray-600 p-3 rounded-md transition duration-200'>
                  <FaUser className='mr-2 sm:mr-3' />
                  <span>User Profile</span>
                </Link>
              </li>
              <li className='mb-4'>
                <Link to="/technician-settings" className='flex items-center text-gray-200 hover:bg-gray-600 p-3 rounded-md transition duration-200'>
                  <FaCog className='mr-2 sm:mr-3' />
                  <span>Settings</span>
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        <hr className='my-4 border-t-2 border-gray-500' />

        {/* Bottom part */}
        <div>
          <Link to="/logout" className='flex items-center text-gray-200 hover:bg-red-500 p-3 rounded-md transition duration-200'>
            <IoLogOut className='mr-2 sm:mr-3' />
            <span>Logout</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default TechnicianSidebar;
