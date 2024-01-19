import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import NavBar from "./components/Navbar";
import Register from "./components/Register";
import Newquiz from "./components/Newquiz";
import Joinquiz from "./components/Joinquiz";
import DashboardTeacher from "./components/DashboardTeacher";
import DeshboardStudent from "./components/DeshboardStudent";
import Sonequiz from "./components/sonequiz";
import Tonequiz from "./components/tonequiz";

function App() {
  const [isAuth, setIsAuth] = useState(false);
  const role = localStorage.getItem("role");
  const token = localStorage.getItem("token");
  const [sonequiz, setsonequiz] = useState([]);
  const [tonequiz, settonequiz] = useState([]);

  return (
    <div className="App">
      {isAuth ? (
        <>
          {role === "1" ? (
            <>
              <Router>
                <NavBar isAuth={isAuth} setIsAuth={setIsAuth} role={role} />
                <Routes>
                  <Route
                    exact
                    path="*"
                    element={
                      <DashboardTeacher
                        isAuth={isAuth}
                        setIsAuth={setIsAuth}
                        settonequiz={settonequiz}
                      />
                    }
                  ></Route>
                  <Route
                    exact
                    path="/newquiz"
                    element={<Newquiz setIsAuth={setIsAuth} />}
                  ></Route>
                  <Route
                    exact
                    path="/tonequiz"
                    element={
                      <Tonequiz
                        isAuth={isAuth}
                        setIsAuth={setIsAuth}
                        tonequiz={tonequiz}
                      />
                    }
                  ></Route>
                </Routes>
              </Router>
            </>
          ) : (
            <Router>
              <NavBar isAuth={isAuth} setIsAuth={setIsAuth} role={role} />
              <Routes>
                <Route
                  exact
                  path="*"
                  element={
                    <DeshboardStudent
                      isAuth={isAuth}
                      setIsAuth={setIsAuth}
                      setsonequiz={setsonequiz}
                    />
                  }
                ></Route>
                <Route
                  exact
                  path="/joinquiz"
                  element={<Joinquiz setIsAuth={setIsAuth} />}
                ></Route>
                <Route
                  exact
                  path="/sonequiz"
                  element={
                    <Sonequiz
                      isAuth={isAuth}
                      setIsAuth={setIsAuth}
                      sonequiz={sonequiz}
                    />
                  }
                ></Route>
              </Routes>
            </Router>
          )}
        </>
      ) : (
        <>
          <Router>
            <NavBar isAuth={isAuth} setIsAuth={setIsAuth} role={role} />
            {token && <Register setIsAuth={setIsAuth} />}
            <Routes>
              <Route
                exact
                path="*"
                element={<Home setIsAuth={setIsAuth} />}
              ></Route>
              <Route
                exact
                path="/register"
                element={<Register setIsAuth={setIsAuth} />}
              ></Route>
            </Routes>
          </Router>
        </>
      )}
    </div>
  );
}

export default App;
