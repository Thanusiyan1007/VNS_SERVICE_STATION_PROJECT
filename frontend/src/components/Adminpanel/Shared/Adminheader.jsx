import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Adminheader() {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Remove tokens from localStorage
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('email');
        localStorage.removeItem('role')
        // Redirect to the login page after logging out
        navigate('/adminlogin');
    };

    return (
        <div className='bg-maincolor h-16 px-4 flex justify-end items-center text-white'>
            {/* Logout Button Only */}
            <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded-lg shadow hover:bg-red-600"
            >
                Sign out
            </button>
        </div>
    );
}

export default Adminheader;
