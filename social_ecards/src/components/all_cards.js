import { useEffect, useState } from "react";
import { Routes, Route, useNavigate, Link, useParams } from "react-router-dom";
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
      console.log(res.data);
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
      <h1>See all cards</h1>
      <div>
        <Index username={username} totalCards={totalCards} />
        <CardList token={token} username={username} />
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

const CardList = ({ token, username }) => {
  const [cardData, setCardData] = useState([]);
  const [cardIndex, setCardIndex] = useState(0);
  const navigate = useNavigate();
  const [detailPractice, setDetailPractice] = useState(false);
  const [canEdit, setCanEdit] = useState(false);
  const [cardOwner, setCardOwner] = useState("");

  axios
    .get(`${baseURL}ecards/`, {
      headers: { Authorization: `Token ${token}` },
    })
    .then((res) => {
      const CARDS = res.data;
      setCardData(CARDS);
      CARDS.map((card) => {
        setCardOwner(card.card_owner.username);
        const cardID = cardData.id;
        return cardID;
      });
    }, [])
    .catch((res) => console.log(res));

  // useEffect = () => {
  //   if ({ username } === cardOwner) {
  //     return <button>Edit Card</button>;
  //   }
  // };

  const handleCardSelect = ({ cardID }) => {
    console.log(cardID);
    // const { cardID } = useParams;
    // let cardID = card.id;
    // console.log(card);
    // setCardIndex(cardID);
    // navigate(
    //   "/specificcard"
    //   // ((cardID = { cardID }), (token = { token }), { cardIndex })
    // );
  };

  return (
    <div>
      <div>
        {cardData.map((card) => (
          <div className="card">
            <SpecificCard
              cardID={card.id}
              // key={card.id}
              card_inner_message={card.card_inner_message}
              card_outer_message={card.card_outer_message}
              card_created_at={card.card_created_at}
              card_updated_at={card.card_updated_at}
              card_owner={card.card_owner.username}
              card_image={card.card_image}
              handleCardSelect={handleCardSelect}
            />
            {/* <div onClick={(e) => handleCardSelect({ card })}>See Card</div> */}
          </div>
        ))}
        {/* <Link to={`/specificcard${cardID}`} /> */}
      </div>
    </div>
  );
};
