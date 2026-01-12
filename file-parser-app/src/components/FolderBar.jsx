import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer } from "recharts";

const FolderBar = ({ files }) => {
  if (!Array.isArray(files) || files.length === 0) {
    return <p>No files to display</p>;
  }

  const data = files.map(file => ({
    name: file.fileName,
    lines: file.totalLines
  }));


  const WrappedTick = ({ x, y, payload }) => {
    const words = payload.value.split(/[_\- ]/); // split filename nicely
    const lineHeight = 12;

    return (
      <g transform={`translate(${x},${y + 10})`}>
        {words.map((word, index) => (
          <text
            key={index}
            x={0}
            y={index * lineHeight}
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

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div
          style={{
            background: "var(--color-border)",
            border: "1px solid #3d3257c2",
            padding: "8px 12px",
            borderRadius: "8px",
            color: "#fff",
            fontSize: "14px",
            fontWeight: 600
          }}
        >
          lines : {payload[0].value}
        </div>
      );
    }
    return null;
  };

  return (


    <>
    
          <BarChart
          width={data.length * 70}   // 🔥 dynamic width for scroll
          height={350}
          data={data}
          barCategoryGap={24}        // 🔥 gap between categories
          barGap={8}                 // 🔥 gap between bars
        >
          <XAxis
            dataKey="name"
            interval={0}
            height={40}
            tick={<WrappedTick />}
            tickLine={false}
            axisLine={{ stroke: "#2a2a35" }}
          />

          <Tooltip cursor={false} content={<CustomTooltip />} />

          <Bar
            dataKey="lines"          // ✅ FIXED
            barSize={22}             // 🔥 slimmer bars
            fill="var(--color-button)"
            radius={[12, 12, 0, 0]}
          />
        </BarChart> 
    
    </>

  );
};

export default FolderBar;
