import React from 'react';
import img1 from '../../Assets/amico.svg';
import { FaFacebook } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";
import { motion } from 'framer-motion';
import Button from '../Button';
import { Link } from 'react-router-dom';

function Homecontent() {
    return (
        <div id='home'>
            <div className='bg-white min-h-screen flex items-center'>
                <div className='px-4 lg:px-14 max-w-screen-2xl mx-auto py-2'>
                    <div className='my-30 md:my-8 py-16 flex flex-col md:flex-row items-center justify-between gap-10'>
                        <motion.div
                            className='flex-1 flex flex-col justify-center order-last md:order-first'
                            initial={{ opacity: 0, x: -100 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 1 }}
                        >
                            <span className='text-3xl text-subcolor'>
                                Welcome to VNS Service Station! Discover our range of services, from CCTV installation to plumbing and wiring solutions. Our easy-to-use website helps you find what you need quickly.
                                Book online and experience convenience like never before.
                                <br /> <br />
                            </span>
                            <h1 className='text-3xl font-bold mb-4 text-maincolor'>
                                Welcome to <br />
                                VNS Service Station!
                            </h1>

                            <div className="flex justify-end mt-8">
                                <Link to="/portfolio">
                                    <Button className='w-40 bg-maincolor text-white self-end'>Let's Start</Button>
                                </Link>
                            </div>

                            <span className='text-2xl text-maincolor font-semibold mt-8'>
                                Let's Connect
                            </span>
                            <div className='flex space-x-8 mt-4'>
                                <div className='flex items-center justify-center'>
                                    <FaFacebook className='w-10 h-10 p-2 text-maincolor' />
                                    <h1 className='text-maincolor ml-2'>
                                        VNS Service Station
                                    </h1>
                                </div>
                                <div className='flex items-center justify-center'>
                                    <AiFillInstagram className='w-10 h-10 p-2 text-maincolor' />
                                    <h1 className='text-maincolor ml-2'>
                                        VNS Service Station
                                    </h1>
                                </div>
                            </div>
                        </motion.div>
                        <motion.div
                            className='flex-1 order-first pt-20 md:pt-0 md:order-last'
                            initial={{ opacity: 0, y: 100 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1 }}
                        >
                            <img src={img1} alt="image" className='w-full h-auto' />
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Homecontent;
