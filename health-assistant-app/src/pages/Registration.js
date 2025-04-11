import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Registration.css';
import api from '../services/api';

function Registration() {
    const navigate = useNavigate();
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
        <div className="register-wrapper">
            <div className="register-card">
                <h2>Create Your Account</h2>
                <p>Complete the form below to get started with your health assistant.</p>

                <form onSubmit={handleSubmit}>
                    <label>Full Name</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        required
                    />

                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        required
                    />

                    <label>Password</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Enter a password"
                        required
                    />

                    <label>Confirm Password</label>
                    <input
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        placeholder="Repeat your password"
                        required
                    />

                    <label>GP Name</label>
                    <input
                        type="text"
                        name="gp"
                        value={formData.gp}
                        onChange={handleChange}
                        placeholder="Dr. Smith"
                        required
                    />

                    <button type="submit" className="btn-primary">Create Account</button>
                    <button type="button" className="btn-secondary" onClick={() => navigate('/')}>
                        ← Back to Home
                    </button>
                </form>

                {message && <p className="success-msg">{message}</p>}
                {error && <p className="error-msg">{error}</p>}
            </div>
        </div>
    );
}

export default Registration;
