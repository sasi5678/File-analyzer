import React from "react";
import PieAnimation from "./PieAnimation";
import "../styles/Card.css";

const Card = ({ totalFiles = 132, avgLines = 13232, percent = 75, avgTime={ avgTime } }) => {
  return (
    <div className="card-box">
      <div className="card">
        <div className="card-content">
          <p className="card-title">Total Files</p>
          <h2 className="card-value">{totalFiles}</h2>
        </div>

        <div className="card-chart">
          <PieAnimation value={percent} />
        </div>
      </div>

     
      <div className="card">
        <div className="card-content">
          <p className="card-title">Average Lines in Files</p>
          <h2 className="card-value">{avgLines}</h2>
        </div>

        <div className="card-chart">
          <PieAnimation value={percent} />
        </div>
      </div>
    </div>
  );
};

export default Card;
