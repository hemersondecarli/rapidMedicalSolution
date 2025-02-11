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

@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Extract user input from request
        data = request.json
        symptoms = data.get("symptoms", "")

        if not symptoms:
            return jsonify({"error": "No symptoms provided."}), 400

        # Ensure input is in list format
        if isinstance(symptoms, str):
            symptoms = symptoms.split(",")  # Convert comma-separated string to list

        symptoms = [s.strip().capitalize().replace(" ", "_") for s in symptoms]  # Normalize input

        print("\n🔹 Received Request Data:", data)  # Debugging

        # Create feature vector for prediction
        input_features = pd.DataFrame([{symptom: 1 if symptom in symptoms else 0 for symptom in symptom_list}])

        print("🔹 Converted Input Features:\n", input_features)  # Debugging

        # Predict Diagnosis
        prediction_encoded = model.predict(input_features)[0]
        diagnosis = encoder.inverse_transform([prediction_encoded])[0]  # Convert back to original label

        print("🔹 Predicted Diagnosis:", diagnosis)  # Debugging

        return jsonify({"diagnosis": diagnosis})

    except Exception as e:
        print("❌ Error during prediction:", str(e))
        return jsonify({"error": "Error processing request"}), 500

if __name__ == '__main__':
    app.run(port=5002, debug=True)
