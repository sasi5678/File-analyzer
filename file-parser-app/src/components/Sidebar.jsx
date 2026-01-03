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
      { label: "Upload", icon: FiFolder },
      { label: "History", icon: FiClock }
    ]
  },
  {
    title: "Analytics",
    items: [
      { label: "Dashboard", icon: FiGrid },
      { label: "Tables", icon: FiTable },
      { label: "Summary", icon: FiFileText }
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
const Sidebar = () => {
  return (
    <aside className="sidebar-page">

      <div className="head">
        <span></span>
      </div>


      {
        menuItems.map( (section, sIndex) => (
          <div className="section" key={sIndex}>
           <p className="section-title"> {section.title}</p>

           {
            section.items.map((item, i) => {

              const Icon = item.icon;

              return(
                <div className="section-items" key={i}>
                <Icon style={{height: '13px', color: '#b19ef0'}}/>
                <span>{item.label}</span>
                </div>
                )
              })}
            </div> 
        ))}   
            
  
        </aside>
  );
}; 
        

      
   

export default Sidebar;
