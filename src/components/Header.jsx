// Add logic to click back to home by clicking main logo, once a user is logged in

import React, { useState } from "react";
import {Link} from 'react-router-dom'

export default function Header({ openLogin, isLoggedIn }) {
  return (
    <div className='bg-gray-900 text-white font-bold py-2 px-4 border w-screen'>
      {/* <Link to="/home"> */}
        <h1>8 by 8 Club Manager</h1>
      {/* </Link> */}
      <button
        onClick={openLogin}
        className='bg-neutral-100 hover:bg-neutral-50 text-black font-bold py-2 px-4 border neutral-100 rounded absolute top-5 right-5 h-15 w-100'
      >
        {isLoggedIn ? <p>Log out</p> : <p>Log in</p>}
      </button>
    </div>
  );
}
