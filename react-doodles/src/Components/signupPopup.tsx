/**
 * @file signupPopup.tsx
 * @description Popup page that opens when signup is pressed, sends user email and password to backend
 */
import React, { useState, useContext } from "react";
import "../Styles/loginPopup.css";
import { UserContext } from "../context/userContext";

/**
 * Props interface for SignUpPopup component.
 */
interface SignUpPopupProps {
  /**
   * Callback function invoked when the popup is closed
   */
  onClose: () => void;
  /**
   * Callback function invoked when the user signs up
   */
  onSignUp: () => void;
}

/**
 * Functional component for the SignUpPopup.
 *
 * @param onClose - function defining the behavior of the popup when closed
 * @param onSignUp - function defining the behavior of the popup when the signup button is clicked
 *
 * @returns A new rendered signup popup window component
 */
function SignUpPopup({ onClose, onSignUp }: SignUpPopupProps) {
  // State hooks for managing form inputs and errors
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [reentry, setReEntry] = useState("");
  const [error, setError] = useState<string | null>(null);
  const { login } = useContext(UserContext);

  /**
   * Handles the sign-up process.
   * Validates passwords, makes a server request, and triggers callbacks on success.
   *
   * @returns A promise that resolves when the sign-up process is complete
   */
  const handleSignUp = async () => {
    setError(null);
    if (password === reentry) {
      try {
        // Make a POST request to the server for user registration
        const res = await fetch("http://localhost:8800/api/auth/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: `{"email": "${username}", "password": "${password}"}`,
          credentials: "include",
        });

        // Check if the response is successful
        if (!res.ok) {
          const errorMessage = await res.json();
          console.error("Server error response:", errorMessage);

          // Use setError() to handle errors
          setError(errorMessage.error || "Unknown error");
          return;
        }

        // Parse response data
        const resData = await res.json();
        console.log("Register response from server:", resData);

        // trigger onSignup()
        onSignUp();
        // log the new user in
        try {
          await login(username, password);
        } catch (err: any) {
          console.log(err.response.data);
        }
        // close the sign in popup
        onClose();
      } catch (err: any) {
        console.error("Error sending register request:", err);
        setError(err.message);
      }
    } else {
      setError("Passwords do not match, please re-enter");
    }
  };
  /**
   * Handles changes in the email input field.
   *
   * @param e - the change event
   */
  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
    setError(null); // Clear the error when typing in the password field
  };
  /**
   * Handles changes in the password input field.
  /**
   * Handles changes in the password input field
   *
   * @param e - the change event
   */
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setError(null); // Clear the error when typing in the password field
  };

  /**
   * Handles changes in the re-entry password input field
   *
   * @param - the change event
   */
  const handleReEntryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setReEntry(e.target.value);
    setError(null); // Clear the error when typing in the reentry field
  };

  // Render the component
  return (
    <div className="login-popup">
      <div className="login-popup-content">
        <span className="close-button" onClick={onClose}>
          &times;
        </span>
        <h2>Sign-up</h2>
        {/* Input fields for username, password, and re-entry password */}
        <input
          type="text"
          placeholder="Email"
          value={username}
          onChange={handleUsernameChange}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={handlePasswordChange}
        />
        <input
          type="password"
          placeholder="Re-enter Password"
          value={reentry}
          onChange={handleReEntryChange}
        />
        <div className="password_requirements">
          <p>Your password should include all of the following:</p>
          <ul className="list">
            <li>Contain 1 (One) capital letter</li>
            <li>Contain 1 (One) number</li>
            <li>Contain 1 (One) special character (!@#$%&)</li>
          </ul>
        </div>
        {/* Display error message if there is an error */}
        {error && (
          <div className="alert" role="alert">
            {error}
          </div>
        )}
        {/* Sign-up button */}
        <button onClick={handleSignUp}>Sign-Up</button>
      </div>
    </div>
  );
}

export default SignUpPopup;
