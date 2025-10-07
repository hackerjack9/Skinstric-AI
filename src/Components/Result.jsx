import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import camIcon from "../assets/Shapes/camera-icon.webp";
import gallIcon from "../assets/Shapes/gallery-icon.webp";
import scanLine1 from "../assets/Shapes/cam-icon-line.webp";
import scanLine2 from "../assets/Shapes/gallery-icon-line.webp";

function Result() {
  const [showAllowCamera, setShowAllowCamera] = useState(false);
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [loading, setLoading] = useState(false);
    const [galleryImage, setGalleryImage] =useState(null);

  const API_URL =
    "https://us-central1-frontend-simplified.cloudfunctions.net/skinstricPhaseTwo";

  const goToTesting = () => {
    navigate("/testing");
  };

  const goToCamera = () => {
    setShowAllowCamera(false);
    navigate("/camera");
  };

  // Trigger hidden file input on gallery icon click
  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  // Convert selected file to base64 and handle UI flow
  const handleFileChange = async (event) => {
    const selectedFile = event.target.files[0];
    if (!selectedFile) return;

    try {
      const base64String = await convertToBase64(selectedFile);
      setPreviewImage(base64String);
      localStorage.setItem("userImageBase64", base64String);

      // Start loading state
      setLoading(true);

      // Send image to API while loading
      await sendImageToAPI(base64String);

      // Wait a bit then 
      setTimeout(() => {
        alert("Image analyzed successfully!");
        navigate("/select");
      }, 4000);
    } catch (error) {
      console.error("Error handling image:", error);
      alert("Failed to process the image. Try again.");
    }
  };

  // Helper: Convert file → base64 string
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

  // Helper: POST base64 to Phase 2 API
  const sendImageToAPI = async (base64String) => {
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: base64String }),
      });

      const data = await response.json();
      console.log("API response (Phase 2):", data);
      localStorage.setItem("phase2Response", JSON.stringify(data));
    } catch (error) {
      console.error("API error:", error);
    }
  };

  // Save to React state
  setGalleryImage(selectedFile);
  
  // Save to localStorage
  try {
    localStorage.setItem("galleryPhoto", selectedFile);
    console.log("Photo saved to localStorage");
  } catch (err) {
    console.error("Failed to save photo to localStorage:", err);
  }
};

// Load the photo from localStorage if it exists
// If you want the captured photo to persist even if the user refreshes the page:

useEffect(() => {
  const savedPhotoTwo = localStorage.getItem("galleryPhoto");
  if (savedPhotoTwo) {
    setGalleryImage(savedPhotoTwo);
  }
}, []);


  return (
    <div className="result-page">
      <p className="result-title-text">TO START ANALYSIS</p>

      {/* PREVIEW BOX */}
      <div className="preview-container">
        <h1 className="preview-title">Preview</h1>
        <div className="preview-box">
          {previewImage && (
            <img
              src={`data:image/jpeg;base64,${previewImage}`}
              alt="preview"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: "8px",
              }}
            />
          )}
        </div>
      </div>

    
      {showAllowCamera && (
        <div className="rotating-square-container-1">
          <div className="allow-AI-box">
            <h2 className="allow-AI-title">ALLOW A.I. TO ACCESS YOUR CAMERA</h2>
            <hr />
            <div className="button-AI-container">
              <button id="button-AI-deny" onClick={() => setShowAllowCamera(false)}>
                DENY
              </button>
              <button id="button-AI-allow" onClick={goToCamera}>
                ALLOW
              </button>
            </div>
          </div>
        </div>
      )}

   
      {!loading && (
        <>
          <div className="rotating-square-container-1">
            <p className="cam-text">
              ALLOW A.I. <br /> TO SCAN YOUR FACE
            </p>
            <img className="scanLine1" src={scanLine1} alt="scan line" />
          
            <img
              className="icon-img-1"
              src={camIcon}
              alt="camera icon image"
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
              ALLOW A.I. <br />
              ACCESS GALLERY
            </p>
            <img className="scanLine2" src={scanLine2} alt="scan line" />
            <div>
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

      {/* LOADING OVERLAY */}
      {loading && (
        <div className="body">
          <div className="rotating-square-1c">
            <div className="rotating-square-2c">
              <div className="rotating-square-3c"></div>
            </div>
          </div>
          <div className="skeleton-state">
            <h2>PREPARING YOUR ANALYSIS...</h2>
          </div>
        </div>
      )}
    </div>
  )
};

export default Result;

