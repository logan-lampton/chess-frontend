import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import axios from "../axiosConfig";
import { useUserContext } from "../App";
import LoadingSpinner from "../components/LoadingSpinner";
import Back from "../components/Back";
import ConfirmationPopUp from "../components/ConfirmationPopUp";


export default function Lesson() {
    const location = useLocation();
    const navigate = useNavigate();
    const { loading, setLoading, clubId } = useUserContext();
    const { lesson } = location.state;
    const [students, setStudents] = useState([]);
    const [confirmationPopUp, setConfirmationPopUp] = useState({
        message: "",
        isLoading: false,
    });

    console.log(lesson);

    useEffect(() => {
        setLoading(true);
        const token = localStorage.getItem("token");
        axios
            .get(`/lesson_students/${clubId}/${lesson.id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                setStudents(response.data);
            })
            .catch((error) => {
                console.error("Error fetching lesson data: ", error);
            });
        setLoading(false);
    }, []);

    const deleteLesson = async (id) => {
        const token = localStorage.getItem("token");
        try {
          const deleteResponse = await axios.delete(
            `http://localhost:3000/lessons/${lesson.id}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          console.log("Lesson deleted:", deleteResponse.data);
          navigate('/clublessons')
        } catch (error) {
          console.error("Error deleting lesson:", error);
        }
      };

      const handleConfirmation = (message, isLoading) => {
        setConfirmationPopUp({
            message,
            isLoading,
        });
    };

    const handleDeleteClick = () => {
        handleConfirmation("Are you sure you want to delete this lesson?  You will lose all grades connected to it.", true);
    };

    const sureDelete = async (selection, id) => {
        if (selection) {
            await deleteLesson(lesson.id);
            setConfirmationPopUp({ message: "", isLoading: false });
        } else {
            setConfirmationPopUp({ message: "", isLoading: false });
        }
    };

    return (
        <>
          <Back to={`/clublessons`} />
          <div className="mt-10 p-4">
            {loading && <LoadingSpinner />}
            {!loading && (
              <>
                {/* Lesson Details Section */}
                <div className="mb-10">
                  <h1 className="text-2xl font-bold mb-2">Lesson: {lesson.lesson_name}</h1>
                  <h3 className="text-lg font-semibold mb-4">Source: {lesson.source}</h3>
                  <div className="flex space-x-4">
                    <button
                      onClick={() =>
                        navigate(`/editlesson/${lesson.id}`, {
                          state: { clubId: clubId, lesson: lesson },
                        })
                      }
                      className="bg-gray-900 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                    >
                      Edit Lesson Info
                    </button>
                    <button
                      onClick={handleDeleteClick}
                      className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                    >
                      Delete
                    </button>
                  </div>
                </div>
      
                {/* Student Scores Section */}
                <div className="border-2 border-gray-900 rounded-lg shadow-lg p-4 mb-6 bg-white">
                  <div className="bg-gray-900 text-white font-bold py-2 px-4 rounded-t-lg mb-4">
                    <h3 className="text-xl">Student Scores</h3>
                  </div>
                  <table className="w-full table-auto mb-4">
                    <thead>
                      <tr className="bg-gray-200">
                        <th className="px-4 py-2">Student</th>
                        <th className="px-4 py-2">Score</th>
                        <th className="px-4 py-2">Percentage</th>
                      </tr>
                    </thead>
                    <tbody>
                      {students.map((student) => (
                        <tr key={student.id} className="border-t hover:bg-gray-100 transition duration-200 ease-in-out">
                          <td className="px-4 py-2 font-semibold">
                            <Link to={`/students/${student.id}`} className="text-blue-500 hover:underline font-semibold">
                              {student.name}
                            </Link>
                          </td>
                          <td className="px-4 py-2 text-gray-600">
                            {student.score}/{lesson.number_of_questions}
                          </td>
                          <td className="px-4 py-2 text-gray-600">
                            {Math.floor(student.score / lesson.number_of_questions * 100)}%
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="flex space-x-4">
                    <button
                      onClick={() =>
                        navigate(`/gradelesson/${lesson.id}`, {
                          state: { clubId: clubId, lesson: lesson },
                        })
                      }
                      className="bg-gray-900 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                    >
                      Add Student Grades
                    </button>
                    {students.length > 0 && (
                      <button
                        onClick={() =>
                          navigate(`/updategrade/${lesson.id}`, {
                            state: { clubId: clubId, lesson: lesson },
                          })
                        }
                        className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded"
                      >
                        Edit Student Grades
                      </button>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
          {confirmationPopUp.isLoading && (
            <ConfirmationPopUp
              onDialogue={sureDelete}
              message={confirmationPopUp.message}
            />
          )}
        </>
      );
      
      
      
      
}
