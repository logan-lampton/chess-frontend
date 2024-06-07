import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import Back from "../components/Back"
import axios from "../axiosConfig";
import { useUserContext } from "../App";
import TransferStudentSelect from "../components/TransferStudentSelect";

// possibly add in number of wins as white / number of wins as black
// Additional formatting

function Student() {
  const { id } = useParams();
  const {clubId} = useUserContext()
  const [student, setStudent] = useState(null);
  const [showClubSelect, setShowClubSelect] = useState(false)
  console.log('clubId', clubId)

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

  const hideClubSelect = () => {
    setShowClubSelect(false)
  }

  return (
  <>
    <Back  to = {`/clubs/${clubId}`}/>
    <div className='grid grid-cols-1 md:grid-cols-3 gap-4 my-4 w-screen'>
      <div className='border-2 border-gray-900 col-span-2 md:col-span-2 mr-5 ml-5'>
        {student ? (
          <div>
            <div className='bg-gray-900 text-white font-bold py-2 px-4 border flex justify-between items-center'>
              <h2>{student.student_name}</h2>
              <button className='bg-slate-50 hover:bg-white text-black font-bold py-2 px-4 border bg-white rounded'>
              <Link to={`/updatestudent/${id}`} state={{ student: student }}>
                  Edit Student
                </Link>
              </button>
              <button onClick = {()=>setShowClubSelect(true)} className='bg-slate-50 hover:bg-white text-black font-bold py-2 px-4 border bg-white rounded'>
                
                  Transfer Student
                
              </button>
            </div>
            <div className='ml-5 mt-4'>
              <div className='mb-3'>
                <p>Grade: {student.grade}</p>
              </div>
              <div className='mb-3'>
                <p>Number of Games Played: {student.games.length}</p>
                <p>Total Wins: {student.total_wins}</p>
                <p>
                  Total Win Rate: {Math.floor(student.win_rate * 100) + "%"}
                </p>
              </div>
              <div className='mb-3'>
                <p>Wins as White: {student.num_white_wins}</p>
                <p>
                  Win Rate as White: {Math.floor(student.win_rate_white) + "%"}
                </p>
              </div>
              <div className='mb-3'>
                <p>Wins as Black: {student.num_black_wins}</p>
                <p>
                  Wins Rate as Black: {Math.floor(student.win_rate_black) + "%"}
                </p>
              </div>
            </div>
            {showClubSelect && (<TransferStudentSelect hideClubSelect = {hideClubSelect} student = {student}/>)}
          </div>
        ) : (
          <p>Student not found</p>
        )}
      </div>

      <div className='col-span-1 md:col-span-1 mr-5'>
        <div>
          <Link to={`/viewlessons/${id}`} state={{ student: student }}>
            <button className='h-20 w-50 bg-gray-900 hover:bg-gray-700 text-white font-bold py-2 px-4 border bg-gray-900 rounded mr-4 mb-4'>
              View Lessons
            </button>
          </Link>
        </div>

        <div>
          <Link to={`/viewgamehistory/${id}`} state={{ student: student }}>
            <button className='h-20 w-50 bg-gray-900 hover:bg-gray-700 text-white font-bold py-2 px-4 border bg-gray-900 rounded mr-4'>
              View Game History
            </button>
          </Link>
        </div>
      </div>
    </div>
  </>
  );
}

export default Student;
