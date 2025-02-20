const express = require("express");
const Medication = require("../models/Medication");
const router = express.Router();

// Add medication to user's list
router.post("/add", async (req, res) => {
  const { user_id, medication, instructions } = req.body;

  console.log("🔹 Received Medication Request:", req.body);

  if (!user_id || !medication) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const newMedication = new Medication({ user_id, medication, instructions });
    await newMedication.save();

    console.log("✅ Medication added successfully!");
    res.status(201).json({ message: "Medication added successfully!" });
  } catch (error) {
    console.error("❌ Error saving medication:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Get medications for a specific user
router.get("/user/:user_id", async (req, res) => {
  try {
    const medications = await Medication.find({ user_id: req.params.user_id });
    res.status(200).json(medications);
  } catch (error) {
    console.error("❌ Error fetching medications:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Remove a medication by ID
router.delete("/remove/:id", async (req, res) => {
  try {
      const { id } = req.params;

      const deletedMed = await Medication.findByIdAndDelete(id);
      if (!deletedMed) {
          return res.status(404).json({ error: "Medication not found" });
      }

      res.status(200).json({ message: "Medication removed successfully" });
  } catch (error) {
      res.status(500).json({ error: "Error removing medication" });
  }
});


module.exports = router;
