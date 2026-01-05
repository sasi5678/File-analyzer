import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import MainPage from "./pages/MainPage";
import './index.css'
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import WelcomePage from "./pages/WelcomePage.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<><WelcomePage/></>} />
      <Route path="/main" element={<MainPage />} />
      <Route path="/register" element={<Login />} />
      <Route path="/login" element={<Login />} />


      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
