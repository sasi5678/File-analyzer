import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Dashboard from "../pages/Dashboard"; // note: Dashboard is in pages/
import "../styles/Dashboard.css";

const MainPage = () => {
  const [analysisData, setAnalysisData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // restore from localStorage if present
    const stored = localStorage.getItem("analysisData");
    if (stored) setAnalysisData(JSON.parse(stored));
  }, []);

  const handleAnalysisResult = (data) => {
    setAnalysisData(data);
    try {
      localStorage.setItem("analysisData", JSON.stringify(data));
    } catch (e) {}
  };

  return (
    <div>
      <Navbar onAnalysisResult={handleAnalysisResult} setLoading={setLoading} />
      <main style={{ padding: 24 }}>
        <Dashboard analysisData={analysisData} loading={loading} />
      </main>
    </div>
  );
};

export default MainPage;
