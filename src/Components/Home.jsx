import React from "react";
import LeftTriangle from "../assets/Shapes/Rectangle 2779.png";
import RightTriangle from "../assets/Shapes/Rectangle 2778.svg";
import HoverEffect from "../Components/HoverEffect.jsx";



function Home() {
  return (

    <div className="body">
      <div className="button-container">
        <button id="button-left">
          <span>DISCOVER A.I.</span>
          <div className="minibox-left">
            <span className="minibox-arrow-left">▶</span>
          </div>
        </button>
        <div className="center-text">
          <h1 className="center-title">Sophisticated</h1>
          <span className="center-subtitle">Skincare</span>
        </div>
        <HoverEffect />
        <button className="button-right">
          <span>TAKE TEST</span>
          <div className="minibox-right">
            <span className="minibox-arrow-right">▶</span>
          </div>
        </button>
      </div>
      <div className="container-text-left">
        <p className="text-left">
          SKINSTRIC DEVELOPED AND A.I. THAT CREATES A
          <br />
          <span className="text-left-align">
            HIGHLY-PERSONALIZED ROUTINE TAILORED TO
          </span>
          <br />
          WHAT YOUR SKIN NEEDS.
        </p>
      </div>
      <div className="triangle-container">
        <div className="triangle-left">
          <img className="triangle-left" src={LeftTriangle} alt="" />
        </div>
        <div className="triangle-right">
          <img className="triangle-right" src={RightTriangle} alt="" />
        </div>
      </div>
    </div>
  );
}

export default Home;
