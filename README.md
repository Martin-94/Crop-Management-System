This branch contains a crop management system with a backend API server.

Root structure:

- `package.json` - root project metadata and scripts
- `README.md` - project documentation
- `Backend/` - backend API server code and configuration

Backend structure:

- `Backend/app.js` - configures Express middleware and route modules
- `Backend/server.js` - loads environment variables and starts the server
- `Backend/config/db.js` - creates and exports the PostgreSQL connection pool
- `Backend/controllers/authController.js` - handles user registration and login logic
- `Backend/controllers/dashboardController.js` - returns dashboard data for the app
- `Backend/controllers/cropController.js` - exposes crop management endpoints
- `Backend/controllers/livestockController.js` - exposes livestock management endpoints
- `Backend/controllers/weatherController.js` - returns weather display data
- `Backend/controllers/financeController.js` - returns income and expense data
- `Backend/controllers/alertController.js` - returns alerts and notifications
- `Backend/controllers/settingsController.js` - handles user settings payloads
- `Backend/controllers/profileController.js` - handles user profile payloads
- `Backend/middleware/auth.js` - validates JWT tokens for protected endpoints
- `Backend/middleware/errorHandler.js` - central error handling middleware
- `Backend/routes/authRoutes.js` - authentication routes for login and register
- `Backend/routes/dashboardRoutes.js` - dashboard endpoint
- `Backend/routes/cropRoutes.js` - crop management endpoints
- `Backend/routes/livestockRoutes.js` - livestock endpoints
- `Backend/routes/weatherRoutes.js` - weather display endpoint
- `Backend/routes/financeRoutes.js` - income and expenses endpoints
- `Backend/routes/alertRoutes.js` - alerts and notifications endpoints
- `Backend/routes/settingsRoutes.js` - settings endpoints
- `Backend/routes/profileRoutes.js` - profile endpoints

Available backend API routes Python Flask:

- `POST /api/register`
- `POST /api/login`
- `GET /api/dashboard`
- `GET /api/crops`
- `GET /api/crops/<id>`
- `GET /api/livestock`
- `GET /api/livestock/<id>`
- `GET /api/weather`
- `GET /api/finance`
- `GET /api/finance/summary`
- `GET /api/alerts`
- `GET /api/notifications`
- `GET /api/settings`
- `PUT /api/settings`
- `GET /api/profile`
- `PUT /api/profile`

> Protected routes require a valid JWT token in `Authorization: Bearer <token>` for the JavaScript backend. The Python skeleton does not yet include authentication middleware.

