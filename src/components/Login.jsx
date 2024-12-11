import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";
import { logIn, resetError } from "../redux/usersSlice";

const Login = ({ setToken }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.users);

  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    dispatch(resetError());
  }, [dispatch]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(logIn(userData)).then((response) => {
      if (!response?.error) {
        setToken(response?.payload);
        setUserData({
          email: "",
          password: "",
        });
        navigate("/homepage");
      } else {
        console.error("Login failed:", response.error.message);
      }
    });
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={userData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={userData.password}
          onChange={handleChange}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "LOG IN"}
        </button>
        {error && <p className="error">{error.msg || "Login failed."}</p>}
        <Link to="/register" className="link">
          Don't have an account? Sign up!
        </Link>
      </form>
    </div>
  );
};

export default Login;
