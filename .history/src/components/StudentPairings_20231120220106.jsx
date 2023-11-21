import React from "react";
import { useLocation } from "react-router-dom";

function StudentPairings() {
  const location = useLocation();
  const { club } = location.state;

  console.log(club);

  return (
    <div className='flex justify-center'>
      <div className='flex flex-col items-center m-4'>
        <div className='bg-gray-200 p-4 rounded-lg mb-4'>John</div>
        <div className='bg-gray-200 p-4 rounded-lg'>Sarah</div>
      </div>

      <div className='flex flex-col items-center m-4'>
        <div className='bg-gray-200 p-4 rounded-lg mb-4'>Michael</div>
        <div className='bg-gray-200 p-4 rounded-lg'>Emily</div>
      </div>
    </div>
  );
}

export default StudentPairings;
