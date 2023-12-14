import Heading from "../Components/Heading";
import LeftSide from "../Components/ProfileLeft"
import "../Styles/profile.css";
import MyGallery from "../Components/ProfileGallery"

function Profile() {
  return( 
    <div>
    <Heading text="Profile"/>
    <div className ="outside">
    <div className='containerprofile'>
   <LeftSide></LeftSide>
    <MyGallery></MyGallery>
    </div>
  </div>
  </div>
  
  );
}
export default Profile;
