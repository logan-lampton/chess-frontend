import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams, useLocation } from "react-router-dom";
import axios from "../axiosConfig";

function ViewGameHistory() {
  // get 'games/student_games/:id', to: "games#student_games"
  // get request, instead of passing student data down

  const [games, setGames] = useState([]);

  const { id } = useParams();

  const location = useLocation();
  const { student } = location.state

  console.log(location.state)

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get(`/games/student_games/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response.data)
        setGames(response.data);
      })
      .catch((error) => {
        console.error("Error fetching club data: ", error);
      });
  }, []);

  return (
    <div>
      <h1>ViewGameHistory</h1>
      <p>{student.student_name}</p>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-8 my-20 mx-auto text-lg'>
        {games.map((game) => (
          <div key={game.id} className='mt-5 mb-5 p-8'>
            <div className='border-2 border-gray-900'>
              <div className='bg-gray-900 text-white font-bold py-2 px-4 border mb-2 flex justify-between'>
                <h3>
                  {game.players.white} / {game.players.black}
                </h3>
              </div>
              <div className='ml-5 p-1'>
                <p className='mb-1'>White Player: {game.players.white}</p>
                <p>Black Player: {game.players.black}</p>
                <div className='flex mt-3 mb-2'>
                  <p className='mt-3'>Winner:{game.result?game.result:"pending"}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ViewGameHistory;
