import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const NavbarContainer = styled.div`
  background-color: rgb(182, 179, 175);
  border-bottom: solid black;
  display: flex;
  padding: 5px;
  margin: 0;
`;

const ButtonContainer = styled.div`
  padding-left: 40px;
  margin: 3px;
`;

const NavButton = styled.div`
  width: 70px;
  height: 70px;
  font-size: 50px;
  border-radius: 5px;
  align-self: center;
  text-decoration: none;
  color: black;
  transition: box-shadow 0.2s, transform 0.2s;
  background-color: white; /* Button background color */
  border: 2px solid black; /* Add a border to the button */
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    box-shadow: 0 4px #898c8d;
    cursor: grab;
    transform: translateY(1px);
  }
`;

const Navbar: React.FC = () => {
  return (
    <NavbarContainer>
      <ButtonContainer>
        <Link to="/"className="drawingbutton">🖍</Link> 
      </ButtonContainer>
      <ButtonContainer>
        <Link to="/explorer"className="explorerbutton">🔍</Link>
      </ButtonContainer>
      <ButtonContainer>
        <Link to="/profile" className="profilebutton">👤</Link>
      </ButtonContainer>
      <ButtonContainer>
        <Link to="leaderboard"className="leaderboardbutton">🏆</Link>
      </ButtonContainer>
    </NavbarContainer>
  );
};

export default Navbar;
