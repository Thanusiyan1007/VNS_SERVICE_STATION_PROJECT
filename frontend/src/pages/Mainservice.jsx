import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card } from "flowbite-react";
import { motion } from 'framer-motion';

function Mainservice() {
  const [services, setServices] = useState([]); // Ensure services is initialized as an empty array
  const [loading, setLoading] = useState(true); // Add loading state
  const [error, setError] = useState(null); // Add error state

  useEffect(() => {
    // Fetch services from the API
    const fetchServices = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/v1/mainservice/');
        setServices(response.data);  // Set the services data
        setLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        setError('Error fetching services'); // Set error state
        setLoading(false); // Set loading to false in case of an error
      }
    };

    fetchServices();
  }, []);

  // Handle the case when data is still loading
  if (loading) {
    return <div>Loading...</div>;
  }

  // Handle the case when there is an error
  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className='py-[90px] px-14'>
      <div className='max-w-screen-2xl mx-auto' id='services'>
        <h1 className='text-3xl font-bold mb-9 text-maincolor'>
          Our Main Services
        </h1>
        <motion.div
          className='grid grid-cols-1 md:grid-cols-3 gap-8'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          {services && services.length > 0 ? (
            services.map(service => (
              <motion.div
                key={service.id}
                className='flex flex-col items-center'
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Card className='w-full'>
                  {/* Display the image if available */}
                  {service.image && (
                    <img src={service.image} alt={service.title} className='w-20 h-20 mb-5' />
                  )}
                  <h2 className='text-lg text-maincolor font-semibold mb-4'>{service.title}</h2>
                  <p className='text-lg text-gray-600 mb-4'>
                    {service.description}
                  </p>
                </Card>
              </motion.div>
            ))
          ) : (
            <div>No services available</div>
          )}
        </motion.div>
      </div>
    </div>
  );
}

export default Mainservice;
