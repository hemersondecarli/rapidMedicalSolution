// src/pages/Login.js
import React from 'react';

function Login() {
    return (
        <div className="login-container">
            <h2>Login</h2>
            <form id="loginForm">
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" placeholder="Enter your email" required />

                <label htmlFor="password">Password:</label>
                <input type="password" id="password" name="password" placeholder="Enter your password" required />

                <button type="submit">Login</button>
                <a href="#" className="forgot_pw_link">Forgot your password?</a>
                <a href="register.html" className="create-account-link">Create Account</a>
            </form>
        </div>
    );
}

export default Login;
