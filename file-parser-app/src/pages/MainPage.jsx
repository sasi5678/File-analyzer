import { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Home from "./Home";
import Dashboard from "./Dashboard";

import "../styles/MainPage.css";
import Table from "../components/Table";
import FolderBar from "../components/FolderBar";
import SingleFileBar from "../components/SingleFileBar";
import OverviewChart from "../components/OverviewChart";

const MainPage = () => {
  const [activeView, setActiveView] = useState("home");
  const [analysisData, setAnalysisData] = useState(null);

   const isSingleFile = analysisData?.totalFiles === 1;
    const files = analysisData?.files || [];

  return (
    <div className="app">
      {/* FIXED NAVBAR */}
      <Navbar data={analysisData} />

      <div className="body">
        {/* FIXED SIDEBAR */}
        <Sidebar activeView={activeView} onSelect={setActiveView} />

        {/* SCROLLABLE CENTER */}
        <main className="main">
          {activeView === "home" && (<Home
              onAnalyze={(data) => {
                setAnalysisData(data);      // ✅ store data
                setActiveView("dashboard"); // ✅ auto navigate
              }}
            />
           )}

          {activeView === "dashboard" && analysisData && (<Dashboard data={analysisData} />
        )}
          {activeView === "table" && <>
          <div className="table-box">
              <h1 className="table-heading">Table</h1>
            <Table data={analysisData}/>
            </div>
            </>
}
          
          {activeView === "graph" && <div style={{padding: '50px 80px 50px 50px', display: "flex", 
            flexDirection: "column", justifyContent: " space-evenly", gap: "30px"}}>

                  <div className="bar-chart">
                  <h2 style={{ color: 'var(--color-title)', padding: '20px 22px'}}> Number of Lines</h2>
                  { isSingleFile ? (
                        <SingleFileBar file={files[0]} />
                      ) : (
                        <FolderBar files={files} />
                  )}
                  
                </div>

                
                <div className="graph-chart">
                  <h2 style={{ color: 'var(--color-title)', padding: '20px 28px'}}>Graph</h2>

                  { isSingleFile ? (
                        <OverviewChart data={files[0]} />
                      ) : (
                        <OverviewChart data={files} />
                  )}
                  
                </div>
                      
          
          </div>}
        </main>
      </div>
    </div>
  );
};

export default MainPage;
