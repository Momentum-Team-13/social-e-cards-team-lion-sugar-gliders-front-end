import axios from "axios";
import { baseURL } from "../helpers/constants";
import { useState, useEffect } from "react";

export default function AllUsers({ token, username }) {
  const [userData, setUserData] = useState([]);
  const [userID, setUserID] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [userFollowingData, setUserFollowingData] = useState([]);
  axios
    .get(`${baseURL}users/`, {
      headers: { Authorization: `Token ${token}` },
    })
    .then((res) => {
      const users = res.data;
      setUserData(users);
    }, []);

  const handleFollow = (props) => {
    let intPK = props;
    console.log(intPK);
    setUserID(intPK);

    // useEffect = () => {
    console.log("hello");
    axios
      .post(
        `${baseURL}followers/`,
        { following: userID },
        {
          headers: { Authorization: `Token ${token}` },
        }
      )
      .then((res) => {
        let data = res.data;
        setUserFollowingData(data);
      })
      .catch((res) => console.log(res));
  };
  console.log();
  // };

  return (
    <div>
      <h1>See All Users</h1>
      {userData.map((user) => (
        <div className="username" key={user.username}>
          <strong>Username: </strong>
          <div
            key={user.id}
            id={user.id}
            onClick={(e) => handleFollow(e.target.id)}
          >
            {" "}
            {user.username}
          </div>{" "}
        </div>
      ))}
      {statusMessage && <div>{statusMessage}</div>}
    </div>
  );
}
