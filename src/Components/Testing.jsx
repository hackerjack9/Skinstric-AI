import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Testing() {
  const navigate = useNavigate();

  // State
  const [phase, setPhase] = useState(1);
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);

  const API_URL =
    "https://us-central1-frontend-simplified.cloudfunctions.net/skinstricPhaseOne";


  // Simple text validation
  const isValidText = (value) => {
    const regex = /^[A-Za-z\s]+$/;
    return regex.test(value) && value.trim() !== "";
  };

  const handleKeyDown = async (e) => {
    if (e.key === "Enter") {
      e.preventDefault();

      // Phase 1: collect name
      if (phase === 1) {
        if (!isValidText(name)) {
          alert("Please enter a valid name (letters only).");
          return;
        }
        localStorage.setItem("userName", name.trim());
        setPhase(2);
      }

      // Phase 2: collect location & submit
      else if (phase === 2) {
        if (!isValidText(location)) {
          alert("Please enter a valid city (letters only).");
          return;
        }

        // Save to local storage
        localStorage.setItem("userLocation", location.trim());

        setLoading(true);
        try {
          const response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              name: name.trim(),
              location: location.trim(),
            }),
          });

          const data = await response.json();
          console.log("API response:", data);
        } catch (error) {
          console.error("API Error:", error);
          alert("Failed to submit. Please try again.");
        } finally {
          // Keep the skeleton loader visible for 3 seconds
          setTimeout(() => {
            setLoading(false);
            setPhase(3);
          }, 3000);
        }
      }
    }
  };

  const handleNavigate = () => navigate("/");
  const goToResult = () => navigate("/result");

  return (
    <div className="testing-title">
      <p className="testing-top-text">TO START ANALYSIS</p>

      <div className="rotating-square-1">
        <div className="rotating-square-2">
          <div className="rotating-square-3"></div>
        </div>
      </div>

      <div className="testing-container">
        <p className="testing-container-title">CLICK TO TYPE</p>

        {phase === 1 && (
          <input
            className="form-input-1"
            type="text"
            placeholder="Introduce Yourself"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        )}

        {phase === 2 && (
          <input
            className="form-input-2"
            type="text"
            placeholder="your city name"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        )}

        {loading && (
          <div className="skeleton-loader">
            <div className="skeleton-input">Processing Submission!</div>
            <div className="loading-dots">
              <span className="dot"></span>
              <span className="dot"></span>
              <span className="dot"></span>
            </div>
          </div>
        )}

        {phase === 3 && !loading && (
          <p className="testing-thanks-text">
            <span className="testing-thanks-title">Thank you!</span><br /><br />
            <span className="testing-thanks-subtitle">
              Proceed to the next step
            </span>
          </p>
        )}

        <button id="button-back" onClick={handleNavigate}>
          <span className="button-back-text">BACK</span>
          <div className="minibox-back">
            <span className="minibox-arrow-back">▶</span>
          </div>
        </button>

        {phase === 3 && !loading && (
          <button id="button-proceed" onClick={goToResult}>
            <span className="button-proceed-text">PROCEED</span>
            <div className="minibox-proceed">
              <span className="minibox-arrow-proceed">▶</span>
            </div>
          </button>
        )}
      </div>
    </div>
  );
}

export default Testing;