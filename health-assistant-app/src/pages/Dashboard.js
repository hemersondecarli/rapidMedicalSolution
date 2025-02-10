import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../styles/Dashboard.css';
import api from '../services/api';

// Import Icons from Lucide
import { LogOut, CalendarDays, Lock, ClipboardCheck, ShoppingCart, Stethoscope, Heart, User } from 'lucide-react';

function Dashboard() {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));

    const [showChangePassword, setShowChangePassword] = useState(false);
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [passwordMessage, setPasswordMessage] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const [mood, setMood] = useState(user?.mood || '');
    const [date, setDate] = useState(new Date());

    useEffect(() => {
        if (!user) {
            navigate('/login');
        } else {
            api.get(`/users/mood-selection/${user.id}`)
                .then(response => {
                    if (!response.data.moodLogged) {
                        navigate('/mood-selection');
                    } else {
                        setMood(response.data.mood);
                    }
                })
                .catch(error => console.error('Error checking mood:', error.message));
        }
    }, [user, navigate]);

    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('/login');
    };

    // Handle Change Password
    const handleChangePassword = async (e) => {
        e.preventDefault();
        setPasswordMessage('');
        setPasswordError('');

        if (!currentPassword || !newPassword) {
            setPasswordError('All fields are required');
            return;
        }

        try {
            const response = await api.post('/users/change-password', {
                email: user.email,
                currentPassword,
                newPassword,
            });
            setPasswordMessage(response.data.message);
            setCurrentPassword('');
            setNewPassword('');
            setShowChangePassword(false);
        } catch (error) {
            setPasswordError(error.response?.data?.message || 'An error occurred');
        }
    };

    return (
        <div className="dashboard-container">
            {}
            <header className="dashboard-header">
                <h1>Welcome, {user.name}</h1>
                <button onClick={handleLogout} className="logout-button">
                    <LogOut size={20} /> Logout
                </button>
            </header>

            <div className="dashboard-main">
                {/* Left Panel - User Info & Change Password */}
                <div className="dashboard-info">
                    <h2><User size={40} /> Your Details</h2>
                    <p><strong>Name:</strong> {user.name}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>GP Name:</strong> {user.gpName}</p>
                    <p><strong>Today's Mood:</strong> {mood || 'Not recorded'}</p>

                    {/* Toggle Change Password Form */}
                    <button
                        className="toggle-password-button"
                        onClick={() => setShowChangePassword(!showChangePassword)}
                    >
                        <Lock size={16} /> {showChangePassword ? 'Hide Change Password' : 'Change Password'}
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

                            {passwordMessage && <p className="success-message">{passwordMessage}</p>}
                            {passwordError && <p className="error-message">{passwordError}</p>}
                        </form>
                    )}
                </div>

                {/* Dashboard Navigation Cards with Icons */}
                <div className="dashboard-grid">
                    <div className="dashboard-card" onClick={() => navigate('/diagnosis')}>
                        <Stethoscope size={24} />
                        <h3>Diagnosis</h3>
                        <p>Get a personalized diagnosis based on your symptoms.</p>
                    </div>
                    <div className="dashboard-card" onClick={() => navigate('/place-orders')}>
                        <ShoppingCart size={24} />
                        <h3>Place Orders</h3>
                        <p>Order medications and other healthcare essentials.</p>
                    </div>
                    <div className="dashboard-card" onClick={() => navigate('/medications')}>
                        <ClipboardCheck size={24} />
                        <h3>List of Medications</h3>
                        <p>View and manage your prescribed medications.</p>
                    </div>
                    <div className="dashboard-card" onClick={() => navigate('/menstrual-tracker')}>
                        <Heart size={24} />
                        <h3>Menstrual Cycle Tracker</h3>
                        <p>Track your cycle with accuracy and ease.</p>
                    </div>
                    <div className="dashboard-card" onClick={() => navigate('/mental-support')}>
                        <User size={24} />
                        <h3>Nurse 24/7 & Mental Health</h3>
                        <p>Connect with a nurse or access mental health support anytime.</p>
                    </div>
                    <div className="dashboard-card" onClick={() => navigate('/ai-diagnosis')}>
                        <Stethoscope size={24} />
                        <h3>AI Pre-Diagnosis</h3>
                        <p>Receive an AI-powered preliminary diagnosis.</p>
                    </div>
                </div>

                {/* ✅ Calendar */}
                <div className="dashboard-calendar">
                    <h2><CalendarDays size={30} /> Calendar</h2>
                    <Calendar onChange={setDate} value={date} />
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
