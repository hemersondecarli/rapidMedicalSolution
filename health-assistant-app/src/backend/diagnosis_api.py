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
}

# Predict Diagnosis
@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.json
        user_id = data.get("user_id")
        symptoms = data.get("symptoms", "")

        if not symptoms or not user_id:
            return jsonify({"error": "No symptoms or user ID provided."}), 400

        symptoms = [s.strip().capitalize().replace(" ", "_") for s in symptoms.split(",")]

        input_features = pd.DataFrame([{symptom: 1 if symptom in symptoms else 0 for symptom in symptom_list}])
        prediction_encoded = model.predict(input_features)[0]
        diagnosis = encoder.inverse_transform([prediction_encoded])[0]

        medication_info = medications_dict.get(diagnosis, {"medication": "No specific medication recommended.", "instructions": "No special instructions available."})

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
