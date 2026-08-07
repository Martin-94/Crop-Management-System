This branch contains a crop management system with a backend API server.

Root structure:

- `package.json` - root project metadata and scripts
- `README.md` - project documentation
- `Backend/` - backend API server code and configuration

Backend structure:

- `Backend/app.py` - configures Express middleware and route modules
- `Backend/server.py` - loads environment variables and starts the server
- `Backend/config/db.py` - creates and exports the PostgreSQL connection pool
- `Backend/controllers/authController.py` - handles user registration and login logic
- `Backend/controllers/dashboardController.py` - returns dashboard data for the app
- `Backend/controllers/cropController.py` - exposes crop management endpoints
- `Backend/controllers/livestockController.py` - exposes livestock management endpoints
- `Backend/controllers/weatherController.py` - returns weather display data
- `Backend/controllers/financeController.py` - returns income and expense data
- `Backend/controllers/alertController.py` - returns alerts and notifications
- `Backend/controllers/settingsController.py` - handles user settings payloads
- `Backend/controllers/profileController.py` - handles user profile payloads
- `Backend/middleware/auth.py` - validates JWT tokens for protected endpoints
- `Backend/middleware/errorHandler.py` - central error handling middleware
- `Backend/routes/authRoutes.py` - authentication routes for login and register
- `Backend/routes/dashboardRoutes.py` - dashboard endpoint
- `Backend/routes/cropRoutes.py` - crop management endpoints
- `Backend/routes/livestockRoutes.py` - livestock endpoints
- `Backend/routes/weatherRoutes.py` - weather display endpoint
- `Backend/routes/financeRoutes.py` - income and expenses endpoints
- `Backend/routes/alertRoutes.py` - alerts and notifications endpoints
- `Backend/routes/settingsRoutes.py` - settings endpoints
- `Backend/routes/profileRoutes.py` - profile endpoints

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

> Protected routes require a valid JWT token in `Authorization: Bearer <token>` for the Python backend. The Python skeleton does not yet include authentication middleware as of yet.

