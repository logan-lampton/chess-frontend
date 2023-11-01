import { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import ChessClub from "./components/ChessClub";
import Login from "./components/Login";

function App() {
  const [isLoginOpen, setLoginOpen] = useState(false);
  const [isLoggedIn, setLoggedIn] = useState(false);

  const openLogin = () => {
    setLoginOpen(true);
  };

  const closeLogin = () => {
    setLoginOpen(false);
  };

  const setLogin = () => {
    setLoggedIn(true);
  };

  return (
    <>
      <div className='flex flex-col items-center h-screen'>
        <Header />
        {isLoggedIn ? (
          <>
            <div className='h-64 grid grid-cols-2 gap-40 content-around w-screen flex justify-center items-center px-12'>
              <div class='border 2px gray-900'>
                <div class='bg-gray-900 text-white font-bold py-2 px-4 border hover:bg-gray-700'>
                  <h2>Name of club</h2>
                </div>
                <p>map student names here</p>
              </div>
              {/* <ChessClub /> */}
              <div class='border 2px gray-900'>
                <div class='bg-gray-900 text-white font-bold py-2 px-4 border hover:bg-gray-700'>
                  <h2>Name of club</h2>
                </div>
                <p>map student names here</p>
              </div>
              {/* <ChessClub /> */}
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
        ) : (
          isLoginOpen && <Login closeLogin={closeLogin} setLogin={setLogin} />
        )}
      </div>
    </>
  );
}

export default App;
