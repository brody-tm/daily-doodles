import React, { useState } from "react";
import '../Styles/leaderboard.css'
import styled from "styled-components";
import Heading from "../Components/Heading";
import Post from "../Components/Post";
import DisplayModeButtons from "../Components/DisplayModeButtons";


const AppContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

function LeaderboardApp() {
  const [displayMode, setDisplayMode] = useState("friends");

  const handleDisplayModeChange = (mode: string) => {
    setDisplayMode(mode);
    // You can add logic to fetch and display posts based on the selected mode
  };

  return (
    <div>
      <div>
        <Heading text="Leaderboard" />
        <DisplayModeButtons
          displayMode={displayMode}
          onDisplayModeChange={handleDisplayModeChange}
        />
        {/* Other content */}
      </div>
      <AppContainer>
        {/* Add Post components based on the displayMode */}
        {displayMode === "friends" && (
          <>
            <Post
              username="User123"
              userProfilePic="Logo.png"
              imageSrc="leaderboardPic1.png"
              title="My Awesome Post"
              description="Check out my latest creation!"
            />
            <Post
              username="User456"
              userProfilePic="Logo.png"
              imageSrc="leaderboardPic2.png"
              title="Another Post"
              description="More amazing content!"
            />
            <Post
              username="User789"
              userProfilePic="Logo.png"
              imageSrc="leaderboardPic3.png"
              title="Great Post"
              description="Don't miss it!"
            />
          </>
        )}
        {/* Add more Post components based on the displayMode */}
        {displayMode === "global" && (
          <>
            <Post
              username="User456"
              userProfilePic="Logo.png"
              imageSrc="leaderboardPic2.png"
              title="Another Post"
              description="More amazing content!"
            />
            <Post
              username="User789"
              userProfilePic="Logo.png"
              imageSrc="leaderboardPic3.png"
              title="Great Post"
              description="Don't miss it!"
            />
            <Post
              username="User123"
              userProfilePic="Logo.png"
              imageSrc="leaderboardPic1.png"
              title="My Awesome Post"
              description="Check out my latest creation!"
            />
            {/* Add more global posts */}
          </>
        )}
      </AppContainer>
    </div>
  );
}

export default LeaderboardApp;
