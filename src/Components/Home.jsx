import React, { useState } from "react";
import LeftTriangle from "../assets/Shapes/Rectangle 2779.png";
import RightTriangle from "../assets/Shapes/Rectangle 2778.svg";

function Home() {
  const [hovered, setHovered] = useState(null);

  return (
    <div className="body">
      <div className="hovereffect-container">
        <button
          id="button-left"
          onMouseEnter={() => setHovered("left")}
          onMouseLeave={() => setHovered(null)}
          style={{ opacity: hovered === "right" ? 0 : 1 }}
        >
          <span className="button-left-text">DISCOVER A.I.</span>
          <div className="minibox-left">
            <span className="minibox-arrow-left">▶</span>
          </div>
        </button>
        {/* Center text that moves */}
        <div
          className={`center-text ${hovered === "right" ? "move-left" : ""}`}
        >
          <h1 className="center-title">Sophisticated</h1>
          <span className="center-subtitle">skincare</span>
          <div className="container-text-left">
            Skinstric developed an A.I. that creates a 
            <br />
            highly-personalized routine tailored to
            <br />
            what your skin needs.
          </div>
          <button id="button-exp">
            <span className="button-text-exp">ENTER EXPERIENCE</span>
            <div className="minibox-exp">
              <span className="minibox-arrow-exp">▶</span>
            </div>
          </button>
        </div>
        <div className="diamond-box"></div>
        <button
          id="button-right"
          onMouseEnter={() => setHovered("right")}
          onMouseLeave={() => setHovered(null)}
          style={{ opacity: hovered === "left" ? 0 : 1 }}
        >
          <span className="button-left-text">TAKE TEST</span>
          <div className="minibox-right">
            <span className="minibox-arrow-right">▶</span>
          </div>
        </button>
        <div className="triangle-right">
          <img className="triangle-right" src={RightTriangle} alt="" />
        </div>
        <div className="triangle-left">
          <img className="triangle-left" src={LeftTriangle} alt="" />
        </div>
      </div>
    </div>
  );
}

export default Home;

// const [isHovered, setIsHovered] = useState(false);

// const handleMouseEnter = () => {
//   setIsHovered(true);
// };
// const handleMouseLeave = () => {
//   setIsHovered(false);
// };
// style={{ {transform: translate x(-200px)}: hovered === ? 0 : 1 }}
