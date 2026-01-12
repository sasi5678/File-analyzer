import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer } from "recharts";

const SingleFileBar = ({ file }) => {
  if (!file) return null;

  const classBars = file.classes.map(cls => ({
    name: `${cls.name}`,
    value: cls.endLine - cls.startLine + 1
  }));

  const methodBars = file.methods.map(m => ({
    name: `${m.name}`,
    value: m.endLine - m.startLine + 1
  }));

  const data = [
    { name: "Total Lines", value: file.totalLines },
    { name: "Lines of Code", value: file.linesOfCode },
    { name: "Comment Lines", value: file.commentLines },
    { name: "Total APIs", value: file.apis.length },
    ...classBars,
    ...methodBars
  ];

  const WrappedTick = ({ x, y, payload }) => {
  const words = payload.value.split(" ");
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
            {payload[0].value}
          </div>
        );
      }
      return null;
    };

  return (
    <>
     <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data} barCategoryGap={24}  barGap={8} >
        <XAxis
            dataKey="name"
            interval={0}
            textAnchor="end"
            height={70}
            tick={<WrappedTick />}
            tickLine={false}
            axisLine={{ stroke: "#2a2a35" }}
          />

        <Tooltip cursor={false} content={<CustomTooltip />} />
        <Bar dataKey="value"  barSize={38} fill="var(--color-button)" radius={[15,15,0,0]} />
      </BarChart>
    </ResponsiveContainer> 
    
    </>
  
  );
};

export default SingleFileBar;

