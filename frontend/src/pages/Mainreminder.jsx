import React, { useState, useEffect } from 'react';
import axios from 'axios';
import cal1 from '../Assets/calender.svg';
import { Alert } from "flowbite-react";
import { HiInformationCircle } from "react-icons/hi";
import girl1 from '../Assets/girl1.svg';
import Button from './../components/Button';
import { Link } from 'react-router-dom';
import moment from 'moment';  // Ensure moment.js is installed

function Mainreminder() {
    const [bookings, setBookings] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCustomerBookings = async () => {
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

                setBookings(customerBookings);

            } catch (err) {
                setError('Failed to fetch booking details.');
                console.error(err);
            }
        };

        fetchCustomerBookings(); // Fetch bookings on component mount
    }, []);

    return (
        <div className='px-4 py-10 lg:px-14 max-w-screen-2xl mx-auto mt-16' id='reminders'>
            <div className='flex items-center justify-between mb-8'>
                <h1 className='text-3xl font-bold text-maincolor'>
                    Reminders
                </h1>
                <div className='ml-auto'>
                    <img className='h-28 w-28' src={cal1} alt="Calendar" />
                </div>
            </div>

            {/* Alert Section */}
            {error && <p className="text-red-500">{error}</p>}
            {!error && bookings.length === 0 && (
                <p className="text-gray-500">No upcoming appointments found.</p>
            )}

            {bookings.map((booking) => {
                const today = moment().startOf('day'); // Get the current date (start of the day for accuracy)
                const appointmentDate = moment(booking.appointment_date).startOf('day'); // Convert appointment_date to a moment object and start of day
                const daysLeft = appointmentDate.diff(today, 'days'); // Calculate the difference in days

                return (
                    <Alert 
                        key={booking.id} 
                        color="warning" 
                        icon={HiInformationCircle} 
                        className='bg-maincolor text-white flex p-6 mb-8'
                    >
                        <div className='flex items-center h-[250px] text-lg'>
                            <img src={girl1} alt="Reminder Icon" className='w-20 h-20 mr-4' />
                            <div>
                                <span className="font-medium">Reminder alert!<br /></span>
                                You have an appointment on {moment(booking.appointment_date).format('MMMM Do, YYYY')}.<br />
                                <span>
                                    <strong>{daysLeft} days</strong> left until your appointment.
                                    
                                </span>
                            </div>
                        </div>
                    </Alert>
                );
            })}

            {/* Add Your Plan Button */}
            <div className="flex justify-end mt-8">
                <Link to="/Customer_booking">
                    <Button className='w-40 h-12 bg-maincolor text-white font-semibold rounded-lg transition-all duration-300 ease-in-out hover:bg-opacity-80'>
                        + Add your Plan
                    </Button>
                </Link>
            </div>
        </div>
    );
}

export default Mainreminder;
