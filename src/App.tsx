import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LoginCard from "./Login";
import RegisterCard from "./Register";
import Landing from "./Landing";
import AboutUs from "./AboutUs";
import ContactPage from "./ContactPage";
import Home from "./screens/home";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/landing" replace />} />
        <Route path="/landing" element={<Landing />} />
        <Route path="/about" element={<AboutUs setShowAboutUs={() => {}} />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/login" element={<LoginCard />} />
        <Route path="/register" element={<RegisterCard />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  );
};

export default App;
