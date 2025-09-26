import React from 'react';
import LeftTriangle from "../assets/Shapes/Rectangle 2779.png"
import RightTriangle from "../assets/Shapes/Rectangle 2778.svg"

function Home() {

  return (
    <div className='body'>
    <div className='button-container'>
      <button className='button-left'>
        <span>DISCOVER A.I.</span>
<div className='minibox-left'><span className='minibox-arrow-left'>▶</span></div>
      </button>
      <button className='button-right'>
        <span>TAKE TEST</span>
<div className='minibox-right'><span className='minibox-arrow-right'>▶</span></div>
      </button>
    </div>
    <div className='triangle-container'>
      <div className='triangle-left'><img src={LeftTriangle} alt="" /></div>
      <div className='triangle-right'><img src={RightTriangle} alt="" /></div>
    </div>
    </div>
  

       
       
  )
}


export default Home;