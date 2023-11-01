import React, { useState } from "react";
import {Link} from 'react-router-dom'
import Register from "./Register";

export default function Login({ setLogin, showRegister, openRegister, handleLogin }) {

  return (
    <div className='border-2 border-gray-900 p-4 flex flex-col w-64 mt-16 p-4'>
      <h1 className='text-lg font-semibold mb-4'>Please Log in</h1>
      <form>
        <div className='mb-4'>
          <label htmlFor='email address'>Email Address</label>
          <input
            className='border border-gray-300 rounded p-2'
            type='text'
            id='email address'
            name='email address'
            placeholder='Insert email address'
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
        <Link to="/home">
          <button
            onClick={handleLogin}
            className='bg-gray-900 text-white py-2 px-4 rounded hover:bg-blue-700 mr-1 mb-4'
            type='submit'
          >
            Log In
          </button>
        </Link>
        <p className='mb-4'> If you're a new instructor, please register</p>
        <Link to="/register">
          <button
            onClick={openRegister}
            className='bg-gray-900 text-white py-2 px-10 rounded hover:bg-blue-700'
          >
            Register
          </button>
        </Link>
      </form>
    </div>
  );
}
