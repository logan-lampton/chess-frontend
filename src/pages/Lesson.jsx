import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "../axiosConfig";
import { useUserContext } from "../App";

export default function Lesson() {
  const location = useLocation();
  const navigate = useNavigate();
  const { lesson, clubId } = location.state;
  const [students, setStudents] = useState([]);
  console.log(lesson);

  useEffect(() => {
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
  }, []);

  return (
    <div className='p-4'>
      <h1 className='text-2xl font-bold mb-4'>{lesson.lesson_name}</h1>
      <h3 className='text-lg font-semibold mb-4'>{lesson.source}</h3>
      <ul>
        {students.map((student) => (
          <li key={student.id} className='mb-2'>
            {student.name} {student.score}%
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
    </div>
  );
}
