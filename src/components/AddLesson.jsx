import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

export default function AddLesson() {
    const navigate = useNavigate();
    const location = useLocation();
    const { instructorId } = location.state;
    const [formData, setFormData] = useState({
        lesson_name: "",
        number_of_questions: "",
        source: "",
        instructor_id: instructorId,
        description: "",
    });

    const handleCreateLesson = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");
        try {
            const response = await axios.post(
                "http://localhost:3000/lessons",
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            console.log(response.data);
            navigate("/clublessons", { state: { instructorId: instructorId } });
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
                console.log("Error creating club", error);
            }
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
        <div>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-4 my-4 w-screen'>
                <div className='col-span-2 md:col-span-2 mr-5 ml-5'>
                    <div className='border-2 border-gray-900'>
                        <div className='bg-gray-900 text-white font-bold py-2 px-4 border mb-4'>
                            <h2>Create A New Lesson</h2>
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
                                onClick={handleCreateLesson}
                                className='bg-gray-900 text-white py-2 px-4 rounded hover:bg-blue-700 mr-1 mb-4'
                                type='submit'
                            >
                                Create
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
