import React, { useState } from "react";
import "../Styles/loginPopup.css";

interface LoginPopupProps {
  onClose: () => void; // Define the type for onClose
  onLogin: () => void; // Define the type for onLogin
}

function LoginPopup({ onClose, onLogin }: LoginPopupProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // login logic here and call onLogin when successful.
    console.log("Username: ", username);
    console.log("Password: ", password);

    onLogin();
    onClose();
  };

  return (
    <div className="login-popup">
      <div className="login-popup-content">
        <span className="close-button" onClick={onClose}>
          &times;
        </span>
        <h2>Login</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin}>Login</button>
        <a href="" className="forgot_password">
          forgot your password?
        </a>
      </div>
    </div>
  );
}

export default LoginPopup;
