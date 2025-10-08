import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Testing() {
  const navigate = useNavigate();
  const [phase, setPhase] = useState(1);
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);

  const API_URL =
    "https://us-central1-frontend-simplified.cloudfunctions.net/skinstricPhaseOne";

  const isValidText = (value) => /^[A-Za-z\s]+$/.test(value.trim());

  const handleKeyDown = async (e) => {
    if (e.key !== "Enter") return;

    if (phase === 1) {
      if (!isValidText(name)) return alert("Please enter a valid name.");
      localStorage.setItem("userName", name.trim());
      setPhase(2);
    } 
    
    else if (phase === 2) {
      if (!isValidText(location)) return alert("Please enter a valid city.");
      localStorage.setItem("userLocation", location.trim());

      setLoading(true);
      try {
        const { data } = await axios.post(API_URL, {
          name: name.trim(),
          location: location.trim(),
        });
        localStorage.setItem("phaseOneResponse", JSON.stringify(data));
      } catch (err) {
        console.error("API Error:", err);
        alert("Failed to submit. Please try again.");
      } finally {
        setTimeout(() => {
          setLoading(false);
          setPhase(3);
        }, 3000);
      }
    }
  };

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
            <span className="testing-thanks-subtitle">Proceed to the next step</span>
          </p>
        )}

        <button id="button-back" onClick={() => navigate("/")}>
          <span className="button-back-text">BACK</span>
          <div className="minibox-back">
            <span className="minibox-arrow-back">▶</span>
          </div>
        </button>

        {phase === 3 && !loading && (
          <button id="button-proceed" onClick={() => navigate("/result")}>
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
