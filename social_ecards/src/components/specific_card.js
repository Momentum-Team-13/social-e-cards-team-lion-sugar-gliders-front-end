import { Routes, Route, useParams, Link } from "react-router-dom";
import { useState } from "react";
import moment from "moment";

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
  const [expanded, setExpanded] = useState(false);
  // access the params passed through the link
  // axios request

  const params = useParams();
  // console.log(params);

  return (
    <div>
      <div
        className="img-allcards"

        // style={{ borderColor: `#${color}` }}
      >
        {/* <img className="img" src={card_image} /> */}
        <div className="card-bottom">
          <h1>{card_outer_message}</h1>
          <div>Created By: {card_owner}</div>
          <img src={card_image} />
          {!expanded ? (
            <div onClick={(e) => setExpanded(true)}>see inner message</div>
          ) : (
            <InnerMessage
              card_inner_message={card_inner_message}
              card_created_at={card_created_at}
              card_updated_at={card_updated_at}
            />
          )}

          <Link to={`/allcards/${cardID}`}>See Card Details</Link>
        </div>
      </div>
    </div>
  );
}

const InnerMessage = ({
  card_inner_message,
  card_created_at,
  card_updated_at,
}) => {
  return (
    <div>
      {" "}
      <div>{card_inner_message}</div>
      <div>
        <p>
          created:
          {moment(card_created_at).format("MMM Do YY, h:mm a")}
        </p>
        updated: {moment(card_updated_at).format("MMM Do YY, h:mm a")}
      </div>
    </div>
  );
};
