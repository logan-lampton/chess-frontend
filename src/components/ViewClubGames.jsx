import React, { useState } from 'react'

// club.inprogress
// club.completed

function ViewClubGames() {

  const [activeGames, setActiveGames] = useState([]) 

  return (
    <div className='border-2 border-gray-900'>
      <div className='bg-gray-900 text-white font-bold py-2 px-4 border mb-4'>
        Active Games
      </div>
    </div>
  )
}

export default ViewClubGames