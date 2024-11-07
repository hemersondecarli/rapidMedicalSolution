// src/pages/Home.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Home.css';

function Home() {
    const navigate = useNavigate();

    const goToLogin = () => {
        navigate('/login');
    };

    const goToCreateAccount = () => {
        navigate('/CreateAccount'); //route for the Create Account page
    };

    return (
        <div className="home-container">
            <h1>Welcome to the Health Assistant App</h1>
            <p>Get started by logging in or creating an account.</p>
            <button onClick={goToLogin} className="home-button">Already a User?</button>
            <button onClick={goToCreateAccount} className="home-button">Create Account</button>
        </div>
    );
}

export default Home;
