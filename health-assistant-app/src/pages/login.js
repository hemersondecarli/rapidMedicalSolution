// src/pages/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import '../styles/Login.css';
import api from '../services/api'; // Axios instance

function Login() {
    const navigate = useNavigate(); // Hook for navigation
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');

        try {
            const response = await api.post('/users/login', formData);
            setMessage(response.data.message);

            // Save user details in local storage (optional)
            localStorage.setItem('user', JSON.stringify(response.data.user));

            // Redirect to another page (e.g., User Dashboard)
            navigate('/dashboard'); // Replace '/dashboard' with the route to your desired page
        } catch (error) {
            console.error('Login error:', error.response?.data || error.message);
            setError(error.response?.data?.message || 'An error occurred during login');
        }
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            <form id="LoginForm" onSubmit={handleSubmit}>
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    required
                />

                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    required
                />

                <button type="submit" className="submit-button">Login</button>
            </form>

            {/* Display messages */}
            {message && <p style={{ color: 'green' }}>{message}</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
}

export default Login;
