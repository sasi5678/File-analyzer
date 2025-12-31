import React from "react";
import Card from "../components/Card";
import MiniChartCard from "../components/MiniChartCard";
import OverviewChart from "../components/OverviewChart";
import Table from "../components/Table";
import BarAnimation from "../components/BarAnimation";
import { Widget } from "../components/Widget";
import "../styles/Dashboard.css";

/**
 * Dashboard receives analysisData (object) and displays analytics.
 * We provide reasonable defaults in case analysisData is null.
 */
const Dashboard = ({ analysisData, loading }) => {
  // Example mapping from backend result; adapt to your backend schema
  const totalFiles = analysisData?.totalFiles ?? 13232;
  const avgLines = analysisData?.averageLines ?? 13232;
  const miniChartValue = analysisData?.percent ?? 75;
  const barData = analysisData?.classesData ?? null; // your backend may include chart arrays
  const apiList = analysisData?.apis ?? null;
  const timeComplexity = analysisData?.classes?.methods?.timeComplexity ?? 0;

  return (
    <div className="dashboard">
      <div className="top-cards">
        <Card totalFiles={totalFiles} avgLines={avgLines} percent={miniChartValue} avgTime={timeComplexity} />
        <MiniChartCard value={miniChartValue} />


      </div>

      <div className="dashboard-grid">
        <div className="bar-box">
          <p className="section-title">Classes</p>
          <BarAnimation data={barData} />
        </div>

        <div className="table-box">
          <Table apis={apiList} />
        </div>

        <div className="widget-box">
          <Widget />
        </div>

        {/* <div className="line-box">
          <OverviewChart data={barData} />
        </div> */}
      </div>
    </div>
  );
};

export default Dashboard;
