//import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar.tsx";
import Drawing from "./Pages/Drawing.tsx";
import Profile from "./Pages/Profile.tsx";
import Explorer from "./Pages/Explore.tsx";
import LeaderboardApp from "./Pages/Leaderboard.tsx";
import LoginPage from "./Pages/Login.tsx";

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
