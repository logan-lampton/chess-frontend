import React from "react";

function StudentPairings() {
  return (
    <div>
      <div className='grid grid-cols-2 gap-4 mt-10'>
        <div className='bg-gray-200 p-4'>Name 1</div>
        <div className='bg-gray-300 p-4'>Name 2</div>
        <div className='bg-gray-200 p-4'>Name 3</div>
        <div className='bg-gray-300 p-4'>Name 4</div>
      </div>
      <div className='grid grid-cols-2 gap-4 mt-10'>
        <div className='bg-gray-200 p-4'>Group 2 Name 1</div>
        <div className='bg-gray-300 p-4'>Group 2 Name 2</div>
        <div className='bg-gray-200 p-4'>Group 2 Name 3</div>
        <div className='bg-gray-300 p-4'>Group 2 Name 4</div>
      </div>
    </div>
  );
}

export default StudentPairings;
