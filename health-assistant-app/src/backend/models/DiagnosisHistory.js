const mongoose = require("mongoose");

const DiagnosisHistorySchema = new mongoose.Schema({
  user_id: { type: String, required: true },
  symptoms: { type: [String], required: true },
  diagnosis: { type: String, required: true },
  medication: { type: String },
  instructions: { type: String },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model("DiagnosisHistory", DiagnosisHistorySchema);
