import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; 
import cameraIconLens from "../assets/Shapes/camera-icon-lens.webp"; 

const Capture = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [capturedImage, setCapturedImage] = useState(null);

  const navigate = useNavigate();
  const goToResult = () => {
    navigate("/result");
  };

  useEffect(() => {
    async function initCamera() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error("Camera access denied:", err);
      }
    }
    initCamera();
  }, []);

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
  };

  return (
    <div className="camera-body">
      <div className="camera-container">
        <div className="video-container">
          {!capturedImage ? (
            <div>
              <video
                ref={videoRef}
                autoPlay
                playsInline
                style={{ width: "400px", borderRadius: "8px" }}
              />
              <br />
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
              <h3>Captured Image:</h3>
              <img
                src={capturedImage}
                alt="Captured"
              />
            </div>
          )}

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

        <button id="button-back-camera" onClick={goToResult}>
          <span className="button-back-text">BACK</span>
          <div className="minibox-back-camera">
            <span className="minibox-arrow-camera">▶</span>
          </div>
        </button>
      </div>

      <canvas ref={canvasRef} style={{ display: "none" }} />
    </div>
  );
};

export default Capture;
