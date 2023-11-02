import React from 'react'
import {Link} from 'react-router-dom'

function Student() {
  return (
    <div>
      <div className='border 2px gray-900'>
        <div className='bg-gray-900 text-white font-bold py-2 px-4 border'>
          <h2>Name of student</h2>
        </div>
        <div>
        {/* insert mapped student details */}
          <p>Grade:</p>
          <p>Number of Games Played:</p>
          <p>Win Rate as White:</p>
          <p>Win Rate as Black:</p>
        </div>
      </div>

        <Link to="/viewlessons">
          <button className='h-20 w-50 bg-gray-900 hover:bg-gray-700 text-white font-bold py-2 px-4 border bg-gray-900 rounded mr-4'>
            View Lessons
          </button>
        </Link>

        <Link to="/viewgamehistory">
          <button className='h-20 w-50 bg-gray-900 hover:bg-gray-700 text-white font-bold py-2 px-4 border bg-gray-900 rounded mr-4'>
            View Game History
          </button>
        </Link>
        
    </div>
  )
}

export default Student