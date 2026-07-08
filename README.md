# Crop-Management-System

## Project Layout

This repository contains a crop management system with a backend API server.

Root structure:

- `package.json` - root project metadata and scripts
- `README.md` - project documentation
- `Backend/` - backend API server code and configuration

Backend structure:

- `Backend/app.js` - configures Express middleware and basic routes
- `Backend/server.js` - loads environment variables and starts the server
- `Backend/config/db.js` - creates and exports the PostgreSQL connection pool
- `Backend/controllers/authController.js` - handles user registration and login logic
- `Backend/middleware/auth.js` - validates JWT tokens for protected endpoints
- `Backend/middleware/errorHandler.js` - central error handling middleware
- `Backend/routes/authRoutes.js` - defines authentication routes

This layout helps separate server startup, configuration, route definitions, controllers, and middleware for maintainability.