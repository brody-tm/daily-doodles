import Heading from "../Components/Heading";
import Posts from "../Components/Posts";
import styled from "styled-components";
import "../Styles/Explorer.css";

//styles for conatiner 
const AppContainer = styled.div`  
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;
// the page to be exported
function ExplorerPage() {
  return (
    <>
      <AppContainer>
        <Heading text="Explore"></Heading>
        <Posts />
      </AppContainer>
    </>
  );
}

export default ExplorerPage;
