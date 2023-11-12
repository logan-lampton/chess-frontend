import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams, useLocation } from "react-router-dom";
import axios from "../axiosConfig";

function ChessClub() {
  const { id } = useParams();

  const location = useLocation();
  const { club } = location.state;

  console.log(club);

  const [clubData, setClubData] = useState(null);
  const [students, setStudents] = useState(null);

  function convertToTwelveHourFormat(timeString) {
    const date = new Date(timeString);

    const hours = date.getHours();
    const minutes = date.getMinutes();

    let amOrPm;
    if (hours >= 12) {
      amOrPm = "PM";
    } else {
      amOrPm = "AM";
    }

    let hours12;
    if (hours === 0) {
      hours12 = 12;
    } else if (hours > 12) {
      hours12 = hours - 12;
    } else {
      hours12 = hours;
    }

    const formattedTime = `${hours12}:${
      minutes < 10 ? "0" : ""
    }${minutes}${amOrPm}`;

    return formattedTime;
  }

  useEffect(() => {
    axios
      .get(`/clubs/${id}`)
      .then((response) => {
        // console.log("Received club data:", response.data);
        setClubData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching club data:", error);
      });
    axios.get(`/students?club_id=${id}`).then((response) => {
      setStudents(response.data);
    });
  }, [id]);

  // console.log(`Club Data: ${clubData}`);

  return (
    <div className='grid grid-cols-1 md:grid-cols-3 gap-4 my-4 w-screen'>
      <div className='col-span-2 md:col-span-2 mr-5 ml-5'>
        <div className='border-2 border-gray-900'>
          {club ? (
            <>
              <div className='bg-gray-900 text-white font-bold py-2 px-4 border mb-4'>
                <h1 className='mb-5'>{club.club_name}</h1>
                <h3>School: {club.school}</h3>
                <h3>Meet Time: {convertToTwelveHourFormat(club.meet_time)}</h3>
              </div>
              {club.students ? (
                <ul className='ml-5'>
                  {club.students.map((student) => (
                    <li key={student.id} className='mb-3'>
                      <Link to={`/students/${student.id}`}>
                        {student.student_name}
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No students available</p>
              )}
              <div className='flex justify-beginning ml-5 my-2'>
                <Link
                  to={{
                    pathname: "/addstudent",
                    search: `?club_id=${id}`,
                    state: { setStudents: setStudents },
                  }}
                >
                  <button className='h-20 w-50 bg-gray-900 hover:bg-gray-700 text-white font-bold py-2 px-4 border bg-gray-900 rounded'>
                    Add Student
                  </button>
                </Link>
              </div>
            </>
          ) : (
            "Loading club data..."
          )}
        </div>
      </div>

      <div className='col-span-1 md:col-span-1 mr-5'>
        <div>
          <Link to='/studentpairings'>
            <button className='h-20 w-50 bg-gray-900 hover:bg-gray-700 text-white font-bold py-2 px-4 border bg-gray-900 rounded mb-4'>
              Pair Students
            </button>
          </Link>
        </div>
        <div>
          <Link to='/viewclubgames'>
            <button className='h-20 w-50 bg-gray-900 hover:bg-gray-700 text-white font-bold py-2 px-4 border bg-gray-900 rounded mb-4'>
              View Club Games
            </button>
          </Link>
        </div>
        {/* make the club stats section */}
        <div className='border-2 border-gray-900'>
          <div className='bg-gray-900 text-white font-bold py-2 px-4 border mb-4'>
            <h2>Club Stats</h2>
          </div>
          <div className='ml-5'>
            <h2 className='mb-3'> Students with Highest Winrate: </h2>
            <ul className='ml-7'>
              {club.top_3.map((topThree) => {
                const student = club.students.find(
                  (s) => s.student_name === topThree.student
                );
                return (
                  <li className='mb-3' key={student.id}>
                    <Link to={`/students/${student.id}`}>
                      {topThree.student}: {topThree.wins}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChessClub;
