import React from "react";
import { AreaChart, Area, ResponsiveContainer } from "recharts";

const defaultData = [
  { month: "Jan", value: 1500 },
  { month: "Feb", value: 1800 },
  { month: "Mar", value: 1200 },
  { month: "Apr", value: 4800 },
  { month: "May", value: 2000 },
  { month: "Jun", value: 6000 },
  { month: "Jul", value: 2200 },
  { month: "Aug", value: 5500 },
  { month: "Sep", value: 2300 },
  { month: "Oct", value: 3800 },
  { month: "Nov", value: 1500 },
  { month: "Dec", value: 2600 },
];

const OverviewChart = ({ data }) => {
  const chartData = data ?? defaultData;
  return (
    <div style={{ width: "100%", height: 300 }}>
      <ResponsiveContainer>
        <AreaChart data={chartData}>
          <defs>
            <linearGradient id="areaBlue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#4f7cff" stopOpacity={0.6} />
              <stop offset="95%" stopColor="#4f7cff" stopOpacity={0} />
            </linearGradient>
          </defs>

          <Area type="monotone" dataKey="value" stroke="#4f7cff" strokeWidth={3} fill="url(#areaBlue)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default OverviewChart;
