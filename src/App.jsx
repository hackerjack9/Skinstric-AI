
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Nav from "./Components/Nav.jsx";
import Home from "./Components/Home.jsx";
import Intro from "./Components/Intro.jsx";



function App() {
  return (
    <Router>
      <Nav />
      <Routes>
       <Route path="/" element={<Home />} />
       <Route path="/intro" element={<Intro />} />
    </Routes>
    </Router>
  );
}

export default App;
