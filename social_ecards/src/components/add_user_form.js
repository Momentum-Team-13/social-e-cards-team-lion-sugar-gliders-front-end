import { useState } from "react";
import axios from "axios";
import { baseURL } from "../helpers/constants";
import { useNavigate } from "react-router-dom";

export default function AddUserForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState([]);
  const [confirmation, setConfirmation] = useState([]);
  const navigate = useNavigate;
  // const token = localStorage.getItem("auth_token");

  const AddUser = (event) => {
    event.preventDefault();
    // when form submits, make an AJAX request to login endpoint and when that happens, capture the login auth token in state --> i do this here bc this is what renders the form. when i get this info i want to pass it into app
    axios
      .post(`${baseURL}auth/users/`, {
        username: username,
        password: password,
      })
      .then((res) => {
        let confirmation = res.request.statusText;
        setConfirmation(confirmation);
        // navigate("/", { replace: true });
      })
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
      <p> Add User</p>

      <form onSubmit={console.log("form submitted")}>
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
        <br/>
        <button id="button_adduser" type="submit" onClick={(e) => AddUser(e)}>
          {" "}
          Add User
        </button>
        
        <div>{confirmation && <div>{confirmation}</div>}</div>
      </form>

      {error ? <div>{error}</div> : ""}
    </div>
  );
}
