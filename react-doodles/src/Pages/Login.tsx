import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../Styles/Login.css";
import Title from "../title.png";
import LoginPopup from "../Components/loginPopup";

function LoginPage() {
  const [loginPopupVisible, setLoginPopupVisible] = useState(false);

  const openLoginPopup = () => {
    setLoginPopupVisible(true);
  };

  const closeLoginPopup = () => {
    setLoginPopupVisible(false);
  };

  return (
    <>
      <div className="page">
        <img src={Title} alt="title" className="title" />
        <button className="button" type="button" onClick={openLoginPopup}>
          Login
        </button>
        <Link to="app/Drawing" className="guest">
          {"Continue as guest"}
        </Link>
        <button className="button" type="button">
          Sign-up
        </button>
      </div>
      {loginPopupVisible && (
        <LoginPopup onClose={closeLoginPopup} onLogin={closeLoginPopup} />
      )}
    </>
  );
}

export default LoginPage;
