import { useEffect, useState } from "react";
import axios from "axios";
import { baseURL } from "../helpers/constants";

export default function AllCards({ token, username }) {
  const [cardData, setCardData] = useState([]);

  useEffect = () => {
    axios
      .get(`${baseURL}ecards/`, {
        headers: { Authorization: `Token ${token}` },
      })
      .then((res) => {
        console.log(res.data);
        const CARDS = res.data;
        setCardData(CARDS);
      });
  };

  return (
    <div>
      <h1>See all of {username}'s cards</h1>
      <div></div>
    </div>
  );
}
