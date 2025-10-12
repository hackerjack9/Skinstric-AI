import React from "react";
import { useNavigate } from "react-router-dom";

function Select() {
  const navigate = useNavigate();

  const goToResult = () => {
    navigate("/result");
  };
  const goToSummary = () => {
    navigate("/summary");
  };

  return (
    <div className="body">
      <div className="select-container">
        <div className="analysis-title-box">
          <h1 className="analysis-title">A.I. ANALYSIS</h1>
          <p className="analysis-subtitle">
            A.I. HAS ESTIMATED THE FOLLLOWING.
            <br />
            FIX ESTIMATED INFORMATION IF NEEDED.
          </p>
        </div>
        <div className="select-grid-container">
          <div className="select-grid-subcontainer">
            <div className="large-box-border">
              <div className="large-box">
                <button className="box-1">
                  <span className="textbox-1">SKIN TYPE DETAILS</span>
                </button>
                <button className="box-2">
                  <span className="textbox-2">WEATHER</span>
                </button>
                <button className="box-3" onClick={goToSummary}>
                  <span className="textbox-3">DEMOGRAPHICS</span>
                </button>
                <button className="box-4">
                  <span className="textbox-4">
                    COSMETIC
                    <br />
                    CONCERNS
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
        <button id="button-back" onClick={goToResult}>
          <span className="button-back-text">BACK</span>
          <div className="minibox-back">
            <span className="minibox-arrow-back">▶</span>
          </div>
        </button>
        <button id="button-summary" onClick={goToSummary}>
          <span className="button-summary-text">GET SUMMARY</span>
          <div className="minibox-summary">
            <span className="minibox-arrow-summary">▶</span>
          </div>
        </button>
      </div>
    </div>
  );
}

export default Select;
