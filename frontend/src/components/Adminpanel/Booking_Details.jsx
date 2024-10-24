import React, { useEffect, useState } from 'react';
import { Table, Modal, Button } from 'flowbite-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

function Booking_Details() {
    const [bookings, setBookings] = useState([]);
    const [technicians, setTechnicians] = useState({});
    const [serviceTypes, setServiceTypes] = useState({});
    const [packages, setPackages] = useState({});
    const [errorMessage, setErrorMessage] = useState('');
    const [deleteError, setDeleteError] = useState('');
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedBookingId, setSelectedBookingId] = useState(null);

    useEffect(() => {
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

        const fetchTechnicianNames = async (bookings) => {
            const token = localStorage.getItem('accessToken');
            const technicianIds = [...new Set(bookings.map(booking => booking.technician))];
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
                    acc[response.data.id] = response.data.first_name + ' ' + response.data.last_name;
                    return acc;
                }, {});
                setTechnicians(technicianData);
            } catch (error) {
                console.error('Error fetching technician names:', error);
            }
        };

        const fetchServiceAndPackageNames = async (bookings) => {
            const token = localStorage.getItem('accessToken');
            const serviceTypeIds = [...new Set(bookings.map(booking => booking.service_type))];
            const packageIds = [...new Set(bookings.map(booking => booking.package))];

            try {
                const serviceTypeResponses = await Promise.all(
                    serviceTypeIds.map(id => axios.get(`http://127.0.0.1:8000/api/v1/servicetypes/${id}/`, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            'Content-Type': 'application/json',
                        },
                    }))
                );
                const serviceTypeData = serviceTypeResponses.reduce((acc, response) => {
                    acc[response.data.id] = response.data.name;
                    return acc;
                }, {});
                setServiceTypes(serviceTypeData);

                const packageResponses = await Promise.all(
                    packageIds.map(id => axios.get(`http://127.0.0.1:8000/api/v1/packages/${id}/`, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            'Content-Type': 'application/json',
                        },
                    }))
                );
                const packageData = packageResponses.reduce((acc, response) => {
                    acc[response.data.id] = response.data.name;
                    return acc;
                }, {});
                setPackages(packageData);
            } catch (error) {
                console.error('Error fetching service types or packages:', error);
            }
        };

        fetchBookings();
    }, []);

    const handleDelete = async () => {
        const token = localStorage.getItem('accessToken');
        try {
            await axios.delete(`http://127.0.0.1:8000/api/v1/bookings/${selectedBookingId}/`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });
            setBookings(bookings.filter(booking => booking.id !== selectedBookingId));
            setShowDeleteModal(false); // Close the modal after deletion
            toast.success('Booking has been deleted.'); // Show success toast
        } catch (error) {
            console.error('Error deleting booking:', error);
            setDeleteError('Failed to delete the booking.');
            toast.error('Failed to delete booking.');
        }
    };

    const openDeleteModal = (bookingId) => {
        setSelectedBookingId(bookingId);
        setShowDeleteModal(true);
    };

    const closeDeleteModal = () => {
        setShowDeleteModal(false);
    };

    return (
        <div className="overflow-x-auto py-10">
            <h2 className="text-2xl font-bold mb-6 text-maincolor">Booking Details</h2>

            {errorMessage && (
                <div className="mb-4 p-3 text-red-700 bg-red-100 rounded-lg">
                    {errorMessage}
                </div>
            )}

            {deleteError && (
                <div className="mb-4 p-3 text-red-700 bg-red-100 rounded-lg">
                    {deleteError}
                </div>
            )}

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
                    <Table.HeadCell>Actions</Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y">
                    {bookings.map(booking => (
                        <Table.Row key={booking.id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                            <Table.Cell>{booking.id}</Table.Cell>
                            <Table.Cell>{technicians[booking.technician] || 'Loading...'}</Table.Cell>
                            <Table.Cell>{booking.name}</Table.Cell>
                            <Table.Cell>{booking.address}</Table.Cell>
                            <Table.Cell>{booking.phone_number}</Table.Cell>
                            <Table.Cell>{serviceTypes[booking.service_type] || 'Loading...'}</Table.Cell>
                            <Table.Cell>{packages[booking.package] || 'Loading...'}</Table.Cell>
                            <Table.Cell>{booking.total_price}</Table.Cell>
                            <Table.Cell>{new Date(booking.appointment_date).toLocaleDateString()}</Table.Cell>
                            <Table.Cell>{booking.appointment_time}</Table.Cell>
                            <Table.Cell>
                                <button
                                    className="text-red-500 hover:underline"
                                    onClick={() => openDeleteModal(booking.id)}
                                >
                                    Delete
                                </button>
                            </Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>

            {/* Delete Confirmation Modal */}
            <Modal
                show={showDeleteModal}
                onClose={closeDeleteModal}
            >
                <Modal.Header>
                    Delete Booking
                </Modal.Header>
                <Modal.Body>
                    <p>Are you sure you want to delete this booking?</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        color="red"
                        onClick={handleDelete}
                    >
                        Delete
                    </Button>
                    <Button
                        onClick={closeDeleteModal}
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

export default Booking_Details;
