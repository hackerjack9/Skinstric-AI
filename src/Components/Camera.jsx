import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import cameraIcon from "../assets/Shapes/camera-icon.webp";

function Camera() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/camera/capture");
    }, 3000);

    return () => clearTimeout(timer); // cleanup timer
  }, [navigate]);

  return (
    <div className="body">
      <div className="rotating-square-wrap">
        <div className="rotating-square-1c">
          <div className="rotating-square-2c">
            <div className="rotating-square-3c"></div>
          </div>
        </div>
      </div>
      <div className="skeleton-state">
        <div className="skeleton-camera">
          <img className="camera-icon-2" src={cameraIcon} alt="Camera Setup" />
          <h2 className="camera-icon-text">Setting up camera...</h2>
        </div>
      </div>
      <div className="camera-centertext-container-1">
        <p className="camera-centertext-title-1">
          TO GET BETTER RESULTS MAKE SURE TO HAVE
        </p>
        <div className="camera-centertext-subtitle-1">
          <p>◇ NEUTRAL EXPRESSION</p>
          <p>◇ FRONTAL POSE</p>
          <p>◇ ADEQUATE LIGHTING</p>
        </div>
      </div>
    </div>
  );
}

export default Camera;
