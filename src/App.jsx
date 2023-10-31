import { useState } from "react";
import "./App.css";
import ChessClass from "./components/ChessClass";

function App() {
  // const [count, setCount] = useState(0);

  return (
    <>
      <div class='bg-gray-900 text-white font-bold py-2 px-4 border w-screen'>
        <h1>8 by 8 Club Manager</h1>
        <button class='bg-neutral-100 hover:bg-neutral-50 text-black font-bold py-2 px-4 border neutral-100 rounded absolute top-5 right-5 h-15 w-100'>
          Log in
        </button>
      </div>
      <div>
        <div class='h-56 grid grid-cols-2 gap-40 content-around w-screen flex justify-center items-center px-12'>
          <div class='bg-gray-900 text-white font-bold py-2 px-4 border'>
            <ChessClass />
          </div>
          <div class='bg-gray-900 text-white font-bold py-2 px-4 border'>
            <ChessClass />
          </div>
        </div>
        <div class='absolute right-10 bottom-5 flex flex-col space-y-4'>
          <button class='h-20 w-50 bg-gray-900 hover:bg-gray-700 text-white font-bold py-2 px-4 border bg-gray-900 rounded'>
            Add Club
          </button>
          <button class='h-20 w-50 bg-gray-900 hover:bg-gray-700 text-white font-bold py-2 px-4 border bg-gray-900 rounded'>
            Show More Clubs
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
