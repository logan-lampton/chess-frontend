import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "../axiosConfig";

function Student() {
  const { id } = useParams();
  const [student, setStudent] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get(`/students/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("Received student data:", response.data);
        setStudent(response.data);
      })
      .catch((error) => {
        console.error("Error fetching student data:", error);
      });
  }, [id]);

  return (
    <div className='grid grid-cols-1 md:grid-cols-3 gap-4 my-4 w-screen'>
      <div className='border-2 border-gray-900 col-span-2 md:col-span-2 mr-5 ml-5'>
        {student ? (
          <div>
            <div className='bg-gray-900 text-white font-bold py-2 px-4 border flex'>
              <h2>{student.student_name}</h2>
              <div>
                <button className='bg-slate-50 hover:bg-white text-black font-bold py-2 px-4 border bg-white rounded'>
                  Edit Student
                </button>
              </div>
            </div>
            <div className='ml-5 mt-4'>
              <p>Grade: {student.grade}</p>
              <p>Number of Games Played: {student.games.length}</p>
              <p>Total Wins: {student.total_wins}</p>
              <p>Total Win Rate: {student.win_rate}</p>
              <p>Win Rate as White: {student.win_rate_white}</p>
              <p>Win Rate as Black: {student.win_rate_black}</p>
            </div>
          </div>
        ) : (
          <p>Student not found</p>
        )}
      </div>

      <div className='col-span-1 md:col-span-1 mr-5'>
        <div>
          <Link to='/viewlessons'>
            <button className='h-20 w-50 bg-gray-900 hover:bg-gray-700 text-white font-bold py-2 px-4 border bg-gray-900 rounded mr-4 mb-4'>
              View Lessons
            </button>
          </Link>
        </div>

        <div>
          <Link to='/viewgamehistory'>
            <button className='h-20 w-50 bg-gray-900 hover:bg-gray-700 text-white font-bold py-2 px-4 border bg-gray-900 rounded mr-4'>
              View Game History
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Student;
