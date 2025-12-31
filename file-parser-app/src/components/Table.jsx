import React from "react";
import "../styles/Table.css";

const Table = ({ apis }) => {
  // default sample
  const rows = apis ?? [
    { file: "Main.java", method: "GET", url: "/bus", lang: "Backend" },
    { file: "UserController.java", method: "POST", url: "/login", lang: "Backend" },
    { file: "bus.js", method: "GET", url: "/bus", lang: "Frontend" },
    { file: "auth.js", method: "POST", url: "/register", lang: "Frontend" },
  ];

  return (
    <div className="table-wrapper">
      <div className="table-scroll">
        <table className="styled-table">
          <thead>
            <tr>
              <th>File Name</th>
              <th>Method</th>
              <th>URL</th>
              <th>Language</th>
            </tr>
          </thead>

          <tbody>
            {rows.map((r, idx) => (
              <tr key={idx}>
                <td>{r.file}</td>
                <td>{r.method}</td>
                <td>{r.url}</td>
                <td>{r.lang}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
