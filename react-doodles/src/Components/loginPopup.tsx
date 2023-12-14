import { useState, useContext } from "react";
import { UserContext } from "../context/userContext";
import "../Styles/loginPopup.css";

interface LoginPopupProps {
  onClose: () => void; // Define the type for onClose
  onLogin: () => void; // Define the type for onLogin
}

function LoginPopup({ onClose, onLogin }: LoginPopupProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const { login } = useContext(UserContext);

  const handleLogin = async () => {
    setError(null);
    const loginStatus = await login(username, password);

    // user not found
    if (loginStatus === 404) {
      setError("User not found");
    }
    // incorrect username or password
    else if (loginStatus === 400) {
      setError("Incorrect username or password");
    }
    // unknown error
    else if (loginStatus === -1) {
      setError("Unkown error");
    } else {
      // succesful login; navigate user to the home page
      onLogin();
      onClose();
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
        {/* Display error message if there is an error */}
        {error && (
          <div className="alert" role="alert">
            {error}
          </div>
        )}
        {/* Login button */}
        <button onClick={handleLogin}>Login</button>
        <a href="" className="forgot_password">
          forgot your password?
        </a>
      </div>
    </div>
  );
}

export default LoginPopup;
