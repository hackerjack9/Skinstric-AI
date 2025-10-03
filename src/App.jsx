import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Nav from "./Components/Nav.jsx";
import Home from "./Components/Home.jsx";
import Testing from "./Components/Testing.jsx";
import Result from "./Components/Result.jsx";
import Camera from "./Components/Camera.jsx";
import Capture from "./Components/Capture.jsx";
import Select from "./Components/Select.jsx";
import Summary from "./Components/Summary.jsx";


function App() {
  return (
    <Router>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/testing" element={<Testing />} />
        <Route path="/result" element={<Result />} />
        <Route path="/camera" element={<Camera />} />
        <Route path="/camera/capture" element={<Capture />} />
        <Route path="/select" element={<Select />} />
        <Route path="/summary" element={<Summary />} />

      </Routes>
    </Router>
  );
}

export default App;
