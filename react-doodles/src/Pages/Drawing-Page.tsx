import React from 'react';
import Canvas from '../Components/Canvas';
//import Navbar from '../Components/Navbar'; // Assuming you have a Navbar component
import Heading from '../Components/Heading';
import styled from 'styled-components';

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
`;

const CanvasContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10px;
`;

const DrawingApp: React.FC = () => {
  return (
    <AppContainer>
      <Heading text="Doodle" />
      <CanvasContainer>
        <Canvas width={800} height={600} />
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '10px' }}>
          {/* Drawing tools here */}
          {/* Add your color picker, line width slider, undo, and clear buttons */}
        </div>
      </CanvasContainer>
    </AppContainer>
  );
};

export default DrawingApp;
