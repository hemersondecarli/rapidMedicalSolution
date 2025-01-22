import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Calendar from 'react-calendar'; // Calendar for dashboard
import 'react-calendar/dist/Calendar.css'; // Calendar styles
import '../styles/Dashboard.css'; // Custom Dashboard styles
import api from '../services/api'; // Axios instance

function Dashboard() {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));

    const [showChangePassword, setShowChangePassword] = useState(false); // Toggle visibility
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [date, setDate] = useState(new Date()); // Calendar state

    const handleLogout = () => {
        localStorage.removeItem('user'); // Clear user session
        navigate('/login'); // Redirect to login page
    };

    const handleChangePassword = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');

        if (!currentPassword || !newPassword) {
            setError('All fields are required');
            return;
        }

        try {
            const response = await api.post('/users/change-password', {
                email: user.email, // Send the user's email
                currentPassword, // Send current password
                newPassword, // Send new password
            });
            setMessage(response.data.message);
            setCurrentPassword('');
            setNewPassword(''); // Clear the password fields
            setShowChangePassword(false); // Hide the form after successful change
        } catch (error) {
            console.error('Error changing password:', error.response?.data || error.message);
            setError(error.response?.data?.message || 'An error occurred');
        }
    };

    return (
        <div className="dashboard-container">
            <header className="dashboard-header">
                <h1>Welcome, {user.name}</h1>
                <button onClick={handleLogout} className="logout-button">Logout</button>
            </header>

            <div className="dashboard-main">
                <div className="dashboard-info">
                    <h2>Your Details</h2>
                    <p><strong>Name:</strong> {user.name}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>GP Name:</strong> {user.gpName}</p>

                    {/* Toggle Change Password Form */}
                    <button
                        className="toggle-password-button"
                        onClick={() => setShowChangePassword(!showChangePassword)}
                    >
                        {showChangePassword ? 'Hide Change Password' : 'Change Password'}
                    </button>

                    {/* Change Password Form */}
                    {showChangePassword && (
                        <form onSubmit={handleChangePassword} className="password-change-form">
                            <h2>Change Password</h2>
                            <label htmlFor="currentPassword">Current Password:</label>
                            <input
                                type="password"
                                id="currentPassword"
                                value={currentPassword}
                                onChange={(e) => setCurrentPassword(e.target.value)}
                                placeholder="Enter current password"
                                required
                            />
                            <label htmlFor="newPassword">New Password:</label>
                            <input
                                type="password"
                                id="newPassword"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                placeholder="Enter new password"
                                required
                            />
                            <button type="submit" className="password-change-button">Change Password</button>

                            {message && <p style={{ color: 'green' }}>{message}</p>}
                            {error && <p style={{ color: 'red' }}>{error}</p>}
                        </form>
                    )}
                </div>

                <div className="dashboard-grid">
                    <div className="dashboard-card" onClick={() => navigate('/diagnosis')}>
                        <h3>Diagnosis</h3>
                        <p>Get a personalized diagnosis based on your symptoms.</p>
                    </div>
                    <div className="dashboard-card" onClick={() => navigate('/place-orders')}>
                        <h3>Place Orders</h3>
                        <p>Order medications and other healthcare essentials.</p>
                    </div>
                    <div className="dashboard-card" onClick={() => navigate('/medications')}>
                        <h3>List of Medications</h3>
                        <p>View and manage your prescribed medications.</p>
                    </div>
                    <div className="dashboard-card" onClick={() => navigate('/menstrual-tracker')}>
                        <h3>Menstrual Cycle Tracker</h3>
                        <p>Track your cycle with accuracy and ease.</p>
                    </div>
                    <div className="dashboard-card" onClick={() => navigate('/mental-support')}>
                        <h3>Nurse 24/7 & Mental Health</h3>
                        <p>Connect with a nurse or access mental health support anytime.</p>
                    </div>
                    <div className="dashboard-card" onClick={() => navigate('/ai-diagnosis')}>
                        <h3>AI Pre-Diagnosis</h3>
                        <p>Receive an AI-powered preliminary diagnosis.</p>
                    </div>
                </div>

                <div className="dashboard-calendar">
                    <h2>Calendar</h2>
                    <Calendar onChange={setDate} value={date} />
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
