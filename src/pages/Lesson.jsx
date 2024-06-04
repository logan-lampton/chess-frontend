import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "../axiosConfig";
import { useUserContext } from "../App";
import LoadingSpinner from "../components/LoadingSpinner";
import Back from "../components/Back";
import ConfirmationPopUp from "../components/ConfirmationPopUp";

export default function Lesson() {
    const location = useLocation();
    const navigate = useNavigate();
    const { loading, setLoading, clubId } = useUserContext();
    const { lesson } = location.state;
    const [students, setStudents] = useState([]);
    const [confirmationPopUp, setConfirmationPopUp] = useState({
        message: "",
        isLoading: false,
    });

    console.log(lesson);

    useEffect(() => {
        setLoading(true);
        const token = localStorage.getItem("token");
        axios
            .get(`/lesson_students/${clubId}/${lesson.id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                setStudents(response.data);
            })
            .catch((error) => {
                console.error("Error fetching lesson data: ", error);
            });
        setLoading(false);
    }, []);

    const deleteLesson = async (id) => {
        const token = localStorage.getItem("token");
        try {
          const deleteResponse = await axios.delete(
            `http://localhost:3000/lessons/${lesson.id}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          console.log("Lesson deleted:", deleteResponse.data);
          navigate('/clublessons')
        } catch (error) {
          console.error("Error deleting lesson:", error);
        }
      };

      const handleConfirmation = (message, isLoading) => {
        setConfirmationPopUp({
            message,
            isLoading,
        });
    };

    const handleDeleteClick = () => {
        handleConfirmation("Are you sure you want to delete this lesson?  You will lose all grades connected to it.", true);
    };

    const sureDelete = async (selection, id) => {
        if (selection) {
            await deleteLesson(lesson.id);
            setConfirmationPopUp({ message: "", isLoading: false });
        } else {
            setConfirmationPopUp({ message: "", isLoading: false });
        }
    };

    return (
        <>
            <Back to={`/clublessons`} />
            <div className='p-4'>
                {loading && <LoadingSpinner />}
                {!loading && (
                    <>
                        <h1 className='text-2xl font-bold mb-4'>
                            {lesson.lesson_name}
                            <button onClick={() =>
                                navigate(`/editlesson/${lesson.id}`, {
                                    state: { clubId: clubId, lesson: lesson },
                                })
                            }>Edit lesson info</button>
                            <button onClick = {handleDeleteClick}>Delete lesson</button>
                        </h1>
                        <h3 className='text-lg font-semibold mb-4'>
                            {lesson.source}
                        </h3>
                        <ul>
                            {students.map((student) => (
                                <li key={student.id} className='mb-2'>
                                    {student.name} {student.score}/{lesson.number_of_questions}
                                </li>
                            ))}
                        </ul>
                        <button
                            onClick={() =>
                                navigate(`/gradelesson/${lesson.id}`, {
                                    state: { clubId: clubId, lesson: lesson },
                                })
                            }
                            className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'
                        >
                            Add Student Grades
                        </button>
                    </>
                )}
            </div>
            {confirmationPopUp.isLoading && (
                            <ConfirmationPopUp
                                onDialogue={sureDelete}
                                message={confirmationPopUp.message}
                            />
                        )}
        </>
    );
}
