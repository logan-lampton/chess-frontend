import { useState } from "react";
import "./App.css";
import ChessClass from "./components/ChessClass";
import Login from "./components/Login"

function App() {
  const [isLoginOpen, setLoginOpen] = useState(false);
  const [isLoggedIn, setLoggedIn] = useState(false);

  const openLogin = () => {
    setLoginOpen(true);
  };

  const closeLogin = () => {
    setLoginOpen(false)
  }

  const setLogin = () => {
    setLoggedIn(true)
  }

  return (
    <>
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

        {isLoggedIn ? (
          <>
            <div className='h-64 grid grid-cols-2 gap-40 content-around w-screen flex justify-center items-center px-12'>
              <div>
                <ChessClass />
              </div>
              <div>
                <ChessClass />
              </div>
            </div>
          <div className='absolute right-10 bottom-5 flex flex-col space-y-4'>
            <button className='h-20 w-50 bg-gray-900 hover:bg-gray-700 text-white font-bold py-2 px-4 border bg-gray-900 rounded'>
              Add Club
            </button>
            <button className='h-20 w-50 bg-gray-900 hover:bg-gray-700 text-white font-bold py-2 px-4 border bg-gray-900 rounded'>
              Show More Clubs
            </button>
          </div>
        </>
        ): (
          isLoginOpen && <Login closeLogin={closeLogin} setLogin={setLogin}/>
        )}
      </div>
    </>
  );
}

export default App;
