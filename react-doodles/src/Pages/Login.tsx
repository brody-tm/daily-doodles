import React from "react";

import { Link } from "react-router-dom";
import "../Styles/Login.css";

function LoginPage() {
  return (
    <div className="page">
      <button className="button" type="button">
        login
      </button>
      <Link to="app/Drawing" className="guest">
        {"continue as guest"}
      </Link>
      <button className="button" type="button">
        sign-up
      </button>
    </div>
  );
}

export default LoginPage;
