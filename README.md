# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

### For Personal Use
- **MongoDB Login:** [https://account.mongodb.com/account/login](https://account.mongodb.com/account/login)
- **Postman:** [https://web.postman.co/](https://web.postman.co/)
- **Backend Start Command:** `node server.js`
- **Frontend Start Command:** `npm start`
- **Backend Model:** `python diagnosis_api.py & python menstrual_tracker_api.py`
---
## Installation Instructions

### Backend Setup
- Clone the GitHub repository
- Navigate to the backend folder: cd backend
- Install required packages: npm install
- Start the server: node server.js

### Frontend Setup
- Navigate to the health-assistant-app folder: cd health-assistant-app
- Install React dependencies: npm install
- Start the development server: npm start

### Python Backend (Machine Learning APIs)
- Navigate to the ML backend folder: cd backend
- Install Python dependencies
- Start the Flask servers:
  - Run: python diagnosis_api.py
  - Run: python menstrual_tracker_api.py

### A.2.4 Environment Variables Setup
- If the .env file is missing, create one inside the backend directory with:
MONGO_URI=mongodb+srv://userdb:0QKRJTF7vUkV8jqm@cluster0.4ygca.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
PORT=5001


---
## 🚀 New Features & Updates

## [0.11.0] - Symptom Tracking & Calendar Integration

### Symptom Logging via Calendar
- Implemented a **calendar-based symptom tracker** directly on the user's dashboard.
- Users can now:
  - Select a date on the calendar
  - Log common symptoms like *Headache, Nausea, Fever, Fatigue*, etc.
  - View highlighted dates with symptom entries
  - Edit, Update or Delete existing entries

---
#### **SymptomEntry Model (`SymptomEntry.js`)**
- Created a new Mongoose model with fields:
  - `user_id`: the ID of the user
  - `date`: the ISO string of the entry date
  - `symptoms`: an array of selected symptoms

#### **Symptom Routes (`symptomRoutes.js`)**
- `POST /api/symptoms/log`: Save or update symptoms for a specific date
- `GET /api/symptoms/:user_id`: Retrieve all symptoms for a user
- `DELETE /api/symptoms/:user_id/:date`: Clear symptoms from a specific day

---

### Dashboard Updates (`Dashboard.js`)
- Integrated **symptom modal** with save and delete functionality
- Styled and highlighted calendar using `react-calendar`
- Added logic to persist symptoms across sessions
- Toggle symptom tracker modal per selected calendar day

---

###  New Files
- `SymptomTracker.js`: Dedicated page for future expansion of symptom tracking
- `SymptomTracker.css`: Styling for tracker view (currently minimal)

---

### Backend Configuration (`server.js`)
- Registered the `/api/symptoms` route for handling logging and retrieval

---
## 🚀 New Features & Updates

## [0.10.8]  
### **Medical History Feature Added**
### **Created Diagnosis History Model (`DiagnosisHistory.js`)**
- Added new **MongoDB schema** to store user diagnosis history.
- Fields include:
  - `user_id`
  - `diagnosis`
  - `symptoms`
  - `medication`
  - `instructions`
  - `date`
- Ensures all diagnosis entries are timestamped.

---

### **Created Diagnosis Routes (`diagnosisRoutes.js`)**
- Added **POST endpoint** to save diagnosis data after AI prediction.
- Added **GET endpoint** to retrieve a user’s full diagnosis history.

---

### **Medical History Page (`MedicalHistory.js`)**
- Fetches historical diagnosis data for the logged-in user.
- Displays:
  - Diagnosis
  - Symptoms
  - Medication
  - Instructions
  - Timestamp
- Added fallback message when no history is found.

---

### **Connected Frontend Routing (`App.js`)**
- Imported `MedicalHistory` component.
- Created a new route: `/medical-history`.

---

### **Updated Dashboard Navigation (`Dashboard.js`)**
- Replaced unused “Place Orders” tile.
- Added new navigation tile for “📚 Medical History”.

---

### **Updated Diagnosis Page (`Diagnosis.js`)**
- Added POST request to save each diagnosis to database.
- Ensures all AI diagnosis results are tracked in history.

---
## 🚀 New Features & Updates

## [0.10.7]  
###  **Added Flask API (`menstrual_tracker_api.py`)**
- Created a **Flask API** to handle menstrual cycle tracking.
- Added a **setup check API** to determine if a user has existing cycle data.
- Implemented a **questionnaire API** for first-time users.
- Created a **cycle tracking API** that:
  - Saves user data
  - Predicts the next period
  - Returns cycle information

---
###  **Updated Database Model (`MenstrualCycle.js`)**
- Created a **MongoDB schema** for storing menstrual cycle data.
- Added fields for:
  - `user_id`
  - `last_period_date`
  - `cycle_length`
  - `period_duration`
  - `next_period_date`
- Ensured **user_id is unique** to prevent duplicate entries.

---
### **Created Express Routes (`menstrualtrackerRoutes.js`)**
- Built **Express routes** to:
  - Fetch a user’s cycle data
  - Save new cycle data into MongoDB
- Connected **Flask API with Node.js** for better integration.

---
### **Integrated API with React (`MenstrualTracker.js`)**
- Updated **React frontend** to:
  - Ask users cycle-related questions
  - Send responses to Flask API
  - Display **predicted next period** and cycle details

---
## [0.10.6] 
### **AI Diagnosis Improvements**
- **Added medication recommendations**  based on diagnosed conditions.
- **Fixed duplicate medication issue**  ensuring users don’t store the same medication multiple times.
- **Added a “Request Medication” button**  that allows users to manually request prescribed medication.
- **Stored prescribed medications in the database** for tracking.
- **Improved error handling**  when requesting medications.

### **🆕 Medication Management System**
- **Created `MedicationList` component**  to fetch and display user medications.
- **Built `medicationRoutes.js`** 🛠 for handling medication storage and retrieval.
- **Developed a new model**  to store medications by user ID.
- **Added API routes for medications** to connect frontend and backend.

---
## [0.10.5]
## 🚀 Features
- **NEW**: Machine Learning: using (Random Forest Classifier) - Backend: (Python)
- **AI-Powered Diagnosis**: Uses **Random Forest Classifier** was added to analyze symptoms and provide a probable diagnosis.
- **User-Friendly Interface**: A simple **React-based UI** for users to enter symptoms and receive instant feedback.
- **Machine Learning Model**: Trained on a **diverse dataset** for accurate disease prediction.
- **Secure Backend API**: A **Flask-based backend** that processes user input and interacts with the ML model.
- **Optimized Performance**: Improved AI accuracy through **better training data and model selection**.
---

📌 **Backend Features:**
- **Flask API**: Accepts user symptoms and returns an AI-generated diagnosis.
- **ML Model Training**: Uses **Random Forest Classifier** for predictions.
- **CORS Enabled**: Allows secure interaction between frontend and backend.

---

📌 **ML Model Training (`train_model.py`):**
- Cleans and processes the dataset.
- Trains an **optimized Random Forest Classifier**.
- Saves the trained **model (`diagnosis_model.pkl`)** and **label encoder (`label_encoder.pkl`)**.

**Example of Training Accuracy:**

---

---
## [0.10.4] 
**🔹 Created Mood Analytics Feature**
- Implemented a **line chart** to visualize user mood trends.
- Mapped moods (`Happy, Sad, Neutral, Stressed, Anxious, Excited`).
- Integrated **Recharts.js** for data visualization.
- Fetched mood history from `/users/mood-analytics/:userId` API.
- Improved **tooltip functionality** for mood representation.

---

**🔄 Updated Backend API**
- Added a **new route** to fetch **user mood analytics** from the database.
- Ensured **data formatting** for the frontend graph.

---

**📊 Integrated Mood Analytics & Call Nurse Feature**
- Added a **button** to navigate to the **Mood Analytics page**.
- Ensured smooth **page transitions**.
- Added a **"Call Nurse" button** that directly dials a nurse when clicked.

---
## [0.10.3]
### **🆕 Added**
- **Mood Selection Flow**: Users must now log their mood daily before accessing the dashboard.
- **New `Sentiment` Model**: Stores users' mood entries with timestamps to prevent duplicate logging.
- **New `sentimentRoutes.js`**: API routes for handling mood tracking.
- **Mood Tracking UI in `Dashboard.js`**: Displays the most recent logged mood.
- **Redirect Logic in `Login.js`**: Users are redirected to mood selection after logging in.

---

### **🛠 Fixed**
- **Mood Duplication Prevention**: Ensured users can only submit one mood log per day.
- **Login Redirection Issue**: Users who already logged their mood are now taken directly to the dashboard.

---

### **✨ New Features**
- **Mood Check Before Dashboard Access**: If a user hasn't logged a mood, they are redirected.
- **API Route to Check Existing Mood Log**: Skips mood selection if today's mood was already recorded.
- **Dynamic Mood Display on Dashboard**: Shows `Not Recorded` if mood hasn't been set.
---

## [0.10.1]
### **🆕 New Features**
- **AI Pre-Diagnosis Chat (`AIDiagnosis.js`)**
  - Implemented an **interactive AI chat system** for symptom analysis.
  - AI **welcomes the user** with `"Hello! How are you feeling today?"` after a **short delay**.
  - AI **processes symptoms** and provides **preliminary diagnoses**.
  - **AI typing effect added** before AI responds.

- **Hints Section in AI Chat**
  - **New hints added above the chatbox** to suggest **questions users can ask**.
  - Example hints:
    - `"I have a headache, what could it be?"`
    - `"I've been coughing for 3 days, should I worry?"`

- **Expanded Symptom Recognition (`aiRoutes.js`)**
  - AI can now detect and provide responses for:
    - **Fever, Cough, Headaches, Dizziness, Sore Throat**
    - **Stomach Pain, Chest Pain, Fatigue, Shortness of Breath, Nausea**

---

### **✨ Added**
- **AI Diagnosis Backend (`aiRoutes.js`)**
  - New `/api/ai/diagnose` API route to process user symptoms.

- **New UI Design for AI Chat (`AIDiagnosis.css`)**
  - **Chatbox redesigned** 
  - **AI messages in yellow**, **User messages in blue**.
  - **Typing animation added** to simulate AI "thinking."

- **Routing Updates (`app.js`)**
  - **Connected `AIDiagnosis.js`** to the main app.
  - Fixed **navigation paths** for smoother user experience.

---

### **🐛 Fixed**
- **AI Not Responding Issue**
  - Fixed a bug where AI **did not return a diagnosis** after receiving symptoms.
  - Ensured **proper API response handling** in `AIDiagnosis.js`.

- **Chat Messages Not Auto-Scrolling**
  - Fixed an issue where **new messages did not scroll into view**.
  - The chatbox **now automatically scrolls** when a new message is added.

- **API Error Handling**
  - **Better handling of API failures** (now shows `"Error processing request. Please try again later."` instead of failing silently).
  - AI now **asks for more details** if symptoms are unclear.

---

### **🔄 Changed**
- **Improved AI Responses (`aiRoutes.js`)**
  - AI now provides **more human-like, conversational responses**.
  - Example:
    - Before: `"You may have a fever."`
    - Now: `"It could be a common cold, flu, or infection. Monitor your temperature and stay hydrated. If it persists, consult a doctor."`

- **Enhanced User Experience in AI Chat (`AIDiagnosis.js`)**
  - **AI now takes a short pause before responding**, making the chat feel more natural.
  - **More detailed responses added** to make the AI more helpful.

- **Updated Backend (`server.js`)**
  - **Ensured AI routes (`aiRoutes.js`) were properly connected**.
  - **Fixed missing API errors** by handling request failures.
  - **Enabled CORS** to allow frontend-backend communication.

---
## [0.10.0]
### Added
- **buttons on the Dashboard for the following functionalities**
- Diagnosis
- Place Orders
- List of Medications
- Menstrual Cycle Tracker
- Nurse 24/7 and Mental Health Support
- AI Pre-Diagnosis

- Integrated a calendar widget on the right side of the Dashboard.

### New Feature
- Added a Change Password form that appears only when the user clicks a "Change Password" button.
- The form requires the user to input their current password and the new password.

### General Fixes
- Resolved errors with registration and login functionalities by debugging the backend (userRoutes.js) and ensuring data validation.

---
## [0.0.9]
### Added
- fields to accept the old password and the new password for the user.

### Fixed
- Change password issues.
- solved an error that was causing either the login / registration to fail.

### Changed
- It now checks for the old password validity before hashing and updating the new password.

---
## [0.0.8]
### Added

- **Dashboard Page**:
  - Created a user dashboard to display:
    - User’s full name.
    - User’s email address.
    - User’s GP name.
  - Added a logout button that clears the user's session and redirects to the login page.

- **Improved Backend Error Handling**:
  - Added detailed logging for errors in the backend login route.
  - Improved response messages for scenarios such as:
    - Missing credentials.
    - User not found.
    - Incorrect password.

- **Change Password Functionality**
- Users can update their password while logged in.
- Added a backend route to handle password updates securely.
- Passwords are hashed before being updated in the database.

- **Login Updates**:
  - Updated backend login route to include the user's GP name (`gpName`) in the response.
  - Enhanced frontend login logic to save user details (name, email, GP name) upon successful login.
---

## [0.0.7] 
### Added
- **User Registration:**
    - Frontend registration form (`src/pages/Registration.js`) with:
      - Validation for all fields.
      - Password confirmation validation.
      - Dynamic success and error message display.
    - Backend registration API (`/register`) in `userRoutes.js`:
      - Validates input fields (`name`, `email`, `password`, `gpName`).
      - Ensures passwords match before storing user data.
      - Hashes passwords securely before saving to MongoDB - Bcrypt.
      - Stores the user's general practitioner's name (`gpName`).
- **API Integration:**
  - Axios instance in `src/services/api.js` to handle API requests.
  - Frontend sends data to `http://localhost:5001/api/users/register` for user registration.

### Fixed
- **CORS Issues:**
  - Added `cors` middleware to `server.js` to allow cross-origin requests from the React frontend.

### Changed
- Updated `User` model (`models/User.js`) to include a `gpName` field.

---

## [0.0.6]
### Added
- **User Registration:**
  - Hashes passwords using bcrypt before storing them securely in MongoDB.
- **User Login:**
  - Validates user existence by email and checks the password.

---

## [0.0.5]
### Added
- Backend structure:
  - `db.js`: Manages the connection to MongoDB using Mongoose and reads the MongoDB URI from `.env`.
  - `server.js`: Main server file for Express app.
  - `routes/userRoutes.js`: Handles registration and login APIs.
  - `models/User.js`: Defines the schema and structure for user data.
  - `.env`: Securely stores the MongoDB URI and server port.
- Dependencies added to `package.json`.

### New Features
- Implemented MongoDB connection using Mongoose.
- Configured Express server to serve API endpoints.

---

## [0.0.4]
### Added
- Installed React Router for frontend routing.
- Added `CreateAccount` page and corresponding CSS.
- Modified the home/index page for improved navigation.
- Organized frontend structure:
  - Added folders: `assets/images`, `components`, `styles`, and `pages`.
- Included images for the account registration background.

---

## [0.0.3]
### Changed
- Migrated to React library:
  - Converted `login.html` to `index.html`.
  - Converted `login.css` to `index.css`.

---

## [0.0.2]
### Added
- Created `Login.html`, `Login.css`, and `Login.js`.

---

## [0.0.1]
### Added
- Created `CHANGELOG.md` to track project updates.
