import React, { useState } from "react";
import api from "../services/api";
import "../styles/Diagnosis.css";

function Diagnosis() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [diagnosis, setDiagnosis] = useState("");
  const [medication, setMedication] = useState("");
  const [instructions, setInstructions] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showRequestButton, setShowRequestButton] = useState(false);

  // Symptom options for selection
  const symptomsList = [
    "Fever", "Cough", "Fatigue", "Headache", "Sore Throat", "Shortness of Breath",
    "Runny Nose", "Body Aches", "Loss of Taste/Smell", "Nausea", "Vomiting",
    "Diarrhea", "Skin Rash"
  ];

  // Handles symptom selection click
  const handleSymptomClick = (symptom) => {
    setSelectedSymptoms((prev) =>
      prev.includes(symptom)
        ? prev.filter((s) => s !== symptom) // Remove if already selected
        : [...prev, symptom] // Add if not selected
    );
  };

  // Handles AI Diagnosis Request
  const handleSubmit = async () => {
    if (selectedSymptoms.length === 0) {
      setError("⚠️ Please select at least one symptom.");
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
      console.log("🔹 Sending symptoms to AI:", selectedSymptoms);

      const response = await api.post("http://127.0.0.1:5002/predict", {
        user_id: user.id,
        symptoms: selectedSymptoms,
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
      const existingMedications = await api.get(
        `http://127.0.0.1:5001/api/medications/user/${user.id}`
      );
      const alreadyExists = existingMedications.data.some(
        (med) => med.medication === medication
      );

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
      <p>Select your symptoms to receive an AI-generated diagnosis along with suggested medication.</p>

      {/* Symptom Selection */}
      <div className="symptom-selection">
        {symptomsList.map((symptom) => (
          <button
            key={symptom}
            className={`symptom-button ${selectedSymptoms.includes(symptom) ? "selected" : ""}`}
            onClick={() => handleSymptomClick(symptom)}
          >
            {selectedSymptoms.includes(symptom) ? "✅ " : ""}{symptom}
          </button>
        ))}
      </div>

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
