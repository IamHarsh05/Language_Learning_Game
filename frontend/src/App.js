import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./Components/Navbar/navbar";
import Home from "./Pages/Home/home";

function App() {
  return (
    <div className="App">
      <Router>
        <div className="relative flex flex-col overflow-x-hidden">
          <div className="fixed top-0 left-0 right-0 bg-white z-50">
            <Navbar className=" z-50 w-full" />
          </div>
          <div className="pt-16 bg-gray-100">
            <Routes>
              <Route path="/" element={<Home />} />
            </Routes>
          </div>
        </div>
      </Router>
    </div>
  );
}

export default App;
