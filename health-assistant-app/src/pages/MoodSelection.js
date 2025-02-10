import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api'; // Axios instance
import '../styles/MoodSelection.css';

function MoodSelection() {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));

    const [mood, setMood] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!user) {
            navigate('/login');
            return;
        }

        const checkMood = async () => {
            try {
                const response = await api.get(`/users/mood-selection/${user.id}`);
                if (response.data.moodLogged) {
                    navigate('/dashboard');
                }
            } catch (error) {
                console.error('Error checking mood:', error);
            } finally {
                setIsLoading(false);
            }
        };

        checkMood();
    }, [user, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');

        if (!mood) {
            setError('Please select a mood before submitting.');
            return;
        }

        try {
            await api.post('/users/mood-selection', { userId: user.id, mood });
            navigate('/dashboard');
        } catch (error) {
            console.error('Error saving mood:', error.response?.data || error.message);
            setError(error.response?.data?.message || 'An error occurred while saving your mood.');
        }
    };

    return (
        <div className="mood-container">
            {isLoading ? (
                <div className="loading">Checking mood status...</div>
            ) : (
                <div className="mood-card">
                    <h1>👋 Hey {user.name}, How are you feeling today?</h1>
                    <form onSubmit={handleSubmit} className="mood-form">
                        <div className="mood-options">
                            <button type="button" className={`mood-btn ${mood === 'Happy' ? 'selected' : ''}`} onClick={() => setMood('Happy')}>
                                😊 Happy
                            </button>
                            <button type="button" className={`mood-btn ${mood === 'Neutral' ? 'selected' : ''}`} onClick={() => setMood('Neutral')}>
                                😐 Neutral
                            </button>
                            <button type="button" className={`mood-btn ${mood === 'Sad' ? 'selected' : ''}`} onClick={() => setMood('Sad')}>
                                😢 Sad
                            </button>
                            <button type="button" className={`mood-btn ${mood === 'Anxious' ? 'selected' : ''}`} onClick={() => setMood('Anxious')}>
                                😟 Anxious
                            </button>
                            <button type="button" className={`mood-btn ${mood === 'Excited' ? 'selected' : ''}`} onClick={() => setMood('Excited')}>
                                😃 Excited
                            </button>
                            <button type="button" className={`mood-btn ${mood === 'Stressed' ? 'selected' : ''}`} onClick={() => setMood('Stressed')}>
                                😰 Stressed
                            </button>
                        </div>
                        <button type="submit" className="submit-mood-btn">Submit Mood</button>
                    </form>
                    {message && <p className="success">{message}</p>}
                    {error && <p className="error">{error}</p>}
                </div>
            )}
        </div>
    );
}

export default MoodSelection;
