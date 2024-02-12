import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "../axiosConfig";
import Dropdown from "./Dropdown";

function ViewClubGames() {
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
      })
      .catch((error) => {
        console.error("Error fetching club data: ", error);
      });
  }, [id]);

  useEffect(() => {
    console.log(games);
  }, [games]);

  const deleteGame = async (gameId) => {
    const token = localStorage.getItem('token');
    try {
      const deleteResponse = await axios.delete(`http://localhost:3000/games/in_progress/${gameId}`,
      {
        headers: {
            Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log('Game deleted: ', deleteResponse)
    const getResponse = await axios.get(`/games/in_progress/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      setGames(getResponse);
    })
    .catch((error) => {
      console.error('Error fetching club data: ', error);
    })
  }

  return (
    <div className='relative'>
      <button className='absolute top-12 right-10 h-15 w-50 bg-gray-900 hover:bg-gray-700 text-white font-bold py-2 px-4 border bg-gray-900 rounded mb-4'>
        <Link
          // to={}
          className='text-white'
        >
          View Completed Games
        </Link>
      </button>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-8 my-20 mx-auto text-lg'>
        {games.map((game) => (
          <div key={game.id} className='mt-5 mb-5 p-8'>
            <div className='border-2 border-gray-900'>
              <div className='bg-gray-900 text-white font-bold py-2 px-4 border mb-2 flex justify-between'>
                <h3>
                  {game.players.white} / {game.players.black}
                </h3>
                <button onClick={deleteGame} className='text-black p-1 text-sm ml-2'>
                  Cancel Game
                </button>
              </div>
              <div className='ml-5 p-1'>
                <p className='mb-1'>White Player: {game.players.white}</p>
                <p>Black Player: {game.players.black}</p>
                <div className='flex mt-3 mb-2'>
                  <p className='mt-3'>Winner:</p>
                  <div className='ml-2 align-middle'>
                    <Dropdown />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ViewClubGames;
