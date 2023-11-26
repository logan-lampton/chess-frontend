// Add logic to click back to home by clicking main logo, once a user is logged in

// Destroy local token when clicking log out
// Send a delete request to "log out"

import React from "react";
import { Link } from "react-router-dom";
import BackButton from "./BackButton";

export default function Header({ isLoggedIn, handleLogout }) {
  return (
    <div className='bg-gray-900 text-white font-bold py-2 px-4 border w-screen flex justify-between items-center'>
      {isLoggedIn ? (
        <Link to='/home'>
          <h1 className='text-white'>8 by 8 Club Manager</h1>
        </Link>
      ) : (
        <h1>8 by 8 Club Manager</h1>
      )}
      <div className='flex items-center'>
        <BackButton className='flex ml-auto items-center' />

        <button className='bg-neutral-100 hover:bg-neutral-50 text-black font-bold py-2 px-4 border neutral-100 rounded ml-2'>
          {isLoggedIn ? <p onClick={handleLogout}>Log out</p> : <p>Log in</p>}
        </button>
      </div>
    </div>
  );
}
