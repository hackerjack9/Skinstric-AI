
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Nav from "./Components/Nav.jsx";
import Home from "./Components/Home.jsx";


function App() {
  return (
    <Router>
      <Routes>
       <Route path="/" element={<Home />} />
       <Route path="/" element={<Nav />} />
    </Routes>
    </Router>
  );
}

export default App;
