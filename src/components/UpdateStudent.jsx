import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from 'axios';

function UpdateStudent() {

    const location = useLocation();
    const {student} = location.state;
    const navigate = useNavigate();

    console.log("Student", student)

    const [formData, setFormData] = useState({
        student_name: "",
        grade: "",
    })

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]: value
        })
    }

    const handleUpdateStudent = async (e) => {
        e.preventDefault()
        const token = localStorage.getItem("token");
        try{
            const response = await axios.patch(`http://localhost:3000/students/${student.id}`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            console.log("Student update successful", response.data)
            // insert updating student state
            navigate(`/students/${student.id}`)
        } catch(error) {
            console.log("Error updating student data", error)
        }
    }

  return (
    <div className='grid grid-cols-1 md:grid-cols-3 gap-4 my-4 w-screen'>
        <div className='col-span-2 md:col-span-2 mr-5 ml-5'>
            <div className='border-2 border-gray-900'>
                <div className='bg-gray-900 text-white font-bold py-2 px-4 border mb-4'>
                    <h2>Update Student Details</h2>
                </div>
                <form className='ml-5'>
                    <div className='flex flex-col mb-4 mt-4'>
                        <label htmlFor='student_name' className='mb-2'>
                            Name of Student: (Currently: {student.student_name}):
                        </label>
                        <div className='flex justify-end flex-grow mr-5'>
                            <input
                                className='border border-gray-300 rounded p-2 w-full'
                                type='text'
                                id='student_name'
                                name='student_name'
                                placeholder='Insert student name'
                                value={formData.student_name}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>
                    <div className='flex flex-col mb-4 mt-4'>
                        <label htmlFor='grade' className='mb-2'>
                            Grade of student: (Currently: {student.grade}):
                        </label>
                        <div className='flex justify-end flex-grow mr-5'>
                            <input
                                className='border border-gray-300 rounded p-2 w-full'
                                type='text'
                                id='grade'
                                name='grade'
                                placeholder='Insert student grade'
                                value={formData.grade}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>
                    <button onClick={handleUpdateStudent} className='bg-gray-900 text-white py-2 px-4 rounded hover:bg-blue-700 mr-1 mb-4' type='submit'>Update Student</button>
                </form>
            </div>
        </div>
    </div>
    );
}

export default UpdateStudent;
