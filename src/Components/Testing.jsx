import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Testing() {
  const navigate = useNavigate();
  const [phase, setPhase] = useState(1);
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);
  const [apiMessage, setApiMessage] = useState(null);
  const inputRef = useRef(null);

  const API_URL =
    "https://us-central1-frontend-simplified.cloudfunctions.net/skinstricPhaseOne";

  const isValidText = (value) => /^[A-Za-z\s]+$/.test(value.trim());

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [phase]);

  const handleSubmitPhaseOne = async () => {
    const trimmedName = name.trim();
    const trimmedLocation = location.trim();

    if (!isValidText(trimmedName)) {
      alert("Please enter a valid name.");
      return;
    }
    if (!isValidText(trimmedLocation)) {
      alert("Please enter a valid city.");
      return;
    }

    localStorage.setItem("userName", trimmedName);
    localStorage.setItem("userLocation", trimmedLocation);

    setLoading(true);

    try {
      const response = await axios.post(
        API_URL,
        { name: trimmedName, location: trimmedLocation },
        { headers: { "Content-Type": "application/json" } }
      );

      // Save structured response
      const data = response.data;
      localStorage.setItem("phaseOneResponse", JSON.stringify(data));

      // Example: { SUCCESS: "Added John Doe from New York" }
      if (data.SUCCESS) {
        setApiMessage(data.SUCCESS);
      }
    } catch (error) {
      alert("There was an error hitting the API. Please try again.");
    } finally {
      setTimeout(() => {
        setLoading(false);
        setPhase(3);
      }, 3000);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key !== "Enter") return;

    if (phase === 1) {
      if (!isValidText(name)) {
        alert("Please enter a valid name.");
        return;
      }
      localStorage.setItem("userName", name.trim());
      setPhase(2);
    } else if (phase === 2) {
      handleSubmitPhaseOne();
    }
  };

  return (
    <div className="testing-container">
      <p className="testing-top-text">TO START ANALYSIS</p>
      <div className="rotating-square-wrap">
        <div className="rotating-square-1">
          <div className="rotating-square-2">
            <div className="rotating-square-3"></div>
          </div>
        </div>
      </div>
      {phase === 1 && (
        <input
          ref={inputRef}
          className="form-input-1"
          type="text"
          placeholder="Introduce Yourself"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      )}

      {phase === 2 && !loading && (
        <input
          ref={inputRef}
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
          <span className="testing-thanks-title">
            {apiMessage ? apiMessage : "Thank you!"}
          </span>
          <br />
          <br />
          <span className="testing-thanks-subtitle">
            Proceed to the next step
          </span>
        </p>
      )}

      <button id="button-back-1" onClick={() => navigate("/")}>
        <span className="button-back-text">BACK</span>
        <div className="minibox-back-1">
          <span className="minibox-arrow-back-1">▶</span>
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
  );
}

export default Testing;
