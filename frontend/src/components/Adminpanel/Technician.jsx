import React, { useEffect, useState } from 'react';
import { Table, Modal, Button, TextInput } from "flowbite-react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify CSS
import axios from 'axios';

function Technician() {
    const [technicians, setTechnicians] = useState([]);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const [selectedTechnician, setSelectedTechnician] = useState(null);

    // Form state for adding technician
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    useEffect(() => {
        const fetchTechnicians = async () => {
            const token = localStorage.getItem('accessToken'); // Retrieve the access token
            try {
                const response = await axios.get('http://127.0.0.1:8000/users/', {
                    headers: {
                        Authorization: `Bearer ${token}`, // Include the token in the request header
                        'Content-Type': 'application/json'
                    }
                });
                const staffTechnicians = response.data.filter(user => user.is_staff); // Filter for staff members (technicians)
                setTechnicians(staffTechnicians); // Set the technicians state with the fetched data
            } catch (error) {
                console.error('Error fetching technicians:', error);
            }
        };

        fetchTechnicians();
    }, []); // Runs once on component mount

    // Function to handle deleting a technician
    const handleDeleteTechnician = async () => {
        const token = localStorage.getItem('accessToken'); // Retrieve the access token
        try {
            // Use the email of the selected technician in the delete request URL
            await axios.delete(`http://127.0.0.1:8000/user/delete/${selectedTechnician.email}/`, {
                headers: {
                    Authorization: `Bearer ${token}`, // Include the token in the request header
                    'Content-Type': 'application/json'
                }
            });
            setTechnicians(technicians.filter(tech => tech.id !== selectedTechnician.id)); // Remove from local state
            setShowDeleteModal(false); // Close the confirmation modal
            toast.success('Technician has been deleted.'); // Show success toast
        } catch (error) {
            console.error('Error deleting technician:', error);
            toast.error('Failed to delete technician.');
        }
    };

    // Function to add a new technician
    const handleAddTechnician = async () => {
        const token = localStorage.getItem('accessToken'); // Retrieve the access token

        if (password !== confirmPassword) {
            toast.error('Passwords do not match.');
            return;
        }

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/v1/auth/users/', {
                first_name: firstName,
                last_name: lastName,
                email: email,
                password: password,
                re_password: confirmPassword,
                is_staff: true
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            setTechnicians([...technicians, response.data]);
            toast.success('Technician added successfully!');
            resetForm();
            setShowAddModal(false);
        } catch (error) {
            console.error('Error adding technician:', error);
            if (error.response) {
                toast.error(`Failed to add technician: ${error.response.data.detail || 'Unknown error'}`);
            } else {
                toast.error('Failed to add technician: Network or server error');
            }
        }
    };

    // Reset form fields
    const resetForm = () => {
        setFirstName('');
        setLastName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
    };

    return (
        <div className="overflow-x-auto">
            {/* Add Button */}
            <div className="flex justify-end mb-4">
                <Button onClick={() => setShowAddModal(true)}>
                    Add Technician
                </Button>
            </div>

            <Table>
                <Table.Head>
                    <Table.HeadCell>Name</Table.HeadCell>
                    <Table.HeadCell>Email</Table.HeadCell>
                    <Table.HeadCell>Actions</Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y">
                    {technicians.map(technician =>
                        !technician.is_superuser && (
                            <Table.Row key={technician.id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                    {technician.first_name} {technician.last_name}
                                </Table.Cell>
                                <Table.Cell>{technician.email}</Table.Cell>
                                <Table.Cell>
                                    <div className="inline-flex justify-center">
                                        <button
                                            onClick={() => {
                                                setSelectedTechnician(technician);
                                                setShowDeleteModal(true);
                                            }}
                                            className="text-red-600 hover:text-red-700 dark:text-red-500 dark:hover:text-red-400 font-medium"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </Table.Cell>
                            </Table.Row>
                        )
                    )}

                </Table.Body>
            </Table>

            {/* Delete Confirmation Modal */}
            <Modal
                show={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
            >
                <Modal.Header>
                    Delete Technician
                </Modal.Header>
                <Modal.Body>
                    <p>Are you sure you want to delete this technician?</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        color="red"
                        onClick={handleDeleteTechnician}
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

            {/* Add Technician Modal */}
            <Modal
                show={showAddModal}
                onClose={() => setShowAddModal(false)}
            >
                <Modal.Header>
                    Add Technician
                </Modal.Header>
                <Modal.Body>
                    <div className="space-y-6">
                        <TextInput
                            label="First Name"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            placeholder="Enter first name"
                        />
                        <TextInput
                            label="Last Name"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            placeholder="Enter last name"
                        />
                        <TextInput
                            label="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter email"
                        />
                        <TextInput
                            label="Password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter password"
                        />
                        <TextInput
                            label="Confirm Password"
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Confirm password"
                        />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        color="green"
                        onClick={handleAddTechnician}
                    >
                        Add
                    </Button>
                    <Button
                        onClick={() => setShowAddModal(false)}
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

export default Technician;
