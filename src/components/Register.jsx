// add more logic for actually registering/pushing to the backend
// notify users if they have not successfully registered
// notify users that they have registered successfully

import React from "react";
import { Link } from "react-router-dom";

export default function Register({ handleLogin }) {
  return (
    <div className='border-2 border-gray-900 p-4 flex flex-col w-64 mt-16 p-4'>
      <h1 className='text-lg font-semibold mb-4'>Please Register</h1>
      <form>
        <div className='mb-4'>
          <label htmlFor='email address'>Enter Email Address</label>
          <input
            className='border border-gray-300 rounded p-2'
            type='text'
            id='email address'
            name='email address'
            placeholder='Insert email address'
          />
        </div>
        <div className='mb-4'>
          <label htmlFor='password'>Create Password</label>
          <input
            className='border border-gray-300 rounded p-2'
            type='password'
            id='password'
            name='password'
            placeholder='Insert password'
          />
        </div>
        <div className='mb-4'>
          <label htmlFor='password'>Confirm Password</label>
          <input
            className='border border-gray-300 rounded p-2'
            type='password'
            id='password'
            name='password'
            placeholder='Insert password'
          />
        </div>
        <Link to='/home'>
          <button
            onClick={handleLogin}
            className='bg-gray-900 text-white py-2 px-4 rounded hover:bg-blue-700 mr-1 mb-4'
            type='submit'
          >
            Register
          </button>
        </Link>
        <Link to='/'>
          <button className='bg-gray-900 text-white py-2 px-10 rounded hover:bg-blue-700'>
            Return to Login
          </button>
        </Link>
      </form>
    </div>
  );
}
