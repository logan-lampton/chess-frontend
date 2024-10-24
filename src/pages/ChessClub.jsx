import React, { useEffect, useState, useRef, useContext } from "react";
import { Link, useNavigate, useLocation, useParams } from "react-router-dom";
import axios from "../axiosConfig";
import ConfirmationPopUp from "../components/ConfirmationPopUp";
import { useUserContext } from "../App";
import Back from "../components/Back"
import LoadingSpinner from "../components/LoadingSpinner";


function ChessClub({handleClubDeleted}) {
    const { updateClubId, clubId, loading, setLoading } = useUserContext();
    const {id} = useParams()
    const [club, setClub] = useState([]);
    const navigate = useNavigate()

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

    const deleteClub = async () => {
        const token = localStorage.getItem("token");
        try {
          const deleteResponse = await axios.delete(
            `http://localhost:3000/clubs/${club.id}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          console.log("Club deleted:", deleteResponse.data);
          handleClubDeleted(club.id)
          navigate('/home')
        } catch (error) {
          console.error("Error deleting club:", error);
        }
      };

    const handleConfirmation = (message, isLoading) => {
        setConfirmationPopUp({
          message,
          isLoading,
        });
      };
    
      const handleDeleteClick = () => {
        handleConfirmation("Are you sure you want to permanantly delete this club? All students and their records will be deleted.", true);
      };

      const sureDelete = async (selection) => {
        if (selection) {
          await deleteClub();
          setConfirmationPopUp({ message: "", isLoading: false });
        } else {
          setConfirmationPopUp({ message: "", isLoading: false });
        }
      };

    return (
        <>
        <Back  to = {`/home`} />
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4 my-4 w-100vw'>
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
                                    Meet Time: {club.formatted_time}
                                </h3>
                                <div className='flex space-x-4'>
                                    <Link to={`/addstudent/${clubId}`}>
                                    <button className='h-12 bg-slate-50 hover:bg-white text-black font-bold py-2 px-4 border rounded'>
                                        Add Student
                                    </button>
                                    </Link>
                                    <Link to={`/updateclub/${clubId}`} state={{ club: club }}>
                                    <button className='h-12 bg-slate-50 hover:bg-white text-black font-bold py-2 px-4 border rounded'>
                                        Edit Club Details
                                    </button>
                                    </Link>
                                    <button onClick={handleDeleteClick} className='h-12 bg-red-600 hover:bg-red-500 text-white font-bold py-2 px-4 border rounded'>
                                    Delete Club
                                    </button>
                                </div>
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
                                                className="text-blue-500 hover:underline font-semibold"
                                            >
                                                {student.student_name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p>No students available</p>
                            )}
                        </>
                    ) : (
                        "Loading club data..."
                    )}
                </div>
            </div>

            <div className="col-span-1 md:col-span-1 mr-5">
  <div className="flex justify-between mb-4">
    <Link to="/clublessons">
      <button className="h-15 w-50 bg-gray-900 hover:bg-gray-700 text-white font-bold py-2 px-4 border bg-gray-900 rounded">
        View Lessons
      </button>
    </Link>
    <Link to="/studentpairselect" state={{ students: club.students }}>
      <button className="h-15 w-50 bg-gray-900 hover:bg-gray-700 text-white font-bold py-2 px-4 border bg-gray-900 rounded">
        Pair Students
      </button>
    </Link>
    {club && (
      <Link to={`/games/completed/${clubId}`}>
        <button className="h-15 w-50 bg-gray-900 hover:bg-gray-700 text-white font-bold py-2 px-4 border bg-gray-900 rounded">
          View Club Games
        </button>
      </Link>
    )}
  </div>

  <div className="border-2 border-gray-900 rounded-lg shadow-lg p-4 mb-6 bg-white">
    <div className="bg-gray-900 text-white font-bold py-2 px-4 rounded-t-lg mb-4">
      <h2>Club Stats</h2>
    </div>

    <div className="ml-5">
      <h2 className="text-lg font-semibold text-gray-700 mb-3">Game Leaders:</h2>
      <table className="w-full table-auto">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2">Student</th>
            <th className="px-4 py-2">Total Wins</th>
            <th className="px-4 py-2">Win Rate</th>
          </tr>
        </thead>
        <tbody>
          {club.top_3_games &&
            club.top_3_games.map((student) => (
              <tr
                className="border-t hover:bg-gray-100 transition duration-200 ease-in-out"
                key={student.id}
              >
                <td className="px-4 py-2">
                  <Link to={`/students/${student.id}`} className="text-blue-500 hover:underline font-semibold">
                    {student.student}
                  </Link>
                </td>
                <td className="px-4 py-2 text-gray-600">
                  {student.wins}
                </td>
                <td className="px-4 py-2 text-gray-600">
                  {Math.floor(student.win_rate * 100)}%
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>

    <div className="ml-5 mt-4">
      <h2 className="text-lg font-semibold text-gray-700 mb-3">Lesson Leaders:</h2>
      <table className="w-full table-auto">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2">Student</th>
            <th className="px-4 py-2">Lessons Completed</th>
            <th className="px-4 py-2">Average Score</th>
          </tr>
        </thead>
        <tbody>
          {club.top_3_lessons &&
            club.top_3_lessons.map((student) => (
              <tr
                className="border-t hover:bg-gray-100 transition duration-200 ease-in-out"
                key={student.id}
              >
                <td className="px-4 py-2">
                  <Link to={`/students/${student.id}`} className="text-blue-500 hover:underline font-semibold">
                    {student.student}
                  </Link>
                </td>
                <td className="px-4 py-2 text-gray-600">
                  {student.number_of_lessons}
                </td>
                <td className="px-4 py-2 text-gray-600">
                  {Math.floor(student.average_grade)}%
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  </div>

  {confirmationPopUp.isLoading && (
    <ConfirmationPopUp
      onDialogue={sureDelete}
      message={confirmationPopUp.message}
    />
  )}
</div>

            </>
          )}
        </div>
        </>
    );
}

export default ChessClub;
