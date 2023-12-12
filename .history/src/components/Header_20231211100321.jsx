import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import BackButton from "./BackButton";

export default function Header({ isLoggedIn, handleLogout }) {
  const navigate = useNavigate();
  const location = useLocation();

  const onHomePage = location.pathname === "/home";

  const logout = () => {
    handleLogout();
    navigate("/");
  };
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
        {isLoggedIn && !onHomePage ? (
          <BackButton className='flex ml-auto items-center' />
        ) : null}

        <button className='bg-neutral-100 hover:bg-neutral-50 text-black font-bold py-2 px-4 border neutral-100 rounded ml-2'>
          {isLoggedIn ? (
            <p onClick={logout}>Log out</p>
          ) : (
            <Link to='/'>
              <p>Log in</p>
            </Link>
          )}
        </button>
      </div>
    </div>
  );
}
