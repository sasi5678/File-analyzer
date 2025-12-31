import React, { useRef, useState } from "react";
import axios from "axios";
import "../styles/Navbar.css";

const Navbar = ({ onAnalysisResult, setLoading }) => {
  const fileRef = useRef();
  const [open, setOpen] = useState(false);

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);

    try {
      if (setLoading) setLoading(true);

      // Replace this URL with your backend analyze endpoint.
      const res = await axios.post("http://localhost:8080/analyze", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const data = res.data;
      onAnalysisResult && onAnalysisResult(data);
      alert("Upload successful");
    } catch (err) {
      console.error("upload error", err);
      alert("Upload failed. (Check backend)");
    } finally {
      if (setLoading) setLoading(false);
    }
  };

  return (
    <nav className="navbar">
      <div className="nav-left">
        <div className="logo">File Analyzer</div>
      </div>

      <div className="nav-right">
        <label className="upload-btn">
          Upload
          <input
            ref={fileRef}
            type="file"
            accept=".zip"
            hidden
            onChange={handleUpload}
          />
        </label>

        <button className="profile-btn" onClick={() => setOpen((s) => !s)}>
          👤
        </button>

        {open && (
          <div className="dropdown">
            <p className="dropdown-title">Preferences</p>
            <div className="dropdown-item">Settings</div>
            <div className="dropdown-item">Logout</div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
