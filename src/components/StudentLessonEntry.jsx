import React, {useState} from 'react'
import axios from "../axiosConfig";

export default function StudentLessonEntry({lesson, handleGradeUpdate}) {
  const [editing, setEditing] = useState(false);
  const [gradeInput, setGradeInput] = useState(lesson.grade);
  const [noteInput, setNoteInput] = useState(lesson.note);

  const handleInputChange = (e) => {
    if (e.target.value <= lesson.number_of_questions && e.target.value >= 0) {
      setGradeInput(e.target.value);
    }
  };
  const handleNoteChange = (e) => {
    setNoteInput(e.target.value)
  }

  const handlePatch = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.patch(
        `/student_lessons/${lesson.student_lesson_id}`,
        {
          lesson_grade: gradeInput,
          notes: noteInput,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
      setEditing(false);
      handleGradeUpdate(lesson.student_lesson_id, gradeInput, noteInput)
    } catch (error) {
      console.error("Error updating lesson score:", error);
    }
  };
  console.log(lesson)

  return (
    <div className="lesson-entry">
      <div className="lesson-info">
        <h2 className="font-semibold mb-2">Lesson: {lesson.lesson_name}</h2>
        <p className="font-semibold">Source: {lesson.lesson_source}</p>
      <div className="score-container">
        {editing ? (
          <>
            <p>Score: </p>
            <input
              type="number"
              value={gradeInput}
              onChange={handleInputChange}
              className="score-input-field"
            />
            {' / '}
            {lesson.number_of_questions}
          </>
        ) : (
          <div className="score-display">
            <p>Score: {lesson.grade} / {lesson.number_of_questions} <span className="text-gray-600 ml-2">{Math.floor((lesson.grade / lesson.number_of_questions) * 100)}%</span></p>
          </div>
        )}
      </div>
      </div>
      <div className="lesson-note">
        {editing ? (
          <>
            <p>Notes: </p>
            <textarea
              value={noteInput}
              onChange={handleNoteChange}
              style={{ width: '15rem', border: '2px solid black', resize: 'vertical', overflowY: 'hidden'}}
              className="input-field"
            />
          </>
        ) : (
          <>
          <p className="text-gray-600">Notes:</p>
          <p>{lesson.note ? lesson.note : "n/a"}</p>
          </>
        )}
      </div>
      <div className="lesson-actions">
        {editing ? (
          <>
            <button
              onClick={handlePatch}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mt-4"
            >
              Save
            </button>
            <button
              onClick={() => setEditing(false)}
              className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 mt-4"
            >
              Cancel
            </button>
          </>
        ) : (
          <button
            onClick={() => setEditing(true)}
            className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 mt-4"
          >
            Update Lesson Grade
          </button>
        )}
      </div>
    </div>
  );
}
