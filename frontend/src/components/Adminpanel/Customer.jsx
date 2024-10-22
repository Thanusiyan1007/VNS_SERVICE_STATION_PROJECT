import React, { useEffect, useState } from 'react';
import { Table } from "flowbite-react";
import axios from 'axios';

function Customer() {
    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        const fetchCustomers = async () => {
            const token = localStorage.getItem('accessToken'); // Retrieve the access token
            try {
                const response = await axios.get('http://127.0.0.1:8000/users/', {
                    headers: {
                        Authorization: `Bearer ${token}`, // Include the token in the request header
                        'Content-Type': 'application/json'
                    }
                });
                const customerData = response.data.filter(user => !user.is_superuser); // Filter to exclude superuser accounts
                setCustomers(customerData); // Set the customers state with the fetched data
            } catch (error) {
                console.error('Error fetching customers:', error);
            }
        };

        fetchCustomers();
    }, []); // Runs once on component mount

    // Function to get the status of the user with color styling
    const getStatus = (is_staff) => {
        return is_staff ? (
            <span className="text-green-600 font-bold">Active</span>
        ) : (
            <span className="text-red-600 font-bold">Inactive</span>
        );
    };

    return (
        <div className="overflow-x-auto">
            <Table>
                <Table.Head>
                    <Table.HeadCell>Name</Table.HeadCell>
                    <Table.HeadCell>Email</Table.HeadCell>
                    <Table.HeadCell>Status</Table.HeadCell> {/* Added Status column */}
                </Table.Head>
                <Table.Body className="divide-y">
                    {customers.map(customer => (
                        <Table.Row
                            key={customer.id}
                            className="bg-white dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition duration-200"
                        >
                            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                {customer.first_name} {customer.last_name}
                            </Table.Cell>
                            <Table.Cell className="text-gray-700 dark:text-gray-300">{customer.email}</Table.Cell>
                            <Table.Cell>{getStatus(customer.is_staff)}</Table.Cell> {/* Displaying user status with color */}
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>
        </div>
    );
}

export default Customer;
