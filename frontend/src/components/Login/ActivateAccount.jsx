import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { AiOutlineLoading3Quarters, AiOutlineCheckCircle, AiOutlineCloseCircle } from 'react-icons/ai';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ActivateAccount = () => {
  const { uid, token } = useParams();  // Get the uid and token from the URL
  const navigate = useNavigate();
  const [status, setStatus] = useState('loading');  // Track the activation status

  useEffect(() => {
    const activateAccount = async () => {
      try {
        console.log('Attempting account activation with UID:', uid, 'Token:', token); // Log UID and token
        
        // Make a POST request to the backend to activate the account
        const response = await axios.post('http://127.0.0.1:8000/api/v1/auth/users/activation/', {
          uid,
          token
        });

        console.log('Activation response:', response.data); // Log the response data

        setStatus('success');
        toast.success('Your account has been activated! Redirecting to login...');
        
        // Optionally, navigate to a different page after activation
        setTimeout(() => navigate('/login'), 3000);
      } catch (error) {
        console.error('Activation error:', error.response ? error.response.data : error.message); // Improved error logging
        setStatus('error');
        toast.error('Account activation failed! Please try again.');
      }
    };

    activateAccount();
  }, [uid, token, navigate]);

  return (
    <div className="activation-container min-h-screen flex items-center justify-center bg-gray-100">
      <ToastContainer /> {/* Toast Container to display notifications */}
      <div className="bg-white shadow-lg rounded-lg p-10 max-w-lg text-center">
        {status === 'loading' && (
          <motion.div
            className="text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <AiOutlineLoading3Quarters className="text-maincolor text-6xl mx-auto animate-spin mb-4" />
            <p className="text-xl font-semibold">Activating your account, please wait...</p>
          </motion.div>
        )}
        {status === 'success' && (
          <motion.div
            className="text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <AiOutlineCheckCircle className="text-green-500 text-6xl mx-auto mb-4" />
            <p className="text-xl font-semibold">Your account has been successfully activated!</p>
            <p className="text-gray-600 mt-2">Redirecting to login...</p>
          </motion.div>
        )}
        {status === 'error' && (
          <motion.div
            className="text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <AiOutlineCloseCircle className="text-red-500 text-6xl mx-auto mb-4" />
            <p className="text-xl font-semibold">Activation failed!</p>
            <p className="text-gray-600 mt-2">Please try again or contact support.</p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ActivateAccount;
