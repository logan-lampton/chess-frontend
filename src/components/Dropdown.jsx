import React, { useState } from "react";
import { AiOutlineCaretUp, AiOutlineCaretDown } from "react-icons/ai";

function Dropdown({ patchGame, gameId, clearEditingGameResult }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className='relative'>
      <button
        onClick={clearEditingGameResult}
        className='relative flex items-center bg-green-100 p-2 text-lg border-4 w-full'
      >
        Select Result
        <AiOutlineCaretDown />
      </button>
        <div className='absolute mt-2 bg-green-100 rounded-lg p-2 text-lg border-2 border-black cursor-pointer w-full'>
          <div
            onClick={() => {
              patchGame(gameId, "White");
              clearEditingGameResult();
            }}
            className='hover:bg-green-50 hover:border-2 border-black rounded p-1 w-full'
          >
            <h3>White Won</h3>
          </div>
          <div
            onClick={() => {
              patchGame(gameId, "Black");
              clearEditingGameResult();
            }}
            className='hover:bg-green-50 hover:border-2 border-black rounded p-1 w-full'
          >
            <h3>Black Won</h3>
          </div>
          <div
            onClick={() => {
              patchGame(gameId, "Draw");
              clearEditingGameResult();
            }}
            className='hover:bg-green-50 hover:border-2 border-black rounded p-1 w-full'
          >
            <h3>Draw</h3>
          </div>
        </div>
    </div>
  );
}

export default Dropdown;
