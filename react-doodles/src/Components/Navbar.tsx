import React from 'react';

import { Link } from 'react-router-dom';
import "./navbar.css";
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import ExploreIcon from '@mui/icons-material/Explore';
import BrushIcon from '@mui/icons-material/Brush';

const Navbar: React.FC = () => {
  return (
     <nav className="container" >
      <img src="Logo.png" alt="" className="logo" />
    
        <Link to="/"className="NavButton"><BrushIcon/></Link> 
     
        <Link to="/explorer"className="NavButton"><ExploreIcon/></Link>
      
        <Link to="/profile" className="NavButton"><AccountBoxIcon/></Link>
     
        <Link to="leaderboard"className="NavButton"><EmojiEventsIcon/></Link>
     
    </nav>
  );
};

export default Navbar;
