import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainScreen from "./pages/MainScreen";
import RegistrationScreen from "./pages/RegistrationScreen";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainScreen />} />
        <Route path="/register" element={<RegistrationScreen />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;