import React, { useState, useEffect } from "react";
import api from "../services/api";
import "../styles/MedicationList.css";

function MedicationList() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [medications, setMedications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user) {
      setError("⚠️ You must be logged in to view medications.");
      setLoading(false);
      return;
    }

    const fetchMedications = async () => {
      try {
        console.log(`🔹 Fetching medications for user ID: ${user.id}`);
        const response = await api.get(`http://localhost:5001/api/medications/user/${user.id}`);
        console.log("🔹 Medication API Response:", response.data);
        setMedications(response.data);
      } catch (err) {
        console.error("❌ Error loading medications:", err);
        setError("❌ Error loading medications. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchMedications();
  }, [user]);

  // Function to Remove Medication
  const handleRemove = async (id) => {
    try {
      console.log(`🔹 Removing medication ID: ${id}`);
      await api.delete(`http://localhost:5001/api/medications/remove/${id}`);
      setMedications(medications.filter((med) => med._id !== id));
    } catch (error) {
      console.error("❌ Error removing medication:", error);
      setError("❌ Error removing medication. Please try again.");
    }
  };

  return (
    <div className="medication-list-container">
      <h2>💊 Your Medications</h2>

      {loading && <p>🔄 Loading medications...</p>}
      {error && <p className="error-message">{error}</p>}

      {medications.length === 0 && !loading && (
        <p className="warning-message">⚠️ No medications found. Please visit the Diagnosis page first.</p>
      )}

      {medications.length > 0 && (
        <ul className="medication-list">
          {medications.map((med) => (
            <li key={med._id} className="medication-item">
              <h3>💊 {med.medication}</h3>
              <p>📌 {med.instructions}</p>
              <button className="remove-button" onClick={() => handleRemove(med._id)}>
                ❌ Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default MedicationList;
