import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const defaultData = [
  { name: "Bus", value: 15 },
  { name: "Api", value: 18 },
  { name: "User", value: 12 },
  { name: "Passenger", value: 48 },
  { name: "Ticket", value: 20 },
  { name: "Prize", value: 60 },
  { name: "Counter", value: 22 },
  { name: "DetailService", value: 55 },
  
];

const BarAnimation = ({ data }) => {
  const chartData = data ?? defaultData;
  return (
    <div style={{ width: "100%", height: 220, padding: 0 }}>
      <ResponsiveContainer>
        <BarChart data={chartData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#4f7cff" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#4f7cff" stopOpacity={0} />
            </linearGradient>
          </defs>

          <XAxis dataKey="month" axisLine={false} tick={{ fontSize: 10, fill: "#6b7280" }} />
          <YAxis axisLine={false} tick={{ fontSize: 10, fill: "#6b7280" }} />
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <Tooltip cursor={false} />
          <Bar dataKey="value" fill="url(#colorValue)" radius={[10, 10, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarAnimation;
