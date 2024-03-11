import React, {useState, useEffect} from 'react'
import { useLocation } from 'react-router-dom';
import axios from "../axiosConfig";

export default function GradeStudentLesson() {

    const [students, setStudents] = useState([])
    const location = useLocation()
    const {lessonId, clubId} = location.state

    useEffect(() => {
        const token = localStorage.getItem("token");
        axios
          .get(`/addstudentlessons/${clubId}/${lessonId}`, {
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
        {students.map((student)=>
        (<p>{student.student_name}</p>))}
    </div>
  )
}
