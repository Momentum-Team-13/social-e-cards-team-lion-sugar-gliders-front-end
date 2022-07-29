import { useState, useEffect } from "react";
import { baseURL } from "../helpers/constants";
import axios from "axios";
import TimezoneSelect from "react-timezone-select";

export default function CreateCard({ token, username }) {
  const [innerMessage, setInnerMessage] = useState("");
  const [outerMessage, setOuterMessage] = useState("");
  const [cardColor, setCardColor] = useState(null);
  const [cardImage, setCardImage] = useState("");
  const [time, setTime] = useState("");
  const [error, setError] = useState("");
  console.log(token);

  let cardOwner = localStorage.getItem("username");

  const CallInCard = () => {
    axios
      .post(
        `${baseURL}ecards/`,
        {},
        {
          headers: { Authorization: `Token: ${token}` },
        }
      )
      .then((res) => console.log(res))
      .catch((res) => {
        let detail_error = res.response.data.detail;
        if (detail_error) {
          setError(detail_error);
        }
        console.log(error);
      });
  };

  return (
    <>
      <div>Create a Card!</div>
      <form onSubmit={(e) => e.preventDefault()}>
        <div>
          <label htmlFor="inner-message">Inner Message</label>
          <input
            id="inner-message"
            type="text"
            onChange={(e) => setInnerMessage(e.target.value)}
          />
          <label htmlFor="outer-message">Outer Message</label>
          <input
            id="outer-message"
            type="text"
            onChange={(e) => setOuterMessage(e.target.value)}
          />
          <label> from:</label>
          <select onChange={(e) => console.log(e)} value="From">
            <option value={cardOwner}>{cardOwner} </option>
            <option>Hello</option>
          </select>
        </div>
        <button onClick={() => CallInCard()}>Add Card</button>
        <button> Add to Drafts</button>
        {error && <div>{error}</div>}
      </form>
    </>
  );
}
