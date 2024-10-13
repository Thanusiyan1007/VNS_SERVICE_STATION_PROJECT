import React, { useEffect, useState } from 'react';
import { Card } from "flowbite-react";
import axios from 'axios';

function Mainportfolio() {
    const [portfolioItems, setPortfolioItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState(''); // State for search query

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

    // Filtered portfolio items based on the search query
    const filteredPortfolioItems = portfolioItems.filter(item =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className='py-[90px] px-14'>
            <h1 className='text-3xl font-bold mb-8 text-center text-maincolor'>Main Portfolio</h1>

            {/* Search Bar */}
            <div className="flex justify-center mb-8">
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search portfolio items..."
                    className="w-full md:w-1/2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-maincolor"
                />
            </div>

            {/* Portfolio Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredPortfolioItems.length > 0 ? (
                    filteredPortfolioItems.map((item, index) => (
                        <Card 
                            key={index} 
                            className="max-w-sm" 
                        >
                            <img 
                                src={item.image} 
                                alt={item.title} 
                                className="w-full h-[200px] object-cover" // Ensure uniform size with object-cover
                            />
                            <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                                {item.title}
                            </h5>
                            <p className="mt-2.5 mb-5 text-gray-700 dark:text-gray-400">
                                {item.description}
                            </p>
                        </Card>
                    ))
                ) : (
                    <div className="text-center col-span-full">
                        <p className="text-gray-500">No portfolio items found.</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Mainportfolio;
