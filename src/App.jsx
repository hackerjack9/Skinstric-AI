
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Nav from "./Components/Nav.jsx";
import Home from "./Components/Home.jsx";
import Color from "./Components/Color.jsx";


function App() {
  return (
    <Router>
      <Nav />
      <Routes>
       <Route path="/" element={<Home />} />
       <Route path="/color" element={<Color />} />
    </Routes>
    </Router>
  );
}

export default App;
