import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import api from "../services/api";
import "../styles/SymptomTracker.css";

function SymptomTracker() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [symptomLog, setSymptomLog] = useState({});
  const [message, setMessage] = useState("");

  const symptomOptions = [
    "Headache", "Fatigue", "Nausea", "Fever", "Cough", "Sore Throat",
    "Runny Nose", "Body Aches", "Loss of Smell", "Diarrhea"
  ];

  // Fetch symptom history
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get(`http://localhost:5001/api/symptoms/${user.id}`);
        const map = {};
        res.data.forEach((entry) => {
          map[new Date(entry.date).toDateString()] = entry.symptoms;
        });
        setSymptomLog(map);
      } catch (err) {
        console.error("Failed to fetch symptom history:", err);
      }
    };
    fetchData();
  }, [user.id]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    const dateKey = date.toDateString();
    setSelectedSymptoms(symptomLog[dateKey] || []);
  };

  const handleSymptomToggle = (symptom) => {
    setSelectedSymptoms((prev) =>
      prev.includes(symptom)
        ? prev.filter((s) => s !== symptom)
        : [...prev, symptom]
    );
  };

  const handleSave = async () => {
    try {
      const payload = {
        user_id: user.id,
        date: selectedDate,
        symptoms: selectedSymptoms,
      };

      await api.post("http://localhost:5001/api/symptoms/log", payload);
      setMessage("✅ Symptoms saved successfully.");

      setSymptomLog((prev) => ({
        ...prev,
        [selectedDate.toDateString()]: selectedSymptoms,
      }));
    } catch (err) {
      console.error("❌ Error saving symptoms:", err);
      setMessage("❌ Failed to save symptoms.");
    }
  };

  const tileClassName = ({ date }) => {
    if (symptomLog[date.toDateString()]) {
      return "has-symptoms";
    }
    return null;
  };

  return (
    <div className="symptom-tracker-container">
      <h2>📅 Symptom Tracker</h2>

      <Calendar
        onChange={handleDateChange}
        value={selectedDate}
        tileClassName={tileClassName}
      />

      <h3>📝 Symptoms for {selectedDate.toDateString()}</h3>
      <div className="symptom-options">
        {symptomOptions.map((symptom) => (
          <button
            key={symptom}
            className={selectedSymptoms.includes(symptom) ? "selected" : ""}
            onClick={() => handleSymptomToggle(symptom)}
          >
            {symptom}
          </button>
        ))}
      </div>

      <button onClick={handleSave} className="save-button">
        💾 Save
      </button>

      {message && <p className="status-message">{message}</p>}
    </div>
  );
}

export default SymptomTracker;
