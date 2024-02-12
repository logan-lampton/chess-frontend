import React, { useState } from "react";
import { AiOutlineCaretUp, AiOutlineCaretDown } from "react-icons/ai";

function Dropdown() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button
        onClick={() => setIsOpen((prevState) => !prevState)}
        className=' relative flex flex-column bg-green-100 p-2 flex items-center text-lg border-4'
      >
        Pending
        {!isOpen ? <AiOutlineCaretUp /> : <AiOutlineCaretDown />}
      </button>
      {isOpen && (
        <div className='bg-green-100 absolute mt-2 rounded-lg p-2 text-lg border-2 border-black cursor-pointer'>
          <div className='hover:bg-white hover:border-2 border-black rounded '>
            <h3>White Won</h3>
          </div>
          <div className='hover:bg-green-50'>
            <h3>Black Won</h3>
          </div>
          <div className='hover:bg-green-50'>
            <h3>Draw</h3>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dropdown;
