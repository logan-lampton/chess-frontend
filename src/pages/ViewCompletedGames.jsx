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
  const [allGames, setAllGames] = useState({})
  const [gamesDisplayed, setGamesDisplayed] = useState([]);
  const [currentlyDisplaying, setCurrentlyDisplaying] = useState('')
  const [editingGameResult, setEditingGameResult] = useState(null);
  const [confirmationPopUp, setConfirmationPopUp] = useState({
    message: "",
    isLoading: false,
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get(`/games/club_games/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setAllGames(response.data)
        if(response.data.gamesInProgress.length > 0){
        setGamesDisplayed(response.data.gamesInProgress)
        setCurrentlyDisplaying("inProgress")
        }
        else{
        setGamesDisplayed(response.data.completedGames);
        setCurrentlyDisplaying("completed")
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const groupGamesByDate = (games) => {
    return games.reduce((acc, game) => {
      const date = game.formatted_date;
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(game);
      return acc;
    }, {});
  };
  

  const handleUpdateResult = (id, dropdownResult) => {
    if(currentlyDisplaying === 'inProgress'){
      const updatedGamesInProgress = allGames.gamesInProgress.filter((game)=> game.id !== id);
      const updatedGame = allGames.gamesInProgress.find((game)=>game.id === id);
      updatedGame.result = dropdownResult;
      const updatedCompletedGames = [...allGames.completedGames, updatedGame]
      setAllGames({
        gamesInProgress: updatedGamesInProgress,
        completedGames: updatedCompletedGames
      });
      setGamesDisplayed(updatedGamesInProgress)
    }
    else{
      const updatedGames = allGames.completedGames.map((game) =>
        game.id === id ? { ...game, result: dropdownResult } : game
      );
      setAllGames({...allGames, completedGames:updatedGames});
      setGamesDisplayed(updatedGames);
    }
  }

  const handleDeletedGame = (id) =>{
    if (currentlyDisplaying === 'inProgress'){
      const filteredGames = allGames.gamesInProgress.filter((game) => game.id !== id);
      setAllGames({...allGames, gamesInProgress: filteredGames});
      setGamesDisplayed(filteredGames)
    }
    else{
      const filteredGames = allGames.completedGames.filter((game) => game.id !== id);
      setAllGames({...allGames, completedGames: filteredGames});
      setGamesDisplayed(filteredGames)
    }
  }

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
      handleDeletedGame(gameId)
    } catch (error) {
      console.log("Error deleting game: ", error);
    }
  };

  const showCompletedGames = () => {
    setGamesDisplayed(allGames.completedGames)
    setCurrentlyDisplaying('completed')
  }

  const showInProgressGames = ()  => {
    setGamesDisplayed(allGames.gamesInProgress)
    setCurrentlyDisplaying('inProgress')
  }

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
      handleUpdateResult(gameId, dropdownResult)
      clearEditingGameResult();
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

  const clearEditingGameResult = () => {
    setEditingGameResult(null)
  }

  const groupedGames = groupGamesByDate(searchFilteredGames);

  // Get the sorted dates in descending order
  const sortedDates = Object.keys(groupedGames).sort((a, b) => new Date(b) - new Date(a));
  
  return (
    <>
      <Back to={`/clubs/${id}`} />
      <div>
        <div className='flex justify-between mt-10'>
          <div className='mt-5'>
            <h1>{currentlyDisplaying === 'completed' ? 'Completed Games' : 'In-Progress Games'}</h1>
          </div>
          {currentlyDisplaying === 'inProgress' ? (
            <button onClick={showCompletedGames} className='mt-7 mr-8 h-15 w-50 bg-gray-900 hover:bg-gray-700 text-white font-bold py-2 px-4 border bg-gray-900 rounded'>
              Show Completed Club Games
            </button>
          ) : (
            <button onClick={showInProgressGames} className='mt-7 mr-8 h-15 w-50 bg-gray-900 hover:bg-gray-700 text-white font-bold py-2 px-4 border bg-gray-900 rounded'>
              Show In-Progress Club Games
            </button>
          )}
        </div>
        <div className='mt-5 ml-3 mb-12'>
          <h2>Search Games</h2>
          <input
            type='text'
            placeholder='Search by player name...'
            value={searchQuery}
            onChange={handleSearchChange}
            className='border p-2 rounded'
          />
        </div>
        {sortedDates.map((date) => (
          <div key={date} className='mb-8'>
            <h2 className='text-xl font-bold mb-4'>{date}</h2>
            <table className='w-full table-auto'>
              <thead>
                <tr className='bg-gray-200'>
                  <th className='px-4 py-2'>Players</th>
                  <th className='px-4 py-2'>Result</th>
                  <th className='px-4 py-2'>Actions</th>
                </tr>
              </thead>
              <tbody>
                {groupedGames[date].map((game) => (
                  <tr key={game.id} className='border-t'>
                    <td className='px-4 py-2'>
                      {game.player_name_white} / {game.player_name_black}
                    </td>
                    <td className='px-4 py-2'>
                      {game.result === "White"
                        ? `${game.player_name_white} Won`
                        : game.result === "Black"
                        ? `${game.player_name_black} Won`
                        : game.result === "Draw"
                        ? "Draw"
                        : "Pending"}
                    </td>
                    <td className='px-4 py-2'>
                      <div className='flex items-center'>
                        <button
                          onClick={() => handleDeleteClick(game.id)}
                          className='bg-red-600 hover:bg-red-400 text-white text-sm font-bold border bg-gray-900 rounded px-2 py-1 mr-2'
                        >
                          Delete
                        </button>
                        {editingGameResult === game.id ? (
                          <Dropdown patchGame={patchGame} gameId={game.id} clearEditingGameResult={clearEditingGameResult} />
                        ) : (
                          <button
                            onClick={() => setEditingGameResult(game.id)}
                            className='bg-slate-50 hover:bg-white text-black text-sm font-bold py-2 px-4 border bg-gray-400 rounded mr-1'
                          >
                            Edit Result
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {confirmationPopUp.isLoading && (
              <ConfirmationPopUp
                onDialogue={sureDelete}
                message={confirmationPopUp.message}
              />
            )}
          </div>
        ))}
      </div>
    </>
  );
}

export default ViewCompletedGames;
