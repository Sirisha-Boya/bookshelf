import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./components/homePage/HomePage";
import LandingScreen from "./components/LandingScreen";
import LoginScreen from "./components/LoginScreen";
import PreviewBook from "./components/homePage/PreviewBook";
import BookShelf from "./components/myBookshelf/BookShelf";
import NotFound from "./utilities/NotFound";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index path="/" element={<LandingScreen />} />
        <Route path="/signin" element={<LoginScreen />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/preview/:id" element={<PreviewBook />} />
        {/* <Route path="*" element={<Navigate to="/home" replace />} /> */}
        <Route path="*" element={<NotFound/>} />
        <Route path="/home/mybookshelf" element={<BookShelf />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
