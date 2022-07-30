import { useState, useEffect } from "react";
import { baseURL } from "../helpers/constants";
import axios from "axios";
import image from "../helpers/angery.png";
import { timestamp } from "../helpers/constants";

export default function CreateCard({ token, username }) {
  const [innerMessage, setInnerMessage] = useState("");
  const [outerMessage, setOuterMessage] = useState("");
  const [cardColor, setCardColor] = useState(null);
  const [cardImage, setCardImage] = useState("");
  const [time, setTime] = useState(null);
  const [error, setError] = useState("");
  const [imgSrc, setImgSrc] = useState("https://placekitten.com/200/300/");

  console.log(token);
  console.log(username);

  let cardOwner = localStorage.getItem("username");

  const handleSubmit = (e) => {
    e.preventDefault();
    useEffect = () => {
      setTime(timestamp);
    };
    console.log(timestamp);
  };

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
      <form onSubmit={(e) => handleSubmit(e)}>
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
          <img alt="card-decoration" src={image} /> Here's your card decoration
          <img alt="card-decoration" src={imgSrc} /> Here's a place kitten
          <label> from:</label>
          <select onChange={(e) => console.log(e)} id="from">
            <option value={cardOwner}>{cardOwner} </option>
            <option>Anonymous</option>
          </select>
        </div>
        <button onClick={() => CallInCard()}>Add Card</button>
        <button> Add to Drafts</button>
        {error && (
          <div>
            {error} @ {timestamp}
          </div>
        )}
      </form>
    </>
  );
}
