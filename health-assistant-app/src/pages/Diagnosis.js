import React, { useState } from "react";
import api from "../services/api";
import "../styles/Diagnosis.css";

function Diagnosis() {
  const [symptoms, setSymptoms] = useState("");
  const [diagnosis, setDiagnosis] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showTips, setShowTips] = useState(false); // Toggle for symptom tips

  const handleSubmit = async () => {
    if (!symptoms.trim()) {
      setError("⚠️ Please enter at least one symptom.");
      return;
    }

    setLoading(true);
    setError("");
    setDiagnosis("");

    try {
      const response = await api.post("http://127.0.0.1:5002/predict", { symptoms });
      setDiagnosis(response.data.diagnosis || "❌ No known condition found.");
    } catch (error) {
      setError("❌ Error processing your request. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="diagnosis-container">
      <h2>🩺 AI Diagnosis</h2>
      <p>Enter your symptoms to receive an AI-generated diagnosis.</p>

      {/* Toggle Tips Button */}
      <button onClick={() => setShowTips(!showTips)} className="tips-button">
        {showTips ? "❌ Hide Tips" : "ℹ️ Show Symptom Tips"}
      </button>

      {/* Symptom Entry Tips */}
      {showTips && (
        <div className="symptom-tips">
          <h3>💡 How to Describe Your Symptoms:</h3>
          <ul>
            <li>Use **common symptom names** (e.g., fever, cough, headache).</li>
            <li>List multiple symptoms **separated by commas** (e.g., "fever, fatigue, sore throat").</li>
            <li>Avoid using **full sentences** (e.g., ❌ "I have a headache" → ✅ "headache").</li>
            <li>If unsure, start typing and **refer to common symptoms below**:</li>
          </ul>

          <h4>✅ Example Symptoms:</h4>
          <p>
            Fever, Cough, Fatigue, Headache, Sore Throat, Shortness of Breath, Runny Nose, 
            Body Aches, Loss of Taste/Smell, Nausea, Vomiting, Diarrhea, Skin Rash.
          </p>
        </div>
      )}

      {/* Input Box for Symptoms */}
      <input
        type="text"
        placeholder="e.g., fever, cough"
        value={symptoms}
        onChange={(e) => setSymptoms(e.target.value)}
        className="input-field"
      />

      {/* Submit Button */}
      <button onClick={handleSubmit} disabled={loading} className="diagnosis-button">
        {loading ? "🔄 Processing..." : "Get Diagnosis"}
      </button>

      {/* Error Message */}
      {error && <p className="error-message">{error}</p>}

      {/* Diagnosis Result */}
      {diagnosis && (
        <div className="diagnosis-result">
          <h3>📋 Diagnosis:</h3>
          <p className="diagnosis-text">{diagnosis}</p>
        </div>
      )}
    </div>
  );
}

export default Diagnosis;
