import React from 'react';
import Canvas from '../Components/Canvas';
import Heading from '../Components/Heading';

const DrawingApp: React.FC = () => {
  return (
    <div>
      <Heading text="Doodle"></Heading>
      <Canvas width={800} height={600} />
    </div>
  );
};

export default DrawingApp;
