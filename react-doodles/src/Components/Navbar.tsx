import React from "react";

import { Link } from "react-router-dom";
import "../Styles/navbar.css";
import Logo from "../Logo.png";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import ExploreIcon from "@mui/icons-material/Explore";
import BrushIcon from "@mui/icons-material/Brush";

const Navbar: React.FC = () => {
  return (
    <nav className="container">
      <img src={Logo} alt="Logo" className="logo" />

      <Link to="Drawing" className="NavButton">
        <BrushIcon />
      </Link>

      <Link to="Explore" className="NavButton">
        <ExploreIcon />
      </Link>

      <Link to="Profile" className="NavButton">
        <AccountBoxIcon />
      </Link>

      <Link to="Leaderboard" className="NavButton">
        <EmojiEventsIcon />
      </Link>
    </nav>
  );
};

export default Navbar;
