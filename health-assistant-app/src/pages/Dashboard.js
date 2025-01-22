import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api'; // Import the Axios instance

function Dashboard() {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));

    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleLogout = () => {
        localStorage.removeItem('user'); // Clear user data
        navigate('/login'); // Redirect to login page
    };

    const handleChangePassword = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');

        try {
            const response = await api.post('/users/change-password', {
                email: user.email,
                oldPassword,
                newPassword,
            });
            setMessage(response.data.message);
            setOldPassword('');
            setNewPassword('');
        } catch (error) {
            console.error('Error changing password:', error.response?.data || error.message);
            setError(error.response?.data?.message || 'An error occurred');
        }
    };

    return (
        <div>
            <h1>Welcome <strong>{user.name}</strong></h1>
            {user && (
                <div>
                    <p><strong>Name:</strong> {user.name}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>GP Name:</strong> {user.gpName}</p> 
                    <button onClick={handleLogout}>Logout</button>

                    <form onSubmit={handleChangePassword}>
                        <label htmlFor="oldPassword">Old Password:</label>
                        <input
                            type="password"
                            id="oldPassword"
                            value={oldPassword}
                            onChange={(e) => setOldPassword(e.target.value)}
                            required
                        />

                        <label htmlFor="newPassword">New Password:</label>
                        <input
                            type="password"
                            id="newPassword"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                        />

                        <button type="submit">Change Password</button>
                    </form>

                    {/* Display messages */}
                    {message && <p style={{ color: 'green' }}>{message}</p>}
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                </div>
            )}
            {!user && <p>No user details available.</p>}
        </div>
    );
}

export default Dashboard;
