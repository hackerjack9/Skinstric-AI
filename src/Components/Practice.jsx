function Practice() {
  const [showAllowCamera, setShowAllowCamera] = useState(false);


useEffect(() => {
    const data = window.localStorage.getItem('SKINSTRIC-AI-APP');
    if ( data !=null ) setShowAllowCamera(JSON.parse(data))
  }, [])

  useEffect(() => {
    window.localStorage.setItem('SKINSTRIC-AI-APP', JSON.stringify(showAllowCamera))
  }, [showAllowCamera])

 return (
 {showAllowCamera && (
   <div> 
   <div className="rotating-square-container-1"> 
   <div className="allow-AI-box"> 
   <h2 className="allow-AI-title"> ALLOW A.I. TO ACCESS YOUR CAMERA</h2> 
   <hr /> 
   <div className="button-AI-container"> 
   <button id="button-AI-deny">DENY</button> 
   <button id="button-AI-allow" onClick={goToCamera}>ALLOW</button>
   </div>
    </div>
     </div> 
    )}
    <img onClick={setShowAllowCamera(true)} className="icon-img-1" src={camIcon} alt="camera icon image" />
     </div>
    )
}

export default Practice;










