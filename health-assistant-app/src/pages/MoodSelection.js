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
    const [isLoading, setIsLoading] = useState(true); // ✅ New state for checking if mood exists

    useEffect(() => {
        if (!user) {
            navigate('/login'); // ✅ If user is not logged in, send to login
            return;
        }

        // ✅ Check if today's mood is already recorded
        const checkMood = async () => {
            try {
                const response = await api.get(`/users/mood-selection/${user.id}`);
                if (response.data.moodLogged) {
                    navigate('/dashboard'); // ✅ Skip mood selection if already logged
                }
            } catch (error) {
                console.error('Error checking mood:', error);
            } finally {
                setIsLoading(false); // ✅ Hide loading state once check is done
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
            navigate('/dashboard'); // ✅ Redirect after mood submission
        } catch (error) {
            console.error('Error saving mood:', error.response?.data || error.message);
            setError(error.response?.data?.message || 'An error occurred while saving your mood.');
        }
    };

    return (
        <div className="mood-container">
            {isLoading ? (
                <p>Checking mood status...</p> // ✅ Show loading message
            ) : (
                <>
                    <h2>Hello, {user.name}! How are you feeling today?</h2>
                    <form onSubmit={handleSubmit} className="mood-form">
                        <select value={mood} onChange={(e) => setMood(e.target.value)} required>
                            <option value="">Select Mood</option>
                            <option value="Happy">😊 Happy</option>
                            <option value="Neutral">😐 Neutral</option>
                            <option value="Sad">😢 Sad</option>
                            <option value="Anxious">😟 Anxious</option>
                            <option value="Excited">😃 Excited</option>
                            <option value="Stressed">😰 Stressed</option>
                        </select>
                        <button type="submit">Submit</button>
                    </form>
                    {message && <p className="success">{message}</p>}
                    {error && <p className="error">{error}</p>}
                </>
            )}
        </div>
    );
}

export default MoodSelection;
