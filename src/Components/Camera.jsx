import React from 'react';
import cameraIconLens from "../assets/Shapes/camera-icon-lens.webp";

function Camera() {
  return (
    <div className='camera-body'>Camera
    <div className='camera-container'>
      <div className='video-scontainer'>
        <video autoplay playsInline src="" className='video'></video>
        <div className='take-picture-container'>
          <div className='take-picture-text'>TAKE PICTURE</div>
       <div className='camera-icon-container'>
        <img className='camera-icon-lens' src={cameraIconLens} alt="camera icon" />
       </div>
        </div>
      </div>
    </div>
    </div>
  )
}

export default Camera;