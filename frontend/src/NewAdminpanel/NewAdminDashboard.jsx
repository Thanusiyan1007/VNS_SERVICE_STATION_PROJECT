import React, { useEffect, useState } from 'react';
import axios from 'axios';

const NewAdminDashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem('accessToken'); // Get the token
        const response = await axios.get('http://127.0.0.1:8000/api/v1/customerbooking/', {
          headers: {
            Authorization: `Bearer ${token}`, // Set the authorization header with the token
          },
        });
        setBookings(response.data); // Set the bookings data
      } catch (err) {
        setError('Failed to fetch booking details. Please try again.');
        console.error(err);
      }
    };

    fetchBookings();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-5">
      <h1 className="text-4xl font-bold text-center text-maincolor mb-6">Admin Dashboard</h1>

      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      {bookings.length === 0 && !error ? (
        <p className="text-center text-gray-700">No bookings available</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookings.map((booking) => (
            <div key={booking.id} className="bg-white p-6 shadow-md rounded-md">
              <h2 className="text-xl font-semibold mb-2">{booking.name}</h2>
              <p className="text-gray-600 mb-1">Address: {booking.address}</p>
              <p className="text-gray-600 mb-1">Phone: {booking.phone_number}</p>
              <p className="text-gray-600 mb-1">
                Appointment Date: {new Date(booking.appointment_date).toLocaleDateString()}
              </p>
              <p className="text-gray-600 mb-1">
                Appointment Time: {booking.appointment_time}
              </p>
              <p className={`font-bold mb-4 ${booking.status === 'accepted' ? 'text-green-500' : booking.status === 'rejected' ? 'text-red-500' : 'text-yellow-500'}`}>
                Status: {booking.status}
              </p>
              <p className="font-bold mb-4 text-maincolor">Technician Status: {booking.status}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NewAdminDashboard;
