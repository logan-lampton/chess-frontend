import React, { useEffect, useState, useRef, useContext } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import axios from "../axiosConfig";
import ConfirmationPopUp from "../components/ConfirmationPopUp";
import { useUserContext } from "../App";
import Back from "../components/Back"
import LoadingSpinner from "../components/LoadingSpinner";

// Add Lesson Plan button
// Functionality is to add new lessons onto each student
// Have the new of the lesson
// Click the lesson

// Get a list of all the students
// If they have completed, have a grade next to their name
// If they haven't done the lesson, it says "incomplete"
// Option to input scores on each of the students

function ChessClub() {
    const { updateClubId, clubId, loading, setLoading } = useUserContext();
    const {id} = useParams()
    const [club, setClub] = useState([]);

    const [confirmationPopUp, setConfirmationPopUp] = useState({
        message: "",
        isLoading: false,
    });

    useEffect(() => {
      setLoading(true)
      fetchClubData();
    }, []);

    const fetchClubData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`/clubs/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setClub(response.data);
        updateClubId(id)
        localStorage.setItem('clubId', JSON.stringify(id))
      } catch(error) {
        console.error("Error fetching club data: ", error);
      } finally {setLoading(false)}
    }

    console.log("ChessClub component club object", club);

    // function convertToTwelveHourFormat(timeString) {
    //     const date = new Date(timeString);

    //     const hours = date.getHours();
    //     const minutes = date.getMinutes();

    //     let amOrPm;
    //     if (hours >= 12) {
    //         amOrPm = "PM";
    //     } else {
    //         amOrPm = "AM";
    //     }

    //     let hours12;
    //     if (hours === 0) {
    //         hours12 = 12;
    //     } else if (hours > 12) {
    //         hours12 = hours - 12;
    //     } else {
    //         hours12 = hours;
    //     }

    //     const formattedTime = `${hours12}:${
    //         minutes < 10 ? "0" : ""
    //     }${minutes}${amOrPm}`;

    //     return formattedTime;
    // }

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
            const getResponse = await axios.get(
                `http://localhost:3000/clubs/${clubId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            console.log(getResponse.data.students);
            setClub(getResponse.data);
        } catch (error) {
            console.error("Error deleting student", error);
        }
    };

    const studentRef = useRef();

    const handleConfirmation = (message, isLoading) => {
        setConfirmationPopUp({
            message,
            isLoading,
        });
    };

    const handleDeleteClick = (id) => {
        handleConfirmation("Are you sure you want to delete", true);
        studentRef.current = id;
    };

    const sureDelete = async (selection, id) => {
        console.log("Club ID to delete: ", id);
        if (selection) {
            await deleteStudent(studentRef.current);
            setConfirmationPopUp({ message: "", isLoading: false });
        } else {
            setConfirmationPopUp({ message: "", isLoading: false });
        }
    };

    console.log("clubId: ", clubId)

    return (
        <>
        <Back  to = {`/home`} />
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4 my-4 w-screen'>
          {loading ? (<LoadingSpinner/>) : (
            <>
            <div className='col-span-2 md:col-span-2 mr-5 ml-5'>
                <div className='border-2 border-gray-900'>
                    {club ? (
                        <>
                            <div className='bg-gray-900 text-white font-bold py-2 px-4 border mb-4'>
                                <h1 className='mb-5'>{club.club_name}</h1>
                                <h3>School: {club.school}</h3>
                                <h3>
                                    Meet Time:{" "}
                                    {club.formatted_time}
                                </h3>
                                <button className='bg-slate-50 hover:bg-white text-black font-bold py-2 px-4 border bg-white rounded mt-5 mb-5'>
                                    <Link
                                        to={`/updateclub/${clubId}`}
                                        state={{ club: club }}
                                    >
                                        Edit Club Details
                                    </Link>
                                </button>
                            </div>
                            {club.students ? (
                                <ul className='ml-5'>
                                    {club.students.map((student) => (
                                        <li
                                            key={student.id}
                                            className='mb-3 flex items-center'
                                        >
                                            <Link
                                                to={`/students/${student.id}`}
                                                className='flex-grow'
                                            >
                                                {student.student_name}
                                            </Link>
                                            <button
                                                onClick={() =>
                                                    handleDeleteClick(
                                                        student.id
                                                    )
                                                }
                                                className='bg-red-600 hover:bg-red-400 text-white font-bold py-2 px-4 border bg-gray-900 rounded mr-5'
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
                                <Link to={ `/addstudent/${clubId}`} >
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
                    <Link to='/clublessons'>
                        <button className='h-20 w-50 bg-gray-900 hover:bg-gray-700 text-white font-bold py-2 px-4 border bg-gray-900 rounded mb-4'>
                            View Lessons
                        </button>
                    </Link>
                </div>
                <div>
                    <Link to='/studentpairselect' state={{ students: club.students }}>
                        <button className='h-20 w-50 bg-gray-900 hover:bg-gray-700 text-white font-bold py-2 px-4 border bg-gray-900 rounded mb-4'>
                            Pair Students
                        </button>
                    </Link>
                </div>
                {club && (
                    <>
                        <div>
                            <Link to={`/games/completed/${clubId}`}>
                                <button className='h-20 w-50 bg-gray-900 hover:bg-gray-700 text-white font-bold py-2 px-4 border bg-gray-900 rounded mb-4'>
                                    View Club Games
                                </button>
                            </Link>
                        </div>
                        <div className="border-2 border-gray-900 rounded-lg shadow-lg p-4 mb-6 bg-white">
                        <div className="bg-gray-900 text-white font-bold py-2 px-4 rounded-t-lg mb-4">
                            <h2>Club Stats</h2>
                        </div>
                        <div className="ml-5">
                            <h2 className="text-lg font-semibold text-gray-700 mb-3">Game Leaders:</h2>
                            <ul className="ml-7 list-disc list-inside">
                            {club.top_3_games &&
                                club.top_3_games.map((student) => (
                                <li
                                    className="mb-3 hover:bg-gray-100 p-2 rounded transition duration-200 ease-in-out flex justify-between items-center"
                                    key={student.id}
                                >
                                    <Link to={`/students/${student.id}`} className="text-blue-500 hover:underline font-semibold">
                                    {student.student}
                                    </Link>
                                    <span className="text-gray-600">
                                    Wins: {student.wins} | Win Rate: {Math.floor(student.win_rate * 100)}%
                                    </span>
                                </li>
                                ))}
                            </ul>
                        </div>
                        <div className="ml-5 mt-4">
                            <h2 className="text-lg font-semibold text-gray-700 mb-3">Lesson Leaders:</h2>
                            <ul className="ml-7 list-disc list-inside">
                            {club.top_3_lessons &&
                                club.top_3_lessons.map((student) => (
                                <li
                                    className="mb-3 hover:bg-gray-100 p-2 rounded transition duration-200 ease-in-out flex justify-between items-center"
                                    key={student.id}
                                >
                                    <Link to={`/students/${student.id}`} className="text-blue-500 hover:underline font-semibold">
                                    {student.student}
                                    </Link>
                                    <span className="text-gray-600">
                                    Lessons Completed: {student.number_of_lessons} | Average Score: {Math.floor(student.average_grade)}%
                                    </span>
                                </li>
                                ))}
                            </ul>
                        </div>
                        </div>


                        {confirmationPopUp.isLoading && (
                            <ConfirmationPopUp
                                onDialogue={sureDelete}
                                message={confirmationPopUp.message}
                            />
                        )}
                    </>
                )}
            </div>
            </>
          )}
        </div>
        </>
    );
}

export default ChessClub;
