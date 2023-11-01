// Add a register button to open a similar component to register a new instructor

import React, { useState } from "react";

export default function Login({ setLogin }) {
  const handleLogin = () => {
    // will set more logic/error handling later
    setLogin();
  };

  return (
    <div className='border-2 border-gray-900 p-4 flex flex-col w-64 mt-16 p-4'>
      <h1 className='text-lg font-semibold mb-4'>Please Log in</h1>
      <form>
        <div className='mb-4'>
          <label htmlFor='username'>Username</label>
          <input
            className='border border-gray-300 rounded p-2'
            type='text'
            id='username'
            name='username'
            placeholder='Insert username'
          />
        </div>
        <div className='mb-4'>
          <label htmlFor='password'>Password</label>
          <input
            className='border border-gray-300 rounded p-2'
            type='password'
            id='password'
            name='password'
            placeholder='Insert password'
          />
        </div>
        <button
          onClick={handleLogin}
          className='bg-gray-900 text-white py-2 px-4 rounded hover:bg-blue-700'
          type='submit'
        >
          Log In
        </button>
        <button
          onClick={handleLogin}
          className='bg-gray-900 text-white py-2 px-4 rounded hover:bg-blue-700'
          type='submit'
        >
          Register Instructor
        </button>
      </form>
    </div>
  );
}
