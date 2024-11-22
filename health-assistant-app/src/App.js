// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/login';
import Patient from './pages/Patient';
import Registration from './pages/Registration'; 


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Patient" element={<Patient />} />
        <Route path="/Registration" element={<Registration />} /> {/* Route*/}
      </Routes>
    </Router>
  );
}

export default App;
