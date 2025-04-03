import React, { useEffect, useState } from "react";
import api from "../services/api";
import "../styles/MedicalHistory.css";

function MedicalHistory() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [history, setHistory] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await api.get(`http://localhost:5001/api/history/${user.id}`);
        setHistory(res.data);
      } catch (err) {
        console.error("Error fetching history:", err);
        setError("❌ Failed to fetch history.");
      }
    };

    fetchHistory();
  }, [user.id]);

  const handleClearHistory = async () => {
    const confirm = window.confirm("Are you sure you want to delete your entire medical history?");
    if (!confirm) return;

    try {
      await api.delete(`http://localhost:5001/api/history/clear/${user.id}`);
      setHistory([]);
    } catch (err) {
      console.error("Error clearing history:", err);
      setError("❌ Failed to clear history.");
    }
  };

  return (
    <div className="history-container">
      <h2>📚 Medical History</h2>

      {error && <p className="error-message">{error}</p>}

      {history.length > 0 && (
        <button className="clear-history-btn" onClick={handleClearHistory}>
          🗑️ Clear History
        </button>
      )}

      {history.length === 0 ? (
        <p>No history available yet.</p>
      ) : (
        <ul className="history-list">
          {history.map((item, index) => (
            <li key={index}>
              <strong>Date:</strong> {new Date(item.date).toLocaleDateString()}<br />
              <strong>Diagnosis:</strong> {item.diagnosis}<br />
              <strong>Symptoms:</strong> {item.symptoms.join(", ")}<br />
              <strong>Medication:</strong> {item.medication}<br />
              <strong>Instructions:</strong> {item.instructions}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default MedicalHistory;
