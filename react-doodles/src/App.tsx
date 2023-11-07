//import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar.tsx";
import Drawing from "./Pages/Drawing-Page.tsx";
import Profile from "./Pages/Profile.tsx";
import Explorer from "./Pages/Explore-Page.tsx";
import Leaderboard from "./Pages/Leaderboard-Page.tsx";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Drawing />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/contact" element={<Explorer />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
