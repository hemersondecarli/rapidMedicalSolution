const express = require('express');
const router = express.Router();

router.post('/diagnose', async (req, res) => {
    try {
        const { symptoms } = req.body;

        if (!symptoms || symptoms.trim() === '') {
            return res.status(400).json({ message: 'Please describe your symptoms.' });
        }

        console.log(`🟢 Received symptoms: ${symptoms}`); // Log received input

        let diagnosis = '';

        const symptomLower = symptoms.toLowerCase();

        if (symptomLower.includes('fever') || symptomLower.includes('temperature')) {
            diagnosis = "It could be a common cold, flu, or an infection. Please monitor your temperature and stay hydrated. If it persists for more than 3 days or is very high, consult a doctor.";
        } else if (symptomLower.includes('cough')) {
            diagnosis = "A cough can be caused by colds, flu, bronchitis, or even allergies. If it's persistent, producing mucus, or accompanied by difficulty breathing, you should seek medical advice.";
        } else if (symptomLower.includes('headache') || symptomLower.includes('migraine')) {
            diagnosis = "Headaches can be caused by stress, dehydration, or migraines. Try resting in a dark room and drinking water. If it's severe or frequent, consider seeing a doctor.";
        } else if (symptomLower.includes('dizzy') || symptomLower.includes('lightheaded')) {
            diagnosis = "Dizziness can be caused by dehydration, low blood sugar, or even stress. Sit down, drink water, and rest. If it happens frequently, seek medical advice.";
        } else if (symptomLower.includes('sore throat')) {
            diagnosis = "A sore throat could be due to a viral infection, bacterial infection, or allergies. Try drinking warm liquids and using throat lozenges. If it lasts more than a week or worsens, consult a doctor.";
        } else if (symptomLower.includes('stomach pain') || symptomLower.includes('abdominal pain')) {
            diagnosis = "Stomach pain can be caused by indigestion, food poisoning, or gastritis. Try resting, drinking water, and eating light meals. If the pain is severe, persistent, or accompanied by vomiting, seek medical attention.";
        } else if (symptomLower.includes('chest pain')) {
            diagnosis = "Chest pain should not be ignored. It can be related to acid reflux, muscle strain, or in rare cases, a heart issue. If you experience severe pain, pressure, or shortness of breath, seek emergency care immediately.";
        } else if (symptomLower.includes('fatigue') || symptomLower.includes('tired')) {
            diagnosis = "Fatigue can be caused by lack of sleep, poor nutrition, stress, or even anemia. Ensure you're getting enough rest and a balanced diet. If persistent, consider consulting a doctor.";
        } else if (symptomLower.includes('shortness of breath') || symptomLower.includes('difficulty breathing')) {
            diagnosis = "Shortness of breath could be related to asthma, anxiety, or a more serious condition. If it happens suddenly, frequently, or is severe, seek medical attention immediately.";
        } else if (symptomLower.includes('body aches') || symptomLower.includes('muscle pain')) {
            diagnosis = "Body aches are common with flu, overexertion, or viral infections. Rest, drink fluids, and take over-the-counter pain relievers if needed. If it lasts more than a few days, consult a doctor.";
        } else if (symptomLower.includes('nausea') || symptomLower.includes('vomiting')) {
            diagnosis = "Nausea and vomiting can be due to food poisoning, stomach flu, or migraines. Stay hydrated and try small sips of water or ginger tea. If symptoms persist or worsen, consult a doctor.";
        } else {
            diagnosis = "I'm not sure, but I recommend monitoring your symptoms closely. If they persist or worsen, please consult a healthcare professional.";
        }

        console.log(`🟢 AI Response: ${diagnosis}`); // Log AI response
        res.json({ diagnosis });
    } catch (error) {
        console.error('❌ Error processing AI request:', error.message);
        res.status(500).json({ message: 'Error processing request. Please try again later.' });
    }
});

module.exports = router;
