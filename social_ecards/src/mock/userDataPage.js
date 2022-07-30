import USER from "./mockUserData";
import { useState } from "react";

export default function UserDataPage() {
  const [userIndex, setUserIndex] = useState([0]);
  let user = USER[userIndex];
  let name = user.name;
  let username = user.username;
  let email = user.email;
  let imgURL = user.profile_pic_url;
  return (
    <>
      <h1>{username}'s Profile Page</h1>
      <p>
        {name}
        {email}
      </p>
      <img src={imgURL} />
    </>
  );
}
