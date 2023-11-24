import React from "react";

function StudentPairings() {
  return (
    <div className='flex'>
      <div className='flex flex-col mr-8'>
        <div className='bg-gray-200 p-4'>Group 1 Name 1</div>
        <div className='bg-gray-300 p-4'>Group 1 Name 2</div>
      </div>
      <div className='flex flex-col'>
        <div className='bg-gray-200 p-4'>Group 2 Name 1</div>
        <div className='bg-gray-300 p-4'>Group 2 Name 2</div>
      </div>
    </div>
  );
}

export default StudentPairings;
