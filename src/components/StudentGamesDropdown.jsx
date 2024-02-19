import React, { useState } from "react";
import { AiOutlineCaretUp, AiOutlineCaretDown } from "react-icons/ai";

function Dropdown({ gamesDisplayed, setGamesDisplayed, student }) {
  const [isOpen, setIsOpen] = useState(false)
  const [result, setResult] = useState("Showing all games")
  console.log("dropdown student", student)
  console.log('student name', student.student_name)

  const win_filtered = gamesDisplayed.filter((game) => {
    return game.result === "Black" && game.players.black === student.student_name || 
           game.result === "White" && game.players.white === student.student_name;
});
  console.log("win filtered", win_filtered)

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
          <div
            onClick={() => {
            //   patchGame(gameId, "White")
                setResult("Wins")
                setGamesDisplayed(win_filtered)
                console.log(win_filtered)
                setIsOpen(false)
            }
            }
            className='hover:bg-green-50 hover:border-2 border-black rounded'
          >
            <h3>Wins</h3>
          </div>
          <div
            onClick={() => {
                setGamesDisplayed("Losses")
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
                setGamesDisplayed("Draws")
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
                setGamesDisplayed("As White Player")
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
                setGamesDisplayed("As Black Player")
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