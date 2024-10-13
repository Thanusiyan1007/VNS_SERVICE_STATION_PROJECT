import React, { useEffect, useState } from 'react';
import { Carousel } from 'flowbite-react'; // Ensure flowbite-react is installed
import axios from 'axios';
import Button from '../Button';
import { Link } from 'react-router-dom';
import AOS from 'aos'; // Import AOS
import 'aos/dist/aos.css'; // Import AOS styles

function Portfoliocontent() {
    const [portfolioItems, setPortfolioItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false); // State to check if user is logged in

    useEffect(() => {
        AOS.init({ 
            duration: 1000, // Smooth animation with 1-second duration
            easing: 'ease-in-out',
            once: true, // Animation only happens once when scrolling
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
        // Fetch portfolio data from the API
        const fetchPortfolioItems = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/v1/services/');
                setPortfolioItems(response.data); // Assume the API returns an array of services
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchPortfolioItems();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className='px-4 py-10 lg:px-14 max-w-screen-2xl mx-auto mt-8' id='portfolio'>
            <h1 className='text-3xl font-bold mb-4 text-maincolor' data-aos="fade-down">
                Portfolio
            </h1>
            <p className='text-base text-subcolor mb-7' data-aos="fade-right">
                VNS Service Station offers expert CCTV installation, plumbing solutions, and wiring
                services. With a focus on customer satisfaction, their user-friendly website features
                online booking and interactive guides. Known for professionalism and reliability,
                they continuously strive to exceed expectations and stay ahead in the industry.
            </p>

            <div className="grid h-56 grid-cols-1 md:grid-cols-2 gap-4 sm:h-64 xl:h-80 2xl:h-96" data-aos="fade-up">
                <Carousel>
                    {portfolioItems.slice(0, 4).map((item, index) => (
                        <img
                            key={index}
                            src={item.image}
                            alt={item.title}
                            className="w-full h-auto object-cover"
                        />
                    ))}
                </Carousel>
                <Carousel>
                    {portfolioItems.slice(0, 4).map((item, index) => (
                        <img
                            key={index}
                            src={item.image}
                            alt={item.title}
                            className="w-full h-auto object-cover"
                        />
                    ))}
                </Carousel>
            </div>

            {isLoggedIn && (
                <div className="flex justify-end mt-8" data-aos="fade-left">
                    <Link to="/portfolio">
                        <Button className='w-40 bg-maincolor text-white self-end'>More Explore</Button>
                    </Link>
                </div>
            )}
        </div>
    );
}

export default Portfoliocontent;
