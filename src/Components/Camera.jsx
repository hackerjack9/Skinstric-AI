import React from "react";
import { useNavigate } from "react-router-dom";
import cameraIconLens from "../assets/Shapes/camera-icon-lens.webp";

function Camera() {
  const navigate = useNavigate();
  const goToResults = () => {
    navigate("/result");
  };

  return (
    <div className="camera-body">
      Camera
      <div className="camera-container">
        <div className="video-scontainer">
          <video autoplay playsInline src="" className="video"></video>
          <div className="take-picture-container">
            <div className="take-picture-text">TAKE PICTURE</div>
            <div className="camera-icon-container">
              <img
                className="camera-icon-lens"
                src={cameraIconLens}
                alt="camera icon"
              />
            </div>
          </div>
          <div className="camera-centertext-container">
            <p className="camera-centertext-title">
              TO GET BETTER RESULTS MAKE SURE TO HAVE
            </p>
            <div className="camera-centertext-subtitle">
              <p>◇ NEUTRAL EXPRESSION</p>
              <p>◇ FRONTAL POSE</p>
              <p>◇ ADEQUATE LIGHTING</p>
            </div>
          </div>
        </div>
        <button id="button-back-camera" onClick={goToResults}>
          <span className="button-back-text">BACK</span>
          <div className="minibox-back-camera">
            <span className="minibox-arrow-camera">▶</span>
          </div>
        </button>
      </div>
    </div>
  );
}

export default Camera;
