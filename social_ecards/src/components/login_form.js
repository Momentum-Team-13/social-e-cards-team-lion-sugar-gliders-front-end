import axios from "axios";
import { useState } from "react";
import { baseURL } from "../helpers/constants";
import { useNavigate, Link, Routes, Route } from "react-router-dom";
import AddUserForm from "./add_user_form";

export default function LoginForm({ token, setToken }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [newUser, setNewUser] = useState(false);

  let navigate = useNavigate();

  // const setAuth=(username, token)=>{
  // setToken(token)
  // setUsername(user)
  // }

  const handleLogIn = () => {};

  const LogIn = (event) => {
    event.preventDefault();
    // when form submits, make an AJAX request to login endpoint and when that happens, capture the login auth token in state --> i do this here bc this is what renders the form. when i get this info i want to pass it into app
    axios
      .post(`${baseURL}auth/token/login`, {
        username: username,
        password: password,
      })
      .then((res) => {
        let auth_token = res.data.auth_token;
        token = auth_token;
        localStorage.setItem("token", auth_token);
        setLoggedIn(true);
        setToken(token);
        // navigate("/", { replace: true });
      })
      .catch((res) => {
        console.log(res);
        let error = res.response.data.non_field_errors;
        setError(error);
      });
  };

  return (
    <div>
      <div className="loginHomepage">
        <h1 onClick={() => handleLogIn()}> Log In </h1>
        <h1 onClick={() => console.log("handle Create users")}> Create user</h1>
        <h1> Welcome to our page</h1>
        <br />
      </div>

      <div id="container-LogIn">
        <>
          <h2>Please Log In</h2>
          <form>
            <label htmlFor="username-field" style={{ fontSize: "17px" }}>
              {" "}
              Username
            </label>
            <br />
            <input
              id="username-field"
              type="text"
              onChange={(e) => {
                let username = e.target.value;
                localStorage.setItem("username", username);
                setUsername(username);
              }}
            />
            <br />
            <label htmlFor="password-field" style={{ fontSize: "17px" }}>
              {" "}
              Password
            </label>
            <br />
            <input
              id="password-field"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit" onClick={(e) => LogIn(e)}>
              {" "}
              Log in
            </button>
          </form>
          {error && <div>{error}</div>}
          <br />
          <p>Need to create a user?</p>
          <br />
          <div style={{ fontSize: "17px" }}>
            <Link to="/adduser">Add New User</Link> |{" "}
            <Routes>
              <Route path="/adduser" element={<AddUserForm />} />
            </Routes>
          </div>
        </>
      </div>
    </div>
  );
}
