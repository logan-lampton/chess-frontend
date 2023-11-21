import React from "react";
import { useLocation } from "react-router-dom";

function StudentPairings() {
  const location = useLocation();
  const { club } = location.state;

  const students = club.students || [];

  console.log(club);

  return (
    <div className='flex justify-center'>
      <div className='flex items-center m-4'>
        <div className='bg-gray-200 p-4 rounded-lg mr-4'>John</div>
        <div className='bg-gray-200 p-4 rounded-lg'>Sarah</div>
      </div>

      <div className='m-8'></div>

      <div className='flex items-center m-4'>
        <div className='bg-gray-200 p-4 rounded-lg mr-4'>Michael</div>
        <div className='bg-gray-200 p-4 rounded-lg'>Emily</div>
      </div>
    </div>
  );
}

export default StudentPairings;
