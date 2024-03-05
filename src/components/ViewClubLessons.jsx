import { React, useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "../axiosConfig";


// add create a new lesson
// add update lesson
// add delete lesson

// Click on lesson, bring to page showing the students that have completed it/their grades
// On that separate page, add a way to mark students as having completed a lesson/their grade


export default function ViewClubLessons() {
  const location = useLocation()
  const navigate= useNavigate()
  console.log(location)
  const {instructorId} = location.state
  

  const [lessons, setLessons] = useState([])

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios.get(`/instructor_lessons/${instructorId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setLessons(response.data);
      })
      .catch((error) => {
        console.error("Error fetching lesson data: ", error);
      });
  }, []);

  console.log(lessons)

  const lessonsBySource = lessons.reduce((acc, lesson) => {
    const source = lesson.source;
  
    if (!acc[source]) {
      acc[source] = []; // Initialize an array for the source if it doesn't exist
    }
  
    acc[source].push(lesson);
  
    return acc;
  }, {});

  const handleLessonAdded = (newLesson) => {
    let newArray = [...lessons, newLesson]
    setLessons(newArray)
  }

  return (
    <div>
      {Object.entries(lessonsBySource).map(([source, lessons]) => (
        <div key={source}>
          <h2>{source}</h2>
          <ul>
            {lessons.map((lesson) => (
              <li key={lesson.id}>{lesson.lesson_name}</li>
            ))}
          </ul>
        </div>
      ))}
      <button onClick = {()=>navigate('/addlesson', {state: {instructorId: instructorId}})}>Add new Lesson</button>
    </div>
  )
}
