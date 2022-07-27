import CARDFORM from "./mockdata";
import { useState } from "react";

export default function AllCards() {
  const [cardIndex, setCardIndex] = useState(0);
  const [openCard, setOpenCard] = useState(false);

  console.log(CARDFORM);
  let firstCard = CARDFORM[0];
  let color = CARDFORM[0].color;
  let inner_message = CARDFORM[0].inner_message;
  let outer_message = CARDFORM[0].outer_message;
  let image = CARDFORM[0].image;
  let created_by = CARDFORM[0].created_by;
  console.log(
    firstCard,
    color,
    inner_message,
    outer_message,
    image,
    created_by
  );
  return (
    <>
      <div>
        {" "}
        <h1>USERNAME's cards</h1>
        <h2>card {cardIndex}</h2>
        <img src={image} alt="profile image" />
        <p>created by: {created_by}</p>
        <p>outer message: {outer_message}</p>
        {openCard ? (
          <>
            <p>inner message: {inner_message}</p>
            <div onClick={() => setOpenCard(false)}>
              Click to hide inner message!
            </div>
          </>
        ) : (
          <div onClick={(e) => setOpenCard(true)}>
            Click to see inner message!
          </div>
        )}
      </div>
    </>
  );
}
