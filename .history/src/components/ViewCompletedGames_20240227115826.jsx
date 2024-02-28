import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "../axiosConfig";

function ViewCompletedGames() {
  const { id } = useParams();
  const [games, setGames] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [gamesDisplayed, setGamesDisplayed] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get(`/games/completed/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setGames(response.data);
        setGamesDisplayed(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  function handleSearchChange(event) {
    setSearchQuery(event.target.value);
  }

  const filterGamesBySearch = (gamesDisplayed) => {
    return (
      gamesDisplayed.players.black
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      gamesDisplayed.players.white
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
    );
  };

  const searchFilteredGames = gamesDisplayed.filter((game) => {
    return filterGamesBySearch(game);
  });

  console.log(games);
  console.log("displayed", gamesDisplayed);

  return (
    <div>
      <div classname='mt-5'>
        <h1>Completed Games</h1>
      </div>
      {/* Searchbar */}
      <input
        type='text'
        placeholder='Search by player name...'
        value={searchQuery}
        onChange={handleSearchChange}
      />
      <div className='grid grid-cols-1 md:grid-cols-3 gap-8 my-20 mx-auto text-lg'>
        {searchFilteredGames.map((game) => (
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
                  <p className='mt-3'>Winner: {game.result}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ViewCompletedGames;
