// Import React Router components to handle navigation between screens
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Import application screens
import MainScreen from "./pages/MainScreen";
import RegistrationScreen from "./pages/RegistrationScreen";
import DashboardScreen from "./pages/DashboardScreen";
import LoginScreen from "./pages/LoginScreen";


function App() {
  return (
    // BrowserRouter enables routing throughout the application
    <BrowserRouter>
      <Routes>
        {/* Route for the application's welcome/home screen */}
        <Route
          path="/"
          element={<MainScreen />}
        />

        {/* Route for the user registration screen */}
        <Route
          path="/register"
          element={<RegistrationScreen />}
        />

        {/* Route for the user dashboard screen */}
        <Route 
          path="/dashboard"  
          element={<DashboardScreen />} 
        />

        {/* Route for the user login screen */}
        <Route 
          path="/login" 
          element={<LoginScreen />} 
        />

        
      </Routes>
    </BrowserRouter>
  );
}

// Export App component for use in main.jsx
export default App;