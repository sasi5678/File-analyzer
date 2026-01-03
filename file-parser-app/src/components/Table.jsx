import "../styles/Table.css";

const Table = ({ data }) => {
  if (!data || !data.files) return null;

  const rows = data.files.flatMap(file =>
    file.apis.map(api => ({
      className: api.className,
      method: api.httpMethod,
      url: api.apiUrl
    }))
  );

  

  return (
    <table className="table">
      <thead>
        <tr>
          <th>Class Name</th>
          <th>Method</th>
          <th>URL</th>
        </tr>
      </thead>

      <tbody>
        {rows.map((row, index) => (
          <tr key={index}>
            <td>{row.className}</td>
            <td>{row.method}</td>
            <td>{row.url}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
