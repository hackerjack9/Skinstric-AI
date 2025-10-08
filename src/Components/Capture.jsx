import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import cameraIconLens from "../assets/Shapes/camera-icon-lens.webp";

const API_URL = "https://us-central1-frontend-simplified.cloudfunctions.net/skinstricPhaseTwo";

const Capture = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // ✅ Initialize camera
  useEffect(() => {
    async function initCamera() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) videoRef.current.srcObject = stream;
      } catch (err) {
        console.error("Camera access denied:", err);
      }
    }
    initCamera();
  }, []);

  // 📸 Capture the current frame
  const handleCapture = () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    if (!canvas || !video) return;

    const context = canvas.getContext("2d");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    const imageData = canvas.toDataURL("image/png");
    setCapturedImage(imageData);

    try {
      localStorage.setItem("capturedPhoto", imageData);
    } catch (err) {
      console.error("Failed to save photo:", err);
    }
  };

  // 🧠 Send image to API and store response
  const handleUsePhoto = async () => {
    if (!capturedImage) return;
    setLoading(true);

    try {
      // Wait 3 seconds to show the loading animation
      await new Promise((resolve) => setTimeout(resolve, 3000));

      const response = await axios.post(API_URL, { image: capturedImage });
      console.log("API response:", response.data);

      // ✅ Save full response to localStorage for Summary component
      localStorage.setItem("summaryData", JSON.stringify(response.data));

      // ✅ Navigate to Summary
      navigate("/summary");
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Failed to analyze image. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="camera-body">
      <div className="camera-container">
        <div className="video-container">
          {!capturedImage ? (
            <div className="video-subcontainer">
              <video ref={videoRef} autoPlay />
              <div className="take-picture-container">
                <div className="take-picture-text">TAKE PICTURE</div>
                <div className="camera-icon-container">
                  <img
                    onClick={handleCapture}
                    className="camera-icon-lens"
                    src={cameraIconLens}
                    alt="camera icon"
                  />
                </div>
              </div>
            </div>
          ) : (
            <div>
              <img className="captured-img" src={capturedImage} alt="Captured" />
              <div className="captured-buttons">
                <p className="button-title">PREVIEW</p>
                <button
                  id="button-usephoto"
                  onClick={handleUsePhoto}
                  disabled={loading}
                >
                  {loading ? "Uploading..." : "Use This Photo"}
                </button>
                <button id="button-retake" onClick={() => setCapturedImage(null)}>
                  Retake
                </button>
              </div>
            </div>
          )}

          <div className="camera-centertext-container-2">
            <p className="camera-centertext-title-2">
              TO GET BETTER RESULTS MAKE SURE TO HAVE
            </p>
            <div className="camera-centertext-subtitle-2">
              <p>◇ NEUTRAL EXPRESSION</p>
              <p>◇ FRONTAL POSE</p>
              <p>◇ ADEQUATE LIGHTING</p>
            </div>
          </div>
        </div>
      </div>

      {/* Hidden canvas for capture */}
      <canvas ref={canvasRef} style={{ display: "none" }} />

      {/* ⏳ Loading Overlay */}
      {loading && (
        <div className="loading-overlay">
          <div className="loading-box">
            <p>Analyzing this image</p>
            <div className="bouncing-dots">
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Capture;
