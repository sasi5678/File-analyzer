import "../styles/Table.css";

const ImportsTable = ({ data }) => {
  if (!data || !data.files) return null;

const rows = data.files.map(file => ({
  className: file.fileName,
  imports: file.imports
}));


  

  return (

    <>

    <div className="table-wrapper">
      <table className="table" >
        <thead>
          <tr>
            <th>Class Name</th>
            <th>Imports</th>
          </tr>
        </thead>

        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              <td>{row.className}</td>
              <td>{row.imports}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    
    
    </>
    
    
  );
};

export default ImportsTable;
