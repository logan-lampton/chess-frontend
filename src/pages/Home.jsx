import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useUserContext } from "../App";
import LoadingSpinner from "../components/LoadingSpinner";

function Home() {
  const { clubs, instructorId, loading, setLoading } = useUserContext();

  // Remove clubId from local storage
  useEffect(() => {
    localStorage.removeItem('clubId')
    console.log('clubId cleared!')
    // Set loading to true initially
    setLoading(true);

    // Simulate a delay before setting loading to false
    const timer = setTimeout(() => {
        setLoading(false);
    }, 500);

    // Clean up the timer to prevent memory leaks
    return () => clearTimeout(timer);
}, []);

  return (
    <div className='homescreen'>
      {loading && <LoadingSpinner />}
      {!loading && (
      <div className='grid grid-cols-2 gap-20 content-around w-screen flex items-center px-10 mt-20'>
        {clubs.map((club) => (
          <div
            key={club.id}
            className='border-1 border-gray-900 w-full flex items-center'
          >
            <Link
              to={`/clubs/${club.id}`}
              state={{ club: club }}
              className='w-3/4'
            >
              <div className='bg-gray-900 text-white font-bold py-2 px-4 border hover:bg-gray-700'>
                <h2>{club.club_name}</h2>
              </div>
            </Link>
          </div>
        ))}
      </div>
      )}
      <div className='fixed bottom-0 right-0 p-5'>
        <Link to={"/addclub"} state={{ instructorId: instructorId }}>
          <button className='h-20 w-50 bg-green-600 hover:bg-green-400 text-white font-bold border bg-gray-900 rounded mr-4'>
            Add Club
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Home;
