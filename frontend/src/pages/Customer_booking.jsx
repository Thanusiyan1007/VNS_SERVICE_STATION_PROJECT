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
        service: '',
        customer: '',
    });

    const [services, setServices] = useState([]); // Store available services
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [currentStep, setCurrentStep] = useState(1); // Track current form step
    const [isStep1Valid, setIsStep1Valid] = useState(false); // Track validity of step 1

    // Get today's date in YYYY-MM-DD format
    const getTodayDate = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    // Fetch available services from the API when the component mounts
    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/v1/mainservice/');
                setServices(response.data);
            } catch (error) {
                console.error('Error fetching services:', error);
            }
        };

        fetchServices();
    }, []);

    // Fetch the email from localStorage when the component mounts
    useEffect(() => {
        const customerEmail = localStorage.getItem('email');
        if (customerEmail) {
            setFormData((prevFormData) => ({
                ...prevFormData,
                customer: customerEmail,
            }));
        }
    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value,
        });
    };

    // Check if all required fields in step 1 are filled
    useEffect(() => {
        const { name, address, phone_number } = formData;
        if (name && address && phone_number) {
            setIsStep1Valid(true); // Step 1 is valid if all fields are filled
        } else {
            setIsStep1Valid(false); // Step 1 is invalid if any field is missing
        }
    }, [formData]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage('');
        setSuccessMessage('');

        // Client-side validation (optional)
        if (!formData.name || !formData.address || !formData.phone_number || !formData.appointment_date || !formData.appointment_time || !formData.service) {
            setErrorMessage('Please fill in all fields.');
            return;
        }

        try {
            const token = localStorage.getItem('accessToken');

            const response = await axios.post('http://127.0.0.1:8000/api/v1/customerbooking/', formData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });

            console.log('Booking successful:', response.data);
            setSuccessMessage('Booking successful!');

            setFormData({
                name: '',
                address: '',
                phone_number: '',
                appointment_date: '',
                appointment_time: '',
                service: '',
                customer: formData.customer,
            });

        } catch (error) {
            console.error('Error during booking:', error);
            setErrorMessage(
                error.response?.data?.detail || 'There was an error booking the appointment.'
            );
        }
    };

    const nextStep = () => {
        if (isStep1Valid) {
            setCurrentStep((prevStep) => prevStep + 1);
        }
    };

    const previousStep = () => {
        setCurrentStep((prevStep) => prevStep - 1);
    };

    return (
        <div className='px-4 py-10 lg:px-14 max-w-screen-xl mx-auto mt-16 -z-50'>
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-12'>
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

                <div className='bg-white p-6 lg:p-8 rounded-lg shadow-lg'>
                    {/* Modern Flowbite Step Indicator */}
                    <ol className="flex items-center w-full text-sm font-medium text-center text-gray-500 dark:text-gray-400 sm:text-base mb-8">
                        <li className={`flex md:w-full items-center ${currentStep >= 1 ? 'text-blue-600 dark:text-blue-500' : ''}`}>
                            <span className={`flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200 dark:after:text-gray-500`}>
                                {currentStep > 1 ? (
                                    <svg className="w-4 h-4 me-2.5" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
                                    </svg>
                                ) : (
                                    <span className="me-2">1</span>
                                )}
                                Customer Info
                            </span>
                        </li>
                        <li className={`flex md:w-full items-center ${currentStep === 2 ? 'text-blue-600 dark:text-blue-500' : ''}`}>
                            <span className={`flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200 dark:after:text-gray-500`}>
                                <span className="me-2">2</span>
                                Booking Details
                            </span>
                        </li>
                    </ol>

                    <form onSubmit={handleSubmit}>
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

                        {/* Step 1: Customer Details */}
                        {currentStep === 1 && (
                            <>
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
                                <button
                                    type='button'
                                    onClick={nextStep}
                                    disabled={!isStep1Valid} // Disable button if step 1 is invalid
                                    className={`w-full ${isStep1Valid ? 'bg-maincolor hover:bg-darkmaincolor' : 'bg-gray-300 cursor-not-allowed'} text-white font-bold py-3 px-6 rounded-lg transition duration-300`}>
                                    Next: Booking Details
                                </button>
                            </>
                        )}

                        {/* Step 2: Booking Details */}
                        {currentStep === 2 && (
                            <>
                                <div className='mb-6'>
                                    <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='appointment_date'>
                                        Appointment Date
                                    </label>
                                    <input
                                        type='date'
                                        id='appointment_date'
                                        value={formData.appointment_date}
                                        onChange={handleChange}
                                        min={getTodayDate()}
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
                                <div className='mb-6'>
                                    <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='service'>
                                        Select Service
                                    </label>
                                    <select
                                        id='service'
                                        value={formData.service}
                                        onChange={handleChange}
                                        className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-maincolor'>
                                        <option value=''>Select a service</option>
                                        {services.map((service) => (
                                            <option key={service.id} value={service.title}>
                                                {service.title}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className='flex justify-between'>
                                    <button
                                        type='button'
                                        onClick={previousStep}
                                        className='bg-gray-500 text-white font-bold py-3 px-6 rounded-lg hover:bg-gray-700 transition duration-300'>
                                        Previous: Customer Details
                                    </button>
                                    <button
                                        type='submit'
                                        className='bg-maincolor text-white font-bold py-3 px-6 rounded-lg hover:bg-darkmaincolor transition duration-300'>
                                        Book Appointment
                                    </button>
                                </div>
                            </>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Customer_booking;