import React, { useEffect, useState } from 'react';
import { Table, Toast } from "flowbite-react";
import axios from 'axios';

function Appointments() {
    const [appointments, setAppointments] = useState([]);
    const [toasts, setToasts] = useState([]);

    useEffect(() => {
        const fetchAppointments = async () => {
            const token = localStorage.getItem('accessToken'); // Retrieve the access token
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/v1/customerbooking/', {
                    headers: {
                        Authorization: `Bearer ${token}`, // Include the token in the request header
                        'Content-Type': 'application/json'
                    }
                });
                setAppointments(response.data); // Set the appointments state with the fetched data
            } catch (error) {
                console.error('Error fetching appointments:', error);
            }
        };

        fetchAppointments();
    }, []); // Runs once on component mount

    return (
        <div className="overflow-x-auto">

            <Table>
                <Table.Head>
                    <Table.HeadCell>Name</Table.HeadCell>
                    <Table.HeadCell>Address</Table.HeadCell>
                    <Table.HeadCell>Phone Number</Table.HeadCell>
                    <Table.HeadCell>Appointment Date</Table.HeadCell>
                    <Table.HeadCell>Appointment Time</Table.HeadCell>
                    <Table.HeadCell>Status</Table.HeadCell>
                    <Table.HeadCell>Technician</Table.HeadCell>
                    <Table.HeadCell>Customer</Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y">
                    {appointments.map(appointment => (
                        <Table.Row key={appointment.id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                {appointment.name}
                            </Table.Cell>
                            <Table.Cell>{appointment.address}</Table.Cell>
                            <Table.Cell>{appointment.phone_number}</Table.Cell>
                            <Table.Cell>{appointment.appointment_date}</Table.Cell>
                            <Table.Cell>{appointment.appointment_time}</Table.Cell>
                            <Table.Cell>
                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${appointment.status === 'accepted' ? 'bg-green-100 text-green-800 dark:bg-green-700 dark:text-green-100' : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-600 dark:text-yellow-100'}`}>
                                    {appointment.status}
                                </span>
                            </Table.Cell>
                            <Table.Cell>{appointment.technician}</Table.Cell>
                            <Table.Cell>{appointment.customer}</Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>

            {/* Toast Notifications */}
            <div className="fixed bottom-4 right-4 flex flex-col gap-4">
                {toasts.map(toast => (
                    <Toast key={toast.id}>
                        <div className={`inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${toast.type === 'delete' ? 'bg-red-100 text-red-500 dark:bg-red-800 dark:text-red-200' : 'bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200'}`}>
                            {toast.type === 'delete' ? <HiX className="h-5 w-5" /> : <HiCheck className="h-5 w-5" />}
                        </div>
                        <div className="ml-3 text-sm font-normal">{toast.message}</div>
                        <Toast.Toggle onClick={() => removeToast(toast.id)} />
                    </Toast>
                ))}
            </div>
        </div>
    );
}

export default Appointments;
