import React from 'react';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('user'); // Clear user data
        navigate('/login'); // Redirect to login page
    };

    const user = JSON.parse(localStorage.getItem('user'));
// Dashboard
    return (
        <div>
            <h1>Welcome <strong></strong> {user.name}</h1>
            {user && (
                <div>
                    <p><strong>Name:</strong> {user.name}</p>
                    <p><strong>Email:</strong> {user.email}</p>

                    <button onClick={handleLogout}>Logout</button>
                </div>
            )}
            {!user && <p>No user details available.</p>}
        </div>
    );
}

export default Dashboard;
