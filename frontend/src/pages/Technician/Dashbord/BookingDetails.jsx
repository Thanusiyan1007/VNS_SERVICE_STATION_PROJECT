import React from 'react';
import { useParams } from 'react-router-dom';

const BookingDetails = () => {
  const { id } = useParams(); // Access the dynamic :id parameter from the route

  return (
    <div>
      <h1>Booking Details</h1>
      <p>Details for booking ID: {id}</p>
      {/* Add your booking details content here */}
    </div>
  );
};

export default BookingDetails;
