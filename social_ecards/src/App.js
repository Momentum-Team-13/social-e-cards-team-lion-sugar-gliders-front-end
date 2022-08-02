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
import SpecificCard from "./components/specific_card";
import EditCard from "./components/edit_card";
import DeleteCard from "./components/delete_card";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [username, setUsername] = useState(localStorage.getItem("username"));
  const [error, setError] = useState([]);
  const [homepageMeme, setHomepageMeme] = useState(null);

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
    <div className="entirety">
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
        </div>

        {token ? (
          <>
            <div className="navbar">
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
            </div>
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
                element={<SpecificCard token={token} />}
              />
              {/* <Route path="/adduser" element={<AddUserForm />} /> */}
            </Routes>
          </>
        ) : (
          <LoginForm setToken={setToken} />
        )}

        <Outlet />
      </div>
    </div>
  );
}

export default App;
