const express = require("express");
const router = express.Router();
const MenstrualCycle = require("../models/MenstrualCycle");

// Check if user has already set up tracking
router.get("/check/:user_id", async (req, res) => {
  try {
    const user_id = req.params.user_id;
    const cycle = await MenstrualCycle.findOne({ user_id });

    if (cycle) {
      res.json({ setup: true, cycle });
    } else {
      res.json({ setup: false });
    }
  } catch (error) {
    console.error("❌ Error checking menstrual tracker:", error);
    res.status(500).json({ error: "Server error while checking setup." });
  }
});

// Handle Menstrual Cycle Setup
router.post("/setup", async (req, res) => {
  try {
    const { user_id, last_period_date, cycle_length, period_duration } = req.body;

    if (!user_id || !last_period_date || !cycle_length || !period_duration) {
      return res.status(400).json({ error: "All fields are required." });
    }

    // Check if user already has a cycle setup
    const existingCycle = await MenstrualCycle.findOne({ user_id });

    if (existingCycle) {
      return res.status(400).json({ error: "You have already set up cycle tracking." });
    }

    // Predict next period start date
    const lastPeriod = new Date(last_period_date);
    const nextPeriod = new Date(lastPeriod);
    nextPeriod.setDate(lastPeriod.getDate() + cycle_length);

    const newCycle = new MenstrualCycle({
      user_id,
      last_period_date,
      cycle_length,
      period_duration,
      next_period_date: nextPeriod,
    });

    await newCycle.save();
    res.status(201).json({ message: "Cycle setup complete!", cycle: newCycle });
  } catch (error) {
    console.error("❌ Error setting up menstrual tracker:", error);
    res.status(500).json({ error: "Server error while setting up." });
  }
});

module.exports = router;
