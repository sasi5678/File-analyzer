import "../styles/Navbar.css";
import { useNavigate } from "react-router-dom";
import webLogo from "../assets/web-logo.svg"
import { FaUser } from "react-icons/fa";
import { FiUser, FiLogOut } from "react-icons/fi";

import { useState } from "react";
import axios from "axios";


const menuItems = [ 
  {name: 'Profile', icon: <FiUser />},
  {name: 'Logout', icon: <FiLogOut />},

]

const Navbar = ({data}) => {

      const [open,setOpen] = useState(false)

    
      const navigate = useNavigate();

      const handleLogout = () => {
        // 1️⃣ clear auth data
        localStorage.removeItem("username");
        localStorage.removeItem("token"); // if any

        // 2️⃣ close dropdown
        setOpen(false);

        // 3️⃣ navigate to login
        navigate("/login"); // or "/" depending on your route
      };


     const handleDownload = async () => {

  const hasValidFiles =
    Array.isArray(data?.files) &&
    data.files.some(file => file.totalLines > 0);

  if (!hasValidFiles) {
    alert("File is Empty");
    return;
  }

  try {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Session expired. Please login again.");
      navigate("/login");
      return;
    }

    const res = await axios.get(
      "http://localhost:8080/analyze/download-report",
      {
        responseType: "blob",
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    // force browser download
    const url = window.URL.createObjectURL(
      new Blob([res.data], { type: "application/pdf" })
    );

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "file-report.pdf");
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);

  } catch (err) {
    console.error("Download failed:", err);
    alert("Download failed. Please try again.");
  }
};


  return (

    <>
    <nav className="navbar">
      <div className="nav-left">
        <div className="logo">
          <img src={ webLogo } />
            <p>File Analyzer</p>
          </div>
      </div>

      <div className="nav-right">
        <div className="drop-down" onClick={() => setOpen( prev => !prev)}>
        <button   type="button"
          data-testid="user-menu-btn">
                <FaUser color="#baa6f8ff" />
              </button>
              
              
              

              {
                  open && <div className="drop-menu-items">
                            
                            <ul>
                              {
                                menuItems.map( (item,index) => (
                                  <li key={index}
                                   onClick={
                                    item.name === "Logout" ? handleLogout : undefined
                                  } > {item.name}<span>{item.icon}</span></li>
                                ))
                              }
                            </ul>
                            
                          </div>
            
              }

        </div>
      
        <button id='download-btn' onClick={handleDownload}> Download </button>
      </div>

      
        
      
    </nav>

    </>
  );
};

export default Navbar;
