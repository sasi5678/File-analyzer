import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Dashboard from "../pages/Dashboard"; 
import "../styles/Dashboard.css";
import Home from "./Home";
import Sidebar from "../components/Sidebar";
  


const MainPage = () => {
  const [analysisData, setAnalysisData] = useState(null);

  

  return (
    <div>
      <Navbar />
      <Sidebar />
      <Home onAnalyze={setAnalysisData}  />
     
        <main >
          {
            analysisData && <Dashboard data={analysisData}  />
          }
        </main>
    </div>
  );
};

export default MainPage;
