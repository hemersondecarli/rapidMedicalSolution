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
