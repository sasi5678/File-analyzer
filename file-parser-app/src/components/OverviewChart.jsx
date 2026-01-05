import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer
} from "recharts";

const OverviewChart = ({ data }) => {
  if (!data) return null;

  let chartData = [];

  /* ---------- SINGLE FILE ---------- */
  if (!Array.isArray(data)) {
    const file = data;

    chartData = [
      { name: "Total Lines", value: file.totalLines },
      { name: "Lines of Code", value: file.linesOfCode },
      { name: "Comment Lines", value: file.commentLines },
      { name: "Total APIs", value: file.apis.length },

      ...(file.classes || []).map(cls => ({
        name: `Class: ${cls.name}`,
        value: cls.endLine - cls.startLine + 1
      })),

      ...(file.methods || []).map(m => ({
        name: `Method: ${m.name}`,
        value: m.endLine - m.startLine + 1
      }))
    ];
  }

  /* ---------- FOLDER ---------- */
  else {
  chartData = data.map(file => ({
    name: file.fileName,
    value: file.totalLines
  }));
}

  /* ---------- TOOLTIP ---------- */
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div
          style={{
            background: "#0b0616",
            border: "1px solid #3d3257",
            padding: "10px 14px",
            borderRadius: "10px",
            color: "#fff",
            fontSize: "13px"
          }}
        >
          <div><b>{payload[0].payload.name}</b></div>
          <div>Lines: {payload[0].value}</div>
        </div>
      );
    }
    return null;
  };

  
 const WrappedTick = ({ x, y, payload }) => {
  if (typeof payload.value !== "string") return null;

  const words = payload.value
    .replace(/\.(js|java|ts|jsx)$/,"")
    .split(/[_\- ]/);

  return (
    <g transform={`translate(${x},${y + 10})`}>
      {words.map((word, i) => (
        <text
          key={i}
          x={0}
          y={i * 12}
          textAnchor="middle"
          fill="#9ca3af"
          fontSize={11}
        >
          {word}
        </text>
      ))}
    </g>
  );
};



  const chartWidth = Math.max(chartData.length * 90, 600);

  return (
    <ResponsiveContainer width={chartWidth} height={260}>
      <AreaChart
        data={chartData}
        margin={{ top: 20, right: 20, bottom: 10, left: 0 }}
      >
        {/* DOTTED GRID */}
        <CartesianGrid stroke="#2a2a35" strokeDasharray="4 4" />

        <XAxis
          dataKey="name"
          interval={0}
          tick={<WrappedTick />}
          tickLine={false}
          axisLine={false}
        />

        <YAxis
          tick={{ fill: "#9ca3af", fontSize: 11 }}
          tickLine={false}
          axisLine={false}
        />

        <Tooltip
          cursor={{ stroke: "#8c5aff", strokeDasharray: "4 4" }}
          content={<CustomTooltip />}
        />

        <Area
          type="monotone"
          dataKey="value"
          stroke="#8c5aff"
          fill="url(#overviewGradient)"
          strokeWidth={2}
          dot={false}
        />

        <defs>
          <linearGradient id="overviewGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#8c5aff" stopOpacity={0.4} />
            <stop offset="100%" stopColor="#8c5aff" stopOpacity={0.05} />
          </linearGradient>
        </defs>
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default OverviewChart;
