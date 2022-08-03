import axios from "axios";
import { useEffect, useInsertionEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { baseURL } from "../helpers/constants";

export default function CardDetail({ token }) {
  const [card, setCard] = useState(null);
  const { cardID } = useParams();
  const [error, setError] = useState([]);

  useEffect(() => {
    axios
      .get(`${baseURL}ecards/${cardID}`, {
        headers: { Authorization: `Token ${token}` },
      })
      .then((res) => console.log(res));
  }, [cardID, token]);

  return (
    <>
      {card && (
        <>
          <div>
            <h1>{card.card_outer_message}</h1>
          </div>
        </>
      )}
    </>
  );
}
