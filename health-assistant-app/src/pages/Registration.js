// src/pages/Registration.js
import React, { useState } from 'react';
import '../styles/Registration.css';
import api from '../services/api'; // Axios instance for making API requests

function Registration() {
    // State to manage form inputs and messages
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        gp: '',
    });
    const [message, setMessage] = useState(''); // Success message
    const [error, setError] = useState(''); // Error message

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target; // Get the input's name and value
        setFormData({ ...formData, [name]: value }); // Update formData state
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent page refresh
        setMessage(''); // Clear previous success message
        setError(''); // Clear previous error message

        // Validate passwords
        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        // Ensure all fields are filled
        if (!formData.name || !formData.email || !formData.password || !formData.gp) {
            setError('All fields are required');
            return;
        }

        try {
            // Send form data to the backend
            const response = await api.post('/users/register', {
                name: formData.name,
                email: formData.email,
                password: formData.password,
                gpName: formData.gp, // Backend expects gpName
            });

            setMessage(response.data.message); // Show success message
            setFormData({ name: '', email: '', password: '', confirmPassword: '', gp: '' }); // Clear the form
        } catch (error) {
            // Show error message from the backend or a generic one
            setError(error.response?.data?.message || 'An error occurred');
        }
    };

    return (
        <div className="create-account-container">
            <h2>Create Account</h2>
            <form onSubmit={handleSubmit}>
                {/* Input for Full Name */}
                <label htmlFor="name">Full Name:</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    required
                />

                {/* Input for Email */}
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

                {/* Input for Password */}
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

                {/* Input for Confirm Password */}
                <label htmlFor="confirmPassword">Confirm Password:</label>
                <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm your password"
                    required
                />

                {/* Input for General Practitioner */}
                <label htmlFor="gp">Enter your GP:</label>
                <input
                    type="text"
                    id="gp"
                    name="gp"
                    value={formData.gp}
                    onChange={handleChange}
                    placeholder="Enter your general practitioner's name"
                    required
                />

                {/* Submit Button */}
                <button type="submit" className="submit-button">Create Account</button>
            </form>

            {/* Display success or error messages */}
            {message && <p style={{ color: 'green' }}>{message}</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
}

export default Registration;
