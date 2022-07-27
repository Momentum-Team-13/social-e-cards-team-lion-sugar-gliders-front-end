import { useState } from "react";
import axios from "axios";
import { getAuthToken } from "./mockdata";

export default function AddUserForm({ baseURL }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // const token = localStorage.getItem("auth_token");

  // const displayUserNameErrors = () => {};

  // const displayPasswordErrors = () => {};

  const AddUser = (event) => {
    event.preventDefault();
    // when form submits, make an AJAX request to login endpoint and when that happens, capture the login auth token in state --> i do this here bc this is what renders the form. when i get this info i want to pass it into app
    axios
      .post(`${baseURL}auth/users/`, {
        username: username,
        password: password,
      })
      .then((res) => console.log(res))
      .catch((res) => {
        console.log(res);
        let username = res.response.data.username;
        let password = res.response.data.password;
      });
  };

  return (
    <>
      <h1> Add User</h1>

      <form onSubmit={getAuthToken}>
        <>
          <label htmlFor="username-field"> username</label>
          <input
            id="username-field"
            type="text"
            onChange={(e) => setUsername(e.target.value)}
          />
        </>
        <>
          <label htmlFor="password-field"> password</label>
          <input
            id="password-field"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </>
        <button type="submit" onClick={(e) => AddUser(e)}>
          {" "}
          Add User
        </button>
      </form>
    </>
  );
}
