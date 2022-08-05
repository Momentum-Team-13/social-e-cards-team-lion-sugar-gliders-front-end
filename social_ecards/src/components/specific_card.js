import { Routes, Route, useParams, Link } from "react-router-dom";

export default function SpecificCard({
  card_inner_message,
  card_outer_message,
  card_created_at,
  card_updated_at,
  card_owner,
  card_image,
  cardID,
  HandleCardSelect,
}) {
  // access the params passed through the link
  // axios request

  const params = useParams();
  // console.log(params);

  return (
    <div>
      <div className="img-allcards">
        <img className="img" src={card_image} />
        <div className="innerOuterText-allcards">
          <div>{card_outer_message}</div>
          <div>{card_inner_message}</div></div>
        <div className="card-bottom">
          <div>created at:{card_created_at}</div>
          <div>updated at:{card_updated_at}</div>
          <div>{card_owner}</div>
          {/* <img src={card_image} /> */}
          <Link to={`/allcards/${cardID}`}>See Card Details</Link>
        </div>
      </div>
    </div>
  );
}
