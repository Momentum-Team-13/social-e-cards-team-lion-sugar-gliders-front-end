import { useEffect, useState } from "react";
import axios from "axios";
import { baseURL } from "../helpers/constants";

export default function AllCards({ token, username }) {
  const [totalCards, setTotalCards] = useState(0);
  const [cardIndex, setCardIndex] = useState(0);

  // useEffect = () => {
  axios
    .get(`${baseURL}ecards/`, {
      headers: { Authorization: `Token ${token}` },
    })
    .then((res) => {
      console.log(res);
      let total = res.data.length;
      setTotalCards(total);
      // const CARDS = res.data;
      // console.log(CARDS.map((card) => card.id));
      // setCardData(CARDS);
    }, [])
    .catch((res) => console.log(res));
  // };

  return (
    <div>
      <h1>See all of {username}'s cards</h1>
      <div>
        <Index username={username} totalCards={totalCards} />
        <CardList token={token} />
      </div>
      <div></div>
    </div>
  );
}

const Index = ({ username, totalCards }) => {
  return (
    <>
      <div>
        {username} has {totalCards} total cards
      </div>
    </>
  );
};

const CardList = ({ token }) => {
  const [cardData, setCardData] = useState([]);

  axios
    .get(`${baseURL}ecards/`, {
      headers: { Authorization: `Token ${token}` },
    })
    .then((res) => {
      const CARDS = res.data;
      setCardData(CARDS);
    }, [])
    .catch((res) => console.log(res));

  const EditCard = () => {};

  return (
    <div>
      <div>
        {cardData.map((card) => (
          <div
            className="card"
            key={card.id}
            id={card.id}
            onClick={(e) => console.log(e.target.id)}
          >
            <h1>{card.card_outer_message}</h1>
            <h2>{card.card_inner_message}</h2>
            <p>Card created at: {card.created_at}</p>
            <p>Card updated at: {card.updated_at}</p>
            <img src={card.card_image} alt="place kitten card cover" />

            <div>
              <button onClick={() => EditCard()}>Edit Card</button>
            </div>
          </div>
        ))}
        ;
      </div>
    </div>
  );
};
