import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaUser,FaRegCalendarAlt , FaClipboardList, FaTools, FaUsers, FaServicestack, FaBoxOpen } from 'react-icons/fa'; // Import relevant icons
import logo from '../../../Assets/Untitled-2 2.svg'; // Add your logo path

function Sidebar() {
    return (
        <div className='bg-adminmain w-64 p-6 flex flex-col rounded-sm shadow-lg h-screen'>
            {/* Top part with logo */}
            <div className='mb-8 flex items-center justify-center'>
                <img src={logo} alt="Logo" className='w-12 h-12 mr-3' />
                <h1 className='text-maincolor text-xl font-bold'>VSN Dashboard</h1>
            </div>

            {/* Navigation links */}
            <div className='flex-1'>
                <nav>
                    <ul className='space-y-4'>
                        <li>
                            <Link to="" className='flex items-center text-maincolor hover:bg-white p-3 rounded-md transition-colors duration-200'>
                                <FaHome className='mr-3' />
                                <span>Dashboard</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="appointments" className='flex items-center text-maincolor hover:bg-white p-3 rounded-md transition-colors duration-200'>
                                <FaClipboardList className='mr-3' />
                                <span>Appointments</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="technician" className='flex items-center text-maincolor hover:bg-white p-3 rounded-md transition-colors duration-200'>
                                <FaUsers className='mr-3' />
                                <span>Staffs</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="customer" className='flex items-center text-maincolor hover:bg-white p-3 rounded-md transition-colors duration-200'>
                                <FaUser className='mr-3' />
                                <span>Customer</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="adminmainservice" className='flex items-center text-maincolor hover:bg-white p-3 rounded-md transition-colors duration-200'>
                                <FaServicestack className='mr-3' />
                                <span>Main Service</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="utilitesservice" className='flex items-center text-maincolor hover:bg-white p-3 rounded-md transition-colors duration-200'>
                                <FaTools className='mr-3' />
                                <span>Utilities Service</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="adminproducts" className='flex items-center text-maincolor hover:bg-white p-3 rounded-md transition-colors duration-200'>
                                <FaBoxOpen className='mr-3' />
                                <span>Products</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="bookingdetailsall" className='flex items-center text-maincolor hover:bg-white p-3 rounded-md transition-colors duration-200'>
                                <FaRegCalendarAlt className='mr-3' />
                                <span>Booking Details</span>
                            </Link>
                        </li>
                    </ul>
                    <hr className='my-4 border-t-2 border-gray-300' />
                    <ul>
                        <li>
                            <Link to="profile" className='flex items-center text-maincolor hover:bg-white p-3 rounded-md transition-colors duration-200'>
                                <FaUser className='mr-3' />
                                <span>User Profile</span>
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>

            {/* Bottom spacing */}
            <div className='mt-auto'>
                {/* Add additional footer items here if needed */}
            </div>
        </div>
    );
}

export default Sidebar;
