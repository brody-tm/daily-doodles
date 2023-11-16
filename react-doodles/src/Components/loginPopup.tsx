import React, { useState } from "react";
import "../Styles/loginPopup.css";

interface LoginPopupProps {
  onClose: () => void; // Define the type for onClose
  onLogin: () => void; // Define the type for onLogin
}

function LoginPopup({ onClose, onLogin }: LoginPopupProps) {
  // TODO probably make this a json object rather than a couple of strings
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // might want to make the requests using this instead
  // const [loginData, updateLoginData] = useState({
  //   email: "",
  //   password: "",
  // });

  const handleLogin = async () => {
    // login logic here and call onLogin when successful.
    // console.log("Username: ", username);
    // console.log("Password: ", password);

    // attempt to send the request
    try {
      // might be better to make a function for this?
      const res = await fetch("http://localhost:8800/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: `{"email": "${username}", "password": "${password}"}`,
      });

      // check response
      if (!res.ok) {
        throw new Error(`HTTP error on login: ${res.status}`);
      }

      // get response data (including the cookie)
      const resData = await res.json();
      // TODO make this do something with the cookie instead
      console.log("Login response from server:", resData);

      onLogin();
      onClose();
    } catch (err) {
      console.error("Error sending login request:", err);
    }
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
