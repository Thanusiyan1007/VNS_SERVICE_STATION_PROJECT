import React, { useEffect, useState } from 'react';
import logo from '../Assets/Untitled-2 2.svg';
import { Link as ScrollLink } from 'react-scroll'; // Rename one of the imports
import { Link as RouterLink, useNavigate } from 'react-router-dom'; // Rename one of the imports

// React icons
import { FaXmark, FaBars, FaBell } from "react-icons/fa6";
import axios from 'axios';
import moment from 'moment'; // Ensure moment.js is installed

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSticky, setIsSticky] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false); // State to check if user is logged in
    const [notifications, setNotifications] = useState([]); // State for notifications
    const [showDropdown, setShowDropdown] = useState(false); // State to toggle dropdown

    const navigate = useNavigate();

    // Toggle Menu 
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    useEffect(() => {
        // Check if access token exists in localStorage
        const token = localStorage.getItem('accessToken');
        if (token) {
            setIsLoggedIn(true);
            fetchNotifications(); // Fetch notifications if logged in
        } else {
            setIsLoggedIn(false);
        }
    }, []); // Runs once when the component mounts

    const fetchNotifications = async () => {
        try {
            const token = localStorage.getItem('accessToken'); // Get the token from localStorage
            const customerEmail = localStorage.getItem('email'); // Get logged-in user's email

            const response = await axios.get('http://127.0.0.1:8000/api/v1/customerbooking/', {
                headers: {
                    Authorization: `Bearer ${token}`, // Set the authorization header with the token
                },
            });

            // Filter bookings by logged-in customer's email
            const customerBookings = response.data.filter(
                booking => booking.customer === customerEmail
            );

            setNotifications(customerBookings); // Set notifications
        } catch (err) {
            console.error('Failed to fetch notifications', err);
        }
    };

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

    // Logout function
    const handleLogout = () => {
        localStorage.removeItem('accessToken'); // Clear access token
        localStorage.removeItem('refreshToken'); // Optionally clear refresh token
        localStorage.removeItem('email');
        setIsLoggedIn(false); // Update the state
        window.location.reload(); // Refresh the page
        window.location.href = '/login'; // Redirect to login page
    };

    // Mark notifications as read and clear the dropdown
    const handleMarkAsRead = () => {
        setNotifications([]); // Clear notifications after viewing
        setShowDropdown(false); // Hide dropdown after clicking
    };

    // navitems array
    const navItems = [
        { link: "Home", path: "home" },
        { link: "Services", path: "services" },
        { link: "Portfolio", path: "portfolio" },
        { link: "Products", path: "products" },
        { link: "Reminders", path: "reminders" },
        { link: "Booking", path: "booking" },
        { link: "AboutUs", path: "aboutUs" },
    ];

    return (
        <header className='w-full bg-white md:bg-transparent fixed top-0 left-0 right-0 z-50'>
            <nav className={`py-4 lg:px-14 px-4 ${isSticky ? "sticky top-0 left-0 right-0 border-b bg-white duration-500" : ""}`}>
                <div className='flex justify-between items-center text-base gap-8'>
                    <a href=''><img src={logo} alt='logo' className='w-10 inline-block items-center cursor-pointer' /></a>

                    {/* nav items for large device */}
                    <ul className='md:flex space-x-12 hidden'>
                        {navItems.map(({ link, path }) => (
                            <ScrollLink
                                to={path}
                                spy={true}
                                smooth={true}
                                offset={-50}
                                key={path}
                                className='block text-subcolor hover:text-maincolor first:font-bold font-medium md:text-lg cursor-pointer transition-transform duration-200 ease-in-out transform hover:scale-105'>
                                {link}
                            </ScrollLink>
                        ))}
                    </ul>

                    {/* Conditional button or profile image */}
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
                                                    onClick={handleMarkAsRead}
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
                                    className='bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 cursor-pointer transition-transform duration-200 ease-in-out transform hover:scale-105'>
                                    Logout
                                </button>
                            </>
                        ) : (
                            <RouterLink to="/login">
                                <button className='bg-maincolor w-20 text-white py-2 px-2 transition-all duration-200 rounded hover:bg-subcolor cursor-pointer transition-transform duration-200 ease-in-out transform hover:scale-105'>
                                    Login
                                </button>
                            </RouterLink>
                        )}
                    </div>

                    {/* menu button for only mobile device */}
                    <div className='md:hidden'>
                        <button
                            onClick={toggleMenu}
                            className='text-maincolor focus:outline-none cursor-pointer'>
                            {isMenuOpen ? (<FaXmark className='h-7 w-7 text-maincolor' />) : (<FaBars className='h-7 w-7 text-maincolor' />)}
                        </button>
                    </div>
                </div>

                {/* navItems for mobile devices */}
                <div className={`space-y-4 px-4 mt-20 py-7 bg-white ${isMenuOpen ? "block fixed top-0 right-0 left-0 z-50" : "hidden"}`}>
                    {navItems.map(({ link, path }) => (
                        <ScrollLink
                            to={path}
                            spy={true}
                            smooth={true}
                            offset={-100}
                            key={path}
                            className='block text-subcolor hover:text-maincolor font-medium md:text-lg cursor-pointer transition-transform duration-200 ease-in-out transform hover:scale-105'>
                            {link}
                        </ScrollLink>
                    ))}

                    {/* Conditional button or profile image for mobile */}
                    {isLoggedIn ? (
                        <>
                            <div className='relative cursor-pointer' onClick={toggleDropdown}>
                                <FaBell className='h-6 w-6 text-maincolor' />
                                {notifications.length > 0 && (
                                    <span className='absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-red-600 rounded-full'>
                                        {notifications.length}
                                    </span>
                                )}
                            </div>
                            {showDropdown && (
                                <div className='absolute right-10 top-12 w-64 bg-white shadow-lg rounded-lg p-4'>
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
                                                onClick={handleMarkAsRead}
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
                                className='bg-red-500 text-white py-2 px-4 w-full mt-4 rounded hover:bg-red-600 cursor-pointer transition-transform duration-200 ease-in-out transform hover:scale-105'>
                                Logout
                            </button>
                        </>
                    ) : (
                        <RouterLink to="/login" className="block text-center">
                            <button className='bg-maincolor w-20 text-white py-2 px-2 rounded cursor-pointer transition-transform duration-200 ease-in-out transform hover:scale-105'>
                                Login
                            </button>
                        </RouterLink>
                    )}
                </div>
            </nav>
        </header>
    );
};

export default Navbar;
