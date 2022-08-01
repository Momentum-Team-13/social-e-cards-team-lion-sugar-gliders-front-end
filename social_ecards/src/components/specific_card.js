import { Routes, Route, useParams } from "react-router-dom";

export default function SpecificCard({ token, cardIndex, cardID }) {
  // access the params passed through the link
  // axios request

  const params = useParams();
  console.log(params);
  return (
    <div>
      <h1>Specific Card Details</h1>
    </div>
  );
}
