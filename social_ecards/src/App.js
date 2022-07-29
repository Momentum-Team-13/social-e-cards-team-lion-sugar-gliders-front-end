import logo from "./logo.svg";
import "./App.css";
import AddUserForm from "./components/add_user_form";
import { useEffect, useState } from "react";
import { UserList } from "./components/loginPage";
import LogInForm from "./components/login_form.js";
import axios from "axios";
import he from "he";
import AllCards from "./components/allCardsPage";
import CARDFORM from "./components/mockdata";
import UserDataPage from "./components/userDataPage";
import { Link, Outlet, Routes, Route, Navigate } from "react-router-dom";
import LoginForm from "./components/login_form.js";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [team, setTeam] = useState("");
  const [message, setMessage] = useState("");
  const [imgLink, setImgLink] = useState("");
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [username, setUsername] = useState(localStorage.getItem("username"));
  const [error, setError] = useState([]);

  let baseURL = "https://sg-ecard-api.herokuapp.com/";

  const setAuth = (username, token) => {
    setToken(token);
    setUsername(username);
  };

  const handleLogout = () => {
    console.log(token);
    axios
      .post(
        `${baseURL}auth/token/logout/`,
        {},
        { headers: { Authorization: `Token ${token}` } }
      )
      .then(() => {
        setToken(null);
        setUsername("");
      })
      .catch((res) => {
        let error = res.message;
        console.log(error);
        setError(error);
      });
  };

  // const isLoggedIn = token && username;

  useEffect(() => {
    axios.get(`${baseURL}`).then((res) => {
      let team = res.data.team;
      let message = res.data.description;
      let imgLink = res.data.dank_meme_image;
      setTeam(team);
      setMessage(message);
      setImgLink(imgLink);
    });
  }, [baseURL]);

  // const Clear = () => {
  //   return window.localStorage.clear();
  // };

  return (
    <div>
      <h1> Welcome to our page</h1>
      <div className="container">
        {team && message && imgLink && (
          <div className="from_andres">
            <p>a note from our devs:</p>
            Hello {team}
            <p>{he.decode(message)}</p> <img src={imgLink} alt="dank meme" />{" "}
          </div>
        )}

        {!loggedIn ? <LoginForm baseURL={baseURL} /> : ""}
        <>
          <div> Hello, you're logged in as {username}</div>
          <nav>
            <button onClick={handleLogout}> Log Out</button>
            {error && <div>{error}</div>}
          </nav>
        </>

        {/* <Link to="/login">Login</Link> | <Link to="/adduser">Add New User</Link>{" "}
        | <Link to="/allcards"> See All Cards </Link> */}
        {/* <button onClick={() => Clear()}>Clear Local storage</button> */}
        <Outlet />
      </div>
    </div>
  );
}

export default App;
