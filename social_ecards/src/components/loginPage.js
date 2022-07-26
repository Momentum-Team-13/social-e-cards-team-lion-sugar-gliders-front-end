import { getUsers } from "./usernames";
import { useState, useEffect } from "react";

export function UserList({ authToken }) {
  const [users, setUsers] = useState([]);
  const [admin, setAdmin] = useState("");

  useEffect(() => {
    getUsers(authToken).then((res) => {
      setUsers(res.USERS);
      setAdmin(res.USERS[0]);
      console.log(admin);
    });
  }, [authToken]);

  return <>{users && admin && <p>Hello, {admin.username}</p>}</>;
}
