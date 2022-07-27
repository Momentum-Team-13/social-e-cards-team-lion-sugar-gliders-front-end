import axios from "axios";
import { useState } from "react";

export default function LoginForm({ baseURL }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [authToken, setAuthToken] = useState("");

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
      });
  };

  return (
    <div>
      <>
        <h1>Log In</h1>
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
    </div>
  );
}
