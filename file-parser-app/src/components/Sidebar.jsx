import { useState } from "react";
import "../styles/Sidebar.css";
import { FiHome, 
  FiFolder, 
  FiClock, 
  FiTable , 
  FiFileText, 
  FiGrid,
  FiMoon, 
  FiShield,
  FiMenu ,
  FiAlignJustify  } from "react-icons/fi";

  import { IoMenu, IoClose } from "react-icons/io5";



const menuItems = [
  {
    title: "Get Started",
    items: [
      { label: "Home", icon: FiHome },
      { label: "History", icon: FiClock }
    ]
  },
  {
    title: "Analytics",
    items: [
      { label: "Dashboard", icon: FiGrid },
      { label: "Table", icon: FiTable },
      { label: "Graph", icon: FiFileText },
      { label: "Import", icon: FiTable}
    ]
  },
  {
    title: "Others",
    items: [
      { label: "Admin", icon: FiShield },
      { label: "Dark", icon: FiMoon }
    ]
  }
];
const Sidebar = ({ activeView, onSelect }) => {

  const [open, setOpen] = useState(true) 

  return (
    <aside className={`sidebar-page ${open ? 'close' : 'open'}`}>

    <div className="sidebar-logo">

      {
        open ? (
      <span onClick={ () => setOpen(!open)} > <IoMenu/> </span>          
        ) : (
      <span onClick={ () => setOpen(!open)}> <IoClose   className="cross-logo"/> </span> 
        )
      }

    </div>  

    {

        open ? (

          
        menuItems.map( (section, sIndex) => (
          <div className="section-close" key={sIndex}>
           {
            section.items.map((item, i) => {

              const Icon = item.icon;
              const isActive = activeView === item.label.toLowerCase();

              return(
                <div className="menu-item-wrapper">
                  <div key={i}
                      className={`section-close-items ${isActive ? "active" : ""}`}
                      onClick={() => onSelect(item.label.toLowerCase())}
                  >
                  <Icon size={20} style={{height: '36px', color: '#b19ef0'}}/>
                  
                  </div>
                  <div className="item-menu-box">
                    {item.label}
                  </div>
                </div>
                
                )
              })}
            </div> 
        )) 
      
      ) : (
        menuItems.map( (section, sIndex) => (
          <div className="section" key={sIndex}>
           <p className="section-title"> {section.title}</p>

           {
            section.items.map((item, i) => {

              const Icon = item.icon;
              const isActive = activeView === item.label.toLowerCase();

              return(
                <div key={i}
                    className={`section-items ${isActive ? "active" : ""}`}
                    onClick={() => onSelect(item.label.toLowerCase())}
                >
                <Icon style={{height: '13px', color: '#b19ef0'}}/>
                <span className="menu-text" >{item.label}</span>
                </div>
                )
              })}
            </div> 
        ))

      )
        
      } 
            
        </aside>
  );
}; 
        

      
   

export default Sidebar;
