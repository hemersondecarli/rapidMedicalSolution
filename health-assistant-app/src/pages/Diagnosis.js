import React, { useState } from "react";
import api from "../services/api";
import "../styles/Diagnosis.css";

function Diagnosis() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [symptoms, setSymptoms] = useState("");
  const [diagnosis, setDiagnosis] = useState("");
  const [medication, setMedication] = useState("");
  const [instructions, setInstructions] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showTips, setShowTips] = useState(false);

  // Handles diagnosis request
  const handleSubmit = async () => {
    if (!symptoms.trim()) {
      setError("⚠️ Please enter at least one symptom.");
      return;
    }

    if (!user) {
      setError("⚠️ You must be logged in to get a diagnosis.");
      return;
    }

    setLoading(true);
    setError("");
    setDiagnosis("");
    setMedication("");
    setInstructions("");
    setSuccessMessage("");

    try {
      console.log("🔹 Sending symptoms to AI:", symptoms);

      // Request AI diagnosis
      const response = await api.post("http://127.0.0.1:5002/predict", {
        user_id: user.id,
        symptoms,
      });

      console.log("🔹 Diagnosis API Response:", response.data);

      const diagnosisData = {
        diagnosis: response.data.diagnosis || "No known condition found.",
        medication: response.data.medication || "No specific medication recommended.",
        instructions: response.data.instructions || "No special instructions available.",
      };

      setDiagnosis(diagnosisData.diagnosis);
      setMedication(diagnosisData.medication);
      setInstructions(diagnosisData.instructions);

      // Store medication in database
      if (diagnosisData.medication !== "No specific medication recommended.") {
        console.log("🔹 Storing medication:", diagnosisData.medication);
        const storeResponse = await api.post(
          "http://127.0.0.1:5001/api/medications/add",
          {
            user_id: user.id,
            medication: diagnosisData.medication,
            instructions: diagnosisData.instructions,
          }
        );

        console.log("🔹 Store Medication API Response:", storeResponse.data);

        if (storeResponse.status === 201) {
          setSuccessMessage("✅ Medication successfully added to your list.");
        } else {
          setError("❌ Failed to store medication in the database.");
        }
      }
    } catch (error) {
      console.error("❌ Error:", error);
      setError("❌ Error processing your request. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="diagnosis-container">
      <h2>🩺 AI Diagnosis</h2>
      <p>Enter your symptoms to receive an AI-generated diagnosis along with suggested medication.</p>

      {/* Toggle Symptom Tips */}
      <button onClick={() => setShowTips(!showTips)} className="tips-button">
        {showTips ? "❌ Hide Tips" : "ℹ️ Show Symptom Tips"}
      </button>

      {/* Symptom Tips Section */}
      {showTips && (
        <div className="symptom-tips">
          <h3>💡 How to Describe Your Symptoms:</h3>
          <ul>
            <li>Use **common symptom names** (e.g., fever, cough, headache).</li>
            <li>List multiple symptoms **separated by commas** (e.g., "fever, fatigue, sore throat").</li>
            <li>Avoid using **full sentences** (e.g., ❌ "I have a headache" → ✅ "headache").</li>
            <li>If unsure, start typing and **refer to common symptoms below**:</li>
          
            <h4>✅ Example Symptoms:</h4>
          <p>
            Fever, Cough, Fatigue, Headache, Sore Throat, Shortness of Breath, Runny Nose, 
            Body Aches, Loss of Taste/Smell, Nausea, Vomiting, Diarrhea, Skin Rash.
          </p>

          </ul>
        </div>
      )}

      {/* Input Field */}
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
      {successMessage && <p className="success-message">{successMessage}</p>}

      {/* Diagnosis Result */}
      {diagnosis && (
        <div className="diagnosis-result">
          <h3>📋 Diagnosis: {diagnosis}</h3>
          <h4>💊 Suggested Medication: {medication}</h4>
          <p>📌 {instructions}</p>
          {medication !== "No specific medication recommended." && (
            <p>✅ This medication has been added to your "Medication List."</p>
          )}
        </div>
      )}
    </div>
  );
}

export default Diagnosis;
