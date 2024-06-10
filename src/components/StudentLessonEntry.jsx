import React, {useState} from 'react'
import axios from "../axiosConfig";

export default function StudentLessonEntry({lesson}) {
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
    } catch (error) {
      console.error("Error updating lesson score:", error);
    }
  };

  return (
    <>
      <span className="font-semibold">{lesson.lesson_name}</span> -{' '}
        {editing ? (
          <>
          <span className="text-gray-600 mr-4">
            <input 
            type="number" 
            value={gradeInput} 
            onChange={handleInputChange}
            >
            </input> / {lesson.number_of_questions} 
            <input
            type="text"
            value={noteInput}
            onChange={handleNoteChange}
            className="border"
            >
            </input>
            <button
            onClick={handlePatch}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-yellow-600 mt-4"
            >
              Save
            </button>
            <button
              onClick={() => setEditing(!editing)}
              className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 mt-4"
              >
                Cancel
            </button>
          </span>
          </>
        ) : (
          <>
          <span className="text-gray-600 mr-4">
            {gradeInput} / {lesson.number_of_questions}
          </span>
          <span className="text-gray-600 ml-4">
            {Math.floor((gradeInput / lesson.number_of_questions) * 100)}%
          </span>
          <p className="text-gray-600">{noteInput}</p>
          
          <button
          onClick={() => setEditing(!editing)}
          className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 mt-4"
          >
            Update Lesson Grade
          </button>
          </>
        )
        }
        
    </>
  )
}
