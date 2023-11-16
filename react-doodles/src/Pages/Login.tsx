import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../Styles/Login.css";
import Title from "../title.png";
import LoginPopup from "../Components/loginPopup";
import SignUpPopup from "../Components/signupPopup";

function LoginPage() {
  const navigate = useNavigate(); //TEMP
  const [loginPopupVisible, setLoginPopupVisible] = useState(false);
  const [signUpPopupVisible, setSignUpPopupVisible] = useState(false);

  //Sign up handlers for opening and closing the window
  const openSignUpPopup = () => {
    setSignUpPopupVisible(true);
  };

  const closeSignUpPopup = () => {
    setSignUpPopupVisible(false);
  };

  //Login handlers for opening and closing the window
  const openLoginPopup = () => {
    setLoginPopupVisible(true);
  };

  const closeLoginPopup = () => {
    setLoginPopupVisible(false);
  };

  const handleLogin = () => {
    // login logic here
    closeLoginPopup();
    navigate("app/Drawing"); //TEMP
  };

  const handleSignUp = () => {
    // signup logic here
    closeSignUpPopup();
    navigate("app/Drawing"); //TEMP
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
        <button className="button" type="button" onClick={openSignUpPopup}>
          Sign-up
        </button>
      </div>
      {loginPopupVisible && (
        <LoginPopup onClose={closeLoginPopup} onLogin={handleLogin} />
      )}
      {signUpPopupVisible && (
        <SignUpPopup onClose={closeSignUpPopup} onSignUp={handleSignUp} />
      )}
    </>
  );
}

export default LoginPage;
