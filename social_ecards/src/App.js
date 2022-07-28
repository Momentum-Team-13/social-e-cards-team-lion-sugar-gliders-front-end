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
import { Link, Outlet } from "react-router-dom";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [baseURL, setBaseURL] = useState("https://sg-ecard-api.herokuapp.com/");
  const [team, setTeam] = useState("");
  const [message, setMessage] = useState("");
  const [imgLink, setImgLink] = useState("");

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
        <Link to="/login">Login</Link> | <Link to="/adduser">Add New User</Link>{" "}
        | <Link to="/allcards"> See All Cards </Link>
        <Outlet />
      </div>
    </div>
  );
}

export default App;
