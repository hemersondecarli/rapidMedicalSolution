import React, { useEffect, useState } from "react";
import api from "../services/api";
import "../styles/MedicalHistory.css";

function MedicalHistory() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await api.get(`http://localhost:5001/api/history/${user.id}`);
        setHistory(res.data);
      } catch (err) {
        console.error("Error fetching history:", err);
      }
    };

    fetchHistory();
  }, [user.id]);

  return (
    <div className="history-container">
      <h2>📚 Medical History</h2>
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
