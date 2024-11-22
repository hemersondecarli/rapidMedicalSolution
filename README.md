# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

- Explanation of the recommended reverse chronological release ordering.
### For personal use
- https://account.mongodb.com/account/login
- https://web.postman.co/
- node server.js
- npm start

## [0.0.1] - 11/10/2024
### Added
- added changelog.md

## [0.0.2] - 26/10/2024
### Added
- added Login.html
- added Login.css
- added Login.js

## [0.0.3] - 07/11/2024
### Changes
- added react library
- login.html is now index.html
- login.css is now index.css

## [0.0.4] - 07/11/2024
### New Features + some changes
- installed React Router
- Added CreateAccount page & css
- modified home/index page
- added folders "assets/images <> components <> styles <> pages"
- add some images for account registration background
- code adjustments were made

## [0.0.5] - 22/11/2024
### New Features
- Implementation of MongoDB
- Configured Express server

### Added
- Added backend folder
- Added db.js to manage the connection to MongoDB using Mongoose, it reads MongoDB URI from .env file
- Added server.js Main server file (Express app)
- Added routes/ userRoutes.js to handle registration, login
- Added models/User.js to define the schema and structure of user data
- Added .env file stores MongoDB URI

### Update
- Added package.json dependencies

## [0.0.6] - 22/11/2024
### Added
- User Registration (Hashes passwords using bcrypt before storing them securely)
- User Login (Checks if the user exists in the database by email)