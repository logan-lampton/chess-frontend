import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function AddClub({ instructorId }) {
  const navigate = useNavigate();
  console.log(instructorId);

  const [formData, setFormData] = useState({
    club_name: "",
    school: "",
    meet_time: "",
    instructor_id: instructorId,
  });

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  };

  const handleCreateClub = async (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3000/clubs", formData)
      .then((response) => {
        console.log(response.data);
        navigate("/home");
      })
      .catch((error) => {
        console.log("Error creating club", error);
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className='grid grid-cols-1 md:grid-cols-3 gap-4 my-4 w-screen'>
      <div className='col-span-2 md:col-span-2 mr-5 ml-5'>
        <div className='border-2 border-gray-900'>
          <div className='bg-gray-900 text-white font-bold py-2 px-4 border mb-4'>
            <h2>Create A New Club</h2>
          </div>
          <form className='ml-5'>
            <div className='mb-4'>
              <label htmlFor='club_name'>Name of Club: </label>
              <input
                className='border border-gray-300 rounded p-2'
                type='text'
                id='club_name'
                name='club_name'
                placeholder='Insert club name'
                value={formData.club_name}
                onChange={handleInputChange}
              />
            </div>
            <div className='mb-4'>
              <label htmlFor='school'>School: </label>
              <input
                className='border border-gray-300 rounded p-2'
                type='text'
                id='school'
                name='school'
                placeholder='Insert school name'
                value={formData.school}
                onChange={handleInputChange}
              />
            </div>
            <div className='mb-4'>
              <label htmlFor='meet_time'>Meet Time: </label>
              <input
                className='border border-gray-300 rounded p-2'
                type='text'
                id='meet_time'
                name='meet_time'
                placeholder='Insert meet time'
                value={formData.meet_time}
                onChange={handleInputChange}
              />
            </div>
            <Link to='/home'>
              <button
                onClick={handleCreateClub}
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
  );
}
