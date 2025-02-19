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
  const [showRequestButton, setShowRequestButton] = useState(false);

  // Handles AI Diagnosis Request
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
    setSuccessMessage("");
    setDiagnosis("");
    setMedication("");
    setInstructions("");
    setShowRequestButton(false);

    try {
      console.log("🔹 Sending symptoms to AI:", symptoms);

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

      if (diagnosisData.medication !== "No specific medication recommended.") {
        setShowRequestButton(true);
      }
    } catch (error) {
      console.error("❌ Error:", error);
      setError("❌ Error processing your request. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Handles medication request and prevents duplicates
  const handleRequestMedication = async () => {
    try {
      console.log("🔹 Checking if medication already exists:", medication);

      // Check if medication already exists
      const existingMedications = await api.get(`http://127.0.0.1:5001/api/medications/user/${user.id}`);
      const alreadyExists = existingMedications.data.some(med => med.medication === medication);

      if (alreadyExists) {
        setError("⚠️ Medication already exists in your list.");
        return;
      }

      console.log("🔹 Requesting medication:", medication);

      const storeResponse = await api.post("http://127.0.0.1:5001/api/medications/add", {
        user_id: user.id,
        medication,
        instructions,
      });

      console.log("🔹 Store Medication API Response:", storeResponse.data);

      if (storeResponse.status === 201) {
        setSuccessMessage("✅ Medication successfully added to your list.");
        setShowRequestButton(false);
      } else {
        setError("❌ Failed to store medication in the database.");
      }
    } catch (error) {
      console.error("❌ Error:", error);
      setError("❌ Error requesting medication. Please try again.");
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
            <li>Avoid using **full sentences** (❌ "I have a headache" → ✅ "headache").</li>
          </ul>
          <h4>✅ Example Symptoms:</h4>
          <p>
            Fever, Cough, Fatigue, Headache, Sore Throat, Shortness of Breath, Runny Nose, 
            Body Aches, Loss of Taste/Smell, Nausea, Vomiting, Diarrhea, Skin Rash.
          </p>
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
        </div>
      )}

      {/* Request Medication Button (Only appears after getting a diagnosis) */}
      {showRequestButton && (
        <button onClick={handleRequestMedication} className="request-medication-button">
          🏥 Request Medication
        </button>
      )}
    </div>
  );
}

export default Diagnosis;
