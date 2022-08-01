import { useState, useEffect } from "react";
import { baseURL } from "../helpers/constants";
import axios from "axios";
import { toBeChecked } from "@testing-library/jest-dom/dist/matchers";

export default function CreateCard({ token, username }) {
  // add dropdown to include 3 predefined colors. currently data returns: 00FF00
  const [innerMessage, setInnerMessage] = useState("");
  const [outerMessage, setOuterMessage] = useState("");
  const [cardColor, setCardColor] = useState(null);
  const [error, setError] = useState("");
  const [imgSrc, setImgSrc] = useState("https://placekitten.com/200/300/");
  const [statusMessage, setStatusMessage] = useState("");
  const [checked, setChecked] = useState(false);

  // console.log(token);
  // console.log(username);

  let cardOwner = localStorage.getItem("username");

  const handleSubmit = (e) => {
    e.preventDefault();
    setImgSrc(imgSrc);
  };

  const handleColorChoice = (e) => {
    console.log(e.target.id);
    let colorHexValue = e.target.id;
    setCardColor(colorHexValue);
  };

  const CallInCard = () => {
    axios
      .post(
        `${baseURL}ecards/`,
        {
          card_inner_message: innerMessage,
          card_outer_message: outerMessage,
          card_image: imgSrc,
          card_color_list: cardColor,
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
          </select>{" "}
          <p>Choose A Background Color:</p>
          <div className="colorChoices">
            <div className="colorbox" id="pink"></div>
            <input
              id="#c71585"
              name="pink"
              type="checkbox"
              onChange={(e) => handleColorChoice(e)}
            ></input>
            <div className="colorbox" id="teal"></div>
            <input
              id="#008080"
              name="teal"
              type="checkbox"
              onChange={(e) => handleColorChoice(e)}
            ></input>
            <div className="colorbox" id="purple"></div>
            <input
              id="#653d93"
              name="purple"
              type="checkbox"
              onChange={(e) => handleColorChoice(e)}
            ></input>
          </div>
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
