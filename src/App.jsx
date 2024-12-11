import { Route, Routes, Navigate } from "react-router";
import Login from "./components/Login";
import { useEffect, useState } from "react";
import HomePage from "./components/HomePage";
import Register from "./components/Register";
import NotFoundPage from "./components/NotFoundPage";

function App() {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = sessionStorage.getItem("token");
    if (storedToken) {
      setToken(JSON.parse(storedToken));
    }
  }, []);

  useEffect(() => {
    if (token) {
      sessionStorage.setItem("token", JSON.stringify(token));
    }
  }, [token]);

  return (
    <div className="main-container">
      <Routes>
        <Route
          path="/"
          element={
            token ? <Navigate to="/homePage" /> : <Login setToken={setToken} />
          }
        />
        <Route
          path="/homePage"
          element={
            token ? <HomePage setToken={setToken} token = {token}/> : <Navigate to="/" />
          }
        />
        <Route path="/register" element={<Register />} />
        <Route path='*' element={<NotFoundPage />}/>
      </Routes>
    </div>
  );
}

export default App;
