// Add logic to click back to home by clicking main logo, once a user is logged in

// Destroy local token when clicking log out
// Send a delete request to "log out"

import React from "react";
import { Link, useNavigate } from "react-router-dom";
import BackButton from "./BackButton";

export default function Header({ isLoggedIn, setLoggedIn }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    setLoggedIn(false);
    navigate("/");
  };

  return (
    <div className='bg-gray-900 text-white font-bold py-2 px-4 border w-screen'>
      {isLoggedIn ? (
        <Link to='/home'>
          <h1 className='text-white'>8 by 8 Club Manager</h1>
        </Link>
      ) : (
        <h1>8 by 8 Club Manager</h1>
      )}

      <button className='bg-neutral-100 hover:bg-neutral-50 text-black font-bold py-2 px-4 border neutral-100 rounded absolute top-5 right-5 h-15 w-100'>
        {isLoggedIn ? <p onClick={handleLogout}>Log out</p> : <p>Log in</p>}
      </button>
    </div>
  );
}
