import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";

// club.inprogress
// club.completed

function ViewClubGames() {
  const location = useLocation();

  // const {inProgressGames} = location.state.club.inprogress
  // const {completedGames} = location.state.club.completed

  const [games, setGames] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get(`/games/student_games/${id}`, {
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
  }, []);

  // Sample data for game boxes
  const sampleData = [
    { white: "Dave the Diver", black: "Grendal", result: "pending" },
    { white: "James Bond", black: "Happy Gilmore", result: "pending" },
    { white: "Aragorn", black: "Smeagol", result: "pending" },
    { white: "Funky Monk", black: "Tiny Baby", result: "pending" },
    { white: "Superman", black: "Fresh Prince", result: "pending" },
  ];

  const [activeGames, setActiveGames] = useState(sampleData);

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
        {activeGames.map((game, index) => (
          <div key={index} className='mt-5 mb-5'>
            <div className='border-2 border-gray-900'>
              <div className='bg-gray-900 text-white font-bold py-2 px-4 border mb-2'>
                <h3>
                  {game.white} / {game.black}
                </h3>
              </div>
              <div className='ml-5'>
                <p>White Player: {game.white}</p>
                <p>Black Player: {game.black}</p>
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
