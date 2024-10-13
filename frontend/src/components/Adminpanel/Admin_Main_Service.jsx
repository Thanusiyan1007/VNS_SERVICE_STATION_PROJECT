import React, { useEffect, useState } from 'react';
import { Table, Modal, Button, TextInput, Pagination } from 'flowbite-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

function Admin_Main_Service() {
    const [services, setServices] = useState([]); // State to hold services data
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false); // For the add modal
    const [selectedService, setSelectedService] = useState(null);

    // States for new service form
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const servicesPerPage = 5; // Number of services to display per page

    useEffect(() => {
        const fetchServices = async () => {
            const token = localStorage.getItem('accessToken'); // Retrieve the access token
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/v1/mainservice/', {
                    headers: {
                        Authorization: `Bearer ${token}`, // Include the token in the request header
                        'Content-Type': 'application/json'
                    }
                });
                setServices(response.data); // Set the services state with fetched data
            } catch (error) {
                console.error('Error fetching services:', error);
            }
        };

        fetchServices();
    }, []); // Runs once on component mount

    // Function to handle deleting a service
    const handleDeleteService = async () => {
        const token = localStorage.getItem('accessToken'); // Retrieve the access token
        try {
            await axios.delete(`http://127.0.0.1:8000/api/v1/mainservice/${selectedService.id}/`, {
                headers: {
                    Authorization: `Bearer ${token}`, // Include the token in the request header
                    'Content-Type': 'application/json'
                }
            });
            setServices(services.filter(service => service.id !== selectedService.id)); // Remove deleted service from the state
            toast.success('Service has been deleted successfully!');
        } catch (error) {
            console.error('Error deleting service:', error);
            toast.error('Failed to delete service.');
        }
        setShowDeleteModal(false);
    };

    // Function to handle adding a new service
    const handleAddService = async () => {
        const token = localStorage.getItem('accessToken');
        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        if (image) {
            formData.append('image', image);
        }

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/v1/mainservice/', formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });
            setServices([...services, response.data]); // Add the new service to the state
            toast.success('Service added successfully!');
            setShowAddModal(false);
            resetForm();
        } catch (error) {
            console.error('Error adding service:', error);
            toast.error('Failed to add service.');
        }
    };

    // Reset form fields
    const resetForm = () => {
        setTitle('');
        setDescription('');
        setImage(null);
    };

    // Get current services for the current page
    const indexOfLastService = currentPage * servicesPerPage;
    const indexOfFirstService = indexOfLastService - servicesPerPage;
    const currentServices = services.slice(indexOfFirstService, indexOfLastService);

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div>
            {/* Add Button */}
            <div className="mb-4 flex justify-end">
                <Button onClick={() => setShowAddModal(true)} >
                    Add Service
                </Button>
            </div>

            {/* Scrollable Table */}
            <div> {/* Scrollable container with fixed max height */}
                <Table>
                    <Table.Head>
                        <Table.HeadCell>Title</Table.HeadCell>
                        <Table.HeadCell>Description</Table.HeadCell>
                        <Table.HeadCell>Created At</Table.HeadCell>
                        <Table.HeadCell>Updated At</Table.HeadCell>
                        <Table.HeadCell>Image</Table.HeadCell>
                        <Table.HeadCell>Actions</Table.HeadCell>
                    </Table.Head>
                    <Table.Body className="divide-y">
                        {currentServices.map(service => (
                            <Table.Row key={service.id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                    {service.title}
                                </Table.Cell>
                                <Table.Cell>{service.description}</Table.Cell>
                                <Table.Cell>{new Date(service.created_at).toLocaleString()}</Table.Cell>
                                <Table.Cell>{new Date(service.updated_at).toLocaleString()}</Table.Cell>
                                <Table.Cell>
                                    {service.image && <img src={service.image} alt={service.title} className="w-16 h-16 object-cover cursor-pointer" />}
                                </Table.Cell>
                                <Table.Cell>
                                    <div className="inline-flex justify-center">
                                        <button
                                            onClick={() => {
                                                setSelectedService(service); // Set the selected service
                                                setShowDeleteModal(true); // Show the delete confirmation modal
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
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-4">
                <Pagination
                    currentPage={currentPage}
                    totalPages={Math.ceil(services.length / servicesPerPage)}
                    onPageChange={paginate}
                />
            </div>

            {/* Delete Confirmation Modal */}
            <Modal
                show={showDeleteModal}
                onClose={() => setShowDeleteModal(false)} // Close modal on cancel
            >
                <Modal.Header>
                    Delete Service
                </Modal.Header>
                <Modal.Body>
                    <p>Are you sure you want to delete this service?</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        color="red"
                        onClick={handleDeleteService} // Call delete function on confirmation
                    >
                        Delete
                    </Button>
                    <Button
                        onClick={() => setShowDeleteModal(false)} // Close modal on cancel
                    >
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Add Service Modal */}
            <Modal
                show={showAddModal}
                onClose={() => setShowAddModal(false)} // Close add modal on cancel
            >
                <Modal.Header>
                    Add Service
                </Modal.Header>
                <Modal.Body>
                    <div className="space-y-6">
                        <TextInput
                            label="Title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Enter service title"
                        />
                        <TextInput
                            label="Description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Enter service description"
                        />
                        <TextInput
                            label="Image"
                            type="file"
                            onChange={(e) => setImage(e.target.files[0])}
                        />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        color="green"
                        onClick={handleAddService} // Call add service function
                    >
                        Add Service
                    </Button>
                    <Button
                        onClick={() => setShowAddModal(false)} // Close modal on cancel
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

export default Admin_Main_Service;
