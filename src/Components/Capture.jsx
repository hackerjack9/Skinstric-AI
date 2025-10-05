import React, { useRef, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import cameraIconLens from "../assets/Shapes/camera-icon-lens.webp";
import { DataContext } from "../DataContext"; // ✅ for storing analysis results globally

const Capture = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false); // ✅ loading state

  const navigate = useNavigate();
  const { setAnalysisData } = useContext(DataContext); // ✅ global state setter

  const goToResult = () => {
    navigate("/result");
  };

  const goToCapture = () => {
    setCapturedImage(null);
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

  // ✅ New: analyze captured image when user clicks "Use This Photo"
  const handleUsePhoto = async () => {
    if (!capturedImage) return;

    setIsAnalyzing(true); // show analyzing state

    try {
      // Convert base64 to Blob
      const byteString = atob(capturedImage.split(",")[1]);
      const mimeString = capturedImage.split(",")[0].split(":")[1].split(";")[0];
      const ab = new ArrayBuffer(byteString.length);
      const ia = new Uint8Array(ab);
      for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }
      const blob = new Blob([ab], { type: mimeString });

      const formData = new FormData();
      formData.append("image", blob);

      // ✅ Replace with your actual API endpoint
      const response = await fetch("YOUR_ANALYSIS_API_URL", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to analyze image");
      }

      const data = await response.json();

      // ✅ Store analysis globally for Summary
      setAnalysisData(data);

      // Simulate 2–3 sec loading delay for “Analyzing your image…”
      setTimeout(() => {
        setIsAnalyzing(false);
        navigate("/select"); // go to Select after analysis
      }, 3000);
    } catch (error) {
      console.error("Error analyzing selfie:", error);
      setIsAnalyzing(false);
      alert("There was a problem analyzing the image. Please try again.");
    }
  };

  return (
    <div className="camera-body">
      <div className="camera-container">
        <div className="video-container">
          {/* ✅ Show analyzing screen */}
          {isAnalyzing ? (
            <div className="analyzing-container">
              <p className="analyzing-text">ANALYZING YOUR IMAGE...</p>
            </div>
          ) : !capturedImage ? (
            <div className="video-subcontainer">
              <video ref={videoRef} autoPlay />
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
              <img className="captured-img" src={capturedImage} alt="Captured" />
              <div className="captured-buttons">
                <p className="button-title">PREVIEW</p>
                <button id="button-usephoto" onClick={handleUsePhoto}>
                  Use This Photo
                </button>
                <button id="button-retake" onClick={goToCapture}>
                  Retake
                </button>
              </div>
            </div>
          )}

          {!isAnalyzing && (
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
          )}
        </div>

        {!isAnalyzing && (
          <button id="button-back-camera" onClick={goToResult}>
            <span className="button-back-text">BACK</span>
            <div className="minibox-back-camera">
              <span className="minibox-arrow-camera">▶</span>
            </div>
          </button>
        )}
      </div>

      <canvas ref={canvasRef} style={{ display: "none" }} />
    </div>
  );
};

export default Capture;
