//import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./Components/Navbar.tsx";
import Drawing from "./Pages/Drawing.tsx";
import Profile from "./Pages/Profile.tsx";
import Explorer from "./Pages/Explore.tsx";
import LeaderboardApp from "./Pages/Leaderboard.tsx";
import LoginPage from "./Pages/Login.tsx";
import { AuthContext } from "./context/authContext.tsx";
import { useContext } from "react";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/app/*" element={<AuthenticatedApp />} />
      </Routes>
    </BrowserRouter>
  );
}

function AuthenticatedApp() {
  const { isAuthed } = useContext(AuthContext);

  // user is not logged in
  if (!isAuthed) {
    // TODO remove this message
    console.log("Tried to access a protected route without logging in");
    return <Navigate to="/" replace />;
  }

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="Drawing" element={<Drawing />} />
        <Route path="Profile" element={<Profile />} />
        <Route path="Explore" element={<Explorer />} />
        <Route path="Leaderboard" element={<LeaderboardApp />} />
      </Routes>
    </>
  );
}

export default App;
