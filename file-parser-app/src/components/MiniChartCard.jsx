import React from "react";
import { AreaChart, Area, ResponsiveContainer } from "recharts";
import "../styles/MiniChartCard.css";

const sample = [
  { value: 200 },
  { value: 300 },
  { value: 260 },
  { value: 380 },
  { value: 340 },
  { value: 410 },
  { value: 390 },
];

const MiniChartCard = ({ value = 75, data = sample }) => {
  return (
    <div className="mini-card red">
      <div className="mini-card-header">
        <p>Total classes</p>
        <h3>38</h3>
      </div>

      <div className="mini-chart">
        <ResponsiveContainer width="100%" height={60}>
          <AreaChart data={data} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="whiteFade" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="rgba(255,255,255,0.9)" />
                <stop offset="100%" stopColor="rgba(255,255,255,0)" />
              </linearGradient>
            </defs>

            <Area
              type="linear"
              dataKey="value"
              stroke="#ffffff"
              strokeWidth={2}
              fill="url(#whiteFade)"
              dot={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default MiniChartCard;
