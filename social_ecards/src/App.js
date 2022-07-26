import logo from "./logo.svg";
import "./App.css";
import { InputField, LoginForm, RefInput, BookList } from "./components/Forms";

function App() {
  return (
    <div className="App">
      <InputField />
      <RefInput />
      <LoginForm />
      <BookList
      // token={token}
      />
    </div>
  );
}

export default App;
