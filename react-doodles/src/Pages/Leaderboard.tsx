import React, { useState } from "react";
import "../Styles/leaderboard.css";
import styled from "styled-components";
import Heading from "../Components/Heading";
import TopPosts from "../Components/TopPosts";

const AppContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const Podium = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  &:nth-child(1) {
    border-color: #cd7f32; /* Bronze color */
  }

  &:nth-child(2) {
    border-color: #c0c0c0; /* Silver color */
  }

  &:nth-child(3) {
    border-color: #ffd700; /* Gold color */
  }
`;

const BronzeBorder: React.CSSProperties = {
  border: "10px solid #cd7f32",
};

function LeaderboardApp() {
  return (
    <div>
      <div>
        <Heading text="Leaderboard" />
      </div>
      <AppContainer>
        <Podium>
          <TopPosts></TopPosts>
        </Podium>
      </AppContainer>
    </div>
  );
}

export default LeaderboardApp;
