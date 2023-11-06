import React from 'react';
import styled from 'styled-components';

const HeadingContainer = styled.div`
  background-color: rgb(255, 74, 0);
  width: 75%;
  margin: 15px auto;
  text-align: center;
  font-size: 36px;
  color: white;
  border: 2px solid #222;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

const SubheadingContainer = styled.div`
  background-color: lightgray;
  width: 200px;
  margin: 15px auto; /* Center the subheading horizontally */
  text-align: center;
  font-size: 24px;
  color: white; /* Text color, adjust as needed */
  border: 2px solid #222; /* Add a border */
  border-radius: 12px; /* Rounded corners */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Add a shadow */
`;


interface HeadingProps {
  text: string;
}
interface SubheadingProps {
  text: string;
}

const Heading: React.FC<HeadingProps> = ({ text }) => {
  return <HeadingContainer>{text}</HeadingContainer>;
};
const Subheading: React.FC<SubheadingProps> = ({ text }) => {
  return <SubheadingContainer>{text}</SubheadingContainer>;
};
export default Heading;
