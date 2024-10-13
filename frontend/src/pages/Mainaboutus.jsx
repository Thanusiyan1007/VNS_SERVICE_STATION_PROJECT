import React, { useEffect } from 'react';
import { BsDribbble, BsFacebook, BsGithub, BsInstagram, BsTwitter } from "react-icons/bs";
import { FaRegHandshake, FaBullseye, FaLightbulb } from "react-icons/fa";
import logo from '../Assets/Service 24_7-amico.svg';
import { motion } from 'framer-motion'; // Import framer-motion for interactive animations
import AOS from 'aos'; // Import AOS for scroll animations
import 'aos/dist/aos.css'; // Import AOS styles

function Mainaboutus() {
    useEffect(() => {
        // Initialize AOS for scroll-triggered animations
        AOS.init({
            duration: 1000, // Smooth animations
            easing: 'ease-in-out', 
            once: true // Animation triggers once on scroll
        });
    }, []);

    return (
        <section className='py-16 px-6 lg:px-14 max-w-screen-2xl mx-auto mt-16' id='main-about-us'>
            <motion.div
                className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-center'
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, ease: 'easeInOut' }} // Smooth side-slide for content
            >
                {/* Left Side - Logo */}
                <motion.div
                    className='flex justify-center lg:justify-end'
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, ease: 'easeInOut' }} // Smooth scaling effect
                >
                    <img src={logo} alt="VNS Service Station" className='w-full lg:max-w-lg h-auto' />
                </motion.div>

                {/* Right Side - Description */}
                <div className='lg:pl-12' data-aos="fade-left">
                    <h1 className='text-4xl font-bold text-maincolor mb-6'>About Us</h1>
                    <p className='text-lg lg:text-xl text-gray-700 mb-6'>
                        Welcome to VNS Service Station, your trusted partner for high-quality services in CCTV installation, plumbing solutions, and wiring services. Our experienced technicians are dedicated to providing top-notch services to ensure the safety, efficiency, and reliability of your systems.
                    </p>
                </div>
            </motion.div>

            <motion.div
                className='grid gap-12 lg:grid-cols-3 text-center lg:text-left mt-16'
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: 'easeInOut' }} // Smooth upward fade for the mission, vision, and values sections
            >
                {/* Our Mission */}
                <div data-aos="fade-up">
                    <h2 className='text-3xl font-semibold mb-4 flex justify-center lg:justify-start items-center'>
                        <FaRegHandshake className='mr-2 text-maincolor' /> Our Mission
                    </h2>
                    <p className='text-gray-700'>
                        At VNS Service Station, our mission is to deliver exceptional service and build lasting relationships with our customers. We strive to meet and exceed your expectations through our commitment to quality and customer satisfaction.
                    </p>
                </div>

                {/* Our Vision */}
                <div data-aos="fade-up" data-aos-delay="100">
                    <h2 className='text-3xl font-semibold mb-4 flex justify-center lg:justify-start items-center'>
                        <FaBullseye className='mr-2 text-maincolor' /> Our Vision
                    </h2>
                    <p className='text-gray-700'>
                        Our vision is to be the leading service provider in our industry, known for our innovation, reliability, and excellence. We aim to continuously improve and expand our services to meet the evolving needs of our customers.
                    </p>
                </div>

                {/* Our Values */}
                <div data-aos="fade-up" data-aos-delay="200">
                    <h2 className='text-3xl font-semibold mb-4 flex justify-center lg:justify-start items-center'>
                        <FaLightbulb className='mr-2 text-maincolor' /> Our Values
                    </h2>
                    <ul className='text-gray-700 list-disc list-inside'>
                        <li className='mb-2'>Customer Focus: We prioritize our customers' needs and work tirelessly to ensure their satisfaction.</li>
                        <li className='mb-2'>Integrity: We conduct our business with honesty and transparency.</li>
                        <li className='mb-2'>Quality: We are committed to providing the highest quality of service.</li>
                        <li className='mb-2'>Innovation: We embrace new ideas and technologies to deliver the best solutions.</li>
                    </ul>
                </div>
            </motion.div>

            <motion.div
                className='mt-16 text-center'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.2, ease: 'easeInOut' }} // Smooth fade-in for social icons
            >
                <h2 className='text-3xl font-semibold mb-4'>Follow Us</h2>
                <div className="flex justify-center space-x-6 text-3xl">
                    <motion.a
                        href="#"
                        className="text-maincolor hover:text-blue-600 transition-colors duration-300"
                        whileHover={{ scale: 1.2 }} // Interactive scaling on hover
                    >
                        <BsFacebook />
                    </motion.a>
                    <motion.a
                        href="#"
                        className="text-maincolor hover:text-pink-600 transition-colors duration-300"
                        whileHover={{ scale: 1.2 }} // Interactive scaling on hover
                    >
                        <BsInstagram />
                    </motion.a>
                    <motion.a
                        href="#"
                        className="text-maincolor hover:text-blue-400 transition-colors duration-300"
                        whileHover={{ scale: 1.2 }} // Interactive scaling on hover
                    >
                        <BsTwitter />
                    </motion.a>
                    <motion.a
                        href="#"
                        className="text-maincolor hover:text-gray-800 transition-colors duration-300"
                        whileHover={{ scale: 1.2 }} // Interactive scaling on hover
                    >
                        <BsGithub />
                    </motion.a>
                    <motion.a
                        href="#"
                        className="text-maincolor hover:text-pink-400 transition-colors duration-300"
                        whileHover={{ scale: 1.2 }} // Interactive scaling on hover
                    >
                        <BsDribbble />
                    </motion.a>
                </div>
            </motion.div>
        </section>
    );
}

export default Mainaboutus;
