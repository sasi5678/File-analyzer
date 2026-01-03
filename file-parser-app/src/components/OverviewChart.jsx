import React from "react";
import { AreaChart, Area, ResponsiveContainer } from "recharts";

const OverviewChart = ({ analysisData }) => {

  
  if (
    !analysisData ||
    !Array.isArray(analysisData.files) ||
    analysisData.files.length === 0
  ) {
    return <p>No analysis data available</p>;
  }

  const isSingleFile = analysisData.totalFiles === 1;

  let chartData = [];

  if (isSingleFile) {
    const file = analysisData.files[0];

    chartData = [
      { name: "Total Lines", value: file.totalLines ?? 0 },
      { name: "Lines of Code", value: file.linesOfCode ?? 0 },
      { name: "Comment Lines", value: file.commentLines ?? 0 },
      { name: "APIs", value: file.apis?.length ?? 0 },
    ];
  } else {
    const totalApis = analysisData.files.reduce(
      (sum, f) => sum + (f.apis?.length ?? 0),
      0
    );

    const totalClasses = analysisData.files.reduce(
      (sum, f) => sum + (f.classes?.length ?? 0),
      0
    );

    chartData = [
      { name: "Files", value: analysisData.totalFiles ?? 0 },
      { name: "Total Lines", value: analysisData.totalLines ?? 0 },
      { name: "APIs", value: totalApis },
      { name: "Classes", value: totalClasses },
    ];
  }

  return (
    <div style={{ width: "100%", height: 260 }}>
      <ResponsiveContainer>
        <AreaChart data={chartData}>
          <defs>
            <linearGradient id="overviewGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#4f7cff" stopOpacity={0.6} />
              <stop offset="100%" stopColor="#4f7cff" stopOpacity={0} />
            </linearGradient>
          </defs>

          <Area
            type="monotone"
            dataKey="value"
            stroke="#4f7cff"
            strokeWidth={3}
            fill="url(#overviewGradient)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default OverviewChart;
