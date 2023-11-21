import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";

import axios from "../axiosConfig";

function ChessClub() {
  const { id } = useParams();

  const location = useLocation();
  const { club: initialClub } = location.state || {};

  const [club, setClub] = useState(initialClub || {});

  console.log(club);

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

  const deleteStudent = async (studentId) => {
    const token = localStorage.getItem("token");
    try {
      const deleteResponse = await axios.delete(
        `http://localhost:3000/students/${studentId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Student deleted: ", deleteResponse.data);
      const getResponse = await axios.get(`http://localhost:3000/clubs/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(getResponse.data.students);
      setClub(getResponse.data);
      setStudents(getResponse.data.students);
    } catch (error) {
      console.error("Error deleting student", error);
    }
  };

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
                <button className='bg-slate-50 hover:bg-white text-black font-bold py-2 px-4 border bg-white rounded mt-5 mb-5'>
                  <Link to={`/updateclub/${id}`} state={{ club: club }}>
                    Edit Club Details
                  </Link>
                </button>
              </div>
              {club.students ? (
                <ul className='ml-5'>
                  {club.students.map((student) => (
                    <li key={student.id} className='mb-3'>
                      <Link to={`/students/${student.id}`}>
                        {student.student_name}
                      </Link>
                      <button
                        onClick={() => deleteStudent(student.id)}
                        className='bg-red-600 hover:bg-red-400 text-white font-bold py-2 px-4 border bg-gray-900 rounded ml-5'
                      >
                        Delete
                      </button>
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
                    state: {
                      id: id,
                    },
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
          <Link to='/studentpairings' state={{ club: club }}>
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
        {club && (
          <div className='border-2 border-gray-900'>
            <div className='bg-gray-900 text-white font-bold py-2 px-4 border mb-4'>
              <h2>Club Stats</h2>
            </div>
            <div className='ml-5'>
              <h2 className='mb-3'> Students with Highest Winrate: </h2>
              <ul className='ml-7'>
                {club.top_3 &&
                  club.top_3.map((student) => {
                    return (
                      <li className='mb-3' key={student.id}>
                        <Link to={`/students/${student.id}`}>
                          {student.student}: {student.wins * 100}%
                        </Link>
                      </li>
                    );
                  })}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ChessClub;
