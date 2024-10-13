import React, { useEffect } from 'react';
import { Footer } from "flowbite-react";
import { BsDribbble, BsFacebook, BsGithub, BsInstagram, BsTwitter } from "react-icons/bs";
import logo from '../../Assets/Untitled-2 2.svg';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion'; // Import framer-motion for animations
import AOS from 'aos'; // Import AOS for scroll animations
import 'aos/dist/aos.css'; // Import AOS styles

function AboutUs() {
    useEffect(() => {
        // Initialize AOS for scroll animations
        AOS.init({
            duration: 1000, // Set duration for the animations
            easing: 'ease-in-out', // Smooth easing for the scroll animations
            once: true, // Trigger the animation only once
        });
    }, []);

    return (
        <Footer container className="px-4 lg:px-14 max-w-screen-2xl mx-auto mt-16 w-full" id='aboutUs'>
            <div className="w-full py-12" data-aos="fade-up">
                {/* Grid for Footer Content */}
                <motion.div
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 items-center"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: 'easeInOut' }} // Framer-motion for smooth transitions
                >
                    {/* Branding and Logo Section */}
                    <motion.div
                        className="flex flex-col items-center sm:items-start"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, ease: 'easeInOut' }} // Smooth scaling effect for the logo
                    >
                        <Link to="/aboutus">
                            <img src={logo} alt="VNS SERVICE STATION" className="w-24 h-auto mb-4" />
                        </Link>
                        <h2 className="text-lg font-bold text-maincolor">
                            VNS SERVICE STATION
                        </h2>
                    </motion.div>

                    {/* Footer Links Section */}
                    <div className="grid grid-cols-2 gap-8" data-aos="fade-right">
                        <div>
                            <Footer.Title title="About" />
                            <Footer.LinkGroup col>
                                <Footer.Link href="#">Our Services</Footer.Link>
                                <Footer.Link href="#">Group No - 2</Footer.Link>
                            </Footer.LinkGroup>
                        </div>
                        <div>
                            <Footer.Title title="Follow us" />
                            <Footer.LinkGroup col>
                                <Footer.Link href="#">Facebook</Footer.Link>
                                <Footer.Link href="#">Instagram</Footer.Link>
                                <Footer.Link href="#">Twitter</Footer.Link>
                            </Footer.LinkGroup>
                        </div>
                    </div>

                    {/* Legal Links Section */}
                    <div className="flex flex-col items-center sm:items-start" data-aos="fade-left">
                        <Footer.Title title="Legal" />
                        <Footer.LinkGroup col>
                            <Footer.Link href="#">Privacy Policy</Footer.Link>
                            <Footer.Link href="#">Terms &amp; Conditions</Footer.Link>
                        </Footer.LinkGroup>
                    </div>
                </motion.div>

                {/* Divider */}
                <Footer.Divider className="my-8" data-aos="fade-up" />

                {/* Footer Bottom Section */}
                <motion.div
                    className="w-full flex flex-col-reverse sm:flex-row sm:justify-between sm:items-center"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, ease: 'easeInOut' }} // Smooth scaling effect for the bottom section
                >
                    <Footer.Copyright
                        href="#"
                        by="Thanu™"
                        year={2024}
                        className="text-center sm:text-left text-gray-500"
                    />
                    <div className="mt-4 flex justify-center space-x-6 sm:mt-0">
                        <motion.div
                            whileHover={{ scale: 1.2 }}
                            transition={{ duration: 0.3, ease: 'easeInOut' }} // Interactive scaling on hover
                        >
                            <Footer.Icon href="#" icon={BsFacebook} className="text-maincolor hover:text-gray-500" />
                        </motion.div>
                        <motion.div
                            whileHover={{ scale: 1.2 }}
                            transition={{ duration: 0.3, ease: 'easeInOut' }} // Interactive scaling on hover
                        >
                            <Footer.Icon href="#" icon={BsInstagram} className="text-maincolor hover:text-gray-500" />
                        </motion.div>
                        <motion.div
                            whileHover={{ scale: 1.2 }}
                            transition={{ duration: 0.3, ease: 'easeInOut' }} // Interactive scaling on hover
                        >
                            <Footer.Icon href="#" icon={BsTwitter} className="text-maincolor hover:text-gray-500" />
                        </motion.div>
                        <motion.div
                            whileHover={{ scale: 1.2 }}
                            transition={{ duration: 0.3, ease: 'easeInOut' }} // Interactive scaling on hover
                        >
                            <Footer.Icon href="#" icon={BsGithub} className="text-maincolor hover:text-gray-500" />
                        </motion.div>
                        <motion.div
                            whileHover={{ scale: 1.2 }}
                            transition={{ duration: 0.3, ease: 'easeInOut' }} // Interactive scaling on hover
                        >
                            <Footer.Icon href="#" icon={BsDribbble} className="text-maincolor hover:text-gray-500" />
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </Footer>
    );
}

export default AboutUs;
