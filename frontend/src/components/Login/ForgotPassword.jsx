import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post('http://127.0.0.1:8000/api/v1/auth/users/reset_password/', { email });
      
      // Show success toast
      toast.success('Password reset email sent. Please check your inbox.');
    } catch (error) {
      // Show error toast
      toast.error('Error sending password reset email. Please try again.');
    }
    setLoading(false);
  };

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <ToastContainer /> {/* Toast Container for displaying toasts */}
      <div className="w-full max-w-md p-8">
        <h2 className="text-2xl font-bold mb-4 text-center">Forgot Password</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
            <input
              type="email"
              id="email"
              className="mt-1 p-2 border rounded w-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="bg-maincolor text-white py-3 px-6 rounded-md w-full hover:bg-opacity-80"
          >
            {loading ? 'Sending...' : 'Send Reset Link'}
          </button>
        </form>

        <div className="text-center mt-4">
          <Link to="/login" className="text-maincolor underline">Back to Login</Link>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
