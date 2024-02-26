import React, { useState } from "react";
import { AiOutlineCaretUp, AiOutlineCaretDown } from "react-icons/ai";

function Dropdown({ games, student, filterGames }) {
  const [isOpen, setIsOpen] = useState(false);
  const [result, setResult] = useState("Showing all games");

  //   Checks what the user is filtering by and handles logic for dropdown
  const handleFilterClick = (filter) => {
    setResult(filter);
    filterGames(games, filter, student);
    setIsOpen(false);
  };

  //   handles rendering the chosen filter
  const renderFilterOption = (filter) => {
    return (
      <div
        key={filter}
        onClick={() => {
          handleFilterClick(filter);
        }}
        className='hover:bg-green-50 hover:border-2 border-black rounded'
      >
        <h3>{filter}</h3>
      </div>
    );
  };

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
          {[
            "Showing all games",
            "Wins",
            "Losses",
            "Draws",
            "As White Player",
            "As Black Player",
          ].map(renderFilterOption)}
        </div>
      )}
    </div>
  );
}

export default Dropdown;
