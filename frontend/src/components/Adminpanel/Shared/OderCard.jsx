import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function OderCard() {
    const [data, setData] = useState([]); // State to hold booking data

    useEffect(() => {
        const fetchBookingData = async () => {
            const token = localStorage.getItem('accessToken'); // Retrieve the access token
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/v1/customerbooking/', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });

                // Transform response data to chart format
                const transformedData = response.data.map(booking => {
                    const date = new Date(booking.appointment_date);
                    return {
                        month: date.toLocaleString('default', { month: 'long' }), // Month in long format (e.g., January)
                        year: date.getFullYear(), // Year as a separate field
                        order: 1, // Count as 1 for each booking
                    };
                });

                // Aggregate counts per month-year
                const aggregatedData = transformedData.reduce((acc, curr) => {
                    const existingMonth = acc.find(item => item.month === curr.month && item.year === curr.year);
                    if (existingMonth) {
                        existingMonth.order += curr.order; // Sum the order counts
                    } else {
                        acc.push(curr);
                    }
                    return acc;
                }, []);

                // Sort the data by year, then by month
                aggregatedData.sort((a, b) => {
                    if (a.year !== b.year) return a.year - b.year;
                    return new Date(`${a.month} 1, 2021`).getMonth() - new Date(`${b.month} 1, 2021`).getMonth(); // Using 2021 as a reference year
                });

                setData(aggregatedData); // Set the sorted and aggregated data
            } catch (error) {
                console.error('Error fetching booking data:', error);
            }
        };

        fetchBookingData();
    }, []); // Runs once on component mount

    return (
        <div className='bg-white p-4 rounded-sm border-gray-200 flex flex-col flex-1'>
            <strong className='text-subcolor font-medium'>Monthly Order Details</strong>
            <div className='w-full mt-3 flex-1 text-xs'>
                <ResponsiveContainer width="100%" height={400}>
                    <BarChart
                        data={data}
                        margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="order" fill="blue" barSize={30} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}

export default OderCard;
