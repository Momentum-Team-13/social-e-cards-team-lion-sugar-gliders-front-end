import logo from "./logo.svg";
import "./App.css";
import AddUserForm from "./components/add_user_form";
import { useState } from "react";
import { UserList } from "./components/loginPage";
import LogInForm from "./components/login_form.js";

// import {
//   InputField,
//   LoginForm,
//   RefInput,
//   BookList,
// } from "./components/practice_forms";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  return (
    <div className="App">
      <h1>Team Lion Sugar Gliders Social E-Cards App!</h1>
      <>
        <span>
          click <a href="google.com">HERE </a> to log in |
        </span>

        <span>
          | click <a href="./add_user_form">HERE</a> to create a username
        </span>
      </>
      <LogInForm />
      {/* <AddUserForm /> */}

      {/* <button onClick={(e) => setLoggedIn(true)}> Log Me In</button> */}
      <UserList />
    </div>
  );
}

export default App;
