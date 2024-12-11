import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../redux/usersSlice";
import { Link, useNavigate } from "react-router";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error, success } = useSelector((state) => state.users);

  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [validationErrors, setValidationErrors] = useState({
    username: "",
    email: "",
    password: "",
  });
  
  const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
  const passwordRegex = /^.{6,}$/;
  const usernameRegex = /^.{5,}$/;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    setValidationErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let isValid = true;
    let validationErrors = {};

    if (!usernameRegex.test(userData.username)) {
      isValid = false;
      validationErrors.username =
        "Username must be at least 5 characters long.";
    }

    if (!emailRegex.test(userData.email)) {
      isValid = false;
      validationErrors.email = "Please enter a valid email address.";
    }

    if (!passwordRegex.test(userData.password)) {
      isValid = false;
      validationErrors.password =
        "Password must be at least 6 characters long.";
    }

    setValidationErrors(validationErrors);
    if (isValid) {
      dispatch(register(userData)).then((response) => {
        if (!response.error) {
          setTimeout(() => {
            navigate("/");
          }, 3000);
        } else {
          console.error("Registration failed:", response.error.message);
        }
      });
    }
  
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={userData.username}
          onChange={handleChange}
          required
        />
        {validationErrors.username && (
          <p className="error">{validationErrors.username}</p>
        )}

        <input
          type="text"
          name="email"
          placeholder="Email"
          value={userData.email}
          onChange={handleChange}
          required
        />
        {validationErrors.email && (
          <p className="error">{validationErrors.email}</p>
        )}

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={userData.password}
          onChange={handleChange}
          required
        />
        {validationErrors.password && (
          <p className="error">{validationErrors.password}</p>
        )}

        <button type="submit" disabled={loading}>
          {loading ? "Signing up..." : "SIGN UP"}
        </button>
        {error && <p className="error">{error.msg || "Sign up failed."}</p>}
        {success && <p className="success">{success}</p>}
        <Link to="/">Already have an account? Log in!</Link>
      </form>
    </div>
  );
};

export default Register;
