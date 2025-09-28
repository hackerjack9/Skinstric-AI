import React from 'react';
import { useNavigate } from 'react-router-dom';

 function Intro() {

const navigate = useNavigate();
  const handleNavigate = () => {
    navigate("/");
  }

  return (
    <div className="intro-title"> 
    <p className='intro-title-text'>TO START ANALYSIS</p>
    <div className='rotating-square-1'>
        <div className='rotating-square-2'>
            <div className='rotating-square-3'></div>
        </div>
    </div>



    <div className="intro-container">
        <p className='intro-container-text'>CLICK TO TYPE</p>
        <form className='form-1'>
            <div className='form-underline'></div>
            <input className='form-input' type="text" placeholder='Introduce Yourself' name='name' autoComplete='off' />
        <button type='Submit'>Submit</button>
        </form>
    </div>




    <button id='button-back'>
        <span className="button-back-text" onClick={handleNavigate}>BACK</span>
          <div className="minibox-back">
            <span className="minibox-arrow-back">▶</span>
          </div>
    </button>
</div>
  )
}
export default Intro;