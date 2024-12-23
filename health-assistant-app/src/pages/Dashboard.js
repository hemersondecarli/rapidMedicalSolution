// src/pages/Dashboard.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Dashboard.css';

function Dashboard() {
    const navigate = useNavigate();

    // Handle user logout
    const handleLogout = () => {
        localStorage.removeItem('token'); // Clear the token from local storage
        navigate('/login'); // Redirect to the login page
    };

    return (
        <div className="dashboard-container">
            <h1>Welcome to Your Dashboard</h1>
            <p>Here, you can manage your profile and track your health.</p>

            {/* Logout Button */}
            <button className="logout-button" onClick={handleLogout}>
                Logout
            </button>
        </div>
    );
}

export default Dashboard;
