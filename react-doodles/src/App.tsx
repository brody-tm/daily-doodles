//import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar.tsx";
import Drawing from "./Pages/Drawing.tsx";
import Profile from "./Pages/Profile.tsx";
import Explorer from "./Pages/Explore.tsx";
import LeaderboardApp from "./Pages/Leaderboard.tsx";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Drawing />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path="/Explore" element={<Explorer />} />
          <Route path="/Leaderboard" element={<LeaderboardApp />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
