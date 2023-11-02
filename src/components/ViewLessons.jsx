import React from 'react'
import {Link} from 'react-router-dom'

function ViewLessons() {
  return (
    <div>
      <p>ViewLessons</p>
      <Link to="/viewnotes">
        <button className='h-20 w-50 bg-gray-900 hover:bg-gray-700 text-white font-bold py-2 px-4 border bg-gray-900 rounded mr-4'>
          View or Add Notes
        </button>
      </Link>

    </div>
  )
}

export default ViewLessons