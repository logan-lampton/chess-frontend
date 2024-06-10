import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from "../axiosConfig";
import Back from "../components/Back";
import StudentLessonEntry from "../components/StudentLessonEntry";
import GradeStudentLesson from './GradeStudentLesson';

function ViewLessons() {
  const location = useLocation();
  const { student } = location.state;

  const [lessons, setLessons] = useState([]);

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
  }, [student.id]);

  const lessonsBySource = lessons.reduce((acc, lesson) => {
    const source = lesson.lesson_source;

    if (!acc[source]) {
      acc[source] = []; // Initialize an array for the source if it doesn't exist
    }

    acc[source].push(lesson);

    return acc;
  }, {});

  const handleGradeUpdate = (id, score, note) => {
    let newArray = lessons.map((lesson) => {
      if (lesson.student_lesson_id === id) {
        return {
          ...lesson,
          grade: score,
          note: note,
        };
      }
      return lesson;
    });
  
    setLessons(newArray);
    console.log(newArray);
  };
  return (
    <>
      <Back to={`/students/${student.id}`} />
      <div className="flex">
        {lessons.length === 0 ? (
          <div className="w-full text-center py-4">
            <div className="border p-4 bg-gray-100 text-gray-700">
              Student has completed no lessons.
            </div>
          </div>
        ) : (
          Object.entries(lessonsBySource).map(([source, lessons]) => (
            <div key={source} className="flex-none mr-8 border-r pr-8">
              <h2 className="text-lg font-bold mb-4">{source}</h2>
              <ul>
                {lessons.map((lesson) => (
                  <StudentLessonEntry key={`${source}-${lesson.id}`} lesson={lesson} handleGradeUpdate = {handleGradeUpdate} />
                ))}
              </ul>
            </div>
          ))
        )}
      </div>
    </>
  );
}

export default ViewLessons;