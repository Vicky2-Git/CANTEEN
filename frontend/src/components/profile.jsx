import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Profile = () => {
  const [user, setUser] = useState(null); // State to store user information
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('authToken'); // Assuming the token is stored in localStorage
        if (!token) {
          alert('No active session. Please log in.');
          navigate('/login');
          return;
        }

        const response = await axios.get('/api/users/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUser(response.data); // Store the user data
      } catch (error) {
        console.error('Error fetching user data:', error);
        alert('Failed to retrieve user session. Please log in again.');
        navigate('/login');
      }
    };

    fetchUser();
  }, [navigate]);

  return (
    <div className="container mt-5">
      <h2 className="text-center">My Profile</h2>
      {user ? (
        <div className="card p-4 mt-4">
          <h5>Welcome, {user.name}</h5>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Phone:</strong> {user.phone}</p>
          <p><strong>Role:</strong> {user.role}</p> {/* Optional: if role exists */}
        </div>
      ) : (
        <div className="text-center">
          <p>Loading user details...</p>
        </div>
      )}
    </div>
  );
};

export default Profile;
