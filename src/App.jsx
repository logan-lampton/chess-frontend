import { useState } from "react";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div class="bg-gray-800 text-white font-bold py-2 px-4 border w-screen">
        <h1>8 by 8 Club Manager</h1>
        <button class="bg-neutral-100 hover:bg-neutral-50 text-black font-bold py-2 px-4 border neutral-100 rounded absolute top-5 right-5 h-15 w-100">
          Log in
        </button>
      </div>
      <div className='card'>
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        {/* <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p> */}
      </div>
      {/* <p className='read-the-docs'>
        Click on the Vite and React logos to learn more!
      </p> */}
    </>
  );
}

export default App;
