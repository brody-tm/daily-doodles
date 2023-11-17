import React, { useState } from "react";
import "../Styles/loginPopup.css";

interface SignUpPopupProps {
  onClose: () => void; // Define the type for onClose
  onSignUp: () => void; // Define the type for onSignUp
}

function SignUpPopup({ onClose, onSignUp }: SignUpPopupProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [reentry, setReEntry] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSignUp = () => {
    // login logic here and call onSignUp when successful.
    console.log("Username: ", username);
    console.log("Password: ", password);
    console.log("Re-enter Password", reentry);

    if (password === reentry) {
      onClose();
      onSignUp();
    } else {
      setError("Passwords do not match, please re-enter");
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setError(null); // Clear the error when typing in the password field
  };

  const handleReEntryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setReEntry(e.target.value);
    setError(null); // Clear the error when typing in the reentry field
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
          onChange={handlePasswordChange}
        />
        <input
          type="password"
          placeholder="Re-enter Password"
          value={reentry}
          onChange={handleReEntryChange}
        />
        {error && (
          <div className="alert" role="alert">
            {error}
          </div>
        )}
        <button onClick={handleSignUp}>Sign-Up</button>
      </div>
    </div>
  );
}

export default SignUpPopup;
