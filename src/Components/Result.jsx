import React, { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import camIcon from "../assets/Shapes/camera-icon.webp";
import gallIcon from "../assets/Shapes/gallery-icon.webp";
import scanLine1 from "../assets/Shapes/cam-icon-line.webp";
import scanLine2 from "../assets/Shapes/gallery-icon-line.webp";

function Result() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const goToTesting = () => {
    navigate("/testing");
  };

  const goToCamera = () => {
    navigate("/camera");
  };

  // Function to handle the image click of gallery icon
  const handleImageClick = () => {
    // Trigger the click event on the hidden file input
    fileInputRef.current.click();
  };

  // Function to handle file selection
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      console.log("Selected file:", selectedFile.name);
    }
  };

  /* When preview has obtained the image from gallery icon - doing loading state for routing to next page */
  /*  useEffect(() => {
    const timer = setTimeout(() => {
      if(preview === true) {
      navigate("/select");
      }
    }, 3000);

    return () => clearTimeout(timer); 
  }, [navigate]); */

  return (
    <div className="result-title">
      <p className="result-title-text">TO START ANALYSIS</p>
      <div className="rotating-square-container-1">
        <p className="cam-text">
          ALLOW A.I. <br /> TO SCAN YOUR FACE
        </p>
        <img className="scanLine1" src={scanLine1} alt="scan line" />
        <img className="icon-img-1" src={camIcon} alt="camera icon image" />
        <div className="rotating-square-4">
          <div className="rotating-square-5">
            <div className="rotating-square-6"></div>
          </div>
        </div>
      </div>
      <div className="allow-AI-box">
        <h2 className="allow-AI-title">ALLOW A.I. TO ACCESS YOUR CAMERA</h2>
        <hr />
        <div className="button-AI-container">
          <button id="button-AI-deny">DENY</button>
          <button id="button-AI-allow" onClick={goToCamera}>
            ALLOW
          </button>
        </div>
      </div>
      <div className="rotating-square-container-2">
        <div className="preview-container">
          <h1 className="preview-title">Preview</h1>
          <div className="preview-box"></div>
        </div>
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
    </div>
  );
}

export default Result;
