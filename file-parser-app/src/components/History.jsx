import { useEffect, useState } from "react";
import "../styles/History.css";
import axios from "axios";

const History = () => {

  const [history, setHistory] = useState([])

  const token = localStorage.getItem("token");

useEffect(() => {

  const fetchHistory = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8080/api/auth/history",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        }
      );
      setHistory(res.data);   
    } catch (err) {
      console.error(err);
    }
  };

  if (token) {
    fetchHistory();
  }

}, [token]);

  console.log(history)
  
  const rows = history.map(item => ({
      fileName: item.fileName,
      size: item.fileSize,
      time: item.uploadedAt
    })
  );

  

  return (

    <>
    <h2 style={{ fontSize: "32px", marginBottom: "10px"}}> HISTORY</h2>
    <div className="table-wrapper">
      <table className="history-table" >
        <thead>
          <tr>
            <th>File Name</th>
            <th>Size</th>
            <th>Time</th>
          </tr>
        </thead>

        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              <td>{row.fileName}</td>
              <td>{`${row.size} kb`}</td>
              <td><span>{row.time}</span></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    
    
    </>
    
    
  );
};

export default History;
