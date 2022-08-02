import axios from "axios";
import { baseURL } from "../helpers/constants";
import { useEffect, useState } from "react";

export default function SeeProfile({ token, username }) {
  const [profileInfo, setProfileInfo] = useState(null);
  const [editPage, setEditPage] = useState(false);

  const getProfileInfo = () => {
    axios
      .get(`${baseURL}auth/users/me/`, {
        headers: { Authorization: `Token ${token}` },
      })
      .then((res) => {
        setProfileInfo(res.data);
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

  // const handleEdit = (e) => {
  //   console.log("wanna edit");
  //   return <EditForm token={token} username={username} />;
  // };

  return (
    <>
      <div onClick={(e) => getProfileInfo(e)}> click to get user info</div>
      {profileInfo && (
        <div>
          <h1>{profileInfo.username}'s page</h1>
          <div>Email is: {profileInfo.email}</div>
          <div>Profile Id Number: {profileInfo.id}</div>
          {/* <button onClick={() => handleEdit()}>Edit Profile</button> */}
        </div>
      )}

      <h3>people following {username}</h3>
      <div onClick={(e) => seeFollowers(e)}> click to see follower list</div>
    </>
  );
}

// const EditForm = () => {
//   return (
//     <div>
//       <h1>Edit Your Profile</h1>
//     </div>
//   );
// };
