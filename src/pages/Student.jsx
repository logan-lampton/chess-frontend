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
      <Back to={`/clubs/${clubId}`} />
      <div className='grid grid-cols-1 md:grid-cols-3 gap-4 my-4 w-screen'>
        <div className='border-2 border-gray-900 col-span-2 md:col-span-2 mr-5 ml-5'>
          {student ? (
            <div>
              <div className='bg-gray-900 text-white font-bold py-2 px-4 border flex justify-between items-center'>
                <h2>{student.student_name}</h2>
                <div>
                  <Link to={`/updatestudent/${id}`} state={{ student: student }}>
                    <button className='bg-slate-50 hover:bg-white text-black font-bold py-2 px-4 border rounded mr-2'>
                      Edit Student
                    </button>
                  </Link>
                  <button
                    onClick={() => setShowClubSelect(true)}
                    className='bg-slate-50 hover:bg-white text-black font-bold py-2 px-4 border rounded'
                  >
                    Transfer Student
                  </button>
                </div>
              </div>
              <div className='ml-5 mt-4'>
                <div className='mb-3'>
                  <p>Grade: {student.grade}</p>
                </div>
                <div className="border-2 border-gray-900 rounded-lg shadow-lg p-4 mb-6 bg-white">
                  <div className="mb-4">
                    <h2 className="bg-gray-900 text-white font-bold py-2 px-4 rounded-t-lg mb-2">
                      Game Stats
                    </h2>
                    <div className="ml-5 text-gray-700">
                      {student.games.length > 0 ? (
                        <>
                          <p className="mb-2">
                            <span className="font-semibold">Number of Games Played:</span> {student.games.length}
                          </p>
                          <p className="mb-2">
                            <span className="font-semibold">Total Wins:</span> {student.total_wins}
                          </p>
                          <p className="mb-2">
                            <span className="font-semibold">Total Win Rate:</span> {Math.floor(student.win_rate * 100) + "%"}
                          </p>
                          <p className="mb-2">
                            <span className="font-semibold">Wins as White:</span> {student.num_white_wins}
                          </p>
                          <p className="mb-2">
                            <span className="font-semibold">Win Rate as White:</span> {Math.floor(student.win_rate_white) + "%"}
                          </p>
                          <p className="mb-2">
                            <span className="font-semibold">Wins as Black:</span> {student.num_black_wins}
                          </p>
                          <p className="mb-2">
                            <span className="font-semibold">Win Rate as Black:</span> {Math.floor(student.win_rate_black) + "%"}
                          </p>
                        </>
                      ) : (
                        <p className="text-gray-500">This student has not played any games yet.</p>
                      )}
                    </div>
                  </div>

                  <div className="mb-4">
                    <h2 className="bg-gray-900 text-white font-bold py-2 px-4 rounded-t-lg mb-2">
                      Lesson Stats
                    </h2>
                    <div className="ml-5 text-gray-700">
                      {student.number_of_lessons_completed > 0 ? (
                        <>
                          <p className="mb-2">
                            <span className="font-semibold">Total Lessons Completed:</span> {student.number_of_lessons_completed}
                          </p>
                          <p className="mb-2">
                            <span className="font-semibold">Most Recent Lesson:</span> {student.most_recent_lesson.lesson_name} - {Math.floor(student.most_recent_lesson.grade)}%
                          </p>
                          <p className="mb-2">
                            <span className="font-semibold">Average Lesson Grade:</span> {Math.floor(student.average_grade)}%
                          </p>
                        </>
                      ) : (
                        <p className="text-gray-500">This student has not completed any lessons yet.</p>
                      )}
                    </div>
                  </div>
                </div>

                {showClubSelect && (
                  <TransferStudentSelect hideClubSelect={hideClubSelect} student={student} />
                )}
              </div>
            </div>
          ) : (
            <p>Student not found</p>
          )}
        </div>

        <div className='col-span-1 md:col-span-1 mr-5'>
          <div>
            <Link to={`/viewlessons/${id}`} state={{ student: student }}>
              <button className='h-20 w-50 bg-gray-900 hover:bg-gray-700 text-white font-bold py-2 px-4 border rounded mr-4 mb-4'>
                View Lessons
              </button>
            </Link>
          </div>

          <div>
            <Link to={`/viewgamehistory/${id}`} state={{ student: student }}>
              <button className='h-20 w-50 bg-gray-900 hover:bg-gray-700 text-white font-bold py-2 px-4 border rounded mr-4'>
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
