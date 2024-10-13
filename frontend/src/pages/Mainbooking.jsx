import React from 'react';
import booking1 from '../Assets/Contact us-pana.svg';
import Button from '../components/Button';
import { Link } from 'react-router-dom';

function Mainbooking() {
    return (
        <div className='px-4 py-4 lg:px-14 max-w-screen-2xl mx-auto mt-16' id='main-booking'>
            <div className='flex items-center justify-between'>
                <h1 className='text-3xl font-bold text-maincolor'>
                    Main Booking
                </h1>
            </div>
            <div className='flex flex-col md:flex-row items-center justify-between'>
                <img src={booking1} alt="booking" className='w-full md:w-[36%] mb-4 md:mb-0 order-first md:order-last' />
                <ul className='text-2xl text-subcolor md:ml-8 list-disc pl-5'>
                    <li>Booking availability subject to change based on demand and scheduling.</li>
                    <li>Specific time slots not guaranteed.</li>
                    <li>Our technician will first check the booked area and confirm if the service is possible.</li>
                    <li>If the area is not feasible, booking will be cancelled.</li>
                    <li>Booking will be confirmed only if the area is suitable for service.</li>
                    <li>Team will communicate any scheduling changes or adjustments.</li>
                    <li>Thank you for your understanding.</li>
                </ul>
            </div>
            <div className="flex justify-end mt-8">
                <Link to="/Customer_booking">
                    <Button className='w-40 bg-maincolor text-white self-end'>CONTINUE</Button>
                </Link>
            </div>
        </div>
    );
}

export default Mainbooking;
