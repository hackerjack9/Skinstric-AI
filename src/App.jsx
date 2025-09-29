
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Nav from "./Components/Nav.jsx";
import Home from "./Components/Home.jsx";
import Testing from "./Components/Testing.jsx";
import Result from "./Components/Result.jsx";


function App() {
  return (
    <Router>
      <Nav />
      <Routes>
       <Route path="/" element={<Home />} />
       <Route path="/testing" element={<Testing />} />
       <Route path="/result" element={<Result />} />
    </Routes>
    </Router>
  );
}

export default App;
