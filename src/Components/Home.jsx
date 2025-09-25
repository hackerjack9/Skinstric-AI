import React from 'react';
import LeftTriangle from "../assets/Shapes/Rectangle 2779.png"
import LeftArrowIcon from "../assets/Shapes/button-icon-text-shrunk (1).svg"
import RightArrowIcon from "../assets/Shapes/button-icon-text-shrunk (2).svg"
import RightTriangle from "../assets/Shapes/Rectangle 2778.svg"
function Home() {

  return (
    <div className='main-heading'>
    <h1 className='header-title'>Sophisticated
  <br />
       <span className='header-subtitle'>skincare</span>
    </h1>
  

<div id='left-section'>
   <div className='left-rectangle'>
       <div className='left-triangle'><img src={LeftTriangle} alt="" />
        <button className='discover-button'>
          <div className='mini-box'></div>
          <span className='discover-arrow'><img src={LeftArrowIcon} alt="" /></span>
      </button>
        </div>
      </div>
      <div id='right-section'>
        <div className='right-rectangle'>
          <div className='right-triangle'><img src={RightTriangle} alt="" /></div>
          <button className='test-button'>
          <div className='mini-box'></div>
          <span className='test-arrow'><img src={RightArrowIcon} alt="" /></span>
       </button>
        </div>
      </div>
       </div>
       </div>

       
       
  )
}


export default Home;