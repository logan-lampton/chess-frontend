import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../axiosConfig";

function Student() {
  const { id } = useParams();
  const [student, setStudent] = useState(null);

  useEffect(() => {
    axios
      .get(`/students/${id}`)
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
        <div className='bg-gray-900 text-white font-bold py-2 px-4 border'>
          <h2>Name of student</h2>
        </div>
        <div>
          {/* insert mapped student details */}
          <p>Grade:</p>
          <p>Number of Games Played:</p>
          <p>Win Rate as White:</p>
          <p>Win Rate as Black:</p>
        </div>
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
