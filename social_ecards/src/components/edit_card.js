import { useState, useEffect } from "react";
import { baseURL } from "../helpers/constants";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function EditCard({ token }) {
  const [innerMessage, setInnerMessage] = useState("");
  const [outerMessage, setOuterMessage] = useState("");
  const [cardColor, setCardColor] = useState(null);
  const [error, setError] = useState("");
  const [imgSrc, setImgSrc] = useState("https://placekitten.com/200/300/");
  const [statusMessage, setStatusMessage] = useState("");
  const [checked, setChecked] = useState(false);
  let cardOwner = localStorage.getItem("username");

  let params = useParams();
  let cardID = params.cardID;
  console.log(params);
  console.log(cardID);

  const handleSubmit = (e) => {
    e.preventDefault();
    setImgSrc(imgSrc);
  };

  const handleColorChoice = (e) => {
    console.log(e.target.id);
    let colorHexValue = e.target.id;
    setCardColor(colorHexValue);
  };

  const CallInEdit = () => {
    axios
      .patch(
        `${baseURL}ecards/${cardID}`,
        {
          id: cardID,
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
      <h3>Edit a card</h3>
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
            <div className="colorbox" id="green"></div>
            <input
              id="00FF00"
              name="green"
              type="checkbox"
              onChange={(e) => handleColorChoice(e)}
            ></input>
            <div className="colorbox" id="red"></div>
            <input
              id="ff0000"
              name="red"
              type="checkbox"
              onChange={(e) => handleColorChoice(e)}
            ></input>
            <div className="colorbox" id="blue"></div>
            <input
              id="0000FF"
              name="blue"
              type="checkbox"
              onChange={(e) => handleColorChoice(e)}
            ></input>
          </div>
        </div>
        <br />
        <button onClick={() => CallInEdit()}>Edit Card</button>
        {/* <button> Add to Drafts</button> */}
        {statusMessage && <div>Your card has been {statusMessage}</div>}
        {error && <div>{error}</div>}
      </form>
    </div>
  );
}
