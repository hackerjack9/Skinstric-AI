import React from "react";
import { useNavigate } from "react-router-dom";

function Intro() {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate("/");

    const inputs = document.querySelectorAll(".form-input");

    inputs.forEach((input, index) => {
      input.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
          // Check if the Enter key is pressed
          event.preventDefault(); // Prevent the default form submission

          // Focus the next input if it exists
          const nextInput = inputs[index + 1];
          if (nextInput) {
            nextInput.focus();
          } else {
            // If no next input, optionally submit the form
            document.getElementById("myForm").submit();
          }
        }
      });
    });
  };

  return (
    <div className="intro-title">
      <p className="intro-title-text">TO START ANALYSIS</p>
      <div className="rotating-square-1">
        <div className="rotating-square-2">
          <div className="rotating-square-3"></div>
        </div>
      </div>

      <div className="intro-container">
        <p className="intro-container-text">CLICK TO TYPE</p>
        <form className="form-1">
          <input
            className="form-input"
            type="text"
            placeholder="Introduce Yourself"
            name="name"
            autoComplete="off"
          />
          <input
            className="form-input"
            type="text"
            placeholder="your city name"
            name="name"
            autoComplete="off"
          />
          <button id="button-submit" type="Submit">
            Submit
          </button>
        </form>
      </div>

      <button id="button-back">
        <span className="button-back-text" onClick={handleNavigate}>
          BACK
        </span>
        <div className="minibox-back">
          <span className="minibox-arrow-back">▶</span>
        </div>
      </button>
    </div>
  );
}
export default Intro;
