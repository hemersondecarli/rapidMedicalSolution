from flask import Flask, request, jsonify
from flask_cors import CORS
import datetime

app = Flask(__name__)
CORS(app)

# Simulated Database
user_cycle_data = {}

# Setup Questions
setup_questions = [
    "When was the first day of your last period? (YYYY-MM-DD)",
    "How long does your period usually last? (days)",
    "What is the average length of your cycle? (days)"
]

# Check if user has setup tracking
@app.route('/api/menstrual_tracker/check/<user_id>', methods=['GET'])
def check_tracking(user_id):
    if user_id in user_cycle_data:
        return jsonify(user_cycle_data[user_id])
    return jsonify({"first_time": True})

# Fetch setup questions
@app.route('/api/menstrual_tracker/setup_questions', methods=['GET'])
def get_setup_questions():
    return jsonify({"questions": setup_questions})

@app.route('/api/menstrual_tracker/setup', methods=['POST'])
def setup_tracker():
    try:
        data = request.json
        print("📩 Received Data:", data)  # Log incoming request

        # Extract user_id and responses
        user_id = data.get("user_id")
        responses = data.get("responses")

        # Debugging: Print received values
        print(f"🔍 user_id: {user_id}")
        print(f"🔍 responses: {responses}")

        if not user_id:
            print("❌ Missing user_id")
            return jsonify({"error": "Missing user ID"}), 400

        if not responses:
            print("❌ Missing responses")
            return jsonify({"error": "Missing cycle responses"}), 400

        # Ensure responses contain the expected keys
        required_keys = ["lastPeriod", "periodLength", "cycleLength"]
        for key in required_keys:
            if key not in responses or not responses[key]:
                print(f"❌ Missing or empty response for: {key}")
                return jsonify({"error": f"Missing value for {key}"}), 400

        # Convert values
        try:
            last_period = datetime.datetime.strptime(responses["lastPeriod"], "%Y-%m-%d")
            period_length = int(responses["periodLength"])
            cycle_length = int(responses["cycleLength"])
        except Exception as e:
            print("❌ Error parsing responses:", str(e))
            return jsonify({"error": f"Invalid data format: {str(e)}"}), 400

        # Predict next cycle
        next_period = last_period + datetime.timedelta(days=cycle_length)

        # Store in database
        user_cycle_data[user_id] = {
            "last_period": last_period.strftime("%Y-%m-%d"),
            "period_length": period_length,
            "cycle_length": cycle_length,
            "next_period": next_period.strftime("%Y-%m-%d")
        }

        print("✅ Successfully saved cycle data:", user_cycle_data[user_id])
        return jsonify(user_cycle_data[user_id]), 200

    except Exception as e:
        print("❌ Server Error:", str(e))
        return jsonify({"error": f"Error processing request: {str(e)}"}), 500

if __name__ == '__main__':
    app.run(port=7777, debug=True)
