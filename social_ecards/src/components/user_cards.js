import { useEffect, useState } from "react";
import { Routes, Route, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { baseURL } from "../helpers/constants";
import SpecificCard from "./specific_card";

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
  const [cardIndex, setCardIndex] = useState(0);
  const navigate = useNavigate();
  const [detailPractice, setDetailPractice] = useState(false);

  axios
    .get(`${baseURL}ecards/`, {
      headers: { Authorization: `Token ${token}` },
    })
    .then((res) => {
      const CARDS = res.data;
      setCardData(CARDS);
      CARDS.map((card) => {
        const cardID = cardData.id;
        return cardID;
      });
      // console.log(res);
    }, [])
    .catch((res) => console.log(res));

  const handleCardSelect = (cardID) => {
    // console.log(cardID);
    setCardIndex(cardID);
    setDetailPractice(true);
    // navigate(
    //   "/specificcard"
    //   // ((cardID = { cardID }), (token = { token }), { cardIndex })
    // );
  };

  return (
    <div>
      <div>
        {cardData.map((card, cardID) => (
          <div className="card" key={card.id}>
            <h1>{card.card_outer_message}</h1>
            <h2>{card.card_inner_message}</h2>
            <p>Card created at: {card.created_at}</p>
            <p>Card updated at: {card.updated_at}</p>
            <img src={card.card_image} alt="place kitten card cover" />

            <div onClick={(e) => handleCardSelect(cardID)}>See/Edit Card</div>

            <Routes>
              <Route
                path="/specificcard/"
                element={
                  <SpecificCard
                    token={token}
                    cardIndex={cardIndex}
                    cardID={cardID}
                  />
                }
              />
            </Routes>
          </div>
        ))}
      </div>
      {detailPractice && <CardDetail cardIndex={cardIndex} token={token} />}
    </div>
  );
};

const CardDetail = ({ token, cardID }) => {
  axios
    .get(
      `${baseURL}ecards/${cardID}`,
      {
        headers: { Authorization: `Token ${token}` },
      },
      []
    )
    .then((res) => {
      console.log(res);
    })
    .catch((res) => console.log(res));
  return (
    <div>
      <h1>Card Detail</h1>
    </div>
  );
};
