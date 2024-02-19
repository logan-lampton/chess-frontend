import React, { useState } from "react";
import { AiOutlineCaretUp, AiOutlineCaretDown } from "react-icons/ai";

function Dropdown({ dropdownState, setDropdownState }) {
  const [isOpen, setIsOpen] = useState(false)
  const [result, setResult] = useState("Showing all games")

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
                setDropdownState("Wins")
            //   patchGame(gameId, "White")
            //   setResult("White")
            //   setIsOpen(false)
            }
            }
            className='hover:bg-green-50 hover:border-2 border-black rounded'
          >
            <h3>Wins</h3>
          </div>
          <div
            onClick={() => {
                setDropdownState("Losses")
            //   patchGame(gameId, "Black")
            //   setResult("Black")
            //   setIsOpen(false)
            }
            }
            className='hover:bg-green-50 hover:border-2 border-black rounded'
          >
            <h3>Losses</h3>
          </div>
          <div
            onClick={() => {
                setDropdownState("Draws")
            //   patchGame(gameId, "Draw")
            //   setResult("Draw")
            //   setIsOpen(false)
            }
            }
            className='hover:bg-green-50 hover:border-2 border-black rounded'
          >
            <h3>Draws</h3>
          </div>
          <div
            onClick={() => {
                setDropdownState("As White Player")
            //   patchGame(gameId, "Draw")
            //   setResult("Draw")
            //   setIsOpen(false)
            }
            }
            className='hover:bg-green-50 hover:border-2 border-black rounded'
          >
            <h3>As White Player</h3>
          </div>
          <div
            onClick={() => {
                setDropdownState("As Black Player")
            //   patchGame(gameId, "Draw")
            //   setResult("Draw")
            //   setIsOpen(false)
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