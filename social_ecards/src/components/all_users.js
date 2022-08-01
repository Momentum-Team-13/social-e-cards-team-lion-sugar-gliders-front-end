import axios from "axios";
import { baseURL } from "../helpers/constants";
import { useState } from "react";

export default function AllUsers({ token, username }) {
  const [userData, setUserData] = useState([]);
  const [userID, setUserID] = useState("");
  axios
    .get(`${baseURL}users/`, {
      headers: { Authorization: `Token ${token}` },
    })
    .then((res) => {
      const users = res.data;
      setUserData(users);
    }, []);

  const handleSeeUser = (props) => {
    let intPK = props;
    console.log(intPK);
    setUserID(intPK);
  };

  return (
    <div>
      <h1>See All Users</h1>
      {userData.map((user) => (
        <div className="username" key={user.username}>
          <strong>Username: </strong>
          <div
            key={user.id}
            id={user.id}
            onClick={(e) => handleSeeUser(e.target.id)}
          >
            {" "}
            {user.username}
          </div>{" "}
        </div>
      ))}
    </div>
  );
}
