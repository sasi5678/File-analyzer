import React, { useState } from "react";
import "../styles/Widget.css";

const items = [
  { name: "Project", content: "Project content..." },
  { name: "Files", content: "Files content..." },
  { name: "Errors", content: "Errors content..." },
  { name: "Settings", content: "Settings content..." },
];

export const Widget = () => {
  const [activeBlock, setActiveBlock] = useState(0);
  return (
    <section className="page widget-2-page">
      <div className="widget-2-card">
        <div className="buttons">
          {items.map((item, index) => (
            <button key={item.name} className={index === activeBlock ? "active" : ""} onClick={() => setActiveBlock(index)}>
              {item.name}
            </button>
          ))}
        </div>

        <div className="wrapper">
          <div className="content" style={{ transform: `translateY(-${activeBlock * 200}px)` }}>
            {items.map((item) => (
              <div key={item.name} className="block">
                <h2>{item.name}</h2>
                <p>{item.content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
