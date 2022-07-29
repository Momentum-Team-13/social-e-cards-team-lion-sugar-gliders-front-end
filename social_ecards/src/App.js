import logo from "./logo.svg";
import "./App.css";
import AddUserForm from "./components/add_user_form";
import { useEffect, useState } from "react";
import { UserList } from "./mock/loginPage";
import axios from "axios";
import he from "he";
import AllCards from "./components/allCardsPage";
import CARDFORM from "./mock/mockdata";
import UserDataPage from "./mock/mockUserData";
import { Link, Outlet, Routes, Route, Navigate } from "react-router-dom";
import LoginForm from "./components/login_form.js";
import { baseURL } from "./helpers/constants";
import CreateCard from "./components/create_card";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [username, setUsername] = useState(localStorage.getItem("username"));
  const [error, setError] = useState([]);
  const [homepageMeme, setHomepageMeme] = useState(null);

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
        localStorage.clear();
      })
      .catch((res) => {
        let error = res.message;
        console.log(error);
        setError(error);
      });
  };

  useEffect(() => {
    axios.get(`${baseURL}`).then((res) => {
      setHomepageMeme(res.data);
    });
  }, []);

  // const Clear = () => {
  //   return window.localStorage.clear();
  // };

  return (
    <div>
      <h1> Welcome to our page</h1>
      <div className="container">
        {homepageMeme && (
          <div className="from_andres">
            <p>a note from our devs:</p>
            Hello {homepageMeme.team}
            <p>{he.decode(homepageMeme.description)}</p>{" "}
            <img src={homepageMeme.dank_meme_image} alt="dank meme" />{" "}
          </div>
        )}

        <Routes>
          <Route path="/login" element={<LoginForm token={token} />} />
          <Route path="/allcards" element={<AllCards token={token} />} />
        </Routes>

        {token ? (
          <>
            <div> Hello, you're logged in as {username}</div>
            <nav>
              <button onClick={handleLogout}> Log Out</button>
              {error && <div>{error}</div>}
              <Link to="/adduser">Add New User</Link> |{" "}
              <Link to="/allcards"> See All Cards </Link>
            </nav>
          </>
        ) : (
          <Link to="login"> login </Link>
        )}
        {/* <AddUserForm /> */}

        {/* <button onClick={() => Clear()}>Clear Local storage</button> */}
        <CreateCard token={token} username={username} />
        <Outlet />
      </div>
    </div>
  );
}

export default App;
