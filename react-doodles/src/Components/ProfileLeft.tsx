
import EditProfilePopup from "./EditProfile";
import Logo from "../Logo.png";
import { UserContext } from "../context/userContext";

import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

type Profile = {
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
  const {currentUser} = useContext(UserContext);

  useEffect(() => {
    GetProfileData();
  }, []);

  const GetProfileData = async () => {
    // attempt to send the request
    try {
      const res = await fetch(`http://localhost:8800/api/profile/get/${currentUser!.id}`, {
        method: "GET",
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

  const determineIMG = (profile:Profile)=>{
    if(profile.profile_image==null){
      return "../Logo.png";
    }
    return profile.profile_image;
  }

  const handleLogout = async () => {
    try {
      const res = await fetch("http://localhost:8800/api/auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      // check response (this response clears the cookie)
      if (!res.ok) {
        throw new Error(`HTTP error on logout: ${res.status}`);
      }

      // get and print response data
      const resData = await res.json();
      console.log("Logout response from server:", resData);

      localStorage.setItem("user", "null");

      // navigate back to login page
      navigate("/");
    } catch (err) {
      console.error("Error sending logout request:", err);
    }
  };

  return (
    <>
      {profile.map((profile) => (
        <>
          <div className="column" id="column1">
            <ul className="leftgroup">
            <li className="list-group-item spaced" >
                <img id="profilePic" src={determineIMG(profile)}  alt="Profile Picture"/>
              </li>
              <li className="list-group-item spaced" id="name">
                {profile.profile_name}
              </li>
              <li className="list-group-item spaced" id="description">
                {profile.bio}
              </li>
              {/* <li className="list-group-item spaced">
                <Pallet></Pallet>
              </li> */}
              <li className="list-group-item spaced">
                <button className="profilebutton" onClick={openEditPopup}>
                  Edit Profile
                </button>
              </li>
              <li className="list-group-item spaced">
                <button onClick={handleLogout} className="profilebutton">
                  Sign Out
                </button>
              </li>
            </ul>
          </div>
        </>
      ))}

      {loginPopupVisible && <EditProfilePopup onClose={closeEditPopup} />}
    </>
  );
}

export default LeftSide;
