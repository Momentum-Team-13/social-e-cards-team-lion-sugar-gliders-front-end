import { getUsers } from "./usernames";
import { useState, useEffect } from "react";

export function UserList({ authToken }) {
  const [users, setUsers] = useState([]);
  const [admin, setAdmin] = useState("");
  const [lisa, setLisa] = useState("");
  const [isFollowing, setIsFollowing] = useState([]);

  useEffect(() => {
    getUsers(authToken).then((res) => {
      // console.log(res);
      setUsers(res.USERS);
      setAdmin(res.USERS[0]);
      setLisa(res.USERS[1]);
      let lisaIsFollowing = res.USERS[1].is_following;
      // console.log(lisaIsFollowing);
      setIsFollowing(lisaIsFollowing);
    });
  }, [authToken]);

  return (
    <>
      {users && admin && lisa && (
        <>
          <article>Hello, {admin.username}</article>
          <article>
            Hello, {lisa.username}
            <img src={lisa.profile_image_url} alt="profile" />
            <ul>Following</ul>
            {isFollowing && (
              <li>
                {isFollowing.username}
                {/* {isFollowing.map((user) => (
                  <p>{user.username}</p>
                ))} */}
              </li>
            )}
          </article>
        </>
      )}
    </>
  );
}
