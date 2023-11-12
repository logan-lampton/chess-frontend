import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";

function AddStudent() {

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const clubId = searchParams.get("club_id");

  const [formData, setFormData] = useState({
    student_name: "",
    grade: "",
    club_id: clubId,
  });

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  };

  const handleCreateStudent = () => {
    axios
      .post("http://localhost:3000/students", formData)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error creating student:", error);
      });
  };


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
        ...formData,
        [name]: value,
    })
  }

  console.log(clubId)


  return (
    <div className='grid grid-cols-1 md:grid-cols-3 gap-4 my-4 w-screen'>
      <div className='col-span-2 md:col-span-2 mr-5 ml-5'>
        <div className='border-2 border-gray-900'>
          <div className='bg-gray-900 text-white font-bold py-2 px-4 border mb-4'>
            <h2>Create A New Student</h2>
          </div>
          <form className='ml-5'>
            <div className='mb-4'>
              <label htmlFor='student_name'>Student Name: </label>
              <input
                className='border border-gray-300 rounded p-2'
                type='text'
                id='student_name'
                name='student_name'
                placeholder='Insert student name'
                value={formData.student_name}
                onChange={handleInputChange}
              />
            </div>
            <div className='mb-4'>
              <label htmlFor='grade'>Grade: </label>
              <input
                className='border border-gray-300 rounded p-2'
                type='text'
                id='grade'
                name='grade'
                placeholder='Insert grade number'
                value={formData.grade}
                onChange={handleInputChange}
              />
            </div>
            <Link to='/home'>
              <button
                onClick={handleCreateStudent}
                className='bg-gray-900 text-white py-2 px-4 rounded hover:bg-blue-700 mr-1 mb-4'
                type='submit'
              >
                Create
              </button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AddStudent