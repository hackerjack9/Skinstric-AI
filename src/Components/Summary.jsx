import React from "react";
import bulletPoint from "../assets/Shapes/bullet-point.webp";
import { useNavigate } from "react-router-dom";

function Summary() {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate("/");
  };
  const goToSelect = () => {
    navigate("/select");
  };

  return (
    <div className="body">
      <main className="main">
        <div className="title-container">
          <h2 className="analysis-title">A.I. ANALYSIS</h2>
          <h3 className="demographics-title">DEMOGRAPHICS</h3>
          <h4 className="predicted-title">PREDICTED RACE & AGE</h4>
        </div>
        <div className="summary-boxes-container">
          <section id="section-1">
            <div className="category-box-1">
              <p>Middle eastern</p>
              <h4 className="category-title">RACE</h4>
            </div>
            <div className="category-box-2">
              <p>0-2</p>
              <h4 className="category-title">AGE</h4>
            </div>
            <div className="category-box-3">
              <p>MALE</p>
              <h4 className="category-title">SEX</h4>
            </div>
          </section>
          <section id="section-2">
            <div className="section-2-box">
              <p className="section-2-title">Middle eastern</p>
              <div className="percentage-circle">
                <p className="circle-number">
                  98<span className="circle-percentage-sign">%</span>
                </p>
              </div>
            </div>
          </section>
          <section id="section-3">
            <div className="category-class">
              <h4 className="section-3-title">RACE</h4>
              <h4 className="section-3-title">A.I. CONFIDENCE</h4>
            </div>
            <div className="category-selector-1">
              <div className="alignment">
                <img src={bulletPoint} alt="" />
                <span>Middle eastern</span>
              </div>
              <span>98%</span>
            </div>
            <div className="category-selector-2">
              <div className="alignment">
                <img src={bulletPoint} alt="" />
                <span>Black</span>
              </div>
              <span>0%</span>
            </div>
            <div className="category-selector-3">
              <div className="alignment">
                <img src={bulletPoint} alt="" />
                <span>White</span>
              </div>
              <span>0%</span>
            </div>
            <div className="category-selector-4">
              <div className="alignment">
                <img src={bulletPoint} alt="" />
                <span>Southeast asian</span>
              </div>
              <span>0%</span>
            </div>
            <div className="category-selector-5">
              <div className="alignment">
                <img src={bulletPoint} alt="" />
                <span>South asian</span>
              </div>
              <span>0%</span>
            </div>
            <div className="category-selector-7">
              <div className="alignment">
                <img src={bulletPoint} alt="" />
                <span>Latino hispanic</span>
              </div>
              <span>0%</span>
            </div>
            <div className="category-selector-8">
              <div className="alignment">
                <img src={bulletPoint} alt="" />
                <span>East Asian</span>
              </div>
              <span>0%</span>
            </div>
          </section>
        </div>
        <div className="sticky-bottom">
          <button id="button-back" onClick={goToSelect}>
            <span className="button-back-text">BACK</span>
            <div className="minibox-back">
              <span className="minibox-arrow-back">▶</span>
            </div>
          </button>

          <button id="button-proceed" onClick={handleNavigate}>
            <span className="button-proceed-text">HOME</span>
            <div className="minibox-proceed">
              <span className="minibox-arrow-proceed">▶</span>
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
