import { useState } from "react";
import axios from "axios";
import { getAuthToken } from "./usernames";

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    // when form submits, make an AJAX request to login endpoint and when that happens, capture the login auth token in state --> i do this here bc this is what renders the form. when i get this info i want to pass it into app
    console.log({ username }, { password });
    axios
      .post("usernames.js", {
        username: { username },
        password: { password },
      })
      .then((res) => console.log(res));
  };

  return (
    <>
      <h1> E-Cards Login</h1>

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
        <button type="submit"> Log in</button>
      </form>
    </>
  );
}
