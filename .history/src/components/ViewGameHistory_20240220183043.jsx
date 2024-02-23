import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import StudentGamesDropdown from "./StudentGamesDropdown";
import axios from "../axiosConfig";

function ViewGameHistory() {
  // State for everything (main state)
  const [games, setGames] = useState([]);
  // State for games being displayed
  const [gamesDisplayed, setGamesDisplayed] = useState([]);
  // State for searchbar (filter the displayed games, not all the games)
  const [searchbarState, setSearchbarState] = useState([]);

  const { id } = useParams();

  const location = useLocation();
  const { student } = location.state;

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get(`/games/student_games/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        setGames(response.data);
        setGamesDisplayed(response.data);
      })
      .catch((error) => {
        console.error("Error fetching club data: ", error);
      });
  }, []);

  function filterGames(games, result, student, filteredGames) {
    switch (result) {
      case "Wins":
        filteredGames = games.filter((game) => {
          return (
            (game.result === "Black" &&
              game.players.black === student.student_name) ||
            (game.result === "White" &&
              game.players.white === student.student_name)
          );
        });
        break;
      case "Losses":
        filteredGames = games.filter((game) => {
          return (
            (game.result === "Black" &&
              game.players.black !== student.student_name) ||
            (game.result === "White" &&
              game.players.white !== student.student_name)
          );
        });
        break;
      case "Draws":
        filteredGames = games.filter((game) => {
          return game.result === "Draw";
        });
        break;
      case "As White Player":
        filteredGames = games.filter((game) => {
          return game.players.white === student.student_name;
        });
        break;
      case "As Black Player":
        filteredGames = games.filter((game) => {
          return game.players.black === student.student_name;
        });
        break;
      default:
        filteredGames = games;
        break;
    }
    setGamesDisplayed(filteredGames);
  }

  // Search by opponent on the ViewGameHistory
  // Search menu for typing in opponent
  // Only games against a certain opponent

  return (
    <div>
      <h1>ViewGameHistory</h1>
      <p>{student.student_name}</p>
      <StudentGamesDropdown
        games={games}
        setGamesDisplayed={setGamesDisplayed}
        student={student}
        filterGames={filterGames}
      />

      <div className='grid grid-cols-1 md:grid-cols-3 gap-8 my-20 mx-auto text-lg'>
        {gamesDisplayed.map((game) => (
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
                  <p className='mt-3'>
                    Winner:{game.result ? game.result : "pending"}
                  </p>
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
