import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../axiosConfig";

function ViewCompletedGames() {
  const { id } = useParams();
  const [games, setGames] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
  });

  return <p>View Completed Games</p>;
}

export default ViewCompletedGames;
