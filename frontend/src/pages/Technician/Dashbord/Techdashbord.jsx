import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaCalendarAlt, FaPhone, FaMapMarkerAlt, FaUserCircle } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify CSS
import heroImage from '../../../Assets/a-group-of-diverse-employees-working-together-in-a.png'; // Add your own image path here

const TechnicianDashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [bookings_tech, setBookings_tech] = useState([]);
  const [error, setError] = useState(null);
  const [technicianEmail, setTechnicianEmail] = useState('none');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [serviceTypes, setServiceTypes] = useState([]);
  const [packages, setPackages] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    phone: '',
    serviceType: '',
    packageType: '',
    totalPrice: 0,
  });
  const [isSubmitting, setIsSubmitting] = useState(false); // To track form submission status
  const [filledBookings, setFilledBookings] = useState([]); // To track filled bookings

  // Fetch Service Types, Packages, and Bookings from the backend
  const fetchServiceTypesAndPackages = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      
      // Fetch Service Types
      const serviceTypesResponse = await axios.get('http://127.0.0.1:8000/api/v1/servicetypes/', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      // Fetch Packages
      const packagesResponse = await axios.get('http://127.0.0.1:8000/api/v1/packages/', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      // Update state with service types and packages
      setServiceTypes(serviceTypesResponse.data);
      setPackages(packagesResponse.data);
    } catch (err) {
      setError('Failed to fetch service types and packages.');
      console.error(err);
    }
  };

  const fetchBookings = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      const response = await axios.get('http://127.0.0.1:8000/api/v1/customerbooking/', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setBookings(response.data);
      setBookings_tech(response.data);  // Set technician's specific bookings
    } catch (err) {
      setError('Failed to fetch booking details. Please try again.');
      console.error(err);
    }
  };
  
  useEffect(() => {
    const fetchBookingsTech = async () => {
      const token = localStorage.getItem('accessToken');
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/v1/bookings/', {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        setBookings_tech(response.data);  // Set technician's specific bookings
        console.log('Fetched bookings:', response.data); // Confirm it fetched correctly
      } catch (error) {
        console.error('Error fetching technician bookings:', error);
        setError('Failed to fetch booking details.');
      }
    };
  
    const storedEmail = localStorage.getItem('email');
    const storedFilledBookings = JSON.parse(localStorage.getItem('filledBookings')) || [];
  
    if (storedEmail) {
      setTechnicianEmail(storedEmail);
    }
  
    setFilledBookings(storedFilledBookings);
  
    // Call all necessary fetch functions once when the component mounts
    fetchBookings();
    fetchBookingsTech();
    fetchServiceTypesAndPackages();
  
    // Ensure the state is saved to localStorage after bookings are marked filled
    localStorage.setItem('filledBookings', JSON.stringify(filledBookings));
  }, []);  // The empty dependency array ensures this runs only once on component mount
  

  const handleStatusChange = async (id, status) => {
    try {
      const token = localStorage.getItem('accessToken');
      
      // Update booking status
      await axios.patch(
        `http://127.0.0.1:8000/api/v1/customerbooking/${id}/update_status/`,
        { status },  // Set status (accepted/rejected)
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // If status is accepted, update the technician as well
      if (status === 'accepted') {
        await axios.patch(
          `http://127.0.0.1:8000/api/v1/customerbooking/${id}/update_technician/`,
          { technician: technicianEmail },  // Assign technician
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }

      toast.success(`Booking ${status} successfully!`);
      fetchBookings();  // Refresh bookings

    } catch (error) {
      console.error('Error updating booking status:', error);
      toast.error('Failed to update booking status. Please try again.');
    }
  };

  const handleFillCustomerNeeds = (booking) => {
    // Check if the booking is already filled
    if (filledBookings.includes(booking.id)) {
      toast.error('This booking has already been filled.');
      return;
    }

    // Pre-fill the form with booking details, including the service type from the booking
    setSelectedBooking(booking);
    const serviceType = serviceTypes.find(service => service.name === booking.service);
    const serviceTypeId = serviceType ? serviceType.id : '';

    setFormData({
      name: booking.name,
      address: booking.address,
      phone: booking.phone_number,
      serviceType: serviceTypeId, // Pre-populate the service type based on the booking's service
      packageType: booking.package_type || '', // Pre-populate the package type if available
      totalPrice: booking.total_price || 0,    // Pre-populate total price if available
    });
    setIsModalOpen(true);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload on form submission
    setIsSubmitting(true); // Set form as submitting to disable further submission

    const token = localStorage.getItem('accessToken'); // Get JWT token from localStorage

    try {
      await axios.post(
        'http://127.0.0.1:8000/api/v1/bookings/',  // Assuming you're posting to the Booking API
        {
          name: formData.name,
          address: formData.address,
          phone_number: formData.phone,
          service_type: formData.serviceType,  // Pass the selected service type
          package: formData.packageType,       // Pass the selected package type
          total_price: formData.totalPrice,    // Pass the calculated total price
          appointment_date: selectedBooking.appointment_date,
          appointment_time: selectedBooking.appointment_time,
          technician: technicianEmail,         // Pass the logged-in technician's email
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,  // Send token in the Authorization header
          },
        }
      );
      
      // Success: Show toast notification and close the modal
      toast.success('Booking successfully submitted!');
      setFilledBookings([...filledBookings, selectedBooking.id]); // Mark the booking as filled
      setIsModalOpen(false);  // Close the modal after submission
      fetchBookings();  // Refresh bookings after successful submission
    } catch (err) {
      console.error('Error submitting booking form:', err);
      toast.error('Failed to submit the booking. Please try again.'); // Show error toast
    } finally {
      setIsSubmitting(false); // Re-enable the form after submission attempt
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // Update total price when serviceType or packageType changes
    if (name === 'packageType') {
      const selectedPackage = packages.find(pkg => pkg.id === parseInt(value));
      if (selectedPackage) {
        setFormData((prevData) => ({
          ...prevData,
          totalPrice: selectedPackage.average_price, // Set total price based on selected package
        }));
      }
    }
  };

  const isToday = (date) => {
    const today = new Date().toISOString().split('T')[0];
    const appointmentDate = new Date(date).toISOString().split('T')[0];
    return today === appointmentDate;
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Toast notification container */}
      <ToastContainer />

      {/* Hero Section with Image */}
      <div className="relative w-full h-96">
        <img src={heroImage} alt="Hero" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white">
            Welcome to the VNS Staff Portal
          </h1>
        </div>
      </div>

      {/* Introduction Section */}
      <div className="text-center my-12 px-4 sm:px-6 md:px-8 lg:px-10 py-4">
        <h2 className="text-3xl font-bold text-maincolor mb-4">Manage Your Appointments Efficiently</h2>
        <p className="text-lg text-gray-700 max-w-2xl mx-auto">
          This portal allows you to handle appointments, accept or reject bookings, and view detailed information about each client.
          Our goal is to streamline your workflow and help you deliver exceptional service to your customers.
        </p>
      </div>

      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      {/* Booking Cards Section */}
      {bookings.length === 0 && !error ? (
        <p className="text-center text-gray-700">No bookings available</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 pb-12">
          {bookings.map((booking) => {
            if (booking.status === 'accepted' && booking.technician !== technicianEmail) return null;
            if (booking.status === 'rejected' && booking.rejected_technicians.includes(technicianEmail)) return null;

            return (
              <div key={booking.id} className="bg-white p-6 shadow-lg rounded-lg transform transition-all hover:scale-105 hover:shadow-2xl">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <FaUserCircle className="text-maincolor text-3xl mr-3" />
                    <h2 className="text-xl font-semibold">{booking.name}</h2>
                  </div>
                  <span className={`py-1 px-3 rounded-full text-sm ${booking.status === 'accepted' ? 'bg-green-100 text-green-600' : booking.status === 'rejected' ? 'bg-red-100 text-red-600' : 'bg-yellow-100 text-yellow-600'}`}>
                    {booking.status}
                  </span>
                </div>
                <div className="text-gray-600 space-y-2">
                  <p className="flex items-center">
                    <FaMapMarkerAlt className="mr-2 text-maincolor" /> {booking.address}
                  </p>
                  <p className="flex items-center">
                    <FaPhone className="mr-2 text-maincolor" /> {booking.phone_number}
                  </p>
                  <p className="flex items-center">
                    <FaCalendarAlt className="mr-2 text-maincolor" /> {new Date(booking.appointment_date).toLocaleDateString()} at {booking.appointment_time}
                  </p>
                </div>

                {/* Accept and Reject buttons for pending bookings */}
                {booking.status === 'pending' && (
                  <div className="mt-6 flex justify-between">
                    <button
                      onClick={() => handleStatusChange(booking.id, 'accepted')}
                      className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition-colors duration-200">
                      Accept
                    </button>
                    <button
                      onClick={() => handleStatusChange(booking.id, 'rejected')}
                      className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition-colors duration-200">
                      Reject
                    </button>
                  </div>
                )}

                {/* Show Fill Customer Needs button only if the appointment date is today, it hasn't been filled, and it isn't in bookings_tech */}
                {booking.status === 'accepted' && 
                  booking.technician === technicianEmail && 
                  isToday(booking.appointment_date) && 
                  !filledBookings.includes(booking.id) && 
                  !bookings_tech.some(b => b.id === booking.id) && (
                  <div className="mt-6">
                    <button
                      onClick={() => handleFillCustomerNeeds(booking)}
                      className="bg-blue-500 text-white py-2 px-4 rounded-md w-full hover:bg-blue-600 transition-colors duration-200">
                      Fill Customer Needs
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* About Us Section */}
      <div className="bg-maincolor py-12 text-center text-white">
        <h2 className="text-4xl font-bold mb-6">About VNS Service Station</h2>
        <p className="text-lg max-w-4xl mx-auto">
          At VNS Service Station, we pride ourselves on delivering the best technical services to our customers.
          Our team of dedicated professionals is committed to excellence and providing seamless, efficient solutions.
          The Staff Portal is designed to enhance your work experience and streamline all your interactions with clients.
        </p>
      </div>

      {/* Modal Popup for Filling Customer Needs */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
            <h3 className="text-xl font-bold mb-4">Fill Customer Needs</h3>
            <form onSubmit={handleFormSubmit}>
              <div className="mb-4">
                <label className="block mb-2 font-semibold">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg"
                  required
                  disabled={isSubmitting} // Disable input when form is submitting
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2 font-semibold">Address</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg"
                  required
                  disabled={isSubmitting} // Disable input when form is submitting
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2 font-semibold">Phone Number</label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg"
                  required
                  disabled={isSubmitting} // Disable input when form is submitting
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2 font-semibold">Service Type</label>
                <select
                  name="serviceType"
                  value={formData.serviceType}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg"
                  required
                  disabled={isSubmitting} // Disable input when form is submitting
                >
                  {formData.serviceType === '' && (
                    <option value="">Select a Service</option>  // Show this only if no service is pre-filled
                  )}
                  {serviceTypes.map(service => (
                    <option key={service.id} value={service.id}>{service.name}</option>
                  ))}
                </select>
              </div>
              {formData.serviceType && (
                <div className="mb-4">
                  <label className="block mb-2 font-semibold">Package Type</label>
                  <select
                    name="packageType"
                    value={formData.packageType}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-lg"
                    required
                    disabled={isSubmitting} // Disable input when form is submitting
                  >
                    <option value="">Select a Package</option>
                    {packages.filter(pkg => pkg.service_type === parseInt(formData.serviceType)).map(pkg => (
                      <option key={pkg.id} value={pkg.id}>{pkg.name} - {pkg.description}</option>
                    ))}
                  </select>
                </div>
              )}
              {/* Display Total Price */}
              {formData.packageType && formData.serviceType && (
                <div className="mb-4">
                  <label className="block mb-2 font-semibold">Total Price</label>
                  <p className="text-lg font-semibold">{formData.totalPrice} LKR</p>
                </div>
              )}
              <div className="flex justify-end mt-6">
                <button
                  type="button"
                  onClick={closeModal}
                  className="bg-gray-500 text-white py-2 px-4 rounded-md mr-4"
                  disabled={isSubmitting} // Disable button when form is submitting
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white py-2 px-4 rounded-md"
                  disabled={isSubmitting} // Disable submit button when form is submitting
                >
                  {isSubmitting ? 'Submitting...' : 'Submit'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TechnicianDashboard;
