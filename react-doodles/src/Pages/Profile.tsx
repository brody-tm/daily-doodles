import Heading from "../Components/Heading";
import LeftSide from "../Components/ProfileLeft"
import "../Styles/profile.css";
import MyGallary from "../Components/profileGallary"
import Awards from "../Components/profileAwards"
function Profile() {
  return( 
    <div>
    <Heading text="Profile"/>
    <div className ="outside">
    <div className='containerprofile'>
   <LeftSide></LeftSide>
    <MyGallary></MyGallary>
    <Awards></Awards>
    </div>
  </div>
  </div>
  
  );
}
export default Profile;
