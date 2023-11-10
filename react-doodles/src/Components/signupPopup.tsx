import React, { useState } from "react";
import "../Styles/loginPopup.css";

interface SignUpPopupProps {
  onClose: () => void; // Define the type for onClose
  onSignUp: () => void; // Define the type for onLogin
}

function SignUpPopup({ onClose, onSignUp }: SignUpPopupProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = () => {
    // login logic here and call onLogin when successful.
    console.log("Username: ", username);
    console.log("Password: ", password);

    // Close the login popup
    onClose();
  };

  return (
    <div className="login-popup">
      <div className="login-popup-content">
        <span className="close-button" onClick={onClose}>
          &times;
        </span>
        <h2>Sign-up</h2>
        <input
          type="text"
          placeholder="Email"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Re-enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleSignUp}>Sign-Up</button>
      </div>
    </div>
  );
}

export default SignUpPopup;
