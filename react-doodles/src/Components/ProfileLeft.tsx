import Pallet from "../Components/profilePallet";

function LeftSide() {
  var name = "John Doe";
  var description = "Just here to have a good time";
  return (
    <div className="column" id="column1">
      <ul className="leftgroup">
        <li className="list-group-item spaced" id="name">{name}</li>
        <li className="list-group-item spaced" id="description">"{description}"</li>
        <li className="list-group-item spaced">
          <Pallet></Pallet>
        </li>
        <li className="list-group-item spaced">
          <button className="profilebutton">Edit Profile</button>
        </li>
        <li className="list-group-item spaced">
          <button onClick={handleLogout} className="profilebutton">Sign Out</button>
        </li>
      </ul>
    </div>
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
