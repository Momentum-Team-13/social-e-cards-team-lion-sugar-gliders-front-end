import { useState, useEffect } from "react";
import { baseURL } from "../helpers/constants";
import axios from "axios";

export default function CreateCard({ token, username }) {
  const [innerMessage, setInnerMessage] = useState("");
  const [outerMessage, setOuterMessage] = useState("");
  const [cardColor, setCardColor] = useState(null);
  const [error, setError] = useState("");
  const [imgSrc, setImgSrc] = useState("https://placekitten.com/200/300/");
  const [statusMessage, setStatusMessage] = useState("");

  console.log(token);
  console.log(username);

  let cardOwner = localStorage.getItem("username");

  const handleSubmit = (e) => {
    e.preventDefault();
    setImgSrc(imgSrc);
  };

  const CallInCard = () => {
    axios
      .post(
        `${baseURL}ecards/`,
        {
          card_inner_message: innerMessage,
          card_outer_message: outerMessage,
          card_image: imgSrc,
        },
        {
          headers: { Authorization: `Token ${token}` },
        }
      )
      .then((res) => {
        let statusMessage = res.request.statusText;
        setStatusMessage(statusMessage);
      })
      .catch((res) => {
        let detail_error = res.response.data.detail;
        if (detail_error) {
          setError(detail_error);
        }
        console.log(error);
      });
  };

  return (
    <div className="cardForm">
      <h3>create a card</h3>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div>
          <label htmlFor="inner-message">Inner Message</label>
          <input
            id="inner-message"
            type="text"
            onChange={(e) => setInnerMessage(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="outer-message">Outer Message</label>
          <input
            id="outer-message"
            type="text"
            onChange={(e) => setOuterMessage(e.target.value)}
          />
        </div>
        <div>
          <img alt="card-decoration" src={imgSrc} />
        </div>
        <div>
          <label> This card is from:</label>
          <select onChange={(e) => console.log(e)} id="from">
            <option value={cardOwner}>{cardOwner} </option>
            <option>Anonymous</option>
          </select>
        </div>
        <div>
          <label>This card is for:</label>
          <select>
            {" "}
            <option>followers</option>
          </select>
        </div>
        <br />
        <button onClick={() => CallInCard()}>Add Card</button>
        <button> Add to Drafts</button>
        {statusMessage && <div>Your card has been {statusMessage}</div>}
        {error && <div>{error}</div>}
      </form>
    </div>
  );
}
