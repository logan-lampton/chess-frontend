import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams, useLocation } from "react-router-dom";
import axios from "../axiosConfig";

function ViewGameHistory() {
  // get 'games/student_games/:id', to: "games#student_games"
  // get request, instead of passing student data down

  // const [games, setGames] = useState([]);

  // const { id } = useParams();

  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   axios
  //     .get(`/games/student_games/${id}`, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     })
  //     .then((response) => {
  //       setGames(response.data);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching club data: ", error);
  //     });
  // }, []);

  return (
    <div>
      <h1>ViewGameHistory</h1>
      <p>{student.student_name}</p>
    </div>
  );
}

export default ViewGameHistory;
