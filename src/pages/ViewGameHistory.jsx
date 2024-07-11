import React, { useState, useEffect } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import axios from '../axiosConfig';
import Back from '../components/Back'; 
import StudentGamesDropdown from '../components/StudentGamesDropdown'; 

function ViewGameHistory() {
  // State for everything (main state)
  const [games, setGames] = useState([]);
  // State for games being displayed
  const [gamesDisplayed, setGamesDisplayed] = useState([]);
  // State for searchbar (filter the displayed games, not all the games)
  const [searchQuery, setSearchQuery] = useState('');

  const { id } = useParams();
  const location = useLocation();
  const { student } = location.state;

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios
      .get(`/games/student_games/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const sortedGames = response.data.sort((a, b) => new Date(b.formatted_date) - new Date(a.formatted_date));
        setGames(sortedGames);
        setGamesDisplayed(sortedGames);
      })
      .catch((error) => {
        console.error('Error fetching club data: ', error);
      });
  }, [id]);

  function filterGames(games, result, student) {
    let filteredGames = games;
    switch (result) {
      case 'Wins':
        filteredGames = games.filter((game) => {
          return (
            (game.result === 'Black' && game.player_name_black === student.student_name) ||
            (game.result === 'White' && game.player_name_white === student.student_name)
          );
        });
        break;
      case 'Losses':
        filteredGames = games.filter((game) => {
          return (
            (game.result === 'Black' && game.player_name_black !== student.student_name) ||
            (game.result === 'White' && game.player_name_white !== student.student_name)
          );
        });
        break;
      case 'Draws':
        filteredGames = games.filter((game) => game.result === 'Draw');
        break;
      case 'As White Player':
        filteredGames = games.filter((game) => game.player_name_white === student.student_name);
        break;
      case 'As Black Player':
        filteredGames = games.filter((game) => game.player_name_black === student.student_name);
        break;
      default:
        filteredGames = games;
        break;
    }
    setGamesDisplayed(filteredGames);
  }

  // Search by opponent
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Filter by the dropdown selected and then only include games containing the opponent typed into searchbar
  const filterGamesBySearch = (game) => {
    return (
      game.player_name_black.toLowerCase().includes(searchQuery.toLowerCase()) ||
      game.player_name_white.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const searchFilteredGames = gamesDisplayed.filter((game) => filterGamesBySearch(game));

  return (
    <>
      <Back to={`/students/${id}`} />
      <div className="mt-10 p-4 text-center">
        <h1 className="text-3xl font-bold mb-6">{student.student_name}'s Game History</h1>

        {/* Main layout */}
        <div className="flex flex-col md:flex-row">
          {/* Student stats section */}
          <div className="mb-6 md:mr-10 md:mb-0 md:ml-4 w-full md:w-1/4">
            <div className="bg-gray-100 p-6 rounded shadow border-2 border-gray-300">
              <h2 className="text-lg font-semibold mb-4 text-center">{student.student_name}'s Gams Stats</h2>
              <p className="text-base mb-2">Number of Games Played: {student.number_of_games_played}</p>
              <p className="text-base mb-2">Total Wins: {student.total_wins}</p>
              <p className="text-base mb-2">Win Rate: {Math.floor(student.win_rate * 100)}%</p>
              <p className="text-base mb-2">White Wins: {student.num_white_wins}</p>
              <p className="text-base mb-2">Win Rate as White: {Math.floor(student.win_rate_white)}%</p>
              <p className="text-base mb-2">Black Wins: {student.num_black_wins}</p>
              <p className="text-base mb-2">Win Rate as Black: {Math.floor(student.win_rate_black)}%</p>
            </div>
          </div>

          {/* Games table section */}
          <div className="w-full md:w-3/4">
            {/* Searchbar and Dropdown Filter */}
            <div className="flex mb-4">
              <input
                type="text"
                placeholder="Search by player name..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
              <StudentGamesDropdown
                games={games}
                student={student}
                filterGames={filterGames}
                className="ml-4"
              />
            </div>

            {/* Games Table */}
            <div className="overflow-x-auto">
              <table className="w-full table-auto border-collapse">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="px-4 py-2 border">Played as</th>
                    <th className="px-4 py-2 border">Opponent</th>
                    <th className="px-4 py-2 border">Result</th>
                    <th className="px-4 py-2 border">Date Played</th>
                  </tr>
                </thead>
                <tbody>
                  {searchFilteredGames.map((game) => (
                    <tr key={game.id} className="hover:bg-gray-100">
                      <td className="px-4 py-2 border">
                        {game.player_name_white === student.student_name ? 'White' : 'Black'}
                      </td>
                      <td className="px-4 py-2 border text-blue-500 hover:underline">
                        {game.player_name_white === student.student_name ? (
                          <Link to={`/students/${game.black}`}>{game.player_name_black}</Link>
                        ) : (
                          <Link to={`/students/${game.white}`}>{game.player_name_white}</Link>
                        )}
                      </td>
                      <td className="px-4 py-2 border">
                        {game.result === 'Draw'
                          ? 'Draw'
                          : game.result === 'White'
                          ? game.player_name_white === student.student_name
                            ? 'Win'
                            : 'Loss'
                          : game.player_name_black === student.student_name
                          ? 'Win'
                          : 'Loss'}
                      </td>
                      <td className="px-4 py-2 border">{game.formatted_date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ViewGameHistory;
