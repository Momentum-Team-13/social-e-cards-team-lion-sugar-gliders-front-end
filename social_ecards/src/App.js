import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import he from "he";
import AllCards from "./components/user_cards";
import { Link, Outlet, Routes, Route, Navigate } from "react-router-dom";
import LoginForm from "./components/login_form.js";
import { baseURL } from "./helpers/constants";
import CreateCard from "./components/create_card";
import SeeProfile from "./components/see_profile";
import AddUserForm from "./components/add_user_form";
import AllUsers from "./components/all_users";
import SpecificCard from "./components/specific_card";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import listCards from './data.js';
import Cards from './Components/Allcardscomponent'
import './allcards.css';

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [username, setUsername] = useState(localStorage.getItem("username"));
  const [error, setError] = useState([]);
  const [homepageMeme, setHomepageMeme] = useState(null);
  const [currentCard, setCurrentCard] = useState(listCards[0])
    const [currentCardIndex] = useState(0)
    useEffect(() => {setCurrentCard(listCards[currentCardIndex])})


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

  useEffect(() => {
    axios.get(`${baseURL}`).then((res) => {
      setHomepageMeme(res.data);
    });
  }, []);

  return (
    <div>
            <>
        <div className=''>
            <h1>All user cards</h1>
            <Cards currentCard={currentCard}/>
        </div>
    </>
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
        {/* <LoginForm /> */}

        {token ? (
          <>
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
                path="/seeprofile"
                element={<SeeProfile token={token} username={username} />}
              />
              <Route
                path="/createcard"
                element={<CreateCard token={token} username={username} />}
              />
              <Route
                path="/allusers"
                element={<AllUsers token={token} username={username} />}
              />
              <Route
                path="/specificcard/:cardID"
                element={<SpecificCard token={token} />}
              />
            </Routes>
            <nav>
              <div> Hello, you're logged in as {username}</div>
              <button onClick={handleLogout}> Log Out</button>
              {error && <div>{error}</div>}
              <div>
                {/* <Link to="/adduser">Add New User</Link> |{" "} */}
                <Link to="/allcards">See All Cards </Link> |
                <Link to="/seeprofile"> See Your Profile Page</Link> |
                <Link to="/createcard"> Create a card</Link> |
                <Link to="/allusers"> See All Users</Link> |
                <Link to="/">Back to homepage</Link> |
              </div>
            </nav>
          </>
        ) : (
          <LoginForm setToken={setToken} />
        )}

        <Outlet />
      </div>
    </div>
  );
}

export default App