import SpecificCard from "./specific_card";
import { useState, useEffect } from "react";
import axios from "axios";
import { baseURL } from "../helpers/constants";
import { useParams } from "react-router-dom";

export default function SpecificCardData({ token }) {
  const [card, setCard] = useState({});
  let params = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios
      .get(`${baseURL}ecards/${params.cardID}`, {
        headers: { Authorization: `Token ${token}` },
      })
      .then((res) => {
        console.log(res);
        setCard(res.data);
      });
  });

  return (
    <SpecificCard
      cardID={card.id}
      // key={card.id}
      card_inner_message={card.card_inner_message}
      card_outer_message={card.card_outer_message}
      card_created_at={card.created_at}
      card_updated_at={card.updated_at}
      // card_owner={card.card_owner.username}
      card_image={card.card_image_file ? card.card_image_file : card.card_image}
      // border_color={border_color}
      // card_image={card.card_image}
    />
  );
}
