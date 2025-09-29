
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Nav from "./Components/Nav.jsx";
import Home from "./Components/Home.jsx";
import Testing from "./Components/Testing.jsx";


function App() {
  return (
    <Router>
      <Nav />
      <Routes>
       <Route path="/" element={<Home />} />
       <Route path="/testing" element={<Testing />} />
    </Routes>
    </Router>
  );
}

export default App;
