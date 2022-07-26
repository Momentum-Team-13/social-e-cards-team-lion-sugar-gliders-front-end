import { getUsers } from "./usernames";
import { useState, useEffect } from "react";

export function UserList({ authToken }) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers(authToken).then((res) => {
      setUsers(res.users);
      console.log(users);
    });
  });
  return <div> Hello {users}</div>;
}
