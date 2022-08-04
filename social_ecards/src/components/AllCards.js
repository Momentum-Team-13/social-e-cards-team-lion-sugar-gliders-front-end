import { useEffect, useState } from "react";
import { Routes, Route, useNavigate, Link, useParams } from "react-router-dom";
import axios from "axios";
import { baseURL } from "../helpers/constants";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Carousel } from "react-bootstrap";
import SpecificCard from "./specific_card";

export default function AllCards({ token, username }) {
  const [totalCards, setTotalCards] = useState(0);
  const [cardIndex, setCardIndex] = useState(0);
  const [cardData, setCardData] = useState([]);
  const navigate = useNavigate();
  const [detailPractice, setDetailPractice] = useState(false);

  useEffect(() => {

    axios
      .get(`${baseURL}ecards/`, {
        headers: { Authorization: `Token ${token}` },
      })
      .then((res) => {
        const CARDS = res.data;
        let total = res.data.length;
        setTotalCards(total);
        setCardData(CARDS);
        CARDS.map((card) => {
          const cardID = cardData.id;
          return cardID;
        });
      }, [])
      .catch((res) => console.log(res));
  }, [])

  return (
    <div>
      <h2>See all cards</h2>
      <div className="containerallcards">
        <Index username={username} totalCards={totalCards} />
        <CardList cardData={cardData} token={token} />
      </div>
      <div></div>
    </div>
  );
}

const Index = ({ username, totalCards }) => {
  return (
    <>
      <div id="hasallcards" style={{ marginLeft:"40px" }}>
        {username} has {totalCards} total cards
      </div>
    </>
  );
};

const CardList = ({ token, cardData }) => {
  const [detailPractice, setDetailPractice] = useState(false);
  const [cardIndex, setCardIndex] = useState(0);

  // Carousel
  const settings = {
    dots: true,
    infinite: true,
    speed: 280,
    slidesToShow: 5,
    slidesToScroll: 1,
    initialSlide: 0,
    adaptiveHeight: true,
    rows: 1,
  };


  const handleCardSelect = ({ card }) => {
    // const { cardID } = useParams;
    let cardID = card.id;
    console.log(cardID);
    setCardIndex(cardID);
    setDetailPractice(true);
    // navigate(
    //   "/specificcard"
    //   // ((cardID = { cardID }), (token = { token }), { cardIndex })
    // );
  };

  return (
    <div>
      <div className="containerallcards">
        <Slider {...settings}>
          {cardData.map((card, cardID) => (
            <div className="card">
              <SpecificCard
                cardID={card.id}
                // key={card.id}
                card_inner_message={card.card_inner_message}
                card_outer_message={card.card_outer_message}
                card_created_at={card.created_at}
                card_updated_at={card.updated_at}
                card_owner={card.card_owner.username}
                card_image={card.card_image}
                handleCardSelect={handleCardSelect}
              />

              <div onClick={(e) => handleCardSelect({ card })}></div>
            </div>
          ))}
          {/* <Link to={`/specificcard${cardID}`}></Link> */}
        </Slider>
      </div>
    </div>
  );
};
