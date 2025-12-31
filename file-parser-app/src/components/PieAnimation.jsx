import React from "react";
import { PieChart, Pie, Cell, Label } from "recharts";

const PieAnimation = ({ value = 75 }) => {
  return (
    <PieChart width={80} height={80}>
      <Pie
        data={[
          { value },
          { value: 100 - value }
        ]}
        cx="50%"
        cy="50%"
        innerRadius={28}
        outerRadius={36}
        startAngle={90}
        endAngle={-270}
        dataKey="value"
        cornerRadius={10}
        paddingAngle={0}
      >
        <Cell fill="#4f7cff" />
        <Cell fill="#ffffff" />
        <Label
          value={`${value}%`}
          position="center"
          style={{
            fontSize: "14px",
            fontWeight: "600",
            fill: "#0b2a66",
          }}
        />
      </Pie>
    </PieChart>
  );
};

export default PieAnimation;
