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
---
## [0.10.3] - 04/02/2025 - 10/02/2025      
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

## [0.10.1] - 29/01/2025
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
## [0.10.0] - 22/01/2025
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
## [0.0.9] -20/01/2025 - 22/01/2025
### Added
- fields to accept the old password and the new password for the user.

### Fixed
- Change password issues.
- solved an error that was causing either the login / registration to fail.

### Changed
- It now checks for the old password validity before hashing and updating the new password.

---
## [0.0.8] - 23/12/2024
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

## [0.0.7] - 22/11/2024
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

## [0.0.6] - 22/11/2024
### Added
- **User Registration:**
  - Hashes passwords using bcrypt before storing them securely in MongoDB.
- **User Login:**
  - Validates user existence by email and checks the password.

---

## [0.0.5] - 22/11/2024
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

## [0.0.4] - 07/11/2024
### Added
- Installed React Router for frontend routing.
- Added `CreateAccount` page and corresponding CSS.
- Modified the home/index page for improved navigation.
- Organized frontend structure:
  - Added folders: `assets/images`, `components`, `styles`, and `pages`.
- Included images for the account registration background.

---

## [0.0.3] - 07/11/2024
### Changed
- Migrated to React library:
  - Converted `login.html` to `index.html`.
  - Converted `login.css` to `index.css`.

---

## [0.0.2] - 26/10/2024
### Added
- Created `Login.html`, `Login.css`, and `Login.js`.

---

## [0.0.1] - 11/10/2024
### Added
- Created `CHANGELOG.md` to track project updates.
