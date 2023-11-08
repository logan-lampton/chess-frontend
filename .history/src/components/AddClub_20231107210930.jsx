import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function AddClub() {
  function handleCreateClub() {}

  return (
    <div className='grid grid-cols-1 md:grid-cols-3 gap-4 my-4 w-screen'>
      <div className='col-span-2 md:col-span-2 mr-5 ml-5'>
        <div className='border-2 border-gray-900'>
          <div className='bg-gray-900 text-white font-bold py-2 px-4 border mb-4'>
            <h2>Create A New Club</h2>
          </div>
          <form className='ml-5'>
            <div className='mb-4'>
              <label htmlFor='club name'>Name of Club: </label>
              <input
                className='border border-gray-300 rounded p-2'
                type='text'
                id='club name'
                name='club name'
                placeholder='Insert club name'
              />
            </div>
            <div className='mb-4'>
              <label htmlFor='school'>School: </label>
              <input
                className='border border-gray-300 rounded p-2'
                type='text'
                id='school'
                name='school'
                placeholder='Insert school name'
              />
            </div>
            <div className='mb-4'>
              <label htmlFor='password'>Meet Time: </label>
              <input
                className='border border-gray-300 rounded p-2'
                type='text'
                id='meet time'
                name='club name'
                placeholder='Insert meet time'
              />
            </div>
            <Link to='/home'>
              <button
                // onClick={handleCreateClub}
                className='bg-gray-900 text-white py-2 px-4 rounded hover:bg-blue-700 mr-1 mb-4'
                type='submit'
              >
                Create
              </button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
