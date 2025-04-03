const mongoose = require("mongoose");

const SymptomEntrySchema = new mongoose.Schema({
  user_id: { type: String, required: true },
  date: { type: Date, required: true }, 
  symptoms: { type: [String], required: true },
});

module.exports = mongoose.model("SymptomEntry", SymptomEntrySchema);
