import { useState, useEffect } from "react";
import { baseURL } from "../helpers/constants";
import axios from "axios";
import { toBeChecked } from "@testing-library/jest-dom/dist/matchers";
import { createRef } from "react";

export default function CreateCard({ token, username }) {
  // add dropdown to include 3 predefined colors. currently data returns: 00FF00
  const [innerMessage, setInnerMessage] = useState("");
  const [outerMessage, setOuterMessage] = useState("");
  const [cardColor, setCardColor] = useState(null);
  const [error, setError] = useState("");
  const [imgSrc, setImgSrc] = useState(null);
  const [statusMessage, setStatusMessage] = useState("");
  const [checked, setChecked] = useState(false);
  // const [fileSrc, setFileSrc] = useState(null);

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

  const handleImageChoice = (e) => {
    setImgSrc(e.target.id);
  };

  // const handleFileUpload = (props) => {
  //   const fileObject = props.target.files;
  //   setFileSrc(fileObject[0]);
  // };

  const CallInCard = () => {
    axios
      .post(
        `${baseURL}ecards/`,
        {
          card_inner_message: innerMessage,
          card_outer_message: outerMessage,
          card_image: imgSrc,
          // card_image_file: fileSrc,
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
      <h2>Create a card</h2>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div>
          <label htmlFor="inner-message"><h3>Inner Message</h3></label>
          <input
            id="inner-message"
            type="text"
            onChange={(e) => setInnerMessage(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="outer-message"><h3>Outer Message</h3></label>
          <input
            id="outer-message"
            type="text"
            onChange={(e) => setOuterMessage(e.target.value)}
          />
        </div>
        <div>
          <br/>
          {/* <input type="file" onChange={(e) => handleFileUpload(e)} /> */}
          <img alt="card-decoration" src="https://placekitten.com/200/300/" />
          <br/>
          <label>chose placekitten</label>
          <input
            type="checkbox"
            id="https://placekitten.com/200/300/"
            onChange={(e) => handleImageChoice(e)}
          ></input>
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
        <button id="buttonAddcard" onClick={() => CallInCard()}>Add Card</button>
        <button id="buttonDraftcard"> Add to Drafts</button>
        {statusMessage && <div>Your card has been {statusMessage}</div>}
        {error && <div>{error}</div>}
      </form>
    </div>
  );
}
