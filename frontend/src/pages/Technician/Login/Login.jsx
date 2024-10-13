import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Removed Link import
import { RiUserLine, RiLockPasswordLine, RiEyeLine, RiEyeCloseLine } from 'react-icons/ri';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import coverimg from '../../../Assets/Pipeline maintenance-pana.svg';
import logo from '../../../Assets/Untitled-2 2.svg';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/v1/auth/jwt/create/', {
        email,
        password,
      });

      const { access, refresh } = response.data;

      const userResponse = await axios.get('http://127.0.0.1:8000/api/user/status/', {
        headers: {
          Authorization: `Bearer ${access}`,
        },
      });

      const { is_staff, is_superuser } = userResponse.data;

      if (!is_staff || is_superuser) {
        toast.error('Only Staff accounts are allowed to log in.');
        return; // Prevent further login
      }

      localStorage.setItem('accessToken', access);
      localStorage.setItem('email', email);
      localStorage.setItem('refreshToken', refresh);
      localStorage.setItem('role', 'staff')


      toast.success('Login successful! Redirecting...');
      setTimeout(() => {
        window.location.href = '/techdashboard';
      }, 2000); // Redirect after 2 seconds
      
    } catch (error) {
      if (error.response) {
        toast.error('Invalid email or password.');
      } else {
        toast.error('Something went wrong. Please try again.');
      }
    }
  };

  return (
    <div className='w-full h-screen flex flex-col md:flex-row'>
      <ToastContainer /> {/* ToastContainer to render the notifications */}
      
      {/* Left Section */}
      <div className='relative w-full md:w-1/2 h-[50vh] md:h-full flex flex-col bg-maincolor rounded-r-md'>
        <img
          src={coverimg}
          alt="coverimage"
          className='object-cover mx-auto my-auto'
        />
      </div>

      {/* Right Section */}
      <div className='w-full md:w-1/2 flex flex-col justify-between p-5 md:p-10'>
        {/* Top Section */}
        <div className='flex items-center justify-center md:justify-start'>
          <img src={logo} alt="logo" className='h-14 w-14' />
          <h1 className='text-center md:text-left pt-3 text-maincolor font-semibold text-2xl'>VNS Service Station</h1>
        </div>

        <div className=''>
          <p className='text-subcolor font-semibold pt-2'>
            Welcome to VNS Service Station! Discover our services,
            from CCTV installation to plumbing and wiring.
            Easily find what you need and book online for unmatched convenience.
          </p>
        </div>

        {/* Middle Section */}
        <div className='flex flex-col justify-center items-center md:items-start mx-auto md:mx-0'>
          <div className='w-full flex flex-col mb-5 md:mb-10'>
            <h3 className='text-2xl font-semibold mb-4 text-center md:text-left'>Login</h3>
            <p className='text-sm mb-2 text-center md:text-left'>Welcome Back! Please enter your details</p>

            <form onSubmit={handleLogin}>
              <div className='relative mb-4'>
                <div className='flex items-center border rounded-md border-black'>
                  <div className='p-3'>
                    <RiUserLine className='text-gray-400' />
                  </div>
                  <input
                    type="text"
                    placeholder='Email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className='w-full py-4 bg-transparent border-none outline-none focus:outline-none active:outline-none'
                    required
                  />
                </div>
              </div>
              <div className='relative mb-4'>
                <div className='flex items-center border rounded-md border-black'>
                  <div className='p-3'>
                    <RiLockPasswordLine className='text-gray-400' />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder='Password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className='w-full py-4 bg-transparent border-none outline-none focus:outline-none active:outline-none'
                    required
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
              </div>

              <button type="submit" className='bg-maincolor text-white py-3 px-6 rounded-md text-lg font-semibold shadow-md hover:bg-opacity-80 w-full'>
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
