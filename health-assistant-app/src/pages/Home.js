// src/pages/Home.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Home.css';

function Home() {
    const navigate = useNavigate();

    return (
        <div className="home-container">
            <div className="home-card">
                <h1 className="home-title">👋 Welcome to Health Assistant</h1>
                <p className="home-subtitle">Track your health, get personalized insights, and stay on top of your well-being.</p>
                <div className="home-buttons">
                    <button onClick={() => navigate('/login')} className="home-button login">Already a User?</button>
                    <button onClick={() => navigate('/Registration')} className="home-button register">Create Account</button>
                </div>
            </div>
        </div>
    );
}

export default Home;
