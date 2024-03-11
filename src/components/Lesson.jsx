import React, {useState, useEffect} from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import axios from "../axiosConfig";

export default function Lesson() {
    const location = useLocation()
    const navigate = useNavigate()
    const { lesson, clubId } = location.state
    const [students, setStudents] = useState([])
    console.log(lesson)

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
    <div>
        <h1>{lesson.lesson_name}</h1>
        <h3>{lesson.source}</h3>
        <ul>
        {students.map((student)=> (
            <li>{student.name}  {student.score}%</li>
        ))}
        </ul>
        <button onClick = {()=>navigate('/gradelesson/:id', {state:{clubId: clubId, lessonId:lesson.id}})}>Add Student Grades</button>
    </div>
  )
}
