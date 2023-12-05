import "../Styles/loginPopup.css";
import { useState, useEffect } from "react";


interface EditPopupProps {
    onClose: () => void; // Define the type for onClose
    
}

function EditProfilePopup({ onClose}: EditPopupProps) {
    const [profileName, setName] = useState("");
    const [profileBio, setBio] = useState("");

    const SetProfileData = async () => {
        // attempt to send the request
        try {
          const res = await fetch("http://localhost:8800/api/profile/change-profile", {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            //TODO Alter ID LATER
            body: `{"id": 0, "profile_name": "${profileName}", "bio": "${profileBio}"}`,

          });
    
          console.log(res);
          // check response
          if (!res.ok) {
            throw new Error(`HTTP error on login: ${res.status}`);
          }
          
          onClose();
        } catch (err) {
          console.error("Error sending login request:", err);
        }
      };


  return (
    <div className="login-popup">
      <div className="login-popup-content">
        <span className="close-button" onClick={onClose}>
          &times;
        </span>
        <h2>Edit Profile</h2>
        <input
          type="text"
          placeholder="Edit Profile Name"
          value={profileName}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Edit Bio"
          value={profileBio}
          onChange={(e) => setBio(e.target.value)}
        />
        <button onClick={SetProfileData}>Done</button> 
        {/* You need to create a method to check if fileds have data to change. */}
      </div>
    </div>
  );
}

export default EditProfilePopup;