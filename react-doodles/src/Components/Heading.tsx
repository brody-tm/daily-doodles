import React from "react";
import styled from "styled-components";

const HeadingContainer = styled.div`
  background-color: #dcad31;
  width: 75%;
  margin: 15px auto;
  text-align: center;
  font-size: 36px;
  font-weight: bold;
  color: white;
  border: 2px solid #222;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  font-family: 'Comic Sans MS', cursive;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
`;


interface HeadingProps {
  text: string;
}

const Heading: React.FC<HeadingProps> = ({ text }) => {
  return <HeadingContainer>{text}</HeadingContainer>;
};
export default Heading;
