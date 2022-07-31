import axios from "axios";
import { baseURL } from "../helpers/constants";
import { useEffect, useState } from "react";

export default function SeeUser({ token, username }) {
  const [userInfo, setUserInfo] = useState(null);

  const getUserInfo = () => {
    axios
      .get(`${baseURL}auth/users/me/`, {
        headers: { Authorization: `Token ${token}` },
      })
      .then((res) => {
        setUserInfo(res.data);
        console.log(res);
      })
      .catch((res) => console.log(res));
  };

  const seeFollowers = () => {
    axios
      .get(
        `${baseURL}followers/`,
        {},
        { headers: { Authorization: `Token ${token}` } }
      )
      .then((res) => console.log(res))
      .catch((res) => console.log(res));
  };

  return (
    <>
      <div onClick={(e) => getUserInfo(e)}> click to get user info</div>
      {userInfo && (
        <div>
          <h1>{userInfo.username}'s page</h1>
          <div>Email is: {userInfo.email}</div>
          <div>User Id Number: {userInfo.id}</div>
        </div>
      )}
      <h3>people following {username}</h3>
      <div onClick={(e) => seeFollowers(e)}> click to see follower list</div>
    </>
  );
}
