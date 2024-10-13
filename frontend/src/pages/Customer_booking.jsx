import React, { useState, useEffect } from 'react';
import booking2 from '../Assets/Connected world-cuate.svg';
import axios from 'axios';

function Customer_booking() {
    const [formData, setFormData] = useState({
        name: '',
        address: '',
        phone_number: '',
        appointment_date: '',
        appointment_time: '',
        customer: '', // Update to match the field name in your API
    });

    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    // Fetch the email from localStorage when the component mounts
    useEffect(() => {
        const customerEmail = localStorage.getItem('email');
        if (customerEmail) {
            setFormData((prevFormData) => ({
                ...prevFormData,
                customer: customerEmail, // Update formData with the customer email
            }));
        }
    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage('');
        setSuccessMessage('');

        // Client-side validation (optional)
        if (!formData.name || !formData.address || !formData.phone_number || !formData.appointment_date || !formData.appointment_time) {
            setErrorMessage('Please fill in all fields.');
            return;
        }

        try {
            // Retrieve the authorization token
            const token = localStorage.getItem('accessToken');

            // Send the booking request to the API
            const response = await axios.post('http://127.0.0.1:8000/api/v1/customerbooking/', formData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`, // Include the authorization token
                },
            });

            console.log('Booking successful:', response.data);
            setSuccessMessage('Booking successful!');

            // Reset the form
            setFormData({
                name: '',
                address: '',
                phone_number: '',
                appointment_date: '',
                appointment_time: '',
                customer: formData.customer, // Preserve the customer email
            });

        } catch (error) {
            console.error('Error during booking:', error);
            setErrorMessage(
                error.response?.data?.detail || 'There was an error booking the appointment.'
            );
        }
    };

    return (
        <div className='px-4 py-10 lg:px-14 max-w-screen-xl mx-auto mt-16 -z-50'>
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-12'>
                {/* Left Side - Image */}
                <div className='flex flex-col justify-center items-center'>
                    <h2 className='text-2xl font-bold mb-4 text-maincolor'>
                        Service Appointment
                    </h2>
                    <img
                        src={booking2}
                        alt='Service'
                        className='max-w-full h-auto rounded-lg shadow-lg'
                    />
                </div>

                {/* Right Side - Form */}
                <div className='bg-white p-6 lg:p-8 rounded-lg shadow-lg'>
                    <form onSubmit={handleSubmit}>
                        {/* Display Success or Error Message */}
                        {successMessage && (
                            <div className="mb-4 p-3 text-green-700 bg-green-100 rounded-lg">
                                {successMessage}
                            </div>
                        )}
                        {errorMessage && (
                            <div className="mb-4 p-3 text-red-700 bg-red-100 rounded-lg">
                                {errorMessage}
                            </div>
                        )}

                        <div className='mb-6'>
                            <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='name'>
                                Customer Name
                            </label>
                            <input
                                type='text'
                                id='name'
                                placeholder='Enter your name'
                                value={formData.name}
                                onChange={handleChange}
                                className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-maincolor'
                            />
                        </div>
                        <div className='mb-6'>
                            <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='address'>
                                Address
                            </label>
                            <input
                                type='text'
                                id='address'
                                placeholder='Enter your address'
                                value={formData.address}
                                onChange={handleChange}
                                className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-maincolor'
                            />
                        </div>
                        <div className='mb-6'>
                            <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='phone_number'>
                                Phone Number
                            </label>
                            <input
                                type='tel'
                                id='phone_number'
                                placeholder='Enter your phone number'
                                value={formData.phone_number}
                                onChange={handleChange}
                                className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-maincolor'
                            />
                        </div>
                        <div className='mb-6'>
                            <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='appointment_date'>
                                Appointment Date
                            </label>
                            <input
                                type='date'
                                id='appointment_date'
                                value={formData.appointment_date}
                                onChange={handleChange}
                                className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-maincolor'
                            />
                        </div>
                        <div className='mb-6'>
                            <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='appointment_time'>
                                Appointment Time
                            </label>
                            <input
                                type='time'
                                id='appointment_time'
                                value={formData.appointment_time}
                                onChange={handleChange}
                                className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-maincolor'
                            />
                        </div>
                        <button
                            type='submit'
                            className='w-full bg-maincolor text-white font-bold py-3 px-6 rounded-lg hover:bg-darkmaincolor transition duration-300'>
                            Book Appointment
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Customer_booking;
