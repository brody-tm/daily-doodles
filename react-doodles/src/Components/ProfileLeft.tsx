import Pallet from "../Components/profilePallet";
import EditProfilePopup from "./EditProfile";

import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

type Profile = {//alter to fit with database
  profile_name: string;
  profile_image: string;
  bio: string;
  likes: number;
  follows: number;
};

function LeftSide() {
  const navigate = useNavigate(); //TEMP
  const [loginPopupVisible, setEditPopupVisible] = useState(false);
  const [profile, setProfile] = useState<Profile[]>([]);
  
  useEffect(() => { 
    GetProfileData();
  }, []);

  const GetProfileData = async () => {
    // attempt to send the request
    try {
      const res = await fetch("http://localhost:8800/api/profile/get-profile", {
        method: "GET"
      });

      console.log(res);
      // check response
      if (!res.ok) {
        throw new Error(`HTTP error on login: ${res.status}`);
      }
      const resData = await res.json();
      setProfile(resData);
    } catch (err) {
      console.error("Error sending login request:", err);
    }
  };
  
  //Login handlers for opening and closing the window
  const openEditPopup = () => {
    setEditPopupVisible(true);
  };

  const closeEditPopup = () => {
    setEditPopupVisible(false);
    GetProfileData();
  };


  var name = "John Doe";
  var description = "Just here to have a good time";
  return (
    <>
    {profile.map((profile) => (
      <>
      <div className="column" id="column1">
        <ul className="leftgroup">
          <li className="list-group-item spaced" id="name">{profile.profile_name}</li>
          <li className="list-group-item spaced" id="description">{profile.bio}</li>
          <li className="list-group-item spaced">
            <Pallet></Pallet>
          </li>
          <li className="list-group-item spaced">
            <button className="profilebutton" onClick={openEditPopup}>Edit Profile</button>
            </li>
            <li className="list-group-item spaced">
              <button onClick={handleLogout} className="profilebutton">Sign Out</button>
            </li>
          </ul>
        </div>
      </>
      ))}
    
    {loginPopupVisible && (
       <EditProfilePopup onClose={closeEditPopup}  />
      )}
    </>
  );
}



const handleLogout = async () => {
  try {
    const res = await fetch("http://localhost:8800/api/auth/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    // check response
    if (!res.ok) {
      throw new Error(`HTTP error on logout: ${res.status}`);
    }

    // get response data
    const resData = await res.json();
    // TODO do we need to do anything here?
    console.log("Logout response from server:", resData);
  } catch (err) {
    console.error("Error sending login request:", err);
  }
};

export default LeftSide;
