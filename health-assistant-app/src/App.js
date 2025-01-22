// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Registration from './pages/Registration';
import Dashboard from './pages/Dashboard'; // Import Dashboard page

import Diagnosis from './pages/Diagnosis';
import PlaceOrders from './pages/PlaceOrders';
import Medications from './pages/Medications';
import MenstrualTracker from './pages/MenstrualTracker';
import MentalSupport from './pages/MentalSupport';
import AIDiagnosis from './pages/AIDiagnosis';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/registration" element={<Registration />} />
                <Route path="/dashboard" element={<Dashboard />} /> {/* Add Dashboard Route */}
            </Routes>
        </Router>
    );
}

<Routes>
    {/* Existing Routes */}
    <Route path="/diagnosis" element={<Diagnosis />} />
    <Route path="/place-orders" element={<PlaceOrders />} />
    <Route path="/medications" element={<Medications />} />
    <Route path="/menstrual-tracker" element={<MenstrualTracker />} />
    <Route path="/mental-support" element={<MentalSupport />} />
    <Route path="/ai-diagnosis" element={<AIDiagnosis />} />
</Routes>

export default App;
