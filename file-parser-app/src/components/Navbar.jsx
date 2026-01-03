import "../styles/Navbar.css";
import webLogo from "../assets/web-logo.svg"
import { FaUser } from "react-icons/fa";
import { useState } from "react";


const menuItems = [ 'profile','logout']

const Navbar = () => {

      const [open,setOpen] = useState(false)

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
        <button onMouseEnter={() => setOpen(true)}  onMouseLeave={() => setOpen(false)}>
          <FaUser color="#baa6f8ff" />
        </button>
        <button> Rate On Git </button>
        
        

        {
            open && <div className="drop-menu-items">
                       
                       <ul>
                        {
                          menuItems.map( (item,index) => (
                            <li key={index}>{item}</li>
                          ))
                        }
                       </ul>
                       
                    </div>
      
        }
        
      </div>

      
        
      
    </nav>

    </>
  );
};

export default Navbar;
