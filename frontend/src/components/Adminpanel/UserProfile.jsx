import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Modal, TextInput, Label } from 'flowbite-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function UserProfile() {
  const [userDetails, setUserDetails] = useState(null);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [newSuperUser, setNewSuperUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        const response = await axios.get('http://127.0.0.1:8000/api/user/status/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const loggedInUser = response.data;
        if (loggedInUser.is_superuser) {
          setUserDetails(loggedInUser);
        } else {
          setError('No superuser found.');
        }
      } catch (err) {
        setError('Error fetching user profile');
        console.error(err);
      }
    };

    fetchUserProfile();
  }, []);

  const handleInputChange = (e) => {
    setNewSuperUser({ ...newSuperUser, [e.target.name]: e.target.value });
  };

  const handleCreateSuperUser = async () => {
    if (newSuperUser.password !== newSuperUser.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    const token = localStorage.getItem('accessToken');
    try {
      await axios.post('http://127.0.0.1:8000/users/create/', {
        first_name: newSuperUser.firstName,
        last_name: newSuperUser.lastName,
        email: newSuperUser.email,
        password: newSuperUser.password,
        is_superuser: true,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      toast.success('Superuser created successfully');
      setShowModal(false);
    } catch (error) {
      console.error('Error creating superuser:', error);
      toast.error('Failed to create superuser.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-gray-50"> {/* Centered layout */}
      <div className="bg-white shadow-lg rounded-xl p-8 max-w-2xl w-full grid grid-cols-1 md:grid-cols-2 gap-6"> {/* Grid layout with gap and padding */}
        
        {/* Profile Section */}
        <div className="flex flex-col items-center md:items-start"> {/* Align to center on mobile, left on desktop */}
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Superuser Profile</h2> {/* Hierarchy: Title larger */}
          {error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            userDetails && (
              <div className="grid grid-cols-1 gap-4 text-left"> {/* Grid for Profile Details */}
                <p className="text-gray-600"><strong>First Name:</strong> {userDetails.first_name}</p>
                <p className="text-gray-600"><strong>Last Name:</strong> {userDetails.last_name}</p>
                <p className="text-gray-600"><strong>Email:</strong> {userDetails.email}</p>
                <p className="text-gray-600"><strong>Superuser Status:</strong> {userDetails.is_superuser ? 'Yes' : 'No'}</p>
              </div>
            )
          )}
        </div>

        {/* Action Section */}
        <div className="flex flex-col items-center justify-center md:items-end"> {/* Centered on mobile, right-aligned on desktop */}
          <Button onClick={() => setShowModal(true)} className="bg-green-500 hover:bg-green-600 text-white w-full md:w-auto px-6 py-3 rounded-lg">
            Add Another Superuser
          </Button>
        </div>
      </div>

      {/* Modal for adding new superuser */}
      <Modal show={showModal} size="md" popup={true} onClose={() => setShowModal(false)}>
        <Modal.Header>
          <h3 className="text-xl font-bold text-gray-900">Add New Superuser</h3>
        </Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <div>
              <Label htmlFor="firstName" value="First Name" />
              <TextInput
                id="firstName"
                name="firstName"
                placeholder="First Name"
                value={newSuperUser.firstName}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="lastName" value="Last Name" />
              <TextInput
                id="lastName"
                name="lastName"
                placeholder="Last Name"
                value={newSuperUser.lastName}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="email" value="Email" />
              <TextInput
                id="email"
                name="email"
                type="email"
                placeholder="Email"
                value={newSuperUser.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="password" value="Password" />
              <TextInput
                id="password"
                name="password"
                type="password"
                placeholder="Password"
                value={newSuperUser.password}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="confirmPassword" value="Confirm Password" />
              <TextInput
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="Confirm Password"
                value={newSuperUser.confirmPassword}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleCreateSuperUser} className="bg-green-500 hover:bg-green-600 w-full">
            Create Superuser
          </Button>
          <Button color="gray" onClick={() => setShowModal(false)} className="w-full">
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>

      <ToastContainer position="bottom-right" autoClose={5000} />
    </div>
  );
}

export default UserProfile;
