/**
 * @file Login.tsx
 * @description Login page, where users are initially routed to sign in or create account
 */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/Login.css";
import Title from "../title.png";
import LoginPopup from "../Components/loginPopup";
import SignUpPopup from "../Components/SignupPopup";

/**
 * Functional component representing the login page.
 *
 * @returns The rendered login page component
 */
function LoginPage() {
  const navigate = useNavigate(); // TEMP
  const [loginPopupVisible, setLoginPopupVisible] = useState(false);
  const [signUpPopupVisible, setSignUpPopupVisible] = useState(false);

  /**
   * Opens the sign-up popup.
   */
  const openSignUpPopup = () => {
    setSignUpPopupVisible(true);
  };

  /**
   * Closes the sign-up popup.
   */
  const closeSignUpPopup = () => {
    setSignUpPopupVisible(false);
  };

  /**
   * Opens the login popup.
   */
  const openLoginPopup = () => {
    setLoginPopupVisible(true);
  };

  /**
   * Closes the login popup.
   */
  const closeLoginPopup = () => {
    setLoginPopupVisible(false);
  };

  /**
   * Handles the login action.
   */
  const handleLogin = () => {
    // login logic here
    closeLoginPopup();
    navigate("app/Drawing"); // TEMP
  };

  /**
   * Handles the sign-up action.
   */
  const handleSignUp = () => {
    // signup logic here
    closeSignUpPopup();
    navigate("app/Drawing"); // TEMP
  };

  return (
    <>
      <div className="page">
        <img src={Title} alt="title" className="title" />
        <button className="button" type="button" onClick={openLoginPopup}>
          Login
        </button>
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

// Export the LoginPage component as the default export of this module
export default LoginPage;
