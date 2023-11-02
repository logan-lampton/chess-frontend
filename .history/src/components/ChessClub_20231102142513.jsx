import React, {useState} from 'react'
import {Link} from 'react-router-dom'

function ChessClub() {
  return (
    <div>
      <div className='border 2px gray-900'>
        <div className='bg-gray-900 text-white font-bold py-2 px-4 border'>
          <h2>Name of club</h2>
        </div>
        <Link to="/student">
          <p>map student names here</p>
        </Link>
        {/* insert mapped student components */}
      </div>

      {/* make the create new student button */}
      <Link to="/addstudent">
        <button className='h-20 w-50 bg-gray-900 hover:bg-gray-700 text-white font-bold py-2 px-4 border bg-gray-900 rounded mr-4'>
          Add Student
        </button>
      </Link>
      {/* make the create pairings button */}
      <Link to="/studentpairings">
        <button className='h-20 w-50 bg-gray-900 hover:bg-gray-700 text-white font-bold py-2 px-4 border bg-gray-900 rounded mr-4'>
          Pair Students
        </button>
      </Link>
      {/* make the view club games button */}
      <Link to="/viewclubgames">
        <button className='h-20 w-50 bg-gray-900 hover:bg-gray-700 text-white font-bold py-2 px-4 border bg-gray-900 rounded mr-4'>
          View Club Games
        </button>
      </Link>

      {/* make the club stats section */}
    </div>
  );
}

export default ChessClub;
