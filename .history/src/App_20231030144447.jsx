import { useState } from "react";
import "./App.css";
import ChessClass from "./components/ChessClass";

function App() {
  // const [count, setCount] = useState(0);

  return (
    <>
      <div class='bg-gray-800 text-white font-bold py-2 px-4 border w-screen'>
        <h1>8 by 8 Club Manager</h1>
        <button class='bg-neutral-100 hover:bg-neutral-50 text-black font-bold py-2 px-4 border neutral-100 rounded absolute top-5 right-5 h-15 w-100'>
          Log in
        </button>
      </div>
      <div>
        {/* <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button> */}
        <p>Will list a couple of classes...</p>
        <div class='h-56 grid grid-cols-3 gap-4 content-around h-screen flex justify-center items-center'>
          <div class='bg-gray-800 text-white font-bold py-2 px-4 border'>
            <ChessClass />
          </div>
          <div class='bg-gray-800 text-white font-bold py-2 px-4 border'>
            <ChessClass />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
