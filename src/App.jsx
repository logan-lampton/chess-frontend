import { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import ChessClub from "./components/ChessClub";
import Login from "./components/Login";
import Register from "./components/Register";

function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const handleLogin = () => {
    // will set more logic/error handling later
    setLogin();
  };

  const openLogin = () => {
    setShowLogin(true);
  };

  const setLogin = () => {
    setLoggedIn(true);
  };

  const openRegister = () => {
    setShowRegister(true);
  };

  return (
    <>
      <div className='flex flex-col items-center h-screen'>
        <Header openLogin={openLogin} isLoggedIn={isLoggedIn} />
        {isLoggedIn ? (
          <>
            <div className='h-64 grid grid-cols-2 gap-40 content-around w-screen flex justify-center items-center px-12'>
                <div className='border 2px gray-900'>
                  <div className='bg-gray-900 text-white font-bold py-2 px-4 border hover:bg-gray-700'>
                    <h2>Name of club</h2>
                  </div>
                  <p>map student names here</p>
                </div>
                {/* <ChessClub /> */}
                <div className='border 2px gray-900'>
                  <div className='bg-gray-900 text-white font-bold py-2 px-4 border hover:bg-gray-700'>
                    <h2>Name of club</h2>
                  </div>
                  <p>map student names here</p>
                </div>
                {/* <ChessClub /> */}
            </div>
            <div>
              <div className='absolute right-10 bottom-5 flex flex-col space-y-4'>
                <div>
                  <button className='h-20 w-50 bg-gray-900 hover:bg-gray-700 text-white font-bold py-2 px-4 border bg-gray-900 rounded mr-4'>
                    Add Club
                  </button>
                  <button className='h-20 w-50 bg-gray-900 hover:bg-gray-700 text-white font-bold py-2 px-4 border bg-gray-900 rounded'>
                    Show More Clubs
                  </button>
                </div>
              </div>
            </div>
          </>
          ) : showRegister ? (
            <Register setLogin={setLogin} handleLogin={handleLogin} />
          ) : (
          <Login setLogin={setLogin} showRegister={showRegister} openRegister={openRegister} handleLogin={handleLogin} />
          )}
      </div>
    </>
  );
}

export default App;
