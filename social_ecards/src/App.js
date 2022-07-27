import logo from "./logo.svg";
import "./App.css";
import AddUserForm from "./components/add_user_form";
import { useEffect, useState } from "react";
import { UserList } from "./components/loginPage";
import LogInForm from "./components/login_form.js";
import axios from "axios";
import he from "he";

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
      console.log(res);
    });
  }, [baseURL]);

  return (
    <>
      <div className="container">
        {team && message && imgLink && (
          <div className="from_andres">
            Hello {team}
            <p>{he.decode(message)}</p> <img src={imgLink} alt="dank meme" />{" "}
          </div>
        )}
        {/* <>
        <span>
          click <a href="google.com">HERE </a> to log in |
        </span>

        <span>
          | click <a href="./add_user_form">HERE</a> to create a username
        </span>
      </> */}

        <LogInForm baseURL={baseURL} />
        {/* <AddUserForm /> */}
        {/* <button onClick={(e) => setLoggedIn(true)}> Log Me In</button> */}
        {/* <UserList /> */}
      </div>
    </>
  );
}

export default App;
