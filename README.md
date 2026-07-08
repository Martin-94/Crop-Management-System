# 🌱 Cropelle

A smart farming management platform designed to help small-scale farmers manage their farming activities through an easy-to-use and accessible digital solution.

---

## 📖 Overview

Cropelle provides farmers with essential tools for managing crops, tracking farm finances, monitoring weather conditions, receiving alerts and notifications, and managing personal farm information. The platform is designed with simplicity in mind, making it accessible across mobile, tablet, and desktop devices.

---

## ✨ Features

✅ User registration, login, and password recovery

✅ Crop management and tracking

✅ Farm finance management

✅ Real-time weather information and forecasts

✅ Alerts and notifications for important farming activities

✅ User profile management

✅ Customizable settings and notification preferences

✅ Mobile-friendly and responsive design

---

## 🚀 Setup

### Prerequisites

Make sure the following are installed:

- Node.js
- npm
- Git

### Installation

Clone the repository:

```bash
git clone <repository-url>
```

Navigate to the project folder:

```bash
cd cropelle
```

Install dependencies:

```bash
npm install
```

Run the application:

```bash
npm run dev
```

The application will be available at:

```text
http://localhost:3000
```

---

## 🔧 Troubleshooting

### Application won't start

Verify Node.js and npm are installed:

```bash
node -v
npm -v
```

### Dependencies fail to install

```bash
npm cache clean --force
npm install
```

### Unable to connect to the backend

- Ensure the backend server is running.
- Verify API endpoints are configured correctly.
- Check environment variables.

### Weather data not loading

- Check your internet connection.
- Verify backend services are running correctly.
- Ensure weather API configuration is valid.

### Styling issues

Reinstall dependencies and restart the application:

```bash
npm install
npm run dev
```

## 📂 Project Structure

```text
CROP-MANAGEMENT-SYSTEM/
│
├── frontend/
│   ├── public/                    # Public static files
│   │
│   ├── src/
│   │   ├── assets/                # Images, icons, and application resources
│   │   ├── components/            # Reusable UI components
│   │   │   └── Navbar.jsx
│   │   │
│   │   ├── pages/                 # Application screens
│   │   │   ├── MainScreen.jsx
│   │   │   ├── LoginScreen.jsx
│   │   │   ├── RegistrationScreen.jsx
│   │   │   ├── DashboardScreen.jsx
│   │   │   └── NotificationsScreen.jsx
│   │   │
│   │   ├── App.jsx                # Main application component
│   │   ├── App.css                # Application styles
│   │   ├── index.css              # Global styles
│   │   └── main.jsx               # Application entry point
│   │
│   ├── package.json               # Frontend dependencies and scripts
│   ├── vite.config.js             # Vite configuration
│   └── README.md
│
├── node_modules/                  # Installed project dependencies
├── package.json                   # Project configuration
├── package-lock.json              # Dependency lock file
└── README.md                      # Project documentation
```

### Structure Overview

| Folder/File | Description |
|------------|-------------|
| `assets/` | Contains images, icons, logos, and other static resources used throughout the application. |
| `components/` | Stores reusable React components such as the navigation bar. |
| `pages/` | Contains all major application screens including Login, Registration, Dashboard, and Notifications. |
| `App.jsx` | Root component that controls the application layout and rendering. |
| `main.jsx` | Entry point that mounts the React application. |
| `App.css` & `index.css` | Application-specific and global styling files. |
| `package.json` | Manages project dependencies and scripts. |
| `vite.config.js` | Configuration file for the Vite development environment. |
| `README.md` | Contains project documentation and setup instructions. |
