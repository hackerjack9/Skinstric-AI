import React from "react";
import camIcon from "../assets/Shapes/camera-icon.webp";
import gallIcon from "../assets/Shapes/gallery-icon.webp";

function Result() {
  return (
    <div className="result-title">
      <p className="result-title-text">TO START ANALYSIS</p>
      <div className="rotating-square-container-1">
       <p className="cam-icon">ALLOW A.I. TO SCAN YOUR FACE</p>
        <img src={camIcon} alt="" />
        <div className="rotating-square-4">
          <div className="rotating-square-5">
            <div className="rotating-square-6">a</div>
          </div>
        </div>
      </div>
      <div className="rotating-square-container-2">
 <p className="gall-icon">ALLOW A.I. ACCESS GALLERY</p>
       <img src={gallIcon} alt="" />
        <div className="rotating-square-7">
          <div className="rotating-square-8">
            <div className="rotating-square-9">b</div>
          </div>
        </div>
      </div>

      <button id="button-back">
        <span className="button-back-text">BACK</span>
        <div className="minibox-back">
          <span className="minibox-arrow-back">▶</span>
        </div>
      </button>
    </div>
  );
}
export default Result;
