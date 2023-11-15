// Add logic to go to specific club when user clicks on one

// Add in logic to display the first two clubs that a user owns

// Add popup for Add Club

// Decide on how show more clubs will display additional clubs

// Make sure the club listings don't cover up the buttons

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Home({ clubs }) {
  // justify-center
  return (
    <div className='h-screen bg-gray-100'>
      <div className='grid grid-cols-2 gap-20 content-around w-screen flex items-center px-12 mt-20'>
        {clubs.map((club) => (
          <div key={club.club_name} className='border-2 border-gray-900 w-full'>
            <Link to={`/clubs/${club.id}`} state={{ club }}>
              <div className='bg-gray-900 text-white font-bold py-2 px-4 border hover:bg-gray-700'>
                <h2>{club.club_name}</h2>
              </div>
            </Link>
          </div>
        ))}
      </div>
      <div className='absolute  bottom-5 flex flex-col space-y-4'>
        <div>
          <Link to='/addclub'>
            <button className='h-20 w-50 bg-green-600 hover:bg-green-400 text-white font-bold py-2 px-4 border bg-gray-900 rounded mr-4'>
              Add Club
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
