import React from 'react';
import Homecontent from '../components/Landingpage/Homecontent';
import Service from '../components/Landingpage/Service';
import Portfoliocontent from '../components/Landingpage/Portfoliocontent';
import Reminder from '../components/Landingpage/Reminder';
import Booking from '../components/Landingpage/Booking';
import AboutUs from '../components/Landingpage/AboutUs';
import ProductPage from '../components/Landingpage/ProductPage';

function Homepage() {
  // Check if the access token is present in localStorage
  const accessToken = localStorage.getItem('accessToken');

  return (
    <div>
      <Homecontent />
      <Service />
      <Portfoliocontent />
      <ProductPage />
      {/* Render Reminder only if accessToken exists */}
      {accessToken && <Reminder />}
      <Booking />
      <AboutUs />
    </div>
  );
}

export default Homepage;
