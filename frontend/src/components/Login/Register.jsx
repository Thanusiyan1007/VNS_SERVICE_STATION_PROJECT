import React, { useState } from 'react';
import { RiUserLine, RiLockPasswordLine, RiEyeLine, RiEyeCloseLine } from 'react-icons/ri';
import coverimg from '../../Assets/register.svg';
import logo from '../../Assets/Untitled-2 2.svg';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Register() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const [formErrors, setFormErrors] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
        setFormErrors({
            ...formErrors,
            [name]: ''
        });
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let errors = {};
    
        // Client-side Validation logic
        if (formData.firstName.trim() === '') {
            errors.firstName = 'First Name is required';
            return;
        }
        if (formData.lastName.trim() === '') {
            errors.lastName = 'Last Name is required';
            return;
        }
        if (!formData.email.includes('@')) {
            errors.email = 'Invalid email address';
            return;
        }
        if (formData.password.length < 6) {
            errors.password = 'Password must be at least 6 characters long';
            return;
        }
        if (/^\d+$/.test(formData.password)) {
            toast.error('Password cannot be all numeric');
            return;
        }
        if (formData.password !== formData.confirmPassword) {
            errors.confirmPassword = 'Passwords do not match';
            return;
        }
    
        // Set errors state
        setFormErrors(errors);
    
        // If no errors, proceed with registration logic
        if (Object.keys(errors).length === 0) {
            try {
                const response = await axios.post('http://127.0.0.1:8000/api/v1/auth/users/', {
                    first_name: formData.firstName,
                    last_name: formData.lastName,
                    email: formData.email,
                    password: formData.password,
                    re_password: formData.confirmPassword,  // Add re_password field
                });
    
                toast.success('User registered successfully!');
                setTimeout(() => {
                    navigate('/login'); // Redirect to login after 2 seconds
                }, 2000);
    
            } catch (error) {
                if (error.response) {
                    const errorData = error.response.data;
    
                    // Log the error data to the console for debugging
                    console.log('Error response data:', errorData);
    
                    // Check if there's a specific error message returned from the server
                    if (errorData && errorData.detail) {
                        // Show specific error detail in toast
                        toast.error(`Registration failed: ${errorData.detail}`);
                    } else if (errorData && typeof errorData === 'object') {
                        // If the server returns multiple errors in the form of an object
                        const errorMessages = Object.values(errorData).flat().join(' ');
                        toast.error(`Registration failed: ${errorMessages}`);
                    } else {
                        // Generic error message if no specific details are provided
                        toast.error('Registration failed. Please try again.');
                    }
                } else {
                    toast.error('An unexpected error occurred. Please try again.');
                }
            }
        } else {
            toast.error('Please fix the validation errors.');
        }
    };
    

    return (
        <div className='w-full h-screen flex flex-col md:flex-row'>
            {/* Toast Container for Notifications */}
            <ToastContainer />

            {/* Left Section */}
            <div className='w-full md:w-1/2 flex flex-col justify-between p-4 md:p-8'>
                {/* Top Section */}
                <div className='flex items-center justify-center md:justify-start'>
                    <img src={logo} alt="logo" className='h-14 w-14' />
                    <h1 className='text-center md:text-left text-maincolor font-semibold text-2xl'>VNS Service Station</h1>
                </div>

                {/* Middle Section */}
                <div className='flex flex-col justify-center items-center md:items-start mx-auto md:mx-0'>
                    <div className='w-full flex flex-col mb-4 md:mb-8'>
                        <h3 className='text-2xl font-semibold mb-3 mt-3 text-center md:text-left'>Register</h3>
                        <p className='text-sm mb-2 text-center md:text-left'>Please fill in the details to create an account</p>

                        <form onSubmit={handleSubmit}>
                            {/* First Name Input */}
                            <div className='relative mb-4'>
                                <div className='flex items-center border rounded-md border-black'>
                                    <div className='p-3'>
                                        <RiUserLine className='text-gray-400' />
                                    </div>
                                    <input
                                        type="text"
                                        name="firstName"
                                        placeholder='First Name'
                                        className={`w-full py-4 bg-transparent border-none outline-none focus:outline-none active:outline-none ${formErrors.firstName && 'border-red-500'}`}
                                        value={formData.firstName}
                                        onChange={handleChange}
                                    />
                                </div>
                                {formErrors.firstName && <p className="text-red-500 text-sm mt-1">{formErrors.firstName}</p>}
                            </div>
                            {/* Last Name Input */}
                            <div className='relative mb-4'>
                                <div className='flex items-center border rounded-md border-black'>
                                    <div className='p-3'>
                                        <RiUserLine className='text-gray-400' />
                                    </div>
                                    <input
                                        type="text"
                                        name="lastName"
                                        placeholder='Last Name'
                                        className={`w-full py-4 bg-transparent border-none outline-none focus:outline-none active:outline-none ${formErrors.lastName && 'border-red-500'}`}
                                        value={formData.lastName}
                                        onChange={handleChange}
                                    />
                                </div>
                                {formErrors.lastName && <p className="text-red-500 text-sm mt-1">{formErrors.lastName}</p>}
                            </div>
                            {/* Email Input */}
                            <div className='relative mb-4'>
                                <div className='flex items-center border rounded-md border-black'>
                                    <div className='p-3'>
                                        <RiUserLine className='text-gray-400' />
                                    </div>
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder='Email Address'
                                        className={`w-full py-4 bg-transparent border-none outline-none focus:outline-none active:outline-none ${formErrors.email && 'border-red-500'}`}
                                        value={formData.email}
                                        onChange={handleChange}
                                    />
                                </div>
                                {formErrors.email && <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>}
                            </div>
                            {/* Password Input */}
                            <div className='relative mb-4'>
                                <div className='flex items-center border rounded-md border-black'>
                                    <div className='p-3'>
                                        <RiLockPasswordLine className='text-gray-400' />
                                    </div>
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        name="password"
                                        placeholder='Password'
                                        className={`w-full py-4 bg-transparent border-none outline-none focus:outline-none active:outline-none ${formErrors.password && 'border-red-500'}`}
                                        value={formData.password}
                                        onChange={handleChange}
                                    />
                                    <div className='absolute right-3 top-1/2 transform -translate-y-1/2'>
                                        {showPassword ? (
                                            <RiEyeCloseLine
                                                className='text-gray-400 cursor-pointer'
                                                onClick={togglePasswordVisibility}
                                            />
                                        ) : (
                                            <RiEyeLine
                                                className='text-gray-400 cursor-pointer'
                                                onClick={togglePasswordVisibility}
                                            />
                                        )}
                                    </div>
                                </div>
                                {formErrors.password && <p className="text-red-500 text-sm mt-1">{formErrors.password}</p>}
                            </div>
                            {/* Confirm Password Input */}
                            <div className='relative mb-4'>
                                <div className='flex items-center border rounded-md border-black'>
                                    <div className='p-3'>
                                        <RiLockPasswordLine className='text-gray-400' />
                                    </div>
                                    <input
                                        type={showConfirmPassword ? 'text' : 'password'}
                                        name="confirmPassword"
                                        placeholder='Re-enter Password'
                                        className={`w-full py-4 bg-transparent border-none outline-none focus:outline-none active:outline-none ${formErrors.confirmPassword && 'border-red-500'}`}
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                    />
                                    <div className='absolute right-3 top-1/2 transform -translate-y-1/2'>
                                        {showConfirmPassword ? (
                                            <RiEyeCloseLine
                                                className='text-gray-400 cursor-pointer'
                                                onClick={toggleConfirmPasswordVisibility}
                                            />
                                        ) : (
                                            <RiEyeLine
                                                className='text-gray-400 cursor-pointer'
                                                onClick={toggleConfirmPasswordVisibility}
                                            />
                                        )}
                                    </div>
                                </div>
                                {formErrors.confirmPassword && <p className="text-red-500 text-sm mt-1">{formErrors.confirmPassword}</p>}
                            </div>

                            <button type="submit" className='bg-maincolor text-white p-3 rounded-md text-lg font-semibold shadow-md hover:bg-opacity-80 w-full'>Register</button>
                        </form>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className='flex justify-center items-center'>
                    <Link to="/login">
                        <p className='text-sm font-normal text-center md:text-left'>Already have an account? <span className='font-semibold underline underline-offset-2 cursor-pointer text-maincolor'>Login here</span></p>
                    </Link>
                </div>
            </div>

            {/* Right Section */}
            <div className='relative w-full md:w-1/2 h-[50vh] md:h-full flex flex-col bg-maincolor rounded-r-md'>
                <img
                    src={coverimg}
                    alt="coverimage"
                    className='object-cover mx-auto my-auto'
                />
            </div>
        </div>
    );
}

export default Register;
