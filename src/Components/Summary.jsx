import React, { useEffect, useState } from "react";
import bulletPoint from "../assets/Shapes/radio-button.svg";
import { useNavigate } from "react-router-dom";

function Summary({ apiData: propsApiData }) {
  const navigate = useNavigate();
  const [apiData, setApiData] = useState(null);
 const [activeCategory, setActiveCategory] = useState("race"); // ← KEY
 
  // Load data from props or localStorage
  useEffect(() => {
    if (propsApiData) {
      setApiData(propsApiData);
      localStorage.setItem("summaryData", JSON.stringify(propsApiData));
    } else {
      const stored = localStorage.getItem("summaryData");
      if (stored) {
        setApiData(JSON.parse(stored));
      }
    }
  }, [propsApiData]);

  const handleNavigate = () => navigate("/");
  const goToSelect = () => navigate("/select");

  if (!apiData) {
    return (
      <div className="body">
        <main className="main">
          <h2 className="analysis-title">A.I. ANALYSIS</h2>
          <p>Loading data...</p>
        </main>
      </div>
    );
  }

  const { race, age, gender } = apiData.data;
  // Pick the top race, age, gender for display
  const topRace = Object.entries(race).sort((a, b) => b[1] - a[1])[0];
  const topAge = Object.entries(age).sort((a, b) => b[1] - a[1])[0];
  const topGender = Object.entries(gender).sort((a, b) => b[1] - a[1])[0];

  const formatPercent = (num) => `${Math.round(num * 100)}%`;

  return (
    <div className="body">
      <main className="main">
        <div className="title-container">
          <h2 className="analysis-title">A.I. ANALYSIS</h2>
          <h3 className="demographics-title">DEMOGRAPHICS</h3>
          <h4 className="predicted-title">PREDICTED RACE & AGE</h4>
        </div>

        <div className="summary-boxes-container">
          {/* SECTION 1: Top Categories */}
          <section id="section-1">
            <div className="category-box-1">
              <p>{topRace[0]}</p>
              <h4 className="category-title">RACE</h4>
            </div>
            <div className="category-box-2">
              <p>{topAge[0]}</p>
              <h4 className="category-title">AGE</h4>
            </div>
            <div className="category-box-3">
              <p>{topGender[0].toUpperCase()}</p>
              <h4 className="category-title">SEX</h4>
            </div>
          </section>

          {/* SECTION 2: Top Race Confidence Circle */}
          <section id="section-2">
            <div className="section-2-box">
              <p className="section-2-title">{topRace[0]}</p>
              <div className="percentage-circle">
                <p className="circle-number">
                  {Math.round(topRace[1] * 100)}
                  <span className="circle-percentage-sign">%</span>
                </p>
              </div>
            </div>
          </section>

          {/* SECTION 3: Race Breakdown */}
          <section id="section-3">
            <div className="category-class">
              <h4 className="section-3-title">RACE</h4>
              <h4 className="section-3-title">A.I. CONFIDENCE</h4>
            </div>

            {Object.entries(race).map(([raceName, val], i) => (
              <div
                key={raceName}
                className={`category-selector-${i + 1}`}
              >
                <div className="alignment">
                  <img src={bulletPoint} alt="" />
                  <span>{raceName}</span>
                </div>
                <span>{formatPercent(val)}</span>
              </div>
            ))}
          </section>
        </div>

        <div className="sticky-bottom">
          <button id="button-back" onClick={goToSelect}>
            <span className="button-back-text">BACK</span>
            <div className="minibox-back">
              <span className="minibox-arrow-back">▶</span>
            </div>
          </button>

          <button id="button-home" onClick={handleNavigate}>
            <span className="button-home-text">HOME</span>
            <div className="minibox-home">
              <span className="minibox-arrow-home">▶</span>
            </div>
          </button>
        </div>

        <p className="bottom-AI-title">
          If A.I. estimate is wrong, select the correct one.
        </p>
      </main>
    </div>
  );
}

export default Summary;
