import { useState } from "react";

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const LogIn = (event) => {
    event.preventDefault();
    // when form submits, make an AJAX request to login endpoint and when that happens, capture the login auth token in state --> i do this here bc this is what renders the form. when i get this info i want to pass it into app
    console
      .log("login attempt")
      .post("http://localhost:3000/", {
        username: username,
        password: password,
      })
      .then((res) => console.log(res));
  };

  return (
    <>
      <p>"Hello I am a login form</p>
      <>
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
    </>
  );
}
