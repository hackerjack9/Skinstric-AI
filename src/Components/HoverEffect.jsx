
import React, { useState } from "react";
import "../assets/CSS/HoverEffect.css"; // put CSS here

const HoverEffect = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="body">
      <button
        id="button-left"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
      </button>

      {/* Center element */}
      <div className={`center-text ${isHovered ? "move-right" : ""}`}>
      </div>

      {/* Right element */}
      <div className={`button-right ${isHovered ? "hidden" : ""}`}>
      </div>
    </div>
  );
};

export default HoverEffect;
