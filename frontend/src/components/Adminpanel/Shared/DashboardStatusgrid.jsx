import React, { useEffect, useState } from 'react';
import { FaUserGroup } from 'react-icons/fa6';
import { IoBagHandle } from 'react-icons/io5';
import axios from 'axios';

function DashboardStatusgrid() {
    const [totalCustomers, setTotalCustomers] = useState(0);
    const [totalStaff, setTotalStaff] = useState(0);
    const [totalBookings, setTotalBookings] = useState(0);

    // Define variables for colors
    const customColor1 = 'bg-purple-800';
    const customColor2 = 'bg-red-800';
    const customColor3 = 'bg-gray-900';

    useEffect(() => {
        // Function to fetch total customers
    // Function to fetch total customers
   // Function to fetch total customers
   const fetchUserCounts = async () => {
    const token = localStorage.getItem('accessToken'); // Retrieve the access token from local storage
    
    try {
        const response = await axios.get('http://127.0.0.1:8000/users/', {
            headers: {
                Authorization: `Bearer ${token}`, // Include the token in the request header
                'Content-Type': 'application/json'
            }
        });

        const users = response.data; // This should be the array of user objects
        let customers = 0;
        let staff = 0;

        // Loop through users and count based on is_staff
        users.forEach(user => {
            if (user.is_staff) {
                staff += 1; // Increment staff count
            } else {
                customers += 1; // Increment customer count
            }
        });

        // Set the state with the counted values
        setTotalCustomers(customers);
        setTotalStaff(staff-1);

    } catch (error) {
        console.error('Error fetching user counts:', error);
    }
};

fetchUserCounts();// Runs once on component mount


        const fetchBookingCount = async () => {
            const token = localStorage.getItem('accessToken'); // Get the access token from local storage
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/v1/customerbooking/', {
                    headers: {
                        Authorization: `Bearer ${token}`, // Pass the access token
                    },
                });
                setTotalBookings(response.data.length); // Assuming the response returns an array of bookings
            } catch (error) {
                console.error('Error fetching booking count:', error);
            }
        };
        

        fetchUserCounts();
        fetchBookingCount();
    }, []); // Runs once on component mount

    return (
        <div className="flex gap-4 w-full">
            {/* Box 1: Total Customers */}
            <div className="flex-1 p-6">
                <div className={`${customColor1} rounded-lg border border-white flex items-center px-6 py-4 text-white font-semibold`}>
                    {/* Icon */}
                    <div className='rounded-full h-14 w-14 flex items-center justify-center bg-purple-600'>
                        <FaUserGroup className='text-3xl text-white' />
                    </div>
                    {/* Content */}
                    <div className='pl-4'>
                        <span className='text-lg text-white font-semibold'>Total Customers</span>
                        <div className='flex items-center'>
                            <strong className='text-2xl text-white font-bold'>{totalCustomers}</strong>
                        </div>
                    </div>
                </div>
            </div>

            {/* Box 2: Total Staff */}
            <div className="flex-1 p-6">
                <div className={`${customColor2} rounded-lg border border-white flex items-center px-6 py-4 text-white font-semibold`}>
                    {/* Icon */}
                    <div className='rounded-full h-14 w-14 flex items-center justify-center bg-red-600'>
                        <IoBagHandle className='text-3xl text-white' />
                    </div>
                    {/* Content */}
                    <div className='pl-4'>
                        <span className='text-lg text-white font-semibold'>Total Staff</span>
                        <div className='flex items-center'>
                            <strong className='text-2xl text-white font-bold'>{totalStaff}</strong>
                        </div>
                    </div>
                </div>
            </div>

            {/* Box 3: Total Bookings */}
            <div className="flex-1 p-6">
                <div className={`${customColor3} rounded-lg border border-white flex items-center px-6 py-4 text-white font-semibold`}>
                    {/* Icon */}
                    <div className='rounded-full h-14 w-14 flex items-center justify-center bg-gray-600'>
                        <IoBagHandle className='text-3xl text-white' />
                    </div>
                    {/* Content */}
                    <div className='pl-4'>
                        <span className='text-lg text-white font-semibold'>Total Appointments</span>
                        <div className='flex items-center'>
                            <strong className='text-2xl text-white font-bold'>{totalBookings}</strong>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DashboardStatusgrid;
