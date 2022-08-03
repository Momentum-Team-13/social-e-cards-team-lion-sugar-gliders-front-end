import { Routes, Route, useParams, Link } from "react-router-dom";

export default function SpecificCard({
  card_inner_message,
  card_outer_message,
  card_created_at,
  card_updated_at,
  card_owner,
  card_image,
  cardID,
  handleCardSelect,
}) {
  // access the params passed through the link
  // axios request

  const params = useParams();
  // console.log(params);

  return (
    <div>
      <h1>{card_outer_message}</h1>
      <h2>{card_inner_message}</h2>
      <div>created at:{card_created_at}</div>
      <div>updated at:{card_updated_at}</div>
      <div>{card_owner}</div>
      <img src={card_image} />
      <div onClick={handleCardSelect}> See Card Details</div>
      <Link to={`/allcards/${cardID}`}></Link>
    </div>
  );
}
