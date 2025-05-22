import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import CaroApp from "./gameCaro/CaroApp";
import Project2 from "./project2/project2";

function App() {
  return (
    <Router>
      <div style={{ padding: "20px" }}>
        <button>
          <Link to="/gamecaro">Game Caro</Link>
        </button>
        <button>
          <Link to="/project2">Project 2</Link>
        </button>

        <Routes>
          <Route path="/gamecaro" element={<CaroApp />} />
          <Route path="/project2" element={<Project2 />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
