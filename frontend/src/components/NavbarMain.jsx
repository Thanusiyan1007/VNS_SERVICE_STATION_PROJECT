import React, { useEffect, useState } from 'react';
import logo from '../Assets/Untitled-2 2.svg';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { FaXmark, FaBars, FaBell } from "react-icons/fa6"; // Import FaBell for notifications
import axios from 'axios'; // For API calls
import moment from 'moment'; // For formatting dates

const NavbarMain = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSticky, setIsSticky] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login state
    const [notifications, setNotifications] = useState([]); // State for notifications
    const [showDropdown, setShowDropdown] = useState(false); // State for showing notifications dropdown
    const navigate = useNavigate();

    // Toggle Menu 
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    // Toggle Notification Dropdown
    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    // Check login status and fetch notifications when component mounts
    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            setIsLoggedIn(true);
            fetchNotifications(); // Fetch notifications when logged in
        } else {
            setIsLoggedIn(false);
        }
    }, []);

    // Handle scrolling for sticky header
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 100) {
                setIsSticky(true);
            } else {
                setIsSticky(false);
            }
        };
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    // Fetch notifications from the API
    const fetchNotifications = async () => {
        try {
            const token = localStorage.getItem('accessToken');
            const customerEmail = localStorage.getItem('email'); // Get logged-in user's email

            const response = await axios.get('http://127.0.0.1:8000/api/v1/customerbooking/', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            // Filter bookings by logged-in customer's email
            const customerBookings = response.data.filter(
                booking => booking.customer === customerEmail
            );

            setNotifications(customerBookings); // Set notifications state
        } catch (err) {
            console.error('Failed to fetch notifications', err);
        }
    };

    // Logout function
    const handleLogout = () => {
        localStorage.removeItem('accessToken'); // Clear access token
        localStorage.removeItem('refreshToken'); // Optionally clear refresh token
        localStorage.removeItem('email');
        setIsLoggedIn(false); // Update the state
        window.location.reload(); // Refresh the page
        window.location.href = '/login'; // Redirect to login page
    };

    // navItems array
    const navItems = [
        { link: "Home", path: "/" },
        { link: "Services", path: "/service" },
        { link: "Portfolio", path: "/portfolio" },
        { link: "Products", path: "/products" }, // New Products Nav Item
        { link: "Reminders", path: "/reminder" },
        { link: "Booking", path: "/booking" },
        { link: "About Us", path: "/aboutus" },
    ];

    return (
        <header className='w-full bg-white md:bg-transparent fixed top-0 left-0 right-0 z-50'>
            <nav className={`py-4 lg:px-14 px-4 ${isSticky ? "sticky top-0 left-0 right-0 border-b bg-white duration-500" : ""}`}>
                <div className='flex justify-between items-center text-base gap-8'>
                    <RouterLink to='/'><img src={logo} alt='logo' className='w-10 inline-block items-center' /></RouterLink>

                    {/* nav items for large device */}
                    <ul className='md:flex space-x-12 hidden'>
                        {navItems.map(({ link, path }) => (
                            <RouterLink
                                to={path}
                                key={path}
                                className='block text-subcolor hover:text-maincolor first:font-bold font-medium md:text-lg'>
                                {link}
                            </RouterLink>
                        ))}
                    </ul>

                    {/* Conditional button for login/logout */}
                    <div className='space-x-12 hidden lg:flex items-center'>
                        {isLoggedIn ? (
                            <>
                                {/* Notification Icon with Badge */}
                                <div className='relative cursor-pointer' onClick={toggleDropdown}>
                                    <FaBell className='h-6 w-6 text-maincolor' />
                                    {notifications.length > 0 && (
                                        <span className='absolute bottom-3 left-3 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-red-600 rounded-full'>
                                            {notifications.length}
                                        </span>
                                    )}
                                </div>

                                {/* Notification Dropdown */}
                                {showDropdown && (
                                    <div className='absolute right-10 top-16 w-64 bg-white shadow-lg rounded-lg p-4'>
                                        {notifications.length > 0 ? (
                                            <>
                                                {notifications.map(notification => (
                                                    <div key={notification.id} className='p-2 border-b'>
                                                        <p className='text-sm'>
                                                            {`Appointment on ${moment(notification.appointment_date).format('MMMM Do, YYYY')}`}
                                                        </p>
                                                    </div>
                                                ))}
                                                <button
                                                    onClick={() => setNotifications([])} // Clear notifications
                                                    className='mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 w-full'>
                                                    Mark All as Read
                                                </button>
                                            </>
                                        ) : (
                                            <p className='text-sm text-gray-500'>No notifications</p>
                                        )}
                                    </div>
                                )}

                                <button 
                                    onClick={handleLogout}
                                    className='bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600'>
                                    Logout
                                </button>
                            </>
                        ) : (
                            <RouterLink to="/login">
                                <button className='bg-maincolor w-20 text-white py-2 px-2 transition-all duration-10 rounded hover:bg-subcolor'>
                                    Login
                                </button>
                            </RouterLink>
                        )}
                    </div>

                    {/* menu button for only mobile device */}
                    <div className='md:hidden'>
                        <button
                            onClick={toggleMenu}
                            className='text-maincolor focus:outline-none'>
                            {isMenuOpen ? (<FaXmark className='h-7 w-7 text-maincolor' />) : (<FaBars className='h-7 w-7 text-maincolor' />)}
                        </button>
                    </div>
                </div>

                {/* navItems for mobile devices */}
                <div className={`space-y-4 px-4 mt-20 py-7 bg-white ${isMenuOpen ? "block fixed top-0 right-0 left-0" : "hidden"}`}>
                    {navItems.map(({ link, path }) => (
                        <RouterLink
                            to={path}
                            key={path}
                            className='block text-subcolor hover:text-maincolor font-medium md:text-lg'>
                            {link}
                        </RouterLink>
                    ))}

                    {/* Conditional login/logout for mobile */}
                    <div className='mt-4'>
                        {isLoggedIn ? (
                            <>
                                {/* Notification Icon for mobile */}
                                <div className='relative cursor-pointer mb-4' onClick={toggleDropdown}>
                                    <FaBell className='h-6 w-6 text-maincolor' />
                                    {notifications.length > 0 && (
                                        <span className='absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-red-600 rounded-full'>
                                            {notifications.length}
                                        </span>
                                    )}
                                </div>
                                
                                {/* Notifications Dropdown for mobile */}
                                {showDropdown && (
                                    <div className='w-full bg-white shadow-lg rounded-lg p-4 mb-4'>
                                        {notifications.length > 0 ? (
                                            <>
                                                {notifications.map(notification => (
                                                    <div key={notification.id} className='p-2 border-b'>
                                                        <p className='text-sm'>
                                                            {`Appointment on ${moment(notification.appointment_date).format('MMMM Do, YYYY')}`}
                                                        </p>
                                                    </div>
                                                ))}
                                                <button
                                                    onClick={() => setNotifications([])} // Clear notifications
                                                    className='mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 w-full'>
                                                    Mark All as Read
                                                </button>
                                            </>
                                        ) : (
                                            <p className='text-sm text-gray-500'>No notifications</p>
                                        )}
                                    </div>
                                )}

                                <button 
                                    onClick={handleLogout}
                                    className='bg-red-500 text-white py-2 px-4 w-full rounded hover:bg-red-600'>
                                    Logout
                                </button>
                            </>
                        ) : (
                            <RouterLink to="/login" className="block text-center">
                                <button className='bg-maincolor w-20 text-white py-2 px-2 rounded'>
                                    Login
                                </button>
                            </RouterLink>
                        )}
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default NavbarMain;
