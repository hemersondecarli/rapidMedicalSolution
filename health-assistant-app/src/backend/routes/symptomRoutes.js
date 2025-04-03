const express = require("express");
const router = express.Router();
const SymptomEntry = require("../models/SymptomEntry");

// Log symptoms for a day (create or update)
router.post("/log", async (req, res) => {
  try {
    const { user_id, date, symptoms } = req.body;

    const entryDate = new Date(date);
    entryDate.setHours(0, 0, 0, 0);

    const updated = await SymptomEntry.findOneAndUpdate(
      { user_id, date: entryDate },
      { symptoms, date: entryDate },
      { upsert: true, new: true }
    );

    res.status(201).json(updated);
  } catch (error) {
    res.status(500).json({ error: "Failed to log symptoms" });
  }
});

// Fetch all symptom logs for user
router.get("/:user_id", async (req, res) => {
  try {
    const { user_id } = req.params;
    const symptoms = await SymptomEntry.find({ user_id });
    res.json(symptoms);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch symptoms" });
  }
});


// Clear symptoms for a specific user and date
router.delete("/:user_id/:date", async (req, res) => {
    try {
      const { user_id, date } = req.params;
      console.log("🛠️ Received DELETE:", user_id, date);
  
      const start = new Date(date);
      const end = new Date(date);
      end.setDate(end.getDate() + 1);
  
      console.log("📆 Searching between:", start, "and", end);
  
      const deleted = await SymptomEntry.findOneAndDelete({
        user_id,
        date: { $gte: start, $lt: end }
      });
  
      if (!deleted) {
        return res.status(404).json({ error: "No symptom entry found for this date" });
      }
  
      res.status(200).json({ message: "Symptoms deleted successfully" });
    } catch (error) {
      console.error("DELETE error:", error);
      res.status(500).json({ error: "Server error while deleting symptoms" });
    }
  });
  
module.exports = router;
