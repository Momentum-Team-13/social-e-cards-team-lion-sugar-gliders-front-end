import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { baseURL } from "../helpers/constants";
import { useState, useEffect } from "react";

export default function DeleteCard({ token }) {
  let navigate = useNavigate();
  let params = useParams();
  let cardID = params.cardID;
  console.log(params);
  console.log(cardID);

  const answerNo = () => {
    navigate("/seeprofile");
  };

  const answerYes = () => {
    axios
      .delete(`${baseURL}ecards/${cardID}`, {
        headers: { Authorization: `Token ${token}` },
      })
      .then(navigate("/seeprofile"));
  };
  return (
    <div className="deletecard">
      <div>Are You Sure You Want to Delete?</div>
      <div onClick={answerYes}>Yes</div>
      <div onClick={answerNo}>No</div>
    </div>
  );
}
