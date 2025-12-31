import "../styles/Sidebar.css";
import {
  FaPalette,
  FaShapes,
  FaCube
} from "react-icons/fa";

const Sidebar = () => {
  return (
    <aside className="sidebar">
      {/* Get Started */}
      <div className="section">
        <p className="section-title">Get Started</p>
        <div className="section-items">
          <span className="active">Introduction</span>
          <span>Installation</span>
          <span>MCP</span>
          <span>Index</span>
        </div>
      </div>

      {/* Tools */}
      <div className="section">
        <p className="section-title">Tools</p>
        <div className="section-items">
          <span>
            <FaPalette /> Background Studio
          </span>
          <span>
            <FaShapes /> Shape Magic
          </span>
          <span>
            <FaCube /> Texture Lab
          </span>
        </div>
      </div>

      {/* Text Animations */}
      <div className="section">
        <p className="section-title">Text Animations</p>
        <div className="section-items muted">
          <span>Split Text</span>
          <span>Blur Text</span>
          <span>Circular Text</span>
          <span>Text Type</span>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
