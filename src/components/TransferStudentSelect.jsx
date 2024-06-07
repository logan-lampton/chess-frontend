import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import axios from "../axiosConfig";
import { useUserContext } from '../App';

export default function TransferStudentSelect({student, hideClubSelect}) {
    const [clubs, setClubs] = useState([]);
    const {instructorId} = useUserContext()
    const navigate = useNavigate()

    useEffect(() => {
        const token = localStorage.getItem("token");
        axios
          .get(`/clubnames/${instructorId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => {
            console.log("Received club name data:", response.data);
            setClubs(response.data);
          })
          .catch((error) => {
            console.error("Error fetching club name data:", error);
          });
      }, []);

      const handleTransferStudent = async (clubId) => {
        const token = localStorage.getItem("token");
        try {
          const response = await axios.patch(
            `/transferstudent/${student.id}`,
            {
                clubId: clubId,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          console.log("Transfer successful", response.data);
          navigate(`/home`);
        } catch (error) {
          console.error("Error transferring student", error);
        }
      };
      return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full relative">
            <button
              onClick={hideClubSelect}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
            >
              &#10005; {/* Close icon (X) */}
            </button>
            <h2 className="text-xl font-bold mb-4">Transfer Student</h2>
            <p className="mb-4">Select a club to transfer {student.student_name}:</p>
            <div className="space-y-4">
              {clubs.map((club) => (
                <div key={club.id} className="flex justify-between items-center">
                  <span>{club.club_name}</span>
                  <button
                    className="ml-2 p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200"
                    onClick={(e) => handleTransferStudent(club.id)}
                  >
                    Transfer
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    }
