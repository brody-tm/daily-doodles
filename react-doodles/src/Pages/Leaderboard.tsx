import React, { useState } from "react";
import "../Styles/leaderboard.css";
import styled from "styled-components";
import Heading from "../Components/Heading";
import Post from "../Components/Post";
import DisplayModeButtons from "../Components/DisplayModeButtons";

import samplePic1 from "../images/leaderboardPic1.png";
import samplePic2 from "../images/leaderboardPic2.png";
import samplePic3 from "../images/leaderboardPic2.png";

const AppContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const Podium = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FirstPlace = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  top: -20px; /* Adjust the elevation as needed */
`;

const BronzeBorder: React.CSSProperties = {
  border: "10px solid #cd7f32",
};

function LeaderboardApp() {
  const [displayMode, setDisplayMode] = useState("friends");

  const handleDisplayModeChange = (mode: string) => {
    setDisplayMode(mode);
  };

  return (
    <div>
      <div>
        <Heading text="Leaderboard" />
        <DisplayModeButtons
          displayMode={displayMode}
          onDisplayModeChange={handleDisplayModeChange}
        />
      </div>
      <AppContainer>
        <Podium>
          {displayMode === "friends" && (
            <>
              <Post
                username="User456"
                userProfilePic="../Logo.png"
                imageSrc={samplePic1}
                title="Another Post"
                description="More amazing content!"
                style={{ border: "10px solid silver" }}
              />
              <FirstPlace>
                <Post
                  username="User123"
                  userProfilePic="../Logo.png"
                  imageSrc={samplePic3}
                  title="My Awesome Post"
                  description="Check out my latest creation!"
                  style={{ border: "10px solid gold" }}
                />
              </FirstPlace>
              <Post
                username="User789"
                userProfilePic="../Logo.png"
                imageSrc={samplePic2}
                title="Great Post"
                description="Don't miss it!"
                style={BronzeBorder}
              />
            </>
          )}
          {displayMode === "global" && (
            <>
              <Post
                username="User456"
                userProfilePic="../Logo.png"
                imageSrc={samplePic1}
                title="Another Post"
                description="More amazing content!"
                style={{ border: "10px solid silver" }}
              />
              <FirstPlace>
                <Post
                  username="User123"
                  userProfilePic="../Logo.png"
                  imageSrc={samplePic2}
                  title="My Awesome Post"
                  description="Check out my latest creation!"
                  style={{ border: "10px solid gold" }}
                />
              </FirstPlace>
              <Post
                username="User789"
                userProfilePic="../Logo.png"
                imageSrc={samplePic3}
                title="Great Post"
                description="Don't miss it!"
                style={BronzeBorder}
              />
            </>
          )}
        </Podium>
      </AppContainer>
    </div>
  );
}

export default LeaderboardApp;
