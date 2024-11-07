// src/pages/CreateAccount.js
import React from 'react';
import '../styles/CreateAccount.css';

function CreateAccount() {
    return (
        <div className="create-account-container">
            
            <h2>Create Account</h2>
            <form id="createAccountForm">
                <label htmlFor="name">Full Name:</label>
                <input type="text" id="name" name="name" placeholder="Enter your full name" required />

                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" placeholder="Enter your email" required />

                <label htmlFor="password">Password:</label>
                <input type="password" id="password" name="password" placeholder="Enter your password" required />

                <label htmlFor="confirmPassword">Confirm Password:</label>
                <input type="password" id="confirmPassword" name="confirmPassword" placeholder="Confirm your password" required />

                <label htmlFor="enterGP">Enter your GP:</label>
                <input type="text" id="enterGP" name="confirmPassword" placeholder="Enter your general practicioner's name" required />

                <button type="submit" className="submit-button">Create Account</button>
            </form>
        </div>
    );
}

export default CreateAccount;
