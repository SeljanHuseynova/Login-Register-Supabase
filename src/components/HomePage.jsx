import React from "react";
import { useNavigate } from "react-router";
const HomePage = ({ setToken,token }) => {
  console.log(token)
  const navigate = useNavigate();
  const handleLogOut = () => {
    sessionStorage.clear("token");
    setToken(null);
    navigate("/");
  };
  return (
    <div className="home-container">
      <div className="home-content">
        <h1>Welcome {token?.user?.email} </h1>
        <button className="logout-button" onClick={handleLogOut}>
          Log Out
        </button>
      </div>
    </div>
  );
};

export default HomePage;
