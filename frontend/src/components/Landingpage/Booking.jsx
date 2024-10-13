import React, { useState, useEffect } from 'react'; // Import useState and useEffect
import booking1 from '../../Assets/Booking.svg';
import Button from '../Button';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion'; // Import framer-motion for smooth transitions
import AOS from 'aos'; // Import AOS for scroll animations
import 'aos/dist/aos.css'; // Import AOS styles

function Booking() {
    const [isLoggedIn, setIsLoggedIn] = useState(false); // State to check if user is logged in

    useEffect(() => {
        // Initialize AOS for scroll-triggered animations
        AOS.init({ 
            duration: 1000, // Set duration for the animations
            easing: 'ease-in-out', // Smooth easing for the scroll animations
            once: true // Trigger the animation only once
        });
    }, []);

    useEffect(() => {
        // Check if access token exists in localStorage
        const token = localStorage.getItem('accessToken');
        if (token) {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }
    }, []); // Runs once when the component mounts

    return (
        <div className='px-4 py-10 lg:px-14 max-w-screen-2xl mx-auto mt-16' id='booking'>
            <motion.div
                className='flex items-center justify-between mb-8'
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: 'easeInOut' }} // Smooth animation for the heading
            >
                <h1 className='text-3xl font-bold text-maincolor' data-aos="fade-down">
                    Booking
                </h1>
            </motion.div>

            <motion.div
                className='flex flex-col md:flex-row items-center justify-between mb-8'
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: 'easeInOut' }} // Smooth side-slide animation for content
            >
                <img 
                    src={booking1} 
                    alt="booking" 
                    className='w-full md:w-[36%] mb-4 md:mb-0 order-first md:order-last'
                    data-aos="fade-left" // Scroll-triggered animation for image
                />
                <ul 
                    className='text-2xl text-subcolor md:ml-8 list-disc pl-5'
                    data-aos="fade-right" // Scroll-triggered animation for list
                >
                    <li>Booking availability subject to change based on demand and scheduling.</li>
                    <li>Specific time slots not guaranteed.</li>
                    <li>Our technician will first check the booked area and confirm if the service is possible.</li>
                    <li>If the area is not feasible, booking will be cancelled.</li>
                    <li>Booking will be confirmed only if the area is suitable for service.</li>
                    <li>Team will communicate any scheduling changes or adjustments.</li>
                    <li>Thank you for your understanding.</li>
                </ul>
            </motion.div>

            {isLoggedIn && (
            <motion.div
                className="flex justify-end mt-8"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: 'easeInOut' }} // Smooth scaling effect for the button
                data-aos="fade-up"
            >
                <Link to="/booking">
                    <Button className='w-40 bg-maincolor font-white self-end'>
                        CONTINUE
                    </Button>
                </Link>
            </motion.div>
            )}
        </div>
    );
}

export default Booking;
