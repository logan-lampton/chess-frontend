import React, {useState, useEffect} from 'react'
import {Link, useLocation} from 'react-router-dom'
import axios from "../axiosConfig";
import Back from "../components/Back";

function ViewLessons() {

  const location = useLocation()
  const { student } = location.state

  const [lessons, setLessons] = useState([])

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get(`/students/lesson_scores/${student.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("Received student data:", response.data);
        setLessons(response.data);
      })
      .catch((error) => {
        console.error("Error fetching student data:", error);
      });
  }, []);

  const lessonsBySource = lessons.reduce((acc, lesson) => {
    const source = lesson.lesson_source;

    if (!acc[source]) {
      acc[source] = []; // Initialize an array for the source if it doesn't exist
    }

    acc[source].push(lesson);

    return acc;
  }, {});

  return (
    <>
    <Back to = {`/students/${student.id}`} />
    <div className="flex">
      {Object.entries(lessonsBySource).map(([source, lessons]) => (
        <div key={source} className="flex-none mr-8 border-r pr-8">
          <h2 className="text-lg font-bold mb-4">{source}</h2>
          <ul>
            {lessons.map((lesson) => (
              <li key={lesson.id} className="mb-2">
                <span className="font-semibold">{lesson.lesson_name}</span> -{' '}
                <span className="text-gray-600">{lesson.grade}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
    </>
  )
}

export default ViewLessons