import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Dropdown from "./Dropdown";
import axios from "../axiosConfig";

function ViewCompletedGames() {
  const { id } = useParams();
  const [games, setGames] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [gamesDisplayed, setGamesDisplayed] = useState([]);
  const [editingGameResult, setEditingGameResult] = useState(null);

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

  const deleteGame = async (gameId) => {
    const token = localStorage.getItem("token");
    try {
      const deleteResponse = await axios.delete(
        `http://localhost:3000/games/${gameId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Game deleted: ", deleteResponse.data);
      const filteredGames = gamesDisplayed.filter((game) => game.id !== gameId);
      setGamesDisplayed(filteredGames);
    } catch (error) {
      console.log("Error deleting game: ", error);
    }
  };

  const patchGame = async (gameId, dropdownResult) => {
    const token = localStorage.getItem("token");
    try {
      const patchResponse = await axios.patch(
        `http://localhost:3000/games/${gameId}`,
        {
          result: dropdownResult,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Game patched successfully: ", patchResponse.data);
      const updatedGames = gamesDisplayed.map((game) =>
        game.id === gameId ? { ...game, result: dropdownResult } : game
      );
      setGamesDisplayed(updatedGames);
      setEditingGameResult(null);
    } catch (error) {
      console.log("Error patching game: ", error);
    }
  };

  const closeDropdown = () => {
    setEditingGameResult(null);
  };

  return (
    <div>
      <div className='flex mt-10'>
        <div className='mt-10'>
          <h1>Completed Games</h1>
        </div>
        <button className='mt-12 h-15 w-50 bg-gray-900 hover:bg-gray-700 text-white font-bold py-2 px-4 border bg-gray-900 rounded'>
          <Link to={`/games/in_progress/${id}`} className='text-white'>
            View In-Progress Games
          </Link>
        </button>
      </div>
      <div className='mt-5 ml-3'>
        <h2>Search Games</h2>
        {/* Searchbar */}
        <input
          type='text'
          placeholder='Search by player name...'
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-8 my-5 mx-auto text-lg'>
        {searchFilteredGames.map((game) => (
          <div key={game.id} className='mb-5 p-8'>
            <div className='border-2 border-gray-900'>
              <div className='bg-gray-900 text-white font-bold py-2 px-4 border mb-2 flex justify-between'>
                <h3>
                  {game.players.white} / {game.players.black}
                </h3>
                <button
                  onClick={() => deleteGame(game.id)}
                  className='bg-red-600 hover:bg-red-400 text-white text-sm font-bold border bg-gray-900 rounded'
                >
                  Delete
                </button>
              </div>
              <div className='ml-5 p-1'>
                <p className='mb-1'>White Player: {game.players.white}</p>
                <p>Black Player: {game.players.black}</p>
                <div className='flex mt-3 mb-2'>
                  <p className='mt-3'>
                    Result:{" "}
                    {game.result === "White"
                      ? `${game.players.white} Won`
                      : game.result === "Black"
                      ? `${game.players.black} Won`
                      : "Draw"}
                  </p>
                  <div className='ml-auto mr-3'>
                    {editingGameResult === game.id ? (
                      <Dropdown
                        patchGame={patchGame}
                        gameId={game.id}
                        onClose={closeDropdown}
                      />
                    ) : (
                      <button
                        onClick={() => setEditingGameResult(game.id)}
                        className='bg-slate-50 hover:bg-white text-black text-sm font-bold py-2 px-4 border bg-gray-400 rounded mr-1'
                      >
                        Edit Result
                      </button>
                    )}
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

export default ViewCompletedGames;
