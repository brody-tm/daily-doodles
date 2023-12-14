/**
 * @file Navbar.tsx
 *
 * @description Navbar to move from different pages of the site, styled component
 */

import React from "react";
import { Link } from "react-router-dom";
import "../Styles/navbar.css";
import Logo from "../Logo.png";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import ExploreIcon from "@mui/icons-material/Explore";
import BrushIcon from "@mui/icons-material/Brush";

/**
 * Navbar component for navigation
 *
 * @returns The rendered Navbar component
 */
const Navbar: React.FC = () => {
  return (
    <nav className="Navcontainer">
      {/* Application Logo */}
      <img src={Logo} alt="Logo" className="logo" />

      {/* Link to Drawing page */}
      <Link to="Drawing" className="NavButton">
        <BrushIcon />
      </Link>

      {/* Link to Explore page */}
      <Link to="Explore" className="NavButton">
        <ExploreIcon />
      </Link>

      {/* Link to Profile page */}
      <Link to="Profile" className="NavButton">
        <AccountBoxIcon />
      </Link>

      {/* Link to Leaderboard page */}
      <Link to="Leaderboard" className="NavButton">
        <EmojiEventsIcon />
      </Link>
    </nav>
  );
};

export default Navbar;
