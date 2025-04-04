const express = require("express");
const router = express.Router();
const DiagnosisHistory = require("../models/DiagnosisHistory");

// Save diagnosis history
router.post("/history", async (req, res) => {
  try {
    const newEntry = new DiagnosisHistory(req.body);
    await newEntry.save();
    res.status(201).json({ message: "Diagnosis saved" });
  } catch (err) {
    console.error("❌ Error saving diagnosis history:", err);
    res.status(500).json({ error: "Error saving history" });
  }
});

// Fetch user's history
router.get("/history/:userId", async (req, res) => {
  try {
    const history = await DiagnosisHistory.find({ user_id: req.params.userId }).sort({ date: -1 });
    res.json(history);
  } catch (err) {
    console.error("❌ Error fetching diagnosis history:", err);
    res.status(500).json({ error: "Error retrieving history" });
  }
});

// Clear all history for a user
router.delete("/history/clear/:userId", async (req, res) => {
  try {
    await DiagnosisHistory.deleteMany({ user_id: req.params.userId });
    res.status(200).json({ message: "History cleared." });
  } catch (error) {
    console.error("Error clearing history:", error);
    res.status(500).json({ error: "Failed to clear history." });
  }
});

module.exports = router;
