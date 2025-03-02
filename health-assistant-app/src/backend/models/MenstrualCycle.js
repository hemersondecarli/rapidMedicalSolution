const mongoose = require("mongoose");

const MenstrualCycleSchema = new mongoose.Schema({
  user_id: { type: String, required: true, unique: true },
  last_period_date: { type: Date, required: true },
  cycle_length: { type: Number, required: true },
  period_duration: { type: Number, required: true },
  next_period_date: { type: Date, required: true },
});

module.exports = mongoose.model("MenstrualCycle", MenstrualCycleSchema);
