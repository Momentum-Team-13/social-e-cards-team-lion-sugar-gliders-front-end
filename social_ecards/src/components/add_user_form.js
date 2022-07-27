import { useState } from "react";
import axios from "axios";
import { getAuthToken } from "./mockdata";

export default function AddUserForm({ baseURL }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState([]);
  // const token = localStorage.getItem("auth_token");

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
        let username_error = res.response.data.username;
        let password_error = res.response.data.password;
        if (username_error) {
          for (let error of username_error) {
            setError(error);
          }
        } else if (password_error) {
          for (let error of password_error) {
            setError(error);
            console.log(error);
          }
        }
      });
  };

  return (
    <div className="add_user">
      <h1> Add User</h1>

      <form onSubmit={getAuthToken}>
        <div>
          <label htmlFor="username-field"> username</label>
          <input
            id="username-field"
            type="text"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password-field"> password</label>
          <input
            id="password-field"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" onClick={(e) => AddUser(e)}>
          {" "}
          Add User
        </button>
      </form>

      {error && <div>{error}</div>}
    </div>
  );
}
