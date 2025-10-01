import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import cameraIcon from "../assets/Shapes/camera-icon-lens.webp";

function Camera() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/camera/capture");
    }, 3000);

    return () => clearTimeout(timer); // cleanup timer
  }, [navigate]);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <img
        src={cameraIcon}
        alt="Camera Setup"
        style={{ width: "80px", marginBottom: "20px" }}
      />
      <h2>Setting up your camera...</h2>
    </div>
  );
}

export default Camera;
