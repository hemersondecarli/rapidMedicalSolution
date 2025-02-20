from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import pandas as pd

app = Flask(__name__)
CORS(app)

# Load the trained model and label encoder
model = joblib.load("diagnosis_model.pkl")
encoder = joblib.load("label_encoder.pkl")

# Define the correct feature names (they must match dataset.csv)
symptom_list = [
    "Fever", "Cough", "Fatigue", "Headache", "Sore_Throat", "Shortness_of_Breath",
    "Runny_Nose", "Body_Aches", "Loss_of_Taste_Smell", "Nausea", "Vomiting",
    "Diarrhea", "Skin_Rash"
]

# Medication Recommendations
medications_dict = {
    "Dengue Fever": {"medication": "Paracetamol", "instructions": "Take 500mg every 6 hours as needed."},
    "Flu": {"medication": "Tamiflu", "instructions": "Take 75mg twice daily for 5 days."},
    "COVID-19": {"medication": "Ibuprofen", "instructions": "Take 200mg every 6 hours as needed."},
    "Migraine": {"medication": "Ibuprofen", "instructions": "Take 400mg every 8 hours as needed."},
    "Strep Throat": {"medication": "Amoxicillin", "instructions": "Take 500mg three times daily for 10 days."},
    "Pneumonia": {"medication": "Azithromycin", "instructions": "Take 500mg on day 1, then 250mg daily for 4 more days."},
    "Common Cold": {"medication": "Pseudoephedrine", "instructions": "Take 30mg every 6 hours as needed for congestion."},
    "Allergy": {"medication": "Loratadine", "instructions": "Take 10mg once daily."},
    "Food Poisoning": {"medication": "Oral Rehydration Solution", "instructions": "Drink 200ml after every loose stool."},
    "Asthma": {"medication": "Albuterol Inhaler", "instructions": "Inhale 2 puffs every 4 to 6 hours as needed."},
    "Typhoid Fever": {"medication": "Ciprofloxacin", "instructions": "Take 500mg twice daily for 7 days."},
    "Sinusitis": {"medication": "Nasal Spray (Fluticasone)", "instructions": "Use 2 sprays in each nostril once daily."},
    "Malaria": {"medication": "Artemether-Lumefantrine", "instructions": "Take as per weight-based dosing for 3 days."},
    "Bronchitis": {"medication": "Dextromethorphan", "instructions": "Take 20mg every 6 hours for cough relief."},
    "Tuberculosis": {"medication": "Rifampin + Isoniazid", "instructions": "Take as per physician's prescription for 6 months."},
    "Influenza": {"medication": "Oseltamivir", "instructions": "Take 75mg twice daily for 5 days."},
    "Chickenpox": {"medication": "Acyclovir", "instructions": "Take 800mg five times daily for 5 days."},
    "Measles": {"medication": "Vitamin A", "instructions": "Take 200,000 IU once daily for 2 days."},
    "Mumps": {"medication": "Ibuprofen", "instructions": "Take 400mg every 8 hours as needed."},
    "Rubella": {"medication": "Acetaminophen", "instructions": "Take 500mg every 6 hours as needed."},
    "Whooping Cough": {"medication": "Azithromycin", "instructions": "Take 500mg on day 1, then 250mg daily for 4 more days."},
    "Scarlet Fever": {"medication": "Penicillin", "instructions": "Take 500mg four times daily for 10 days."},
    "Tonsillitis": {"medication": "Amoxicillin", "instructions": "Take 500mg three times daily for 10 days."},
    "Norovirus": {"medication": "Oral Rehydration Solution", "instructions": "Drink 200ml after every loose stool."},
    "Ebola": {"medication": "Supportive Therapy", "instructions": "Fluids, oxygen therapy, and symptom management."},
    "Yellow Fever": {"medication": "Supportive Care", "instructions": "Bed rest, fluids, and pain relievers."},
    "Zika Virus": {"medication": "Paracetamol", "instructions": "Take 500mg every 6 hours as needed."},
    "RSV Infection": {"medication": "Supportive Care", "instructions": "Hydration, rest, and fever control."},
    "Meningitis": {"medication": "Ceftriaxone", "instructions": "Take 2g IV once daily for 10-14 days."}
}

# Predict Diagnosis
@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.json
        user_id = data.get("user_id")
        symptoms = data.get("symptoms", [])

        if not symptoms or not user_id:
            return jsonify({"error": "No symptoms or user ID provided."}), 400

        # Ensure symptoms is a list
        if not isinstance(symptoms, list):
            return jsonify({"error": "Invalid symptoms format. Expected a list."}), 400

        print("\n🔹 Received Symptoms:", symptoms)  

        # Convert symptoms into DataFrame with correct feature names
        input_features = pd.DataFrame([{symptom: 1 if symptom in symptoms else 0 for symptom in symptom_list}])

        print("🔹 Converted Input Features:\n", input_features) 

        # Predict
        prediction_encoded = model.predict(input_features)[0]
        diagnosis = encoder.inverse_transform([prediction_encoded])[0]  # Convert back to original label

        print("🔹 Predicted Diagnosis:", diagnosis) 
        # Get medication based on diagnosis
        medication_info = medications_dict.get(diagnosis, {
            "medication": "No specific medication recommended.",
            "instructions": "No special instructions available."
        })

        return jsonify({
            "diagnosis": diagnosis,
            "medication": medication_info["medication"],
            "instructions": medication_info["instructions"]
        })

    except Exception as e:
        print("❌ Error during prediction:", str(e))
        return jsonify({"error": "Error processing request"}), 500

# Get User Medications
@app.route('/medications/<user_id>', methods=['GET'])
def get_medications(user_id):
    try:
        medications = user_medications.get(user_id, [])
        return jsonify({"medications": medications})
    except Exception as e:
        print("❌ Error fetching medications:", str(e))
        return jsonify({"error": "Error retrieving medications"}), 500

if __name__ == '__main__':
    app.run(port=5002, debug=True)
