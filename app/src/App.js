import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./components/homePage/HomePage";
import LandingScreen from "./components/LandingScreen";
import LoginScreen from "./components/LoginScreen";
import PreviewBook from "./components/homePage/PreviewBook";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index path="/" element={<LandingScreen />} />
        <Route path="/signin" element={<LoginScreen />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/preview" element={<PreviewBook />} />
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
