import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="home" element={<HomePage />} />
        <Route path="/" element={<Navigate to="home" />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
