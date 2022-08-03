import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import he from "he";
import AllCards from "./components/all_cards";
import { Link, Outlet, Routes, Route, Navigate } from "react-router-dom";
import LoginForm from "./components/login_form.js";
import { baseURL } from "./helpers/constants";
import CreateCard from "./components/create_card";
import SeeProfile from "./components/see_profile";
import AddUserForm from "./components/add_user_form";
import AllUsers from "./components/all_users";
import SpecificCardData from "./components/specific_card_data";
// import 'slick-carousel/slick/slick.css';
// import 'slick-carousel/slick/slick-theme.css';
// import listCards from './data.js';
// import Cards from './components/Allcardscomponent'
// import './allcards.css'
import EditCard from "./components/edit_card";
import DeleteCard from "./components/delete_card";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [username, setUsername] = useState(localStorage.getItem("username"));
  const [error, setError] = useState([]);
  // const [homepageMeme, setHomepageMeme] = useState(null);
  // const [currentCard, setCurrentCard] = useState(listCards[0])
  // const [currentCardIndex] = useState(0)
  // useEffect(() => {setCurrentCard(listCards[currentCardIndex])})

  const handleLogout = () => {
    // console.log(token);
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

  return (
    <div className="entirety">
      {token ? (
        <>
          <div className="navbar">
            <nav>
              <div className="homePage">
                <div className="containerHomePage">
                  {" "}
                  <br />
                  <div> Hello, you're logged in as {username}</div>
                  <button id="buttonlogout" onClick={handleLogout}>
                    {" "}
                    Log Out
                  </button>
                  {error && <div>{error}</div>}
                  <div className="menu">
                    {/* <Link to="/adduser">Add New User</Link> |{" "} */}
                    <Link to="/allcards">See All Cards </Link> |
                    <Link to="/seeprofile"> See Your Profile Page</Link> |
                    <Link to="/createcard"> Create a card</Link> |
                    <Link to="/allusers"> See All Users</Link> |
                    <Link to="/">Back to homepage</Link>
                  </div>
                </div>
              </div>
            </nav>
            <Routes>
              <Route
                path="/login"
                element={<LoginForm setToken={setToken} />}
              />
              <Route path="/adduser" element={<AddUserForm />} />
              <Route
                path="/allcards/*"
                element={<AllCards token={token} username={username} />}
              />
              <Route
                path="/seeprofile/"
                element={<SeeProfile token={token} username={username} />}
              />
              <Route
                path="/createcard"
                element={<CreateCard token={token} username={username} />}
              />
              <Route
                path="/editcard/:cardID"
                element={<EditCard token={token} />}
              />
              <Route
                path="/deletecard/:cardID"
                element={<DeleteCard token={token} />}
              />
              <Route
                path="/allusers"
                element={<AllUsers token={token} username={username} />}
              />
              <Route
                path="/allcards/:cardID"
                element={<SpecificCardData token={token} />}
              />
            </Routes>
          </div>
        </>
      ) : (
        <LoginForm setToken={setToken} />
      )}
    </div>
  );
}

export default App;
