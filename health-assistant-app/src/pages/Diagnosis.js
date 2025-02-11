import React, { useState } from "react";
import api from "../services/api";
import "../styles/Diagnosis.css";

function Diagnosis() {
  const [symptoms, setSymptoms] = useState("");
  const [diagnosis, setDiagnosis] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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

      <input
        type="text"
        placeholder="e.g., fever, cough"
        value={symptoms}
        onChange={(e) => setSymptoms(e.target.value)}
        className="input-field"
      />

      <button onClick={handleSubmit} disabled={loading} className="diagnosis-button">
        {loading ? "🔄 Processing..." : "Get Diagnosis"}
      </button>

      {error && <p className="error-message">{error}</p>}

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
