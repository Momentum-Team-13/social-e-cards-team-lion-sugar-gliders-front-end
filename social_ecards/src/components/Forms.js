import { useState } from "react";
import { useRef } from "react";

// a controlled form input -- form values are in state
// we use this if the data being put into the form is something we want to use in UI, we want it in state
export const InputField = () => {
  const [name, setName] = useState("");

  const handleChange = (event) => {
    console.log(event.target.value);
    setName(event.target.value);
  };
  return (
    <>
      <label>name</label>
      <input type="text" onChange={handleChange} />
      <>
        <p> Hi hello {name}</p>
      </>
    </>
  );
};

// uncontrolled form input -- we use a hook called useRef()

export const RefInput = () => {
  const input = useRef();
  const logValue = () => {
    console.log(`input contains: ${input.current.value}`);
  };
  return (
    <>
      <h2> ref input </h2>
      <input type="text" ref={input} />
      <button onClick={logValue}> log the value!</button>
    </>
  );
};

export const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event
      .preventDefault()
      // when form submits, make an AJAX request to login endpoint and when that happens, capture the login auth token in state --> i do this here bc this is what renders the form. when i get this info i want to pass it into app
      .post("URL", {
        username: "admin",
        password: "admin",
      })
      .then((res) => console.log(res));
  };

  return (
    <>
      <p>"Hello I am a login form</p>
      <>
        <label htmlFor="username-field"> username</label>
        <input
          id="username-field"
          type="text"
          onChange={(e) => setUsername(e.target.value)}
        />
      </>
      <>
        <label htmlFor="password-field"> password</label>
        <input
          id="password-field"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </>
      <button> Log in</button>
    </>
  );
};

export const BookList = () => {
  return <div>BookLIst</div>;
};
