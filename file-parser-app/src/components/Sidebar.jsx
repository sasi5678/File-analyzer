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
      { label: "Graph", icon: FiFileText }
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
  return (
    <aside className="sidebar-page">

      


      {
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
                <span >{item.label}</span>
                </div>
                )
              })}
            </div> 
        ))}   
            
  
        </aside>
  );
}; 
        

      
   

export default Sidebar;
