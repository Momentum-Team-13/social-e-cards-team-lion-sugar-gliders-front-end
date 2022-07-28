import axios from "axios";
import { useState } from "react";
import { Link, Navigate } from "react-router-dom";

export default function LoginForm({ baseURL, setAuth, isLoggedIn }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [authToken, setAuthToken] = useState("");
  const [error, setError] = useState([]);

  // const setAuth=(username, token)=>{
  // setToken(token)
  // setUsername(user)
  // }

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
        setAuthToken(auth_token);
        console.log(auth_token);
        localStorage.setItem("auth_token", auth_token);
        localStorage.setItem("username", username);
      })
      .catch((res) => {
        console.log(res);
        let error = res.response.data.non_field_errors;
        setError(error);
      });
  };

  if (isLoggedIn) {
    return <Navigate to="/" />;
  }

  return (
    <div>
      <>
        <h2>Please Log In</h2>
        <label htmlFor="username-field"> username</label>
        <input
          id="username-field"
          type="text"
          onChange={(e) => setUsername(e.target.value)}
        />
      </>
      <form>
        <>
          <label htmlFor="password-field"> password</label>
          <input
            id="password-field"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </>
        <button type="submit" onClick={(e) => LogIn(e)}>
          {" "}
          Log in
        </button>
      </form>
      {error && <div>{error}</div>}
    </div>
  );
}
