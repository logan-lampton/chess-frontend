import React from "react";
import { useParams } from "react-router-dom";

function ViewCompletedGames() {
  const { id } = useParams();
  return <p>View Completed Games</p>;
}

export default ViewCompletedGames;
