import logo from "./logo.svg";
import "./App.css";
import LogInForm from "./components/loginForm";
import { useState } from "react";

// import { InputField, LoginForm, RefInput, BookList } from "./components/practice_forms";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  return (
    <div className="App">
      <h1>Team Lion Sugar Gliders Social E-Cards App!</h1>
      {/* <InputField />
      <RefInput />
      <LoginForm />
      <BookList
      // token={token}
      /> */}
      {/* <LogInForm onSubmit={(e) => console.log(e)} /> */}

      {!loggedIn ? (
        <>
          <span>
            click <a href="google.com">HERE </a> to log in |
          </span>

          <span>
            | click <a href="LINK">HERE</a> to create a username
          </span>
        </>
      ) : (
        "Welcome Back"
      )}
      <button onClick={(e) => setLoggedIn(true)}> Log Me In</button>
    </div>
  );
}

export default App;
