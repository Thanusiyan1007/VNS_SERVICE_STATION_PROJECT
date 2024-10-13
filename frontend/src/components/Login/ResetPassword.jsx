import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ResetPassword() {
  const { uid, token } = useParams();  // Get the uid and token from the URL
  const [newPassword, setNewPassword] = useState('');
  const [reNewPassword, setReNewPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (newPassword !== reNewPassword) {
      toast.error("Passwords do not match.");
      setLoading(false);
      return;
    }

    try {
      // Make the request to the backend to reset the password
      await axios.post('http://127.0.0.1:8000/api/v1/auth/users/reset_password_confirm/', {
        uid,
        token,
        new_password: newPassword,
        re_new_password: reNewPassword
      });

      toast.success("Password reset successfully. Redirecting to login...");
      setTimeout(() => navigate('/login'), 3000);  // Redirect to login page after 3 seconds

    } catch (error) {
      toast.error("Something went wrong. Please try again.");
      setLoading(false);
    }
    setLoading(false);
  };

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <ToastContainer /> {/* ToastContainer for toast notifications */}
      <div className="w-full max-w-md p-8">
        <h2 className="text-2xl font-bold mb-4 text-center">Reset Password</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="new_password" className="block text-sm font-medium text-gray-700">New Password</label>
            <input
              type="password"
              id="new_password"
              className="mt-1 p-2 border rounded w-full"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="re_new_password" className="block text-sm font-medium text-gray-700">Confirm New Password</label>
            <input
              type="password"
              id="re_new_password"
              className="mt-1 p-2 border rounded w-full"
              value={reNewPassword}
              onChange={(e) => setReNewPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="bg-maincolor text-white py-3 px-6 rounded-md w-full hover:bg-opacity-80">
            {loading ? 'Resetting...' : 'Reset Password'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;
