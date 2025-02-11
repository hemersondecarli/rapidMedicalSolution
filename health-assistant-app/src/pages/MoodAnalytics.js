import React, { useState, useEffect } from 'react';
import api from '../services/api'; // Axios instance
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts';
import '../styles/MoodAnalytics.css';

// Mapping moods to numeric values for visualization
const moodScale = {
    "Excited": 6,
    "Happy": 5,
    "Neutral": 4,
    "Sad": 3,
    "Anxious": 2,
    "Stressed": 1
};

// Reverse mapping for display purposes
const moodLabels = Object.entries(moodScale).reduce((acc, [mood, value]) => {
    acc[value] = mood;
    return acc;
}, {});

function MoodAnalytics() {
    const user = JSON.parse(localStorage.getItem('user'));
    const [moodData, setMoodData] = useState([]);

    useEffect(() => {
        if (!user) return;

        // Fetch mood analytics data
        api.get(`/users/mood-analytics/${user.id}`)
            .then(response => {
                const formattedData = response.data.map(entry => ({
                    date: new Date(entry.date).toLocaleDateString(),
                    mood: moodScale[entry.mood] || 0 // Convert mood to numeric
                }));
                setMoodData(formattedData);
            })
            .catch(error => console.error('Error fetching mood analytics:', error.message));
    }, [user]);

    return (
        <div className="mood-analytics-container">
            <h2>📊 Mood Analytics</h2>
            <div className="chart-container">
                <ResponsiveContainer width="100%" height={400}>
                    <LineChart data={moodData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
                        <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                        <YAxis 
                            domain={[1, 6]}
                            tickFormatter={(tick) => moodLabels[tick] || tick} 
                            tick={{ fontSize: 12 }} 
                        />
                        <Tooltip 
                            formatter={(value) => moodLabels[value] || value} 
                            contentStyle={{ backgroundColor: "#222", color: "#fff", borderRadius: "5px" }}
                        />
                        <Legend verticalAlign="top" height={36} />
                        <Line type="monotone" dataKey="mood" stroke="#42a5f5" strokeWidth={3} dot={{ r: 5 }} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}

export default MoodAnalytics;
