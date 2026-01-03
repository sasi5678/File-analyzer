import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer } from "recharts";

const FolderBar = ({ files }) => {
  if (!Array.isArray(files) || files.length === 0) {
    return <p>No files to display</p>;
  }

  const data = files.map(file => ({
    name: file.fileName,
    lines: file.totalLines
  }));

  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis dataKey="name" hide />
        <Tooltip />
        <Bar
          dataKey="lines"
          fill="#0ea5e9"
          radius={[6, 6, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default FolderBar;
