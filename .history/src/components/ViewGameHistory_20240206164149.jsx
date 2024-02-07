import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams, useLocation } from "react-router-dom";
import axios from "../axiosConfig";

function ViewGameHistory() {
  const location = useLocation();

  // get 'games/student_games/:id', to: "games#student_games"
  // get request, instead of passing student data down

  const { student: student } = location.state;

  return (
    <div>
      <h1>ViewGameHistory</h1>
      <p>{student.student_name}</p>
    </div>
  )
}

export default ViewGameHistory