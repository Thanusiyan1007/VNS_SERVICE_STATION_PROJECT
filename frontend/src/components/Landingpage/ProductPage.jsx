import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Button from '../Button'; // Ensure this Button component exists
import axios from 'axios'; // For making API calls
import AOS from 'aos'; // Import AOS
import 'aos/dist/aos.css'; // Import AOS styles

function ProductPage() {
    // State to hold product data
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false); // State to check if user is logged in

    useEffect(() => {
        AOS.init({ 
            duration: 1000, // Smooth animation duration
            easing: 'ease-in-out', 
            once: true, // Animation occurs once when scrolling
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

    // Fetch products from the backend
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/v1/products/');
                setProducts(response.data);  // Assuming response.data is an array of products
                setLoading(false);  // Data is loaded
            } catch (error) {
                console.error('Error fetching products:', error);
                setError('Error fetching products');
                setLoading(false);  // Data loading failed
            }
        };

        fetchProducts();
    }, []);

    // Display a loading state while data is being fetched
    if (loading) {
        return <div className='text-center py-16'>Loading...</div>;
    }

    // Display error if any
    if (error) {
        return <div className='text-center py-16'>{error}</div>;
    }

    return (
        <div id='products' className='bg-white min-h-screen py-16' data-aos="fade-in">
            <div className='px-4 lg:px-14 max-w-screen-2xl mx-auto'>
                <h1 className='text-4xl font-bold text-maincolor text-center mb-12' data-aos="fade-down">
                    Our Products
                </h1>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10'>
                    {products.slice(0, 3).map((product) => (
                        <motion.div
                            key={product.id}
                            className='bg-white shadow-lg rounded-lg overflow-hidden'
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: 'easeInOut' }} // Smooth animation
                            data-aos="fade-up" // AOS animation for scroll-triggered effect
                        >
                            <img src={product.image} alt={product.title} className='w-full h-64 object-cover' />
                            <div className='p-6'>
                                <h2 className='text-2xl font-bold text-maincolor mb-2'>{product.title}</h2>
                                <p className='text-gray-700 mb-4'>{product.description}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
                {isLoggedIn && (
                <div className="flex justify-end mt-12" data-aos="fade-left">
                    <Link to="/Products">
                        <Button className='w-40 py-2 bg-maincolor text-white rounded hover:bg-darkmaincolor transition duration-300'>
                            Check Products
                        </Button>
                    </Link>
                </div>
                )}
            </div>
        </div>
    );
}

export default ProductPage;
