import React, { useState } from "react";
import {Link} from 'react-router-dom'
import Register from "./Register";

export default function Login({ setLogin, showRegister, openRegister, handleLogin }) {

  let initialState = { name: "", password: "" }

  const [inputValue, setInputValue] = useState(initialState);

  const handleInputChange = (e) => {
    let {name, value} = e.target
    setInputValue({...inputValue, [name]: value})
  }

  return (
    <div className='border-2 border-gray-900 p-4 flex flex-col w-64 mt-16 p-4'>
      <h1 className='text-lg font-semibold mb-4'>Please Log in</h1>
      <form>
        <div className='mb-4'>
          <label htmlFor='name'>Name</label>
          <input
            className='border border-gray-300 rounded p-2'
            type='text'
            id='name'
            name='name'
            placeholder='Insert name'
            value={inputValue.name}
            onChange={handleInputChange}
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
            value={inputValue.password}
            onChange={handleInputChange}
          />
        </div>
        <Link to="/home">
          <button
            onClick={() => handleLogin(inputValue)}
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
