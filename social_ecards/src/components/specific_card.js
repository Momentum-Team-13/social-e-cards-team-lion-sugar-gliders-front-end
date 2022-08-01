import { Routes, Route } from "react-router-dom";

export default function SpecificCard({ token, cardIndex, cardID }) {
  // access the params passed through the link
  // axios request
  console.log("Hello");
  console.log(cardIndex);
  console.log(cardID);
  return (
    <div>
      <h1>Specific Card Details</h1>
    </div>
  );
}
