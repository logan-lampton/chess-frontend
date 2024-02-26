import React, { useState } from "react";
import { useParams } from "react-router-dom";

function ViewCompletedGames() {
  const { id } = useParams();
  const [games, setGames] = useState([]);

  return <p>View Completed Games</p>;
}

export default ViewCompletedGames;
