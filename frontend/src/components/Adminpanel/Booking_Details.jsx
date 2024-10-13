import React, { useEffect, useState } from 'react';
import { Table } from 'flowbite-react';
import axios from 'axios';

function Booking_Details() {
    const [bookings, setBookings] = useState([]);
    const [technicians, setTechnicians] = useState({});
    const [serviceTypes, setServiceTypes] = useState({});
    const [packages, setPackages] = useState({});
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        // Fetch booking details from the API
        const fetchBookings = async () => {
            const token = localStorage.getItem('accessToken');
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/v1/bookings/', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });
                setBookings(response.data);
                fetchTechnicianNames(response.data);
                fetchServiceAndPackageNames(response.data);
            } catch (error) {
                console.error('Error fetching bookings:', error);
                setErrorMessage('Failed to fetch booking details.');
            }
        };

        // Fetch technician names based on their IDs found in bookings
        const fetchTechnicianNames = async (bookings) => {
            const token = localStorage.getItem('accessToken');
            const technicianIds = [...new Set(bookings.map(booking => booking.technician))]; // Get unique technician IDs
            try {
                const responses = await Promise.all(
                    technicianIds.map(id => axios.get(`http://127.0.0.1:8000/api/v1/auth/users/${id}/`, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            'Content-Type': 'application/json',
                        },
                    }))
                );
                const technicianData = responses.reduce((acc, response) => {
                    acc[response.data.id] = response.data.first_name + ' ' + response.data.last_name; // Map technician ID to their name
                    return acc;
                }, {});
                setTechnicians(technicianData);  // Save the technician names in state
            } catch (error) {
                console.error('Error fetching technician names:', error);
            }
        };

        // Fetch service type and package names based on their IDs found in bookings
        const fetchServiceAndPackageNames = async (bookings) => {
            const token = localStorage.getItem('accessToken');
            const serviceTypeIds = [...new Set(bookings.map(booking => booking.service_type))];
            const packageIds = [...new Set(bookings.map(booking => booking.package))];
            
            try {
                // Fetch Service Types
                const serviceTypeResponses = await Promise.all(
                    serviceTypeIds.map(id => axios.get(`http://127.0.0.1:8000/api/v1/servicetypes/${id}/`, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            'Content-Type': 'application/json',
                        },
                    }))
                );
                const serviceTypeData = serviceTypeResponses.reduce((acc, response) => {
                    acc[response.data.id] = response.data.name;  // Map service type ID to name
                    return acc;
                }, {});
                setServiceTypes(serviceTypeData);  // Save service types in state

                // Fetch Packages
                const packageResponses = await Promise.all(
                    packageIds.map(id => axios.get(`http://127.0.0.1:8000/api/v1/packages/${id}/`, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            'Content-Type': 'application/json',
                        },
                    }))
                );
                const packageData = packageResponses.reduce((acc, response) => {
                    acc[response.data.id] = response.data.name;  // Map package ID to name
                    return acc;
                }, {});
                setPackages(packageData);  // Save package names in state
            } catch (error) {
                console.error('Error fetching service types or packages:', error);
            }
        };

        fetchBookings();
    }, []);

    return (
        <div className="overflow-x-auto py-10">
            <h2 className="text-2xl font-bold mb-6 text-maincolor">Booking Details</h2>

            {errorMessage && (
                <div className="mb-4 p-3 text-red-700 bg-red-100 rounded-lg">
                    {errorMessage}
                </div>
            )}

            {/* Booking Details Table */}
            <Table>
                <Table.Head>
                    <Table.HeadCell>ID</Table.HeadCell>
                    <Table.HeadCell>Technician Name</Table.HeadCell>
                    <Table.HeadCell>Name</Table.HeadCell>
                    <Table.HeadCell>Address</Table.HeadCell>
                    <Table.HeadCell>Phone Number</Table.HeadCell>
                    <Table.HeadCell>Service Type</Table.HeadCell>
                    <Table.HeadCell>Package</Table.HeadCell>
                    <Table.HeadCell>Total Price</Table.HeadCell>
                    <Table.HeadCell>Appointment Date</Table.HeadCell>
                    <Table.HeadCell>Appointment Time</Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y">
                    {bookings.map(booking => (
                        <Table.Row key={booking.id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                            <Table.Cell>{booking.id}</Table.Cell>
                            {/* Use the technician ID to display the technician's name */}
                            <Table.Cell>{technicians[booking.technician] || 'Loading...'}</Table.Cell>
                            <Table.Cell>{booking.name}</Table.Cell>
                            <Table.Cell>{booking.address}</Table.Cell>
                            <Table.Cell>{booking.phone_number}</Table.Cell>
                            {/* Use service type ID to display service type name */}
                            <Table.Cell>{serviceTypes[booking.service_type] || 'Loading...'}</Table.Cell>
                            {/* Use package ID to display package name */}
                            <Table.Cell>{packages[booking.package] || 'Loading...'}</Table.Cell>
                            <Table.Cell>{booking.total_price}</Table.Cell>
                            <Table.Cell>{new Date(booking.appointment_date).toLocaleDateString()}</Table.Cell>
                            <Table.Cell>{booking.appointment_time}</Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>
        </div>
    );
}

export default Booking_Details;
