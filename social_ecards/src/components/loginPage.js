import { getUsers, USERS } from "./usernames";
import { useState, useEffect } from "react";

export function UserList({ authToken }) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers(authToken).then((res) => {
      console.log(res);
    });
  });
  return <div> Hello</div>;
}
