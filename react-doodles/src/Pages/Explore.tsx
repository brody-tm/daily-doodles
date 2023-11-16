import { Container } from '@mui/material';
import DisplayModeButtons from '../Components/DisplayModeButtons';
import Heading from '../Components/Heading';
import React, { useState } from 'react';
import Post from '../Components/Post';
import styled from 'styled-components';
import samplePic1 from "../leaderboardPic1.png";
import samplePic2 from "../leaderboardPic2.png";
import samplePic3 from "../leaderboardPic2.png";
import "../Styles/Explorer.css";


const AppContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

function ExplorerPage(){
    const [displayMode, setDisplayMode] = useState("friends");

  const handleDisplayModeChange = (mode: string) => {
    setDisplayMode(mode);
    // You can add logic to fetch and display posts based on the selected mode
  };
    

    return(
    <>
            <div>
        <Heading text='Explore'></Heading>
         
         <AppContainer>
        <DisplayModeButtons
          displayMode={displayMode}
          onDisplayModeChange={handleDisplayModeChange}
        />
        {/* Other content */}

     
        {/* Add Post components based on the displayMode */}
        {displayMode === "friends" && (
          <>
            <Post
              username="User123"
              userProfilePic="../Logo.png"
              imageSrc={samplePic1}
              title="My Awesome Post"
              description="Check out my latest creation!"
            />
            <Post
              username="User456"
              userProfilePic="../Logo.png"
              imageSrc={samplePic2}
              title="Another Post"
              description="More amazing content!"
            />
            <Post
              username="User789"
              userProfilePic="../Logo.png"
              imageSrc={samplePic3}
              title="Great Post"
              description="My amazing art"
            />
           
          </>
        )}
        {/* Add more Post components based on the displayMode */}
        {displayMode === "global" && (
          <>
            <Post
              username="User456"
              userProfilePic="../Logo.png"
              imageSrc={samplePic3}
              title="Another Post"
              description="My masterpiece"
            />
            <Post
              username="User789"
              userProfilePic="../Logo.png"
              imageSrc={samplePic2}
              title="Great Post"
              description="Harry potter"
            />
            <Post
              username="User123"
              userProfilePic="../Logo.png"
              imageSrc={samplePic1}
              title="My Awesome Post"
              description="Just a silly little guy"
            />
            {/* Add more global posts */}
         </>
        )}
      
      </AppContainer>
      </div>  </>
  );
}

export default ExplorerPage;