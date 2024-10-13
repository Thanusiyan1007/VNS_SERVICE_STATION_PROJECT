import React, { useEffect, useState } from 'react';
import { Table, Modal, Button, Toast } from "flowbite-react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify CSS
import { HiX } from "react-icons/hi";
import axios from 'axios';

function Customer() {
    const [customers, setCustomers] = useState([]);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedCustomer, setSelectedCustomer] = useState(null);

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
                const customerData = response.data.filter(user => !user.is_staff); // Filter for non-staff members (customers)
                setCustomers(customerData); // Set the customers state with the fetched data
            } catch (error) {
                console.error('Error fetching customers:', error);
            }
        };

        fetchCustomers();
    }, []); // Runs once on component mount

    // Function to handle deleting a customer
    const handleDeleteCustomer = async () => {
        const token = localStorage.getItem('accessToken'); // Retrieve the access token
        try {
            await axios.delete(`http://127.0.0.1:8000/user/delete/${selectedCustomer.email}/`, {
                headers: {
                    Authorization: `Bearer ${token}`, // Include the token in the request header
                    'Content-Type': 'application/json'
                }
            });
            setCustomers(customers.filter(cust => cust.id !== selectedCustomer.id)); // Remove from local state
            toast.success('Customer has been deleted.'); // Show success toast
        } catch (error) {
            console.error('Error deleting customer:', error);
            toast.error('Failed to delete customer.'); // Show error toast
        }
        setShowDeleteModal(false);
    };

    return (
        <div className="overflow-x-auto">
            <Table>
                <Table.Head>
                    <Table.HeadCell>Name</Table.HeadCell>
                    <Table.HeadCell>Email</Table.HeadCell>
                    <Table.HeadCell>Actions</Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y">
                    {customers.map(customer => (
                        <Table.Row key={customer.id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                {customer.first_name} {customer.last_name}
                            </Table.Cell>
                            <Table.Cell>{customer.email}</Table.Cell>
                            <Table.Cell>
                                <div className="inline-flex justify-center">
                                    <button
                                        onClick={() => {
                                            setSelectedCustomer(customer);
                                            setShowDeleteModal(true);
                                        }}
                                        className="text-red-600 hover:text-red-700 dark:text-red-500 dark:hover:text-red-400 font-medium"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>

            {/* Delete Confirmation Modal */}
            <Modal
                show={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
            >
                <Modal.Header>
                    Delete Customer
                </Modal.Header>
                <Modal.Body>
                    <p>Are you sure you want to delete this customer?</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        color="red"
                        onClick={handleDeleteCustomer}
                    >
                        Delete
                    </Button>
                    <Button
                        onClick={() => setShowDeleteModal(false)}
                    >
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Toast Notifications */}
            <ToastContainer position="bottom-right" autoClose={5000} />
        </div>
    );
}

export default Customer;
