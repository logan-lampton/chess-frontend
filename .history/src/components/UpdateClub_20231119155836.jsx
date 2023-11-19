import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

// Possibly, eventually add ability to change the instructor of the club

function UpdateClub({ instructorId }) {
  const navigate = useNavigate();

  const location = useLocation();

  const clubData = location.state.club;

  const [formData, setFormData] = useState({
    club_name: "",
    school: "",
    meet_time: "",
    instructor_Id: instructorId,
  });

  const handleUpdateClub = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      const response = await axios.patch(
        `http://localhost:3000/clubs/${clubData.id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Update successful", response.data);
      navigate(`/clubs/${clubData.id}`);
    } catch (error) {
      console.error("Error updating club data", error);
    }
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
            <h2>Update Club Details</h2>
          </div>
          <form className='ml-5'>
            <div className='mb-4 flex items-center'>
              <label htmlFor='club_name' className='mr-4'>
                Name of Club: (Currently: {clubData.club_name}):
              </label>
              <div className='flex justify-end flex-grow mr-5'>
                <input
                  className='border border-gray-300 rounded p-2 w-full'
                  type='text'
                  id='club_name'
                  name='club_name'
                  placeholder='Insert club name'
                  value={formData.club_name}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className='mb-4 flex items-center'>
              <label htmlFor='school' className='mr-4'>
                Name of School: (Currently: {clubData.school}):
              </label>
              <div className='flex justify-end flex-grow mr-5'>
                <input
                  className='border border-gray-300 rounded p-2 w-full'
                  type='text'
                  id='school'
                  name='school'
                  placeholder='Insert school name'
                  value={formData.school}
                  onChange={handleInputChange}
                />
              </div>
              <div className='mb-4 flex items-center'>
              <label htmlFor='school' className='mr-4'>
                Name of School: (Currently: {clubData.school}):
              </label>
              <div className='flex justify-end flex-grow mr-5'>
                <input
                  className='border border-gray-300 rounded p-2 w-full'
                  type='text'
                  id='school'
                  name='school'
                  placeholder='Insert school name'
                  value={formData.school}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UpdateClub;
