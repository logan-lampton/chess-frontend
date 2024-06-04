import React, {useContext, useState} from 'react'
import { useLocation, useNavigate } from "react-router-dom";
import axios from "../axiosConfig";
import { useUserContext } from "../App";

export default function UpdateLesson() {
    const location = useLocation();
    const navigate = useNavigate();
    const {lesson, clubId} = location.state;
    const { instructorId } = useUserContext();
    const [formData, setFormData] = useState({
        lesson_name: lesson.lesson_name,
        number_of_questions: lesson.number_of_questions,
        source: lesson.source,
        instructor_id: instructorId,
        description: lesson.description,
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleUpdateLesson = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");
        try {
            const response = await axios.patch(
                `http://localhost:3000/lessons/${lesson.id}`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            console.log(response.data);
            navigate(`/lesson/${lesson.id}`, { state: { lesson: response.data} });
        } catch (error) {
            if (error.response && error.response.status === 422) {
                const validationErrors = error.response.data.errors;

                if (validationErrors) {
                    console.log("Validation errors:", validationErrors);
                } else {
                    console.log(
                        "Unexpected validation response format:",
                        error.response.data
                    );
                }
            } else {
                console.log("Error updating lesson info", error);
            }
        }
    };


  return (
    <div>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-4 my-4 w-screen'>
                <div className='col-span-2 md:col-span-2 mr-5 ml-5'>
                    <div className='border-2 border-gray-900'>
                        <div className='bg-gray-900 text-white font-bold py-2 px-4 border mb-4'>
                            <h2>Update Lesson Info</h2>
                        </div>
                        <form className='ml-5'>
                            <div className='mb-4'>
                                <label htmlFor='lesson_name'>
                                    Lesson Name:{" "}
                                </label>
                                <input
                                    className='border border-gray-300 rounded p-2'
                                    type='text'
                                    id='lesson_name'
                                    name='lesson_name'
                                    placeholder='Insert lesson name'
                                    value={formData.lesson_name}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className='mb-4'>
                                <label htmlFor='number_of_questions'>
                                    Number of Questions:{" "}
                                </label>
                                <input
                                    className='border border-gray-300 rounded p-2'
                                    type='text'
                                    id='number_of_questions'
                                    name='number_of_questions'
                                    placeholder='Insert number of questions'
                                    value={formData.number_of_questions}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className='mb-4'>
                                <label htmlFor='source'>Source: </label>
                                <input
                                    className='border border-gray-300 rounded p-2'
                                    type='text'
                                    id='source'
                                    name='source'
                                    placeholder='Insert lesson source'
                                    value={formData.source}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className='mb-4'>
                                <label htmlFor='description'>
                                    Description:{" "}
                                </label>
                                <input
                                    className='border border-gray-300 rounded p-2'
                                    type='text'
                                    id='description'
                                    name='description'
                                    placeholder='write a brief description'
                                    value={formData.description}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <button
                                onClick={handleUpdateLesson}
                                className='bg-gray-900 text-white py-2 px-4 rounded hover:bg-blue-700 mr-1 mb-4'
                                type='submit'
                            >
                                Update
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
  )
}
