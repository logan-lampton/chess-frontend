import React, { useState } from "react";

export default function Header() {
  return (
    <div className='flex flex-col items-center h-screen'>
      <div className='bg-gray-900 text-white font-bold py-2 px-4 border w-screen'>
        <h1>8 by 8 Club Manager</h1>
        <button
          onClick={openLogin}
          className='bg-neutral-100 hover:bg-neutral-50 text-black font-bold py-2 px-4 border neutral-100 rounded absolute top-5 right-5 h-15 w-100'
        >
          Log in
        </button>
      </div>
    </div>
  );
}
