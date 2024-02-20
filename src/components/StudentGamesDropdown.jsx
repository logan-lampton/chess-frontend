import React, { useState } from "react";
import { AiOutlineCaretUp, AiOutlineCaretDown } from "react-icons/ai";

function Dropdown({ games, setGamesDisplayed, student }) {
  const [isOpen, setIsOpen] = useState(false)
  const [result, setResult] = useState("Showing all games")

// Game history function
// Function that generates array on click
// Set the display in the function, then pass the function down to this

const win_filtered = games.filter((game) => {
    return game.result === "Black" && game.players.black === student.student_name || 
           game.result === "White" && game.players.white === student.student_name;
});

const loss_filtered = games.filter((game) => {
    return game.result === "Black" && game.players.black !== student.student_name || 
        game.result === "White" && game.players.white !== student.student_name;
});


const draw_filtered = games.filter((game) => {
    return game.result === "Draw"
})

const white_filtered = games.filter((game) => {
    return game.players.white === student.student_name
})

const black_filtered = games.filter((game) => {
    return game.players.black === student.student_name
})

// Search by opponent on the ViewGameHistory

  return (
    <div>
      <button
        onClick={() => setIsOpen((prevState) => !prevState)}
        className=' relative flex flex-column bg-green-100 p-2 flex items-center text-lg border-4'
      >
        {result}
        {!isOpen ? <AiOutlineCaretUp /> : <AiOutlineCaretDown />}
      </button>
      {isOpen && (
        <div className='bg-green-100 absolute mt-2 rounded-lg p-2 text-lg border-2 border-black cursor-pointer'>
            {result !== "Showing all games" && (
                <div
                onClick={() => {
                //   patchGame(gameId, "White")
                    setResult("Showing all games")
                    setIsOpen(false)
                    console.log("LOOK HERE!!!", win_filtered)

                    setGamesDisplayed(games)
                    
                }}
                className='hover:bg-green-50 hover:border-2 border-black rounded'
                >
                <h3>All Games</h3>
                </div>
            )}
          <div
            onClick={() => {
            //   patchGame(gameId, "White")
                setResult("Wins")
                setIsOpen(false)
                console.log("LOOK HERE!!!", win_filtered)

                setGamesDisplayed(win_filtered)
                
            }
            }
            className='hover:bg-green-50 hover:border-2 border-black rounded'
          >
            <h3>Wins</h3>
          </div>
          <div
            onClick={() => {
                setGamesDisplayed(loss_filtered)
            //   patchGame(gameId, "Black")
                setResult("Losses")
                setIsOpen(false)
            }
            }
            className='hover:bg-green-50 hover:border-2 border-black rounded'
          >
            <h3>Losses</h3>
          </div>
          <div
            onClick={() => {
                setGamesDisplayed(draw_filtered)
            //   patchGame(gameId, "Draw")
                setResult("Draws")
                setIsOpen(false)
            }
            }
            className='hover:bg-green-50 hover:border-2 border-black rounded'
          >
            <h3>Draws</h3>
          </div>
          <div
            onClick={() => {
                setGamesDisplayed(white_filtered)
            //   patchGame(gameId, "Draw")
                setResult("As White Player")
                setIsOpen(false)
            }
            }
            className='hover:bg-green-50 hover:border-2 border-black rounded'
          >
            <h3>As White Player</h3>
          </div>
          <div
            onClick={() => {
                setGamesDisplayed(black_filtered)
            //   patchGame(gameId, "Draw")
                setResult("As Black Player")
                setIsOpen(false)
            }
            }
            className='hover:bg-green-50 hover:border-2 border-black rounded'
          >
            <h3>As Black Player</h3>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dropdown;