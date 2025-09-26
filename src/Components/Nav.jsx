import React from "react";

function Nav () {
    return ( 
  <div className="nav-bar">
    <div className="nav-wrap">
    <h1 className="nav-link"><a href="link">SKINSTRIC</a></h1>
   <img className="nav-bracket-left"  src="https://skinstric-wandag.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FRectangle%202711.b2b3b291.png&w=16&q=75" alt="" />
    <p className="nav-text">INTRO</p>
   <img className="nav-bracket-right" src="https://skinstric-wandag.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FRectangle%202711.b2b3b291.png&w=16&q=75" alt="" />
    </div>
     <button className="nav-button">ENTER CODE</button>
  </div>
    )
}
export default Nav;