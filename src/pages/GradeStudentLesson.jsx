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
  const [studentNotes, setStudentNotes] = useState({});
  const location = useLocation();
  const { clubId } = useUserContext();
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
        // Initialize studentScores and studentNotes with default values
        const initialScores = response.data.reduce((scores, student) => {
          scores[student.id] = ''; // Set initial score to empty string
          return scores;
        }, {});
        const initialNotes = response.data.reduce((notes, student) => {
          notes[student.id] = ''; // Set initial notes to empty string
          return notes;
        }, {});
        setStudentScores(initialScores);
        setStudentNotes(initialNotes);
      })
      .catch((error) => {
        console.error("Error fetching lesson data: ", error);
      });
  }, []);

  const handleScoreChange = (studentId, score) => {
    setStudentScores((prevScores) => ({
      ...prevScores,
      [studentId]: score
    }));
  };

  const handleNoteChange = (studentId, note) => {
    setStudentNotes((prevNotes) => ({
      ...prevNotes,
      [studentId]: note
    }));
  };

  const handleSubmitScores = async (e) => {
    e.preventDefault();
    const studentArray = students.map(student => {
      if (studentScores[student.id] !== '') {
        return {
        ...student,
        score: studentScores[student.id],
        note: studentNotes[student.id] || ''
        };
      }
    });
    
    const token = localStorage.getItem("token");
    try {
      const response = await axios.post(
        "/student_lessons",
        { lesson: lesson, students: studentArray },
        {
          headers: {
            Authorization: `Bearer ${token}`,
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
      <Back to={`/lesson/${lesson.id}`} state={{ lesson: lesson }} />
      <div className="p-5">
        <h1 className="text-2xl font-bold mb-2">{lesson.lesson_name}</h1>
        <h3 className="text-lg font-semibold text-gray-700 mb-6">
          {lesson.number_of_questions} {lesson.number_of_questions !== 1 ? "questions" : "question"}
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mb-5">
          {students.map((student) => (
            <div key={student.id} className="border-4 p-5 bg-gray-100">
              <p className="font-semibold text-xl">{student.student_name}</p>
              <StudentScoreInput
                student={student}
                score={studentScores[student.id]}
                note={studentNotes[student.id]}
                max={lesson.number_of_questions}
                onScoreChange={handleScoreChange}
                onNoteChange={handleNoteChange}
              />
            </div>
          ))}
        </div>
        <button
          className="bg-blue-500 text-white py-2 px-4 mt-4 rounded hover:bg-blue-600"
          onClick={handleSubmitScores}
        >
          Submit Grades
        </button>
      </div>
    </>
  );
}