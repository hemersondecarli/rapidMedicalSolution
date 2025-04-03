import React, { useState, useEffect } from "react";
import api from "../services/api";
import "../styles/MenstrualTracker.css";

function MenstrualTracker() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [isSetupComplete, setIsSetupComplete] = useState(false);
  const [cycleData, setCycleData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [questions] = useState([
    { question: "When was the first day of your last period?", key: "lastPeriod", type: "date" },
    { question: "How long does your period usually last? (in days)", key: "periodLength", type: "number" },
    { question: "How long is your full cycle (from start to start)?", key: "cycleLength", type: "number" },
  ]);
  const [answers, setAnswers] = useState({ lastPeriod: "", periodLength: "", cycleLength: "" });
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  useEffect(() => {
    if (!user) {
      setError("⚠️ You must be logged in to track your cycle.");
      setLoading(false);
      return;
    }

    const checkUserSetup = async () => {
      try {
        const response = await api.get(`http://localhost:7777/api/menstrual_tracker/check/${user.id}`);
        console.log("✅ User setup check response:", response.data);

        if (response.data && response.data.next_period) {
          setIsSetupComplete(true);
          setCycleData(response.data);
        }
      } catch (err) {
        console.error("❌ Error checking setup:", err);
        setError("❌ Error checking setup. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    checkUserSetup();
  }, [user]);

  const handleAnswerChange = (e) => {
    setAnswers({ ...answers, [questions[currentQuestionIndex].key]: e.target.value });
  };

  const handleNextQuestion = async () => {
    if (!answers[questions[currentQuestionIndex].key]) {
      setError("⚠️ Please provide an answer before continuing.");
      return;
    }

    setError("");

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      try {
        setLoading(true);

        const requestData = {
          user_id: user.id,
          responses: answers,
        };

        console.log("📤 Sending Request:", requestData);

        const response = await api.post("http://localhost:7777/api/menstrual_tracker/setup", requestData);

        console.log("✅ API Response:", response.data);

        if (response.status === 200) {
          setIsSetupComplete(true);
          setCycleData(response.data);
        } else {
          setError("❌ Failed to save your cycle data. Please try again.");
        }
      } catch (err) {
        console.error("❌ Error saving cycle data:", err);
        setError("❌ Error saving data. Please try again.");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="tracker-container">
      <h2>🩸 Menstrual Cycle Tracker</h2>

      {loading && <p>🔄 Loading...</p>}
      {error && <p className="error-message">{error}</p>}

      {!loading && !isSetupComplete && (
        <div className="question-box">
          <h3>📄 Answer the following questions:</h3>
          <p>{questions[currentQuestionIndex].question}</p>
          <input
            type={questions[currentQuestionIndex].type}
            value={answers[questions[currentQuestionIndex].key]}
            onChange={handleAnswerChange}
            className="input-field"
          />
          <button onClick={handleNextQuestion} className="next-button">Next</button>
        </div>
      )}

      {!loading && isSetupComplete && cycleData && (
        <div className="cycle-info">
          <h3>📅 Your Cycle Information</h3>
          <p>Next Predicted Start: <strong>{cycleData.next_period || "N/A"}</strong></p>
          <p>Cycle Length: <strong>{cycleData.cycle_length || "N/A"} days</strong></p>
        </div>
      )}
    </div>
  );
}

export default MenstrualTracker;
