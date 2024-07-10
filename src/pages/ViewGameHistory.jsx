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
      <div className="mt-10 p-4">
        <h1 className="text-2xl font-bold mb-4">{student.student_name}'s Game History</h1>

        {/* Dropdown Filter */}
        <StudentGamesDropdown games={games} student={student} filterGames={filterGames} />

        {/* Searchbar */}
        <input
          type="text"
          placeholder="Search by player name..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="w-full p-2 border border-gray-300 rounded mb-4"
        />

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
    </>
  );
}

export default ViewGameHistory;
