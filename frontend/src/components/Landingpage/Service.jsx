import React, { useEffect, useState } from 'react';
import { Card } from "flowbite-react";
import { motion } from 'framer-motion';
import axios from 'axios';
import Button from '../Button';
import { Link } from 'react-router-dom';
import AOS from 'aos'; // Import AOS
import 'aos/dist/aos.css'; // Import AOS styles

function Service() {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false); // State to check if user is logged in

    useEffect(() => {
        AOS.init({ 
            duration: 1200, // Increase duration for smoother animation
            easing: 'ease-in-out', // Smooth easing function
            once: true // Ensures animation occurs only once when scrolling
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

    useEffect(() => {
        // Fetch services from the API
        const fetchServices = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/v1/mainservice/');
                setServices(response.data);
                setLoading(false);
            } catch (error) {
                setError('Error fetching services');
                setLoading(false);
            }
        };

        fetchServices();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className='px-4 py-10 lg:px-14 max-w-screen-2xl mx-auto' id='services' data-aos="fade-down">
            <h1 className='text-3xl font-bold mb-9 text-maincolor' data-aos="fade-down">
                Our Services
            </h1>
            <motion.div
                className='grid grid-cols-1 md:grid-cols-3 gap-8'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.5, ease: 'easeInOut' }} // Smooth transition
            >
               {services.slice(0, 3).map(service => (
                    <motion.div
                        key={service.id}
                        className='flex flex-col items-center'
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        data-aos="fade-up" // Add AOS animation to each service card
                    >
                        <Card className='w-full'>
                            {/* Display the image if available */}
                            {service.image && (
                                <img src={service.image} alt={service.title} className='w-20 h-20 mb-5' />
                            )}
                            <h2 className='text-xl text-maincolor font-semibold mb-4'>{service.title}</h2>
                            <p className='text-2xl text-gray-600'>{service.description}</p>
                        </Card>
                    </motion.div>
                ))}
            </motion.div>
            <motion.div
                className='flex justify-end mt-16'
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 1.2, ease: 'easeInOut' }} // Smooth left-to-right transition
                data-aos="fade-left" // Add AOS animation to this section
            >
            {isLoggedIn && (
                <div className='flex justify-end '>
                    <Link to="/service">
                        <Button className='w-40 py-2 bg-maincolor text-white self-end'>
                            Explore Services
                        </Button>
                    </Link>
                </div>
            )}
            </motion.div>
        </div>
    );
}

export default Service;
