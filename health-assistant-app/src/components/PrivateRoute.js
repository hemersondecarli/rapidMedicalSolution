import React from 'react';
import { Navigate } from 'react-router-dom';

function PrivateRoute({ children }) {
    const token = localStorage.getItem('token'); // Check for token in local storage

    return token ? children : <Navigate to="/login" />;
}

export default PrivateRoute;
