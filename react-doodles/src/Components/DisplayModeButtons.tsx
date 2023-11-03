import React from 'react';
import styled from 'styled-components';

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 10px auto; /* Center the buttons horizontally */
  width: 80%; /* Take up 80% of the available width */
`;

const Button = styled.button`
  background-color: rgb(255, 74, 0);
  color: white;
  font-size: 16px;
  padding: 8px 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

interface DisplayModeButtonsProps {
  displayMode: string;
  onDisplayModeChange: (mode: string) => void;
}

const DisplayModeButtons: React.FC<DisplayModeButtonsProps> = ({
  displayMode,
  onDisplayModeChange,
}) => {
  return (
   <>
   <ButtonContainer>
      <Button
        onClick={() => onDisplayModeChange('friends')}
        style={{ backgroundColor: displayMode === 'friends' ? 'gray' : '' }}
      >
        Friends
      </Button>
      <Button
        onClick={() => onDisplayModeChange('global')}
        style={{ backgroundColor: displayMode === 'global' ? 'gray' : '' }}
      >
        Global
      </Button>
    </ButtonContainer>
    </>
  );
};

export default DisplayModeButtons;
