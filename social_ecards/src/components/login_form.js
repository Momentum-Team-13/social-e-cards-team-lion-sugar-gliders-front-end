import axios from "axios";
import { useState } from "react";
import { baseURL } from "../helpers/constants";
import { useNavigate, Link } from "react-router-dom";

export default function LoginForm({ token }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState([]);

  let navigate = useNavigate();

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
        console.log(res);
        let auth_token = res.data.auth_token;
        token = auth_token;
        localStorage.setItem("token", auth_token);
        console.log("logged in");
        navigate("/", { replace: true });
      })
      .catch((res) => {
        console.log(res);
        let error = res.response.data.non_field_errors;
        setError(error);
      });
  };

  return (
    <div>
      <>
        <h2>Please Log In</h2>
        <label htmlFor="username-field"> username</label>
        <input
          id="username-field"
          type="text"
          onChange={(e) => {
            let username = e.target.value;
            localStorage.setItem("username", username);
            setUsername(username);
          }}
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
