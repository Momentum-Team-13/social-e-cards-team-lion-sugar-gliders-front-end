import axios from "axios";
import { baseURL } from "../helpers/constants";
import { useState, useEffect } from "react";



export default function AllUsers({ token, username }) {
  const [userData, setUserData] = useState([]);
  const [userID, setUserID] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [userFollowingData, setUserFollowingData] = useState([]);

  // useEffect = () => {
  console.log("hello");

  // };

  return (
    <UserData
      token={token}
      setUserID={setUserID}
      setUserFollowingData={setUserFollowingData}
    />
  );
}

const UserData = ({ token, setUserID, setUserFollowingData }) => {
  const [userInfo, setUserInfo] = useState([]);
  const [statusMessage, setStatusMessage] = useState("");
  const [following, setFollowing] = useState(false);

  axios
    .get(`${baseURL}users/`, {
      headers: { Authorization: `Token ${token}` },
    })
    .then((res) => {
      const users = res.data;
      setUserInfo(users);
    }, []);

  const HandleFollow = (props) => {
    setFollowing(true);
    let intPK = props;
    console.log(intPK);
    setUserID(intPK);

    axios
      .post(
        `${baseURL}followers/`,
        { following: intPK },
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


  return (
    <div>
          <h2>See All Users</h2>
          <div className="containerusers">
          {userInfo.map((user) => (
            <div className="username" key={user.username}>
              <strong>Username: </strong>
              <div> {user.username}</div>{" "}
              
              {!following ? (
                <button className="followIt"
                  key={user.id}
                  id={user.id}
                  onClick={(e) => HandleFollow(e.target.id)}
                >
                  follow
                </button>
              ) : (
                "You Follow this user"
              )}
            </div>
          ))}
          {statusMessage && <div>{statusMessage}</div>}
          </div>
    </div>
  );
};
