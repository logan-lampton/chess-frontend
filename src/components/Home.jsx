import React from 'react'

function Home() {
  return (
    <>
        <div className='h-64 grid grid-cols-2 gap-40 content-around w-screen flex justify-center items-center px-12'>
                <div className='border 2px gray-900'>
                    <div className='bg-gray-900 text-white font-bold py-2 px-4 border hover:bg-gray-700'>
                    <h2>Name of club</h2>
                    </div>
                    <p>map student names here</p>
                </div>
                {/* <ChessClub /> */}
                <div className='border 2px gray-900'>
                    <div className='bg-gray-900 text-white font-bold py-2 px-4 border hover:bg-gray-700'>
                    <h2>Name of club</h2>
                    </div>
                    <p>map student names here</p>
                </div>
                {/* <ChessClub /> */}
            </div>
            <div>
                <div className='absolute right-10 bottom-5 flex flex-col space-y-4'>
                <div>
                    <button className='h-20 w-50 bg-gray-900 hover:bg-gray-700 text-white font-bold py-2 px-4 border bg-gray-900 rounded mr-4'>
                    Add Club
                    </button>
                    <button className='h-20 w-50 bg-gray-900 hover:bg-gray-700 text-white font-bold py-2 px-4 border bg-gray-900 rounded'>
                    Show More Clubs
                    </button>
                </div>
            </div>
        </div>
    </>
  )
}

export default Home;
