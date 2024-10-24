import React, { useEffect, useState } from 'react';
import { Table } from "flowbite-react";
import axios from 'axios';

function Customer() {
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCustomers = async () => {
            const token = localStorage.getItem('accessToken'); 
            if (!token) {
                setError('No access token found. Please login again.');
                setLoading(false);
                return;
            }
            
            try {
                const response = await axios.get('http://127.0.0.1:8000/users/', {
                    headers: {
                        Authorization: `Bearer ${token}`, 
                        'Content-Type': 'application/json'
                    }
                });
                console.log('Response data:', response.data);  // Log the response to check `is_active` values
                const customerData = response.data.filter(user => !user.is_superuser);
                setCustomers(customerData);
                setLoading(false);
            } catch (error) {
                setError('Error fetching customers. Please try again later.');
                setLoading(false);
                console.error('Error fetching customers:', error);
            }
        };

        fetchCustomers();
    }, []); 

    const getStatus = (is_active) => {
        return is_active ? (
            <span className="text-green-600 font-bold">Active</span>
        ) : (
            <span className="text-red-600 font-bold">Inactive</span>
        );
    };

    if (loading) {
        return <p>Loading customers...</p>;
    }

    if (error) {
        return <p className="text-red-500">{error}</p>;
    }

    return (
        <div className="overflow-x-auto">
            <Table>
                <Table.Head>
                    <Table.HeadCell>Name</Table.HeadCell>
                    <Table.HeadCell>Email</Table.HeadCell>
                    <Table.HeadCell>Status</Table.HeadCell> 
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
                            <Table.Cell>{getStatus(customer.is_active)}</Table.Cell> 
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>
        </div>
    );
}

export default Customer;
