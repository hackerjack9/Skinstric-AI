import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Testing() {

  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate("/");
  };

  const [phase, setPhase] = useState(1); // start at phase 1
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] =useState(false);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();

      if (phase === 1) {
        setPhase(2); // move to phase two
        setInputValue(""); // clear input
      } else if (phase === 2) {
      // Show loading skeleton for 3s before phase 3
        setLoading(true);
        setTimeout(() => {
          setLoading(false);
          setPhase(3); // finally show thank you
        }, 3000);
      }
    }
  };

  return (
    <div className="testing-title">
      <p className="testing-title-text">TO START ANALYSIS</p>
      <div className="rotating-square-1">
        <div className="rotating-square-2">
          <div className="rotating-square-3"></div>
        </div>
      </div>

      <div className="testing-container">
        {phase === 1 && (
          <input
            className="form-input-1"
            type="text"
            placeholder="Introduce Yourself"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        )}

        {phase === 2 && (
          <input
            className="form-input-2"
            type="text"
            placeholder="Your current city"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        )}

       
        {loading && (
          <div className="skeleton-loader">
            <div className="skeleton-input">Processing Submisson!</div>
          <div className="loading-dots">
          <span className="dot"></span>
           <span className="dot"></span>
            <span className="dot"></span>
  </div>
          </div>
        )}

        {phase === 3 && !loading && (
          <p>Thank you! <br /><br />Proceed to the next step.</p>
        )}
  
      <button 
      id="button-back" 
      onClick={handleNavigate}
      >
        <span className="button-back-text">BACK</span>
        <div className="minibox-back">
          <span className="minibox-arrow-back">▶</span>
        </div>
      </button>
       {/* Proceed Button (only shows after all phases are done) */}
      {phase === 3 && !loading && (
      <button
       id="button-proceed"
       onClick={() => alert("Proceeding to the next page...")}
         >
        <span className="button-proceed-text">PROCEED</span>
        <div className="minibox-proceed">
          <span className="minibox-arrow-proceed">▶</span>
        </div>
      </button>
      )} </div>
      </div>
    );
}

export default Testing;
