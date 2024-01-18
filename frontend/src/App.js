import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Navbar from "./Components/Navbar/navbar";
import Home from "./Pages/Home/home";
import Exam from "./Pages/Exam/exam";
import { useSelector } from "react-redux";

function App() {
  
  const tab = useSelector((state) => state.tab.tab);
  console.log(tab)

  return (
    <div className="App">
      <Router>
        <div className="relative flex flex-col overflow-hidden">
          <div className="fixed top-0 left-0 right-0 bg-white z-50">
            <Navbar className=" z-50 w-full" />
          </div>
          <div className="pt-16 bg-gray-100 h-scrren">
            <Link to={`/`}>
              <button>Go Back</button>
            </Link>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path={tab !== null ? `/${tab}` : '/'} element={tab !== null ? <Exam /> : <Home />} />
            </Routes>
          </div>
        </div>
      </Router>
    </div>
  );
}

export default App;
