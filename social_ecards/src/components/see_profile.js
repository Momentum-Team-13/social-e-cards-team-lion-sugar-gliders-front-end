import axios from "axios";
import { baseURL } from "../helpers/constants";
import { useEffect, useState } from "react";
import { useResolvedPath } from "react-router-dom";

export default function SeeProfile({ token, username }) {
  const [profileInfo, setProfileInfo] = useState(null);
  const [followerList, setFollowerList] = useState([]);
  const [editPage, setEditPage] = useState(false);
  const [unfollow, setUnfollow] = useState(false);

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
      .get(`${baseURL}followers/`, {
        headers: { Authorization: `Token ${token}` },
      })
      .then((res) => {
        let followers = res.data;
        console.log(followers);
        setFollowerList(followers);
      })
      .catch((res) => console.log(res));
  };

  const handleUnfollow = (props) => {
    console.log(props);
    let userID = props;
    axios
      .delete(`${baseURL}followers/${userID}`, {
        headers: { Authorization: `Token ${token}` },
      })
      .then((res) => setUnfollow(true));
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
      <h3>{username}'s followers</h3>
      <div onClick={(e) => seeFollowers(e)}> click to see follower list</div>

      <div>
        {followerList && (
          <div className="follower_list">
            {followerList.map((follower) => (
              <div className="individual_follower" key={follower}>
                <div key={follower.following}>
                  {" "}
                  Following {follower.following} users
                </div>
                <div key={follower.id}> And their id is {follower.id}</div>
                <div key={follower.user_following.username}>
                  who is following {follower.user_following.username}
                </div>
                <button
                  id={follower.id}
                  onClick={(e) => handleUnfollow(e.target.id)}
                >
                  unfollow
                </button>
                {unfollow ? <div>You no longer follow this user</div> : ""}
              </div>
            ))}
          </div>
        )}
      </div>
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
