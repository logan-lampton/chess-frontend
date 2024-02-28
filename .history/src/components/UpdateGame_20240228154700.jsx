import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "../axiosConfig";

function UpdateGame() {
  const navigate = useNavigate();
  const location = useLocation();
  console.log("location", location);

  const patchGame = async (gameId) => {
    const token = localStorage.getItem("token");
    try {
      const patchResponse = await axios.patch(
        `http://localhost:3000/games/${gameId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Game patched successfully: ", patch.Response.data);
    } catch (error) {
      console.log("Error patching game: ", error);
    }
  };

  return <h1>Update Game placeholder</h1>;
}

export default UpdateGame;
