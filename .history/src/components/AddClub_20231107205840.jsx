import React, { useState } from "react";

export default function AddClub() {
  return (
    <div className='grid grid-cols-1 md:grid-cols-3 gap-4 my-4 w-screen'>
      <div className='col-span-2 md:col-span-2 mr-5 ml-5'>
        <div className='border-2 border-gray-900'>
          <div className='bg-gray-900 text-white font-bold py-2 px-4 border mb-4'>
            <h2>Create A New Club</h2>
          </div>
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
            {/* <Link to='/home'>
              <button
                onClick={handleLogin}
                className='bg-gray-900 text-white py-2 px-4 rounded hover:bg-blue-700 mr-1 mb-4'
                type='submit'
              >
                Register
              </button>
            </Link> */}
          </form>
        </div>
      </div>
    </div>
  );
}
