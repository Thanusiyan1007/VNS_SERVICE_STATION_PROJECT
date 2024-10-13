import React, { useEffect, useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { FaXmark, FaBars } from "react-icons/fa6";
import logo from '../Assets/Untitled-2 2.svg';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSticky, setIsSticky] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    // Toggle Menu 
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        setIsLoggedIn(!!token); // Check if user is logged in
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            setIsSticky(window.scrollY > 100);
        };
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const handleLogout = () => {
        // Remove tokens from localStorage
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('email');

        // Update the state
        setIsLoggedIn(false);

        // Reload the page to ensure complete logout and redirect to the login page
        window.location.reload(); // Refresh the page
        navigate('/technicianlogin'); // Redirect to the technician login page after reload
    };

    return (
        <header className='fixed top-0 left-0 right-0 z-50 w-full bg-white shadow-md'>
            <nav className={`py-4 lg:px-14 px-4 flex items-center ${isSticky ? "sticky top-0 border-b bg-white duration-500" : ""}`}>
                {/* Logo on the left side */}
                <RouterLink to="/" className="flex-shrink-0">
                    <img src={logo} alt="Logo" className="h-8 w-auto" /> {/* Adjust height as needed */}
                </RouterLink>

                {/* Center Name */}
                <div className="flex-grow text-center">
                    <h1 className="text-xl lg:text-2xl font-bold text-gray-800">VNS Service Station - Staff Portal</h1>
                </div>

                {/* Conditional button or profile image - align right */}
                <div className="hidden lg:flex flex-shrink-0 space-x-4">
                    {isLoggedIn ? (
                        <button 
                            onClick={handleLogout}
                            className='bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition-all duration-200'>
                            Logout
                        </button>
                    ) : (
                        <RouterLink to="/technicianlogin">
                            <button className='bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-all duration-200'>
                                Login
                            </button>
                        </RouterLink>
                    )}
                </div>

                {/* Mobile Menu Toggle */}
                <div className='lg:hidden flex-shrink-0'>
                    <button
                        onClick={toggleMenu}
                        className='text-gray-800 focus:outline-none'>
                        {isMenuOpen ? (<FaXmark className='h-7 w-7' />) : (<FaBars className='h-7 w-7' />)}
                    </button>
                </div>
            </nav>

            {/* Mobile Dropdown Menu */}
            <div className={`lg:hidden ${isMenuOpen ? "block" : "hidden"} space-y-4 px-4 py-7 bg-white shadow-lg`}>
                <div className="text-center">
                    <h1 className="text-lg font-bold text-gray-800">VNS Service Station - Staff Portal</h1>
                </div>

                {isLoggedIn ? (
                    <button 
                        onClick={handleLogout}
                        className='bg-red-500 text-white py-2 px-4 w-full rounded hover:bg-red-600'>
                        Logout
                    </button>
                ) : (
                    <RouterLink to="/technicianlogin" className="block text-center">
                        <button className='bg-blue-600 w-full text-white py-2 rounded hover:bg-blue-700'>
                            Login
                        </button>
                    </RouterLink>
                )}
            </div>
        </header>
    );
};

export default Navbar;
