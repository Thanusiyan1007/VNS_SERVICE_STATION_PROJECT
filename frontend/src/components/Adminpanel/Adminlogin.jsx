import React, { useState } from 'react';
import AdminloginIMAGE from '../../Assets/Adminlogin.svg'
import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import logo from '../../Assets/Untitled-2 2.svg';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 

function Adminlogin() {
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
      // Step 1: Send the login request to get the tokens
      const response = await axios.post('http://127.0.0.1:8000/api/v1/auth/jwt/create/', {
        email: email,
        password: password,
      });
  
      // Save the access token in local storage
      const { access } = response.data;

      // Step 2: Use the access token to check if the user is a superuser
      const userResponse = await axios.get('http://127.0.0.1:8000/api/user/status/', {
        headers: {
          Authorization: `Bearer ${access}`, // Pass the access token
        },
      });

      const { is_superuser } = userResponse.data;
  
      if (!is_superuser) {
        toast.error('Only superusers are allowed to log in here.');
        return; // Prevent further login
      }

      // Store token in localStorage if the user is a superuser
      localStorage.setItem('accessToken', access);
      localStorage.setItem('email', email);

      // Step 3: Navigate to admin dashboard or homepage
      toast.success('Login successful! Redirecting...');
      setTimeout(() => navigate('/admin'), 2000); // Redirect to the admin dashboard after 2 seconds
  
    } catch (error) {
      // Handle errors and show appropriate messages
      if (error.response) {
        toast.error(`Error: ${error.response.data?.detail || 'Invalid email or password'}`);
      } else if (error.request) {
        toast.error('No response from the server. Please try again later.');
      } else {
        toast.error('Something went wrong. Please try again.');
      }
    }
  };

  return (
    <div className="px-4 lg:px-14 max-w-screen-2xl mx-auto mt-8">
      <ToastContainer /> {/* Toast Container for notifications */}
      <div className="flex flex-col lg:flex-row">
        <div className="flex-1 mb-8 lg:mb-0 flex justify-center lg:justify-start">
          <img src={AdminloginIMAGE} alt="Admin login" className="max-w-full h-auto" />
        </div>
        <div className="flex-1 flex flex-col items-center justify-center p-4 rounded-md h-full">
          <img src={logo} alt="Logo" className="mb-4" />
          <form className="flex w-full max-w-md flex-col gap-4" onSubmit={handleLogin}>
            <div>
              <Label htmlFor="email1" value="Your email" className="mb-2 block" />
              <TextInput
                id="email1"
                type="email"
                placeholder="Username or Gmail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="password1" value="Your password" className="mb-2 block" />
              <TextInput
                id="password1"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit">Login</Button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Adminlogin;
