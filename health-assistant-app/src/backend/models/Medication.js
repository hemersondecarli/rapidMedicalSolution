const mongoose = require("mongoose");

const MedicationSchema = new mongoose.Schema({
    user_id: { type: String, required: true },
    medication: { type: String, required: true },
    instructions: { type: String, required: true },
    date_added: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Medication", MedicationSchema);
