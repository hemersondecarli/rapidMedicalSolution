import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../styles/Dashboard.css';
import api from '../services/api';

import {
    LogOut, CalendarDays, Lock, ClipboardCheck,
    Stethoscope, Heart, User, PhoneCall
} from 'lucide-react';

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

    const [symptomLog, setSymptomLog] = useState({});
    const [selectedSymptoms, setSelectedSymptoms] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [message, setMessage] = useState('');

    const symptomOptions = [
        "Headache", "Fatigue", "Nausea", "Fever", "Cough",
        "Sore Throat", "Body Aches", "Loss of Smell", "Diarrhea"
    ];

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

        const fetchHistory = async () => {
            try {
                const res = await api.get(`http://localhost:5001/api/symptoms/${user.id}`);
                const mapped = {};
                res.data.forEach((entry) => {
                    mapped[new Date(entry.date).toDateString()] = entry.symptoms;
                });
                setSymptomLog(mapped);
            } catch (err) {
                console.error("Error fetching symptoms:", err);
            }
        };
        fetchHistory();
    }, [user, navigate]);

    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('/login');
    };

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

    const handleSaveSymptoms = async () => {
        try {
            await api.post("http://localhost:5001/api/symptoms/log", {
                user_id: user.id,
                date: date,
                symptoms: selectedSymptoms,
            });

            setSymptomLog((prev) => ({
                ...prev,
                [date.toDateString()]: selectedSymptoms,
            }));

            setMessage("✅ Symptoms saved!");
            setTimeout(() => setMessage(""), 2000);
            setShowModal(false);
        } catch (err) {
            console.error("Error saving symptoms:", err);
            setMessage("❌ Failed to save.");
        }
    };

    const handleClearSymptoms = async () => {
        const formatted = date.toISOString(); // gives full ISO format
        console.log("🔍 Attempting to clear:", user.id, formatted);
      
        try {
          const res = await api.delete(`http://localhost:5001/api/symptoms/${user.id}/${formatted}`);
            if (res.status === 200) {
                const updatedLog = { ...symptomLog };
                delete updatedLog[date.toDateString()];
                setSymptomLog(updatedLog);
                setSelectedSymptoms([]);
                setMessage("✅ Symptoms cleared!");
                setTimeout(() => setMessage(""), 2000);
            }
        } catch (err) {
            console.error("Error clearing symptoms:", err);
            setMessage("❌ Failed to clear symptoms.");
        }
    };
    


    const tileClassName = ({ date }) => {
        return symptomLog[date.toDateString()] ? 'has-symptoms' : null;
    };

    return (
        <div className="dashboard-container">
            <header className="dashboard-header">
                <h1>Welcome, {user.name}</h1>
                <button onClick={handleLogout} className="logout-button">
                    <LogOut size={20} /> Logout
                </button>
            </header>

            <div className="dashboard-main">
                <div className="dashboard-info">
                    <h2><User size={40} /> Your Details</h2>
                    <p><strong>Name:</strong> {user.name}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>GP Name:</strong> {user.gpName}</p>
                    <p><strong>Today's Mood:</strong> {mood || 'Not recorded'}</p>

                    <button
                        className="toggle-password-button"
                        onClick={() => setShowChangePassword(!showChangePassword)}
                    >
                        <Lock size={16} /> {showChangePassword ? 'Hide Change Password' : 'Change Password'}
                    </button>

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

                <div className="dashboard-grid">
                    <div className="dashboard-card" onClick={() => navigate('/diagnosis')}>
                        <Stethoscope size={24} />
                        <h3>Diagnosis</h3>
                        <p>Get a personalized diagnosis based on your symptoms.</p>
                    </div>
                    <div className="dashboard-card" onClick={() => navigate("/medical-history")}>
                        <h3>📚 Medical History</h3>
                        <p>Review your past diagnoses and treatments.</p>
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
                    <div className="dashboard-card">
                        <a href="tel:+015625150" style={{ textDecoration: 'none', color: 'inherit' }}>
                            <PhoneCall size={24} />
                            <h3>Call Nurse 24/7</h3>
                            <p>Tap to call a nurse for mental health support.</p>
                        </a>
                    </div>
                    <div className="dashboard-card" onClick={() => navigate('/ai-diagnosis')}>
                        <Stethoscope size={24} />
                        <h3>AI Pre-Diagnosis</h3>
                        <p>Receive an AI-powered preliminary diagnosis.</p>
                    </div>
                    <div className="dashboard-card" onClick={() => navigate('/mood-analytics')}>
                        <ClipboardCheck size={24} />
                        <h3>Mood Analytics</h3>
                        <p>Visualize your mood trends over time.</p>
                    </div>
                    <div className="dashboard-card" onClick={() => navigate("/symptom-tracker")}>
                        <h3>🩺 Symptom Tracker</h3>
                        <p>Track daily symptoms and view them on your calendar.</p>
                    </div>
                </div>

                <div className="dashboard-calendar">
                    <h2><CalendarDays size={30} /> Calendar</h2>
                    <Calendar
                        onChange={(d) => {
                            setDate(d);
                            const stored = symptomLog[d.toDateString()] || [];
                            setSelectedSymptoms(stored);
                            setShowModal(true);
                        }}
                        value={date}
                        tileClassName={tileClassName}
                    />
                </div>
            </div>

            {showModal && (
                <div className="symptom-modal">
                    <div className="modal-content">
                        <h3>📝 Symptoms for {date.toDateString()}</h3>
                        <div className="symptom-options">
                            {symptomOptions.map((symptom) => (
                                <button
                                    key={symptom}
                                    className={selectedSymptoms.includes(symptom) ? "selected" : ""}
                                    onClick={() =>
                                        setSelectedSymptoms((prev) =>
                                            prev.includes(symptom)
                                                ? prev.filter((s) => s !== symptom)
                                                : [...prev, symptom]
                                        )
                                    }
                                >
                                    {symptom}
                                </button>
                            ))}
                        </div>
                        <div className="modal-buttons">
                            <button onClick={handleSaveSymptoms} className="save-button">💾 Save</button>
                            {selectedSymptoms.length > 0 && (
                                <button onClick={handleClearSymptoms} className="clear-button">🗑️ Clear Symptoms</button>
                            )}
                            <button className="close-button" onClick={() => setShowModal(false)}>❌ Close</button>
                        </div>
                        {message && <p className="status-message">{message}</p>}
                    </div>
                </div>
            )}
        </div>
    );
}

export default Dashboard;
