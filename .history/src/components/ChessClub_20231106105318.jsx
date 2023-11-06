import React, { useState } from "react";
import { Link } from "react-router-dom";

function ChessClub({ clubs }) {
  console.log(clubs[0].club_name);
  return (
    <div className='grid grid-cols-1 md:grid-cols-3 gap-4 my-4 w-screen'>
      <div className='col-span-2 md:col-span-2 mr-5 ml-5'>
        <div className='border-2 border-gray-900'>
          <div className='bg-gray-900 text-white font-bold py-2 px-4 border mb-4'>
            <h2>{clubs.club_name}</h2>
          </div>
          <Link to='/student'>
            <p className='mb-4'>map student names here</p>
          </Link>
          {/* insert mapped student components */}
          <div className='flex justify-end'>
            <Link to='/addstudent'>
              <button className='h-20 w-50 bg-gray-900 hover:bg-gray-700 text-white font-bold py-2 px-4 border bg-gray-900 rounded'>
                Add Student
              </button>
            </Link>
          </div>
        </div>
      </div>

      <div className='col-span-1 md:col-span-1 mr-5'>
        <div>
          <Link to='/studentpairings'>
            <button className='h-20 w-50 bg-gray-900 hover:bg-gray-700 text-white font-bold py-2 px-4 border bg-gray-900 rounded mb-4'>
              Pair Students
            </button>
          </Link>
        </div>
        <div>
          <Link to='/viewclubgames'>
            <button className='h-20 w-50 bg-gray-900 hover:bg-gray-700 text-white font-bold py-2 px-4 border bg-gray-900 rounded mb-4'>
              View Club Games
            </button>
          </Link>
        </div>
        {/* make the club stats section */}
        <div className='border-2 border-gray-900'>
          <div className='bg-gray-900 text-white font-bold py-2 px-4 border mb-4'>
            <h2>Club Stats</h2>
          </div>
          <p>Map club stats</p>
        </div>
      </div>
    </div>
  );
}

export default ChessClub;
