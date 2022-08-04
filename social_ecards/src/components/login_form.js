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
  const [expanded, setExpanded] = useState(false);

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
    <div className="loginHomepage">
      
        <h1 onClick={() => handleLogIn()}> Log In </h1>
        <h1 onClick={() => console.log("handle Create users")}> Create user</h1>
        <h5> Welcome to our page</h5>
        <br />
        
        
          <div id="container-LogIn">
              <h3>Please Log In</h3>
              <form>
                <label htmlFor="username-field" style={{ fontSize: "20px" }}>
                  {" "}
                  Username
                </label>
                <br/>
                <input
                  id="username-field" style={{ fontSize: "20px" }}
                  type="text"
                  onChange={(e) => {
                    let username = e.target.value;
                    localStorage.setItem("username", username);
                    setUsername(username);
                  }}
                  />
                <br />
                <label htmlFor="password-field" style={{ fontSize: "20px" }}>
                  {" "}
                  Password
                </label>
                <br />
                <input
                  id="password-field" style={{ fontSize: "20px" }}
                  type="password"
                  
                  onChange={(e) => setPassword(e.target.value)}/>
                  <br/>
                  <br/>
                <button id="buttonlogin" type="submit" onClick={(e) => LogIn(e)}>
                  {" "}
                  Log in
                </button>
              </form>
              
              {error && <div>{error}</div>}
              
              <p>Need to create a user?</p> 
              <div style={{ fontSize: "17px" }}>
                <Link  to="/adduser">Add New User</Link> |{" "}
                <Routes>
                  <Route path="/adduser" element={<AddUserForm />} />
                </Routes>
              </div>
        
      </div>
    </div>
  );
}
