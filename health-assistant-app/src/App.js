import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import MoodSelection from './pages/MoodSelection';
import Diagnosis from './pages/Diagnosis';
// import PlaceOrders from './pages/PlaceOrders';
import Medications from './pages/Medications';
import MenstrualTracker from './pages/MenstrualTracker';
import MentalSupport from './pages/MentalSupport';
import AIDiagnosis from './pages/AIDiagnosis';
import Registration from './pages/Registration';
import MoodAnalytics from './pages/MoodAnalytics';
import MedicalHistory from "./components/MedicalHistory";
import SymptomTracker from "./pages/SymptomTracker";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/mood-selection" element={<MoodSelection />} />
        <Route path="/diagnosis" element={<Diagnosis />} />
        {/* <Route path="/place-orders" element={<PlaceOrders />} /> */}
        <Route path="/medications" element={<Medications />} />
        <Route path="/menstrual-tracker" element={<MenstrualTracker />} />
        <Route path="/mental-support" element={<MentalSupport />} />
        <Route path="/ai-diagnosis" element={<AIDiagnosis />} />
        <Route path="/Registration" element={<Registration />} />
        <Route path="/mood-analytics" element={<MoodAnalytics />} />
        <Route path="/medical-history" element={<MedicalHistory />} />
        <Route path="/symptom-tracker" element={<SymptomTracker />} />
      </Routes>
    </Router>
  );
}

export default App;
