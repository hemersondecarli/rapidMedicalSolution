import React, { useState } from 'react';
import '../styles/Registration.css';
import api from '../services/api'; // Axios instance

function Registration() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        gp: '',
    });
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');

        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        try {
            const response = await api.post('/users/register', {
                name: formData.name,
                email: formData.email,
                password: formData.password,
                confirmPassword: formData.confirmPassword,
                gpName: formData.gp,
            });

            setMessage(response.data.message);
            setFormData({ name: '', email: '', password: '', confirmPassword: '', gp: '' });
        } catch (error) {
            console.error('Error during registration:', error.response?.data || error.message);
            setError(error.response?.data?.message || 'An error occurred during registration');
        }
    };

    return (
        <div className="create-account-container">
            <h2>Create Account</h2>
            <form id="RegistrationForm" onSubmit={handleSubmit}>
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

                <button type="submit" className="submit-button">Create Account</button>
            </form>

            {message && <p style={{ color: 'green' }}>{message}</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
}

export default Registration;
