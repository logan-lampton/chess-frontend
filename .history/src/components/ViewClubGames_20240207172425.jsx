import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

import axios from "../axiosConfig";

function ViewClubGames() {
  // const {inProgressGames} = location.state.club.inprogress
  // const {completedGames} = location.state.club.completed

  const [games, setGames] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get(`/games/in_progress/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setGames(response.data);
        console.log(games);
      })
      .catch((error) => {
        console.error("Error fetching club data: ", error);
      });
  }, []);

  return (
    <div className='relative'>
      <button className='absolute top-5 right-0 h-15 w-50 bg-gray-900 hover:bg-gray-700 text-white font-bold py-2 px-4 border bg-gray-900 rounded mb-4'>
        <Link
          // to={}
          className='text-white'
        >
          View Completed Games
        </Link>
      </button>
      <div className='grid grid-cols-1 md:grid-cols-4 gap-4 my-20 mx-5w-screen'>
        {games.map((game) => (
          <div key={game.id} className='mt-5 mb-5'>
            <div className='border-2 border-gray-900'>
              <div className='bg-gray-900 text-white font-bold py-2 px-4 border mb-2'>
                <h3>
                  {game.players.white} / {game.players.black}
                </h3>
              </div>
              <div className='ml-5'>
                <p>White Player: {game.players.white}</p>
                <p>Black Player: {game.players.black}</p>
                <p>Winner: {game.result}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ViewClubGames;
