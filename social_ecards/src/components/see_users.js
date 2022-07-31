import axios from "axios";
import { baseURL } from "../helpers/constants";
import { useEffect } from "react";

export default function SeeUser({ token, username }) {
  const getUserInfo = () => {
    console.log(`line 17 ${token}`);
    axios
      .get(`${baseURL}auth/users/me/`, {
        headers: { Authorization: `Token ${token}` },
      })
      .then((res) => console.log(res))
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
      <div>See {username}'s Profile</div>
      <h1>{username}</h1>
      <div onClick={(e) => getUserInfo(e)}> click to get user info</div>
      <h3>people following {username}</h3>
      <div onClick={(e) => seeFollowers(e)}> click to see follower list</div>
    </>
  );
}
