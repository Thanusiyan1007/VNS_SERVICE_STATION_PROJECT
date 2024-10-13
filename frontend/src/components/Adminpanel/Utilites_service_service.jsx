import React, { useEffect, useState } from 'react';
import { Table, Modal, Button, Toast } from 'flowbite-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify CSS
import { HiX } from 'react-icons/hi';
import axios from 'axios';

function Utilites_service_service() {
    const [services, setServices] = useState([]);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false); // Add Modal State
    const [showImageModal, setShowImageModal] = useState(false);
    const [selectedService, setSelectedService] = useState(null);
    const [toasts, setToasts] = useState([]);
    const [imageUrl, setImageUrl] = useState('');

    // Form States for adding a new service
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null); // Store image file

    useEffect(() => {
        const fetchServices = async () => {
            const token = localStorage.getItem('accessToken');
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/v1/services/', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });
                if (Array.isArray(response.data)) {
                    setServices(response.data);
                } else {
                    console.error('Expected an array but got:', response.data);
                }
            } catch (error) {
                console.error('Error fetching services:', error);
            }
        };

        fetchServices();
    }, []);

    // Function to handle adding a new service
    const handleAddService = async () => {
        const token = localStorage.getItem('accessToken');
        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('image', image); // Append the image file

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/v1/services/', formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });
            setServices([...services, response.data]); // Update services with the new one
            toast.success('Service added successfully!');
            setShowAddModal(false); // Close the modal
            resetForm(); // Clear the form fields
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

    // Function to handle deleting a service
    const handleDeleteService = async () => {
        const token = localStorage.getItem('accessToken');
        try {
            await axios.delete(`http://127.0.0.1:8000/api/v1/services/${selectedService.id}/`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            setToasts([...toasts, { id: Date.now(), type: 'delete', message: 'Service has been deleted.' }]);
            setServices(services.filter(service => service.id !== selectedService.id));
            setShowDeleteModal(false);
        } catch (error) {
            console.error('Error deleting service:', error);
            toast.error('Failed to delete service.');
        }
    };

    // Function to handle image click
    const handleImageClick = (image) => {
        setImageUrl(image);
        setShowImageModal(true);
    };

    return (
        <div className="overflow-x-auto">
            {/* Add Button */}
            <div className="flex justify-end mb-4">
                <Button onClick={() => setShowAddModal(true)}>Add Service</Button>
            </div>

            <Table>
                <Table.Head>
                    <Table.HeadCell>Title</Table.HeadCell>
                    <Table.HeadCell>Description</Table.HeadCell>
                    <Table.HeadCell>Image</Table.HeadCell>
                    <Table.HeadCell>Created At</Table.HeadCell>
                    <Table.HeadCell>Updated At</Table.HeadCell>
                    <Table.HeadCell>Actions</Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y">
                    {services.map(service => (
                        <Table.Row key={service.id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                {service.title}
                            </Table.Cell>
                            <Table.Cell>{service.description}</Table.Cell>
                            <Table.Cell>
                                {service.image && (
                                    <img
                                        src={service.image}
                                        alt={service.title}
                                        className="w-16 h-16 object-cover cursor-pointer"
                                        onClick={() => handleImageClick(service.image)}
                                    />
                                )}
                            </Table.Cell>
                            <Table.Cell>{new Date(service.created_at).toLocaleString()}</Table.Cell>
                            <Table.Cell>{new Date(service.updated_at).toLocaleString()}</Table.Cell>
                            <Table.Cell>
                                <div className="inline-flex justify-center">
                                    <button
                                        onClick={() => {
                                            setSelectedService(service);
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

            {/* Add Service Modal */}
            <Modal
                show={showAddModal}
                onClose={() => setShowAddModal(false)}
            >
                <Modal.Header>
                    Add Service
                </Modal.Header>
                <Modal.Body>
                    <div className="space-y-6">
                        <input
                            type="text"
                            placeholder="Enter Title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                        <textarea
                            placeholder="Enter Description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                        <input
                            type="file"
                            onChange={(e) => setImage(e.target.files[0])} // Update the image state
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        color="green"
                        onClick={handleAddService}
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

            {/* Delete Confirmation Modal */}
            <Modal
                show={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
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
                        onClick={handleDeleteService}
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

            {/* Image View Modal */}
            <Modal
                show={showImageModal}
                onClose={() => setShowImageModal(false)}
            >
                <Modal.Header>
                    Service Image
                </Modal.Header>
                <Modal.Body>
                    {imageUrl && <img src={imageUrl} alt="Service" className="w-full h-auto" />}
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => setShowImageModal(false)}>Close</Button>
                </Modal.Footer>
            </Modal>

            {/* Toast Notifications */}
            <ToastContainer position="bottom-right" autoClose={5000} />
        </div>
    );
}

export default Utilites_service_service;
