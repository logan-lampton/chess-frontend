import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "../axiosConfig";
import StudentScoreInput from "../components/StudentScoreInput";
import { useUserContext } from "../App";
import Back from "../components/Back";

export default function GradeStudentLesson() {
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [studentScores, setStudentScores] = useState({});
  const location = useLocation();
  const { clubId } = useUserContext()
  const { lesson } = location.state;

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get(`/addstudentlessons/${clubId}/${lesson.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setStudents(response.data);
        // Initialize studentScores with default scores (e.g., 0)
        const initialScores = response.data.reduce((scores, student) => {
          //scores[student.id] = 0; // Set initial score to 0
          return scores;
        }, {});
        setStudentScores(initialScores);
      })
      .catch((error) => {
        console.error("Error fetching lesson data: ", error);
      });
  }, []);

  const handleScoreChange = (studentId, score) => {
    if(parseInt(score)<=lesson.number_of_questions || score===undefined){
    setStudentScores((prevScores) => ({
      ...prevScores,
      [studentId]: score,
    }));
  }
  };

  const handleSubmitScores = async (e) => {
    console.log(students);
    e.preventDefault();
    // Send studentScores to the backend
    console.log("Student scores:", studentScores);
    const studentArray = [];
    for (const studentId in studentScores) {
      console.log(typeof studentId);
      if (studentScores[studentId] !== undefined) {
        const currScore = studentScores[studentId];
        const newArray = [...students];
        const currStudent = newArray.find(
          (student) => student.id === parseInt(studentId)
        );
        console.log(currStudent);
        const updatedStudent = { ...currStudent, score: currScore };
        studentArray.push(updatedStudent);
      }
    }
    const token = localStorage.getItem("token");
    try {
      const response = await axios.post(
        "/student_lessons",
        { lesson: lesson, students: studentArray },
        {
          headers: {
            Authorization: `Bearer: ${token}`,
          },
        }
      );
      console.log(response.data);
      navigate(`/lesson/${lesson.id}`, {
        state: { lesson: lesson }
      });
    } catch (error) {
      console.error("Error grading lesson:", error);
    }
  };

  return (
    <>
    <Back to = {`/lesson/${lesson.id}`} state = { {lesson:lesson} }/>
    <div className='p-4'>
      <h1 className='text-2xl font-bold mb-2'>{lesson.lesson_name}</h1>
      <h3 className='text-lg font-semibold text-gray-700 mb-6'>
        {lesson.number_of_questions} questions
      </h3>
      <div className='space-y-4'>
        {students.map((student) => (
          <div key={student.id}>
            <p className='font-semibold'>{student.student_name}</p>
            <StudentScoreInput
              student={student}
              score={studentScores[student.id]}
              max={lesson.number_of_questions}
              onScoreChange={handleScoreChange}
            />
          </div>
        ))}
      </div>
      <button
        className='bg-blue-500 text-white py-2 px-4 mt-4 rounded hover:bg-blue-600'
        onClick={handleSubmitScores}
      >
        Submit Grades
      </button>
    </div>
    </>
  );
}
