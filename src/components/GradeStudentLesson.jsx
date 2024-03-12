import React, {useState, useEffect} from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import axios from "../axiosConfig";
import StudentScoreInput from './StudentScoreInput';

export default function GradeStudentLesson() {

    const navigate = useNavigate()
    const [students, setStudents] = useState([])
    const [studentScores, setStudentScores] = useState({})
    const location = useLocation()
    const {lesson, clubId} = location.state

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
            scores[student.id] = 0; // Set initial score to 0
            return scores;
            }, {});
        setStudentScores(initialScores);
          })
          .catch((error) => {
            console.error("Error fetching lesson data: ", error);
          });
      }, []);

      const handleScoreChange = (studentId, score) => {
        setStudentScores(prevScores => ({
          ...prevScores,
          [studentId]: score
        }));
      };

      const handleSubmitScores =  async (e) => {
        console.log(students)
        e.preventDefault();
        // Send studentScores to the backend
        console.log('Student scores:', studentScores);
        const studentArray = []
        for (const studentId in studentScores){
          console.log(typeof studentId)
          if (studentScores[studentId] !== 0){
            const currScore = studentScores[studentId]
            const newArray = [...students]
            const currStudent = newArray.find(student=>student.id === parseInt(studentId))
            console.log(currStudent)
            const updatedStudent = { ...currStudent, score: currScore}
            studentArray.push(updatedStudent)
          }
        }
        const token = localStorage.getItem("token");
        try {
          const response = await axios.post("/student_lessons", {lesson:lesson, students: studentArray},
        {
          headers: {
            Authorization: `Bearer: ${token}`,
          },
        }
      );
      console.log(response.data);
      navigate(`/lesson/${lesson.id}`, {state: {clubId: clubId, lesson: lesson}});
    } catch (error) {
      console.error("Error grading lesson:", error);
    }

      };

  return (
    <div>
        <h1>{lesson.lesson_name}</h1>
        {students.map((student)=>
        (<>
        <p>{student.student_name}</p>
        <StudentScoreInput
          key={student.id}
          student={student}
          score={studentScores[student.id] || 0}
          max = {lesson.number_of_questions}
          onScoreChange={handleScoreChange}
           />
           </>
        ))}
      <button onClick = {handleSubmitScores}>Submit Grades</button>
    </div>
  )
}
