import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer } from "recharts";

const SingleFileBar = ({ file }) => {
  if (!file) return null;

  const classBars = file.classes.map(cls => ({
    name: `Class: ${cls.name}`,
    value: cls.endLine - cls.startLine + 1
  }));

  const methodBars = file.methods.map(m => ({
    name: `Method: ${m.name}`,
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

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={data}>
        <XAxis dataKey="name" />
        <Tooltip />
        <Bar dataKey="value" fill="#8c5aff" radius={[6,6,0,0]} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default SingleFileBar;
