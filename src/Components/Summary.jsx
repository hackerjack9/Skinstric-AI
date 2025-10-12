import React, { useEffect, useState } from "react";
import bulletPoint from "../assets/Shapes/radio-button.svg";
import { useNavigate } from "react-router-dom";

function Summary({ apiData: propsApiData }) {
  const navigate = useNavigate();
  const [apiData, setApiData] = useState(null);

  // Which main category is selected: "race" | "age" | "gender"
  const [selectedCategory, setSelectedCategory] = useState("race");

  // Manual overrides
  const [manualRaceSelection, setManualRaceSelection] = useState(null);
  const [manualAgeSelection, setManualAgeSelection] = useState(null);
  const [manualGenderSelection, setManualGenderSelection] = useState(null);

  // Load data from props or localStorage
  useEffect(() => {
    if (propsApiData) {
      setApiData(propsApiData);
      localStorage.setItem("summaryData", JSON.stringify(propsApiData));
    } else {
      const stored = localStorage.getItem("phaseTwoResponse");
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          setApiData(parsed);
        } catch (e) {
          console.error("Error parsing stored data:", e);
        }
      }
    }
  }, [propsApiData]);

  if (!apiData || !apiData.data) {
    return (
      <div className="body">
        <main className="main">
          <h2 className="analysis-title">A.I. ANALYSIS</h2>
          <p>No data found in localStorage.</p>
        </main>
      </div>
    );
  }

  const { race, age, gender } = apiData.data || {};
  if (!race || !age || !gender) {
    return (
      <div className="body">
        <main className="main">
          <h2 className="analysis-title">A.I. ANALYSIS</h2>
          <p>Incomplete demographic data. Please try again.</p>
        </main>
      </div>
    );
  }

  const topRace = Object.entries(race).sort((a, b) => b[1] - a[1])[0];
  const topAge = Object.entries(age).sort((a, b) => b[1] - a[1])[0];
  const topGender = Object.entries(gender).sort((a, b) => b[1] - a[1])[0];

  const formatPercent = (num) => `${Math.round(num * 100)}%`;

  // Helper to get currently displayed top value
  const getCurrentTop = () => {
    if (selectedCategory === "race") {
      return manualRaceSelection
        ? [manualRaceSelection, race[manualRaceSelection] || 0]
        : topRace;
    } else if (selectedCategory === "age") {
      return manualAgeSelection
        ? [manualAgeSelection, age[manualAgeSelection] || 0]
        : topAge;
    } else if (selectedCategory === "gender") {
      return manualGenderSelection
        ? [manualGenderSelection, gender[manualGenderSelection] || 0]
        : topGender;
    }
    return topRace;
  };

  const currentTop = getCurrentTop();

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  // Manual overrides
  const handleRaceSubcategoryClick = (raceName) => {
    setManualRaceSelection(raceName);
    setSelectedCategory("race");
  };

  const handleAgeSubcategoryClick = (ageGroup) => {
    setManualAgeSelection(ageGroup);
    setSelectedCategory("age");
  };

  const handleGenderSubcategoryClick = (genderName) => {
    setManualGenderSelection(genderName);
    setSelectedCategory("gender");
  };

  const handleNavigate = () => navigate("/");
  const goToSelect = () => navigate("/select");

  // Determine which set of subcategories to display
  const subcategories =
    selectedCategory === "race"
      ? race
      : selectedCategory === "age"
      ? age
      : gender;

  return (
    <div className="body">
      <main className="main">
        <div className="title-container">
          <h2 className="analysis-title">A.I. ANALYSIS</h2>
          <h3 className="demographics-title">DEMOGRAPHICS</h3>
          <h4 className="predicted-title">PREDICTED RACE & AGE</h4>
          <h5 className="AI-estimate-title">
            {" "}
            If A.I. estimate is wrong, select the correct one.
          </h5>
        </div>

        <div className="summary-boxes-container">
          {/* SECTION 1 */}
          <section id="section-1">
            <div
              className={`category-box-1 ${
                selectedCategory === "race" ? "active" : ""
              }`}
              onClick={() => handleCategoryClick("race")}
            >
              <p>{manualRaceSelection || topRace[0]}</p>
              <h4 className="category-title">RACE</h4>
            </div>

            <div
              className={`category-box-2 ${
                selectedCategory === "age" ? "active" : ""
              }`}
              onClick={() => handleCategoryClick("age")}
            >
              <p>{manualAgeSelection || topAge[0]}</p>
              <h4 className="category-title">AGE</h4>
            </div>

            <div
              className={`category-box-3 ${
                selectedCategory === "gender" ? "active" : ""
              }`}
              onClick={() => handleCategoryClick("gender")}
            >
              <p>{(manualGenderSelection || topGender[0]).toUpperCase()}</p>
              <h4 className="category-title">SEX</h4>
            </div>
          </section>

          {/* SECTION 2 */}
          <section id="section-2">
            <div className="section-2-box">
              <p className="section-2-title">{currentTop[0]}</p>
              <div className="percentage-circle">
                <svg
                  className="progress-ring"
                  width="386"
                  height="386"
                  viewBox="0 0 386 386"
                >
                  <circle
                    className="progress-ring-background"
                    stroke="#E5E5E5"
                    fill="transparent"
                    strokeWidth="20"
                    r="173"
                    cx="193"
                    cy="193"
                  />
                  <circle
                    className="progress-ring-progress"
                    stroke="black"
                    fill="transparent"
                    strokeWidth="20"
                    r="173"
                    cx="193"
                    cy="193"
                    style={{
                      strokeDasharray: `${2 * Math.PI * 173}`,
                      strokeDashoffset: 2 * Math.PI * 173 * (1 - currentTop[1]),
                      transition: "stroke-dashoffset 1s ease-in-out",
                    }}
                  />
                </svg>
                <p className="circle-number">
                  {Math.round(currentTop[1] * 100)}
                  <span className="circle-percentage-sign">%</span>
                </p>
              </div>
            </div>
          </section>

          {/* SECTION 3 */}
          <section id="section-3">
            <div className="category-class">
              <h4 className="section-3-title">
                {selectedCategory === "age"
                  ? "AGE"
                  : selectedCategory === "gender"
                  ? "SEX"
                  : "RACE"}
              </h4>
              <h4 className="section-3-title">A.I. CONFIDENCE</h4>
            </div>

            {Object.entries(subcategories).map(([name, val], i) => {
              const isActive =
                (selectedCategory === "race" && manualRaceSelection === name) ||
                (selectedCategory === "age" && manualAgeSelection === name) ||
                (selectedCategory === "gender" &&
                  manualGenderSelection === name);

              const clickHandler =
                selectedCategory === "race"
                  ? () => handleRaceSubcategoryClick(name)
                  : selectedCategory === "age"
                  ? () => handleAgeSubcategoryClick(name)
                  : () => handleGenderSubcategoryClick(name);

              return (
                <div
                  key={name}
                  className={`category-selector-${i + 1} ${
                    isActive ? "active" : ""
                  }`}
                  onClick={clickHandler}
                  style={{ cursor: "pointer" }}
                >
                  <div className="alignment">
                    <img src={bulletPoint} alt="" />
                    <span>{name}</span>
                  </div>
                  <span>{formatPercent(val)}</span>
                </div>
              );
            })}
          </section>
        </div>
        <div className="sticky-bottom">
          <button id="button-back-2" onClick={goToSelect}>
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
      </main>
    </div>
  );
}

export default Summary;
