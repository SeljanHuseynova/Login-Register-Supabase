import React from "react";
import { Link } from "react-router";

const NotFoundPage = () => {
  return (
    <div className="not-found">
      <h1>404</h1>
      <p>Oops, This Page Not Found!</p>
      <span>The link migth be corrupted,</span>
      <span>or the page may have been removed</span>
      <Link to="/" className="go-back">Go back Home</Link>
    </div>
  );
};

export default NotFoundPage;
