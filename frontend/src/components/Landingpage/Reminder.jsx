import React, { useState, useEffect } from 'react';
import axios from 'axios';
import cal1 from '../../Assets/calender.svg';
import { Alert } from "flowbite-react";
import { HiInformationCircle } from "react-icons/hi";
import girl1 from '../../Assets/girl1.svg';
import Button from '../Button';
import { Link } from 'react-router-dom';
import moment from 'moment';  // Ensure moment.js is installed
import { motion } from 'framer-motion'; // Import framer-motion for smooth transitions
import AOS from 'aos'; // Import AOS
import 'aos/dist/aos.css'; // Import AOS styles

function Reminder() {
    const [bookings, setBookings] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        AOS.init({ 
            duration: 1000, // Smooth animation with 1-second duration
            easing: 'ease-in-out', // Smooth easing
            once: true // Animation occurs once when scrolling
        });
    }, []);

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
        <div className='px-4 py-10 lg:px-14 max-w-screen-2xl mx-auto mt-16' id='reminders' data-aos="fade-in">
            <motion.div
                className='flex items-center justify-between mb-8'
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: 'easeInOut' }} // Framer-motion smooth transition
            >
                <h1 className='text-3xl font-bold text-maincolor' data-aos="fade-right">
                    Reminders
                </h1>
                <div className='ml-auto' data-aos="fade-left">
                    <img className='h-28 w-28' src={cal1} alt="Calendar" />
                </div>
            </motion.div>

            {/* Alert Section */}
            {error && <p className="text-red-500">{error}</p>}
            {!error && bookings.length === 0 && (
                <p className="text-gray-500" data-aos="fade-up">No upcoming appointments found.</p>
            )}

            {bookings
                .filter((booking) => {
                    const today = moment().startOf('day'); // Get the current date (start of the day for accuracy)
                    const appointmentDate = moment(booking.appointment_date).startOf('day'); // Convert appointment_date to a moment object and start of day
                    return appointmentDate.isAfter(today); // Filter to only include bookings with appointment dates after today
                })
                .map((booking) => {
                    const today = moment().startOf('day'); // Get the current date (start of the day for accuracy)
                    const appointmentDate = moment(booking.appointment_date).startOf('day'); // Convert appointment_date to a moment object and start of day
                    const daysLeft = appointmentDate.diff(today, 'days'); // Calculate the difference in days

                    return (
                        <motion.div
                            key={booking.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, ease: 'easeInOut' }} // Framer-motion for smooth alert animation
                            data-aos="fade-up" // AOS for scroll-triggered effect
                        >
                            <Alert 
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
                        </motion.div>
                    );
                })}

            {/* Add Your Plan Button */}
            <motion.div
                className="flex justify-end mt-8"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: 'easeInOut' }} // Smooth button animation
                data-aos="fade-up"
            >
                <Link to="/reminder">
                    <Button className='w-40 h-12 bg-maincolor text-white font-semibold rounded-lg transition-all duration-300 ease-in-out hover:bg-opacity-80'>
                        + Add your Plan
                    </Button>
                </Link>
            </motion.div>
        </div>
    );
}

export default Reminder;
