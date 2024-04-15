import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Dropdown from "../components/Dropdown";
import axios from "../axiosConfig";
import ConfirmationPopUp from "../components/ConfirmationPopUp";
import Back from "../components/Back";

// POSSIBLY: toggle for games:
// If true show completed games
// if false show in-progress games

function ViewCompletedGames() {
  const { id } = useParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [gamesDisplayed, setGamesDisplayed] = useState([]);
  const [editingGameResult, setEditingGameResult] = useState(null);
  const [confirmationPopUp, setConfirmationPopUp] = useState({
    message: "",
    isLoading: false,
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get(`/games/completed/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
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
      gamesDisplayed.player_name_black
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      gamesDisplayed.player_name_white
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

  const gameRef = useRef();

  const handleConfirmation = (message, isLoading) => {
    setConfirmationPopUp({
      message,
      isLoading,
    });
  };

  const handleDeleteClick = (id) => {
    handleConfirmation("Are you sure you want to delete?", true);
    gameRef.current = id;
  };

  const sureDelete = async (selection, id) => {
    console.log("Game ID to delete: ", id);
    if (selection) {
      await deleteGame(gameRef.current);
      setConfirmationPopUp({ message: "", isLoading: false });
    } else {
      setConfirmationPopUp({ message: "", isLoading: false });
    }
  };

  return (
    <>
    <Back to = {`/clubs/${id}`}/>
    <div>
      <div className='flex justify-between mt-10'>
        <div className='mt-5'>
          <h1>Completed Games</h1>
        </div>
        <button className='mt-7 mr-8 h-15 w-50 bg-gray-900 hover:bg-gray-700 text-white font-bold py-2 px-4 border bg-gray-900 rounded'>
          <Link to={`/games/in_progress/${id}`} className='text-white'>
            View In-Progress Games
          </Link>
        </button>
      </div>
      <div className='mt-5 ml-3 mb-12'>
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
                  {game.player_name_white} / {game.player_name_black}
                </h3>
                <button
                  onClick={() => handleDeleteClick(game.id)}
                  className='bg-red-600 hover:bg-red-400 text-white text-sm font-bold border bg-gray-900 rounded'
                >
                  Delete
                </button>
              </div>
              <div className='ml-5 p-1'>
                <p className='mb-1'>White Player: {game.player_name_white}</p>
                <p>Black Player: {game.player_name_black}</p>
                <div className='flex mt-3 mb-2'>
                  <p className='mt-3'>
                    Result:{" "}
                    {game.result === "White"
                      ? `${game.player_name_white} Won`
                      : game.result === "Black"
                      ? `${game.player_name_black} Won`
                      : "Draw"}
                  </p>
                  <div className='ml-auto mr-3'>
                    {editingGameResult === game.id ? (
                      <Dropdown patchGame={patchGame} gameId={game.id} />
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
            {confirmationPopUp.isLoading && (
              <ConfirmationPopUp
                onDialogue={sureDelete}
                message={confirmationPopUp.message}
              />
            )}
          </div>
        ))}
      </div>
    </div>
    </>
  );
}

export default ViewCompletedGames;
