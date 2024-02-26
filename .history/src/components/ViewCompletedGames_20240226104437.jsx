import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "../axiosConfig";

function ViewCompletedGames() {
  const { id } = useParams();
  const [games, setGames] = useState([]);

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
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  console.log(games);

  return (
    <>
      <p>Placeholder</p>
    </>
    // <div>
    //   <div className='grid grid-cols-1 md:grid-cols-3 gap-8 my-20 mx-auto text-lg'>
    //     {games.map((game) => (
    //       <div key={game.id} className='mt-5 mb-5 p-8'>
    //         <div className='border-2 border-gray-900'>
    //           <div className='bg-gray-900 text-white font-bold py-2 px-4 border mb-2 flex justify-between'>
    //             <h3>
    //               {game.players.white} / {game.players.black}
    //             </h3>
    //           </div>
    //         </div>
    //       </div>
    //     ))}
    //   </div>
    // </div>
  );
}

export default ViewCompletedGames;
