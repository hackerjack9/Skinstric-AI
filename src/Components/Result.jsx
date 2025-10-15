import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import camIcon from "../assets/Shapes/camera-icon.webp";
import gallIcon from "../assets/Shapes/gallery-icon.webp";

function Result() {
  const [showAllowCamera, setShowAllowCamera] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [galleryImage, setGalleryImage] = useState(null);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const API_URL =
    "https://us-central1-frontend-simplified.cloudfunctions.net/skinstricPhaseTwo";

  const goToTesting = () => navigate("/testing");

  const goToCamera = () => {
    navigate("/camera");
  };

  const handleImageClick = () => fileInputRef.current.click();

  // Convert file to base64 string
  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result.split(",")[1];
        resolve(base64String);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  // Send image to API and return data
  const sendImageToAPI = async (base64String) => {
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: base64String }),
      });

      const data = await response.json();
      console.log("API response (Phase 2):", data);

      // Store entire response for Summary page to use later
      localStorage.setItem("phaseTwoResponse", JSON.stringify(data));
      return data;
    } catch (error) {
      console.error("API error:", error);
      throw error;
    }
  };

  // Handle gallery image selection
  const handleFileChange = async (event) => {
    const selectedFile = event.target.files[0];
    if (!selectedFile) return;

    try {
      setLoading(true);

      const base64String = await convertToBase64(selectedFile);

      // Show preview in UI
      setPreviewImage(base64String);
      setGalleryImage(base64String);

      // Save the base64 image separately
      localStorage.setItem("userImageBase64", base64String);

      // Call the API and get response
      const apiResponse = await sendImageToAPI(base64String);

      // ✅ apiResponse is now defined — we store the whole object
      localStorage.setItem("phaseTwoResponse", JSON.stringify(apiResponse));

      setTimeout(() => {
        setLoading(false);
        alert("Image analyzed successfully!");
        navigate("/select");
      }, 4000);
    } catch (error) {
      console.error("Error handling image:", error);
      alert("Failed to process the image. Try again.");
      setLoading(false);
    }
  };

  useEffect(() => {
    const savedImage = localStorage.getItem("userImageBase64");
    if (savedImage) {
      setPreviewImage(savedImage);
      setGalleryImage(savedImage);
    }
  }, []);

  return (
    <div className="result-page">
      <p className="result-title-text">TO START ANALYSIS</p>

      {/* PREVIEW BOX */}
      <div className="preview-container">
        <h1 className="preview-title">Preview</h1>
        <div className="preview-box">
          {galleryImage ? (
            <img
              src={`data:image/jpeg;base64,${galleryImage}`}
              alt="Preview"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: "8px",
              }}
            />
          ) : (
            <p>No image selected yet</p>
          )}
        </div>
      </div>

      {/* CAMERA PERMISSION POPUP */}
      {showAllowCamera && (
        <div className="allow-AI-box">
          <h2 className="allow-AI-title">ALLOW A.I. TO ACCESS YOUR CAMERA</h2>
          <hr />
          <div className="button-AI-container">
            <button
              id="button-AI-deny"
              onClick={() => setShowAllowCamera(false)}
            >
              DENY
            </button>
            <button id="button-AI-allow" onClick={goToCamera}>
              ALLOW
            </button>
          </div>
        </div>
      )}

      {!loading && (
        <>
          {/* CAMERA SECTION */}
          <div className="rotating-square-container-1">
            <p className="cam-text">
              ALLOW A.I. <br /> TO SCAN YOUR FACE
            </p>
            <img
              className="icon-img-1"
              src={camIcon}
              alt="camera icon"
              onClick={() => setShowAllowCamera(true)}
              style={{ cursor: "pointer" }}
            />
            <div className="rotating-square-4">
              <div className="rotating-square-5">
                <div className="rotating-square-6"></div>
              </div>
            </div>
          </div>

          {/* GALLERY SECTION */}
          <div className="rotating-square-container-2">
            <p className="gall-text">
              ALLOW A.I. <br /> ACCESS GALLERY
            </p>
            <div className="gall-icon-container">
              <img
                className="icon-img-2"
                src={gallIcon}
                alt="Click to upload"
                style={{ cursor: "pointer" }}
                onClick={handleImageClick}
              />
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={handleFileChange}
              />
            </div>
            <div className="rotating-square-7">
              <div className="rotating-square-8">
                <div className="rotating-square-9"></div>
              </div>
            </div>
          </div>

          <button id="button-back" onClick={goToTesting}>
            <span className="button-back-text">BACK</span>
            <div className="minibox-back">
              <span className="minibox-arrow-back">▶</span>
            </div>
          </button>
        </>
      )}

      {loading && (
        <div className="body">
          <div className="rotating-square-wrap">
          <div className="rotating-square-1c">
            <div className="rotating-square-2c">
              <div className="rotating-square-3c"></div>
            </div>
          </div>
          <div className="skeleton-state-2">
            <h2 className="skeleton-state-text">PREPARING YOUR ANALYSIS...</h2>
          </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Result;
